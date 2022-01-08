import {
    And,
    bool,
    Divide,
    EntityMemory,
    Equal,
    Greater,
    GreaterOr,
    InputAccuracy,
    InputBucket,
    InputBucketValue,
    InputJudgment,
    InputOffset,
    Multiply,
    Not,
    NotEqual,
    Or,
    ParticleEffect,
    Script,
    Subtract,
    Time,
    TouchDX,
    TouchDY,
    TouchId,
    TouchStarted,
    TouchVR,
    TouchX,
    TouchY,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { buckets } from '../buckets'
import {
    arrowRedSprite,
    arrowYellowSprite,
    getArrowLayout,
} from './common/arrow-sprite'
import { Layer, minFlickVR, windows } from './common/constants'
import {
    playNoteEffect,
    playNoteLaneEffect,
    playSlotEffect,
} from './common/effect'
import {
    applyMirrorDirections,
    checkNoteTimeInEarlyWindow,
    checkTouchXInNoteHitbox,
    initializeNoteSimLine,
    InputState,
    noteBottom,
    NoteData,
    noteInputState,
    noteScale,
    noteSpawnTime,
    noteTop,
    noteZ,
    preprocessNote,
    updateNoteY,
} from './common/note'
import {
    calculateNoteLayout,
    getNoteLayout,
    noteRedSprite,
    noteYellowSprite,
} from './common/note-sprite'
import {
    playCriticalFlickJudgmentSFX,
    playFlickJudgmentSFX,
} from './common/sfx'
import { checkDirection, checkTouchYInHitbox } from './common/touch'
import { disallowEmpties, disallowEnds, disallowStart } from './input'

const leniency = 1

export function flickNote(isCritical: boolean): Script {
    const bucket = isCritical
        ? buckets.criticalFlickNoteIndex
        : buckets.flickNoteIndex
    const window = isCritical
        ? windows.flickNote.critical
        : windows.flickNote.normal
    const noteSprite = isCritical ? noteYellowSprite : noteRedSprite
    const arrowSprite = isCritical ? arrowYellowSprite : arrowRedSprite

    const noteLayout = getNoteLayout(EntityMemory.to(0))
    const arrowLayout = getArrowLayout(EntityMemory.to(8))
    const arrowZ = EntityMemory.to<number>(17)

    const preprocess = [
        preprocessNote(bucket, window.good.late, leniency, Layer.NoteBody),
        applyMirrorDirections(NoteData.direction),
        calculateNoteLayout(NoteData.center, NoteData.width, noteLayout),
        arrowSprite.calculateLayout(
            NoteData.center,
            NoteData.width,
            NoteData.direction,
            arrowLayout
        ),
        arrowZ.set(Subtract(Layer.NoteArrow, Divide(NoteData.time, 1000))),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const initialize = initializeNoteSimLine()

    const touch = Or(options.isAutoplay, [
        And(
            Not(bool(noteInputState)),
            checkNoteTimeInEarlyWindow(window.good.early),
            TouchStarted,
            Not(disallowStart),
            checkTouchYInHitbox(),
            checkTouchXInNoteHitbox(),
            onActivate()
        ),
        And(
            Equal(noteInputState, InputState.Activated),
            GreaterOr(TouchVR, minFlickVR),
            checkTouchYInHitbox(Subtract(TouchY, TouchDY)),
            checkTouchXInNoteHitbox(Subtract(TouchX, TouchDX)),
            onComplete()
        ),
    ])

    const updateParallel = Or(
        And(options.isAutoplay, GreaterOr(Time, NoteData.time)),
        Equal(noteInputState, InputState.Terminated),
        Greater(Subtract(Time, NoteData.time, InputOffset), window.good.late),
        [
            updateNoteY(),

            noteSprite.draw(noteScale, noteBottom, noteTop, noteLayout, noteZ),
            arrowSprite.draw(noteScale, arrowLayout, arrowZ),
        ]
    )

    const terminate = And(options.isAutoplay, playVisualEffects())

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
        initialize: {
            code: initialize,
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

    function onActivate() {
        return [
            disallowStart.set(true),
            disallowEmpties.add(TouchId),
            disallowEnds.add(TouchId),
            noteInputState.set(InputState.Activated),
        ]
    }

    function onComplete() {
        return [
            noteInputState.set(InputState.Terminated),

            InputJudgment.set(
                window.judge(Subtract(Time, InputOffset), NoteData.time)
            ),
            InputAccuracy.set(Subtract(Time, InputOffset, NoteData.time)),
            Or(
                NotEqual(InputJudgment, 1),
                checkDirection(TouchDX, TouchDY, NoteData.direction),
                [InputJudgment.set(2), InputAccuracy.set(window.perfect.late)]
            ),
            InputBucket.set(bucket),
            InputBucketValue.set(Multiply(InputAccuracy, 1000)),

            playVisualEffects(),
            isCritical
                ? playCriticalFlickJudgmentSFX()
                : playFlickJudgmentSFX(),
        ]
    }

    function playVisualEffects() {
        return [
            playNoteLaneEffect(),
            playNoteEffect(
                isCritical
                    ? ParticleEffect.NoteCircularTapYellow
                    : ParticleEffect.NoteCircularTapRed,
                isCritical
                    ? ParticleEffect.NoteLinearTapYellow
                    : ParticleEffect.NoteLinearTapRed,
                isCritical
                    ? ParticleEffect.NoteLinearAlternativeYellow
                    : ParticleEffect.NoteLinearAlternativeRed,
                'flick'
            ),
            playSlotEffect(isCritical ? 4 : 1),
        ]
    }
}
