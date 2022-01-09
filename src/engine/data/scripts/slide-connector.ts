import {
    Add,
    And,
    bool,
    Code,
    createEntityData,
    DestroyParticleEffect,
    Draw,
    EntityInfo,
    EntityMemory,
    Equal,
    GreaterOr,
    HasParticleEffect,
    If,
    Lerp,
    Max,
    Min,
    MoveParticleEffect,
    Multiply,
    Not,
    NotEqual,
    Or,
    ParticleEffect,
    Pointer,
    Power,
    Script,
    SkinSprite,
    SpawnParticleEffect,
    State,
    Subtract,
    SwitchInteger,
    Time,
    TouchId,
    Unlerp,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import {
    baseNote,
    circularHoldEffect,
    lane,
    Layer,
    linearHoldEffect,
    noteOnScreenDuration,
    origin,
} from './common/constants'
import {
    applyLevelSpeed,
    applyMirrorCenters,
    approachNote,
    calculateHitbox,
    getSpawnTime,
    getZ,
    NoteSharedMemory,
} from './common/note'
import {
    calculateNoteLayout,
    getNoteLayout,
    noteGreenSprite,
    noteYellowSprite,
} from './common/note-sprite'
import { checkTouchXInHitbox, checkTouchYInHitbox } from './common/touch'
import { rectByEdge } from './common/utils'
import { disallowEmpties } from './input'

const leniency = 1

class ConnectorDataPointer extends Pointer {
    public get headTime() {
        return this.to<number>(0)
    }

    public get headCenter() {
        return this.to<number>(1)
    }

    public get headWidth() {
        return this.to<number>(2)
    }

    public get tailTime() {
        return this.to<number>(3)
    }

    public get tailCenter() {
        return this.to<number>(4)
    }

    public get tailWidth() {
        return this.to<number>(5)
    }

    public get easeType() {
        return this.to<number>(6)
    }

    public get headIndex() {
        return this.to<number>(7)
    }

    public get headInfo() {
        return EntityInfo.of(this.headIndex)
    }

    public get headSharedMemory() {
        return NoteSharedMemory.of(this.headIndex)
    }
}

const ConnectorData = createEntityData(ConnectorDataPointer)

export function slideConnector(isCritical: boolean): Script {
    const connectionSprite = isCritical
        ? SkinSprite.NoteConnectionYellowSeamless
        : SkinSprite.NoteConnectionGreenSeamless
    const noteSprite = isCritical ? noteYellowSprite : noteGreenSprite
    const circularParticleEffect = isCritical
        ? ParticleEffect.NoteCircularHoldYellow
        : ParticleEffect.NoteCircularHoldGreen
    const linearParticleEffect = isCritical
        ? ParticleEffect.NoteLinearHoldYellow
        : ParticleEffect.NoteLinearHoldGreen

    const spawnTime = EntityMemory.to<number>(0)

    const headL = EntityMemory.to<number>(1)
    const headR = EntityMemory.to<number>(2)
    const tailL = EntityMemory.to<number>(3)
    const tailR = EntityMemory.to<number>(4)

    const headLayout = getNoteLayout(EntityMemory.to(5))
    const tailLayout = getNoteLayout(EntityMemory.to(13))

    const headHitboxL = EntityMemory.to<number>(21)
    const headHitboxR = EntityMemory.to<number>(22)
    const tailHitboxL = EntityMemory.to<number>(23)
    const tailHitboxR = EntityMemory.to<number>(24)

    const slideZ = EntityMemory.to<number>(25)

    const circularId = EntityMemory.to<number>(26)
    const linearId = EntityMemory.to<number>(27)

    const preprocess = [
        applyLevelSpeed(ConnectorData.headTime, ConnectorData.tailTime),
        applyMirrorCenters(ConnectorData.headCenter, ConnectorData.tailCenter),

        spawnTime.set(getSpawnTime(ConnectorData.headTime)),

        headL.set(
            Multiply(
                Subtract(ConnectorData.headCenter, ConnectorData.headWidth),
                lane.w
            )
        ),
        headR.set(
            Multiply(
                Add(ConnectorData.headCenter, ConnectorData.headWidth),
                lane.w
            )
        ),
        tailL.set(
            Multiply(
                Subtract(ConnectorData.tailCenter, ConnectorData.tailWidth),
                lane.w
            )
        ),
        tailR.set(
            Multiply(
                Add(ConnectorData.tailCenter, ConnectorData.tailWidth),
                lane.w
            )
        ),

        calculateNoteLayout(
            ConnectorData.headCenter,
            ConnectorData.headWidth,
            headLayout
        ),
        calculateNoteLayout(
            ConnectorData.tailCenter,
            ConnectorData.tailWidth,
            tailLayout
        ),

        calculateHitbox(
            ConnectorData.headCenter,
            ConnectorData.headWidth,
            leniency,
            headHitboxL,
            headHitboxR
        ),
        calculateHitbox(
            ConnectorData.tailCenter,
            ConnectorData.tailWidth,
            leniency,
            tailHitboxL,
            tailHitboxR
        ),

        slideZ.set(
            getZ(
                Layer.NoteSlide,
                ConnectorData.headTime,
                ConnectorData.headCenter
            )
        ),
    ]

    const spawnOrder = spawnTime

    const shouldSpawn = GreaterOr(Time, spawnTime)

    const noteScale = EntityMemory.to<number>(32)

    const updateSequential = And(
        Not(options.isAutoplay),
        GreaterOr(Time, ConnectorData.headTime),
        [
            noteScale.set(
                ease(
                    Unlerp(ConnectorData.headTime, ConnectorData.tailTime, Time)
                )
            ),
            ConnectorData.headSharedMemory.slideHitboxL.set(
                Lerp(headHitboxL, tailHitboxL, noteScale)
            ),
            ConnectorData.headSharedMemory.slideHitboxR.set(
                Lerp(headHitboxR, tailHitboxR, noteScale)
            ),
        ]
    )

    const touch = Or(
        options.isAutoplay,
        And(
            GreaterOr(Time, ConnectorData.headTime),
            NotEqual(ConnectorData.headSharedMemory.slideTime, Time),
            checkTouchYInHitbox(),
            checkTouchXInHitbox(
                ConnectorData.headSharedMemory.slideHitboxL,
                ConnectorData.headSharedMemory.slideHitboxR
            ),
            [
                disallowEmpties.add(TouchId),
                ConnectorData.headSharedMemory.slideTime.set(Time),
            ]
        )
    )

    const vhTime = EntityMemory.to<number>(33)
    const vtTime = EntityMemory.to<number>(34)

    const shTime = EntityMemory.to<number>(35)
    const stTime = EntityMemory.to<number>(36)
    const shXScale = EntityMemory.to<number>(37)
    const stXScale = EntityMemory.to<number>(38)
    const shYScale = EntityMemory.to<number>(39)
    const stYScale = EntityMemory.to<number>(40)

    const connectorBottom = EntityMemory.to<number>(41)
    const connectorTop = EntityMemory.to<number>(42)

    const center = EntityMemory.to<number>(43)

    const updateParallel = Or(GreaterOr(Time, ConnectorData.tailTime), [
        vhTime.set(Max(ConnectorData.headTime, Time)),
        vtTime.set(
            Min(ConnectorData.tailTime, Add(Time, noteOnScreenDuration))
        ),

        [...Array(10).keys()].map((i) => [
            shTime.set(Lerp(vhTime, vtTime, i / 10)),
            stTime.set(Lerp(vhTime, vtTime, (i + 1) / 10)),

            shXScale.set(
                ease(
                    Unlerp(
                        ConnectorData.headTime,
                        ConnectorData.tailTime,
                        shTime
                    )
                )
            ),
            stXScale.set(
                ease(
                    Unlerp(
                        ConnectorData.headTime,
                        ConnectorData.tailTime,
                        stTime
                    )
                )
            ),
            shYScale.set(approachNote(shTime)),
            stYScale.set(approachNote(stTime)),

            connectorBottom.set(Lerp(origin, lane.b, shYScale)),
            connectorTop.set(Lerp(origin, lane.b, stYScale)),

            Draw(
                connectionSprite,
                Multiply(Lerp(headL, tailL, shXScale), shYScale),
                connectorBottom,
                Multiply(Lerp(headL, tailL, stXScale), stYScale),
                connectorTop,
                Multiply(Lerp(headR, tailR, stXScale), stYScale),
                connectorTop,
                Multiply(Lerp(headR, tailR, shXScale), shYScale),
                connectorBottom,
                Layer.NoteConnector,
                Multiply(
                    options.connectorAlpha,
                    If(
                        Or(
                            options.isAutoplay,
                            Equal(ConnectorData.headInfo.state, State.Spawned),
                            Equal(
                                ConnectorData.headSharedMemory.slideTime,
                                Time
                            )
                        ),
                        1,
                        0.5
                    )
                )
            ),
        ]),

        And(GreaterOr(Time, ConnectorData.headTime), [
            noteScale.set(
                ease(
                    Unlerp(ConnectorData.headTime, ConnectorData.tailTime, Time)
                )
            ),

            noteSprite.draw(
                1,
                baseNote.b,
                baseNote.t,
                [
                    Lerp(headLayout[0], tailLayout[0], noteScale),
                    Lerp(headLayout[1], tailLayout[1], noteScale),
                    Lerp(headLayout[2], tailLayout[2], noteScale),
                    Lerp(headLayout[3], tailLayout[3], noteScale),
                    Lerp(headLayout[4], tailLayout[4], noteScale),
                    Lerp(headLayout[5], tailLayout[5], noteScale),
                    Lerp(headLayout[6], tailLayout[6], noteScale),
                    Lerp(headLayout[7], tailLayout[7], noteScale),
                ],
                slideZ
            ),

            And(
                options.isNoteEffectEnabled,
                Or(
                    HasParticleEffect(circularParticleEffect),
                    HasParticleEffect(linearParticleEffect)
                ),
                center.set(
                    Lerp(
                        ConnectorData.headCenter,
                        ConnectorData.tailCenter,
                        noteScale
                    )
                )
            ),

            And(
                options.isNoteEffectEnabled,
                HasParticleEffect(circularParticleEffect),
                If(
                    Or(
                        options.isAutoplay,
                        Equal(ConnectorData.headSharedMemory.slideTime, Time)
                    ),
                    [
                        Or(
                            bool(circularId),
                            circularId.set(
                                SpawnParticleEffect(
                                    circularParticleEffect,
                                    ...rectByEdge(0, 0, 0, 0),
                                    1,
                                    true
                                )
                            )
                        ),

                        MoveParticleEffect(
                            circularId,
                            Subtract(
                                Multiply(center, circularHoldEffect.bw),
                                circularHoldEffect.w
                            ),
                            circularHoldEffect.b,
                            Subtract(
                                Multiply(center, circularHoldEffect.tw),
                                circularHoldEffect.w
                            ),
                            circularHoldEffect.t,
                            Add(
                                Multiply(center, circularHoldEffect.tw),
                                circularHoldEffect.w
                            ),
                            circularHoldEffect.t,
                            Add(
                                Multiply(center, circularHoldEffect.bw),
                                circularHoldEffect.w
                            ),
                            circularHoldEffect.b
                        ),
                    ],
                    And(bool(circularId), [
                        DestroyParticleEffect(circularId),
                        circularId.set(0),
                    ])
                )
            ),

            And(
                options.isNoteEffectEnabled,
                HasParticleEffect(linearParticleEffect),
                If(
                    Or(
                        options.isAutoplay,
                        Equal(ConnectorData.headSharedMemory.slideTime, Time)
                    ),
                    [
                        Or(
                            bool(linearId),
                            linearId.set(
                                SpawnParticleEffect(
                                    linearParticleEffect,
                                    ...rectByEdge(0, 0, 0, 0),
                                    1,
                                    true
                                )
                            )
                        ),

                        MoveParticleEffect(
                            linearId,
                            Subtract(
                                Multiply(center, lane.w),
                                linearHoldEffect.w
                            ),
                            lane.b,
                            Subtract(
                                Multiply(center, linearHoldEffect.tw),
                                linearHoldEffect.w
                            ),
                            linearHoldEffect.t,
                            Add(
                                Multiply(center, linearHoldEffect.tw),
                                linearHoldEffect.w
                            ),
                            linearHoldEffect.t,
                            Add(Multiply(center, lane.w), linearHoldEffect.w),
                            lane.b
                        ),
                    ],
                    And(bool(linearId), [
                        DestroyParticleEffect(linearId),
                        linearId.set(0),
                    ])
                )
            ),
        ]),
    ])

    const terminate = [
        And(bool(circularId), DestroyParticleEffect(circularId)),
        And(bool(linearId), DestroyParticleEffect(linearId)),
    ]

    return {
        preprocess: {
            code: preprocess,
        },
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        updateSequential: {
            code: updateSequential,
        },
        touch: {
            code: touch,
        },
        updateParallel: {
            code: updateParallel,
        },
        terminate: {
            code: terminate,
        },
    }
}

function ease(progress: Code<number>) {
    return SwitchInteger(
        ConnectorData.easeType,
        [Power(progress, 2), Subtract(1, Power(Subtract(1, progress), 2))],
        progress
    )
}
