import { SkinSprite } from 'sonolus-core'
import {
    And,
    bool,
    Code,
    Divide,
    Draw,
    EntityInfo,
    EntityMemory,
    Equal,
    Floor,
    GreaterOr,
    HasSkinSprite,
    If,
    Lerp,
    LessOr,
    Multiply,
    Not,
    NotEqual,
    Or,
    Remap,
    Script,
    State,
    Subtract,
    TouchDX,
    TouchId,
    TouchStarted,
    TouchX,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import {
    baseNote,
    lane,
    Layer,
    origin,
    screen,
    sekaiStage,
    SekaiStageSprite,
    stage as stageC,
} from './common/constants'
import { playEmptyLaneEffect } from './common/effect'
import { playStageSFX } from './common/sfx'
import { checkTouchYInHitbox } from './common/touch'
import { rectByEdge } from './common/utils'
import { disallowEmpties } from './input'

export function stage(): Script {
    const spawnOrder = -999

    const shouldSpawn = Equal(EntityInfo.of(0).state, State.Despawned)

    const touch = Or(
        options.isAutoplay,
        And(
            Not(disallowEmpties.contains(TouchId)),
            checkTouchYInHitbox(),
            GreaterOr(TouchX, Multiply(lane.w, -6)),
            LessOr(TouchX, Multiply(lane.w, 6)),
            If(TouchStarted, onEmptyTap(), onEmptyMove())
        )
    )

    const updateParallel = [drawStageCover(), drawStage()]

    return {
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        touch: {
            code: touch,
            order: 1,
        },
        updateParallel: {
            code: updateParallel,
        },
    }

    function drawStageCover() {
        const stageCoverBottom = Lerp(lane.t, lane.b, options.stageCover)

        return And(
            bool(options.stageCover),
            Draw(
                SkinSprite.StageCover,
                ...rectByEdge(screen.l, screen.r, stageCoverBottom, screen.t),
                Layer.Cover,
                1
            )
        )
    }

    function drawStage() {
        return If(
            HasSkinSprite(SekaiStageSprite),
            Draw(
                SekaiStageSprite,
                ...rectByEdge(
                    sekaiStage.l,
                    sekaiStage.r,
                    sekaiStage.b,
                    sekaiStage.t
                ),
                Layer.Stage,
                1
            ),
            [
                Draw(
                    SkinSprite.JudgmentLine,
                    Multiply(baseNote.bw, -6),
                    baseNote.b,
                    Multiply(baseNote.tw, -6),
                    baseNote.t,
                    Multiply(baseNote.tw, 6),
                    baseNote.t,
                    Multiply(baseNote.bw, 6),
                    baseNote.b,
                    Layer.JudgmentLine,
                    1
                ),
                [...Array(6).keys()]
                    .map((i) => [(i - 3) * 2, (i - 2) * 2])
                    .map(([l, r]) =>
                        Draw(
                            SkinSprite.Lane,
                            Remap(
                                origin,
                                lane.b,
                                0,
                                Multiply(l, lane.w),
                                screen.b
                            ),
                            screen.b,
                            Remap(
                                origin,
                                lane.b,
                                0,
                                Multiply(l, lane.w),
                                stageC.t
                            ),
                            stageC.t,
                            Remap(
                                origin,
                                lane.b,
                                0,
                                Multiply(r, lane.w),
                                stageC.t
                            ),
                            stageC.t,
                            Remap(
                                origin,
                                lane.b,
                                0,
                                Multiply(r, lane.w),
                                screen.b
                            ),
                            screen.b,
                            Layer.Stage,
                            1
                        )
                    ),
                Draw(
                    SkinSprite.StageLeftBorder,
                    Remap(origin, lane.b, 0, Multiply(-6.5, lane.w), screen.b),
                    screen.b,
                    Remap(origin, lane.b, 0, Multiply(-6.5, lane.w), stageC.t),
                    stageC.t,
                    Remap(origin, lane.b, 0, Multiply(-6, lane.w), stageC.t),
                    stageC.t,
                    Remap(origin, lane.b, 0, Multiply(-6, lane.w), screen.b),
                    screen.b,
                    Layer.Stage,
                    1
                ),
                Draw(
                    SkinSprite.StageRightBorder,
                    Remap(origin, lane.b, 0, Multiply(6, lane.w), screen.b),
                    screen.b,
                    Remap(origin, lane.b, 0, Multiply(6, lane.w), stageC.t),
                    stageC.t,
                    Remap(origin, lane.b, 0, Multiply(6.5, lane.w), stageC.t),
                    stageC.t,
                    Remap(origin, lane.b, 0, Multiply(6.5, lane.w), screen.b),
                    screen.b,
                    Layer.Stage,
                    1
                ),
            ]
        )
    }

    function onEmptyTap() {
        const index = EntityMemory.to<number>(32)

        return [index.set(xToIndex(TouchX)), playEmpty(index)]
    }

    function onEmptyMove() {
        const indexNew = EntityMemory.to<number>(32)
        const indexOld = EntityMemory.to<number>(33)

        return [
            indexNew.set(xToIndex(TouchX)),
            indexOld.set(xToIndex(Subtract(TouchX, TouchDX))),
            And(NotEqual(indexNew, indexOld), playEmpty(indexNew)),
        ]
    }
}

function xToIndex(x: Code<number>) {
    return Floor(Divide(x, lane.w))
}

function playEmpty(index: Code<number>) {
    return [playStageSFX(), playEmptyLaneEffect(index)]
}
