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
    SScript,
    Subtract,
    Time,
    TouchDX,
    TouchDY,
    TouchEnded,
    TouchT,
    TouchVR,
    TouchX,
    TouchY,
} from 'sonolus.js'
import { scripts } from '.'
import { options } from '../../configuration/options'
import { buckets } from '../buckets'
import {
    arrowRedSprite,
    arrowYellowSprite,
    calculateArrowLayout,
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
    initializeAutoNoteEffect,
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

export function slideEndFlick(isCritical: boolean): SScript {
    const bucket = isCritical
        ? buckets.criticalSlideEndFlickIndex
        : buckets.slideEndFlickIndex
    const window = isCritical
        ? windows.slideEndFlick.critical
        : windows.slideEndFlick.normal
    const noteSprite = isCritical ? noteYellowSprite : noteRedSprite
    const arrowSprite = isCritical ? arrowYellowSprite : arrowRedSprite

    const noteLayout = getNoteLayout(EntityMemory.to(0))
    const arrowLayout = getArrowLayout(EntityMemory.to(8))
    const arrowZ = EntityMemory.to<number>(16)

    const preprocess = [
        preprocessNote(bucket, window.good.late, 0.75, Layer.NoteBody),
        applyMirrorDirections(NoteData.direction),
        calculateNoteLayout(NoteData.center, NoteData.width, noteLayout),
        calculateArrowLayout(
            NoteData.center,
            NoteData.width,
            NoteData.direction,
            arrowLayout,
            arrowZ
        ),
        arrowZ.set(Subtract(Layer.NoteArrow, Divide(NoteData.time, 1000))),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const initialize = [
        initializeNoteSimLine(),
        initializeAutoNoteEffect(
            isCritical
                ? scripts.autoCriticalFlickNoteEffectIndex
                : scripts.autoFlickNoteEffectIndex
        ),
    ]

    const touch = Or(
        options.isAutoplay,
        And(
            Not(bool(noteInputState)),
            checkNoteTimeInEarlyWindow(window.good.early),
            GreaterOr(TouchVR, minFlickVR),
            checkTouchYInHitbox(Subtract(TouchY, TouchDY)),
            checkTouchXInNoteHitbox(Subtract(TouchX, TouchDX)),
            Or(
                checkNoteTimeInEarlyWindow(0),
                TouchEnded,
                Not(checkTouchYInHitbox()),
                Not(checkTouchXInNoteHitbox())
            ),
            onComplete()
        )
    )

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
    }

    function onComplete() {
        return [
            noteInputState.set(InputState.Terminated),

            InputJudgment.set(
                window.judge(Subtract(TouchT, InputOffset), NoteData.time)
            ),
            InputAccuracy.set(Subtract(TouchT, InputOffset, NoteData.time)),
            Or(
                NotEqual(InputJudgment, 1),
                checkDirection(TouchDX, TouchDY, NoteData.direction),
                [InputJudgment.set(2), InputAccuracy.set(window.perfect.late)]
            ),
            InputBucket.set(bucket),
            InputBucketValue.set(Multiply(InputAccuracy, 1000)),

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
            playSlotEffect(isCritical ? 'yellow' : 'red'),
            isCritical
                ? playCriticalFlickJudgmentSFX()
                : playFlickJudgmentSFX(),
        ]
    }
}
