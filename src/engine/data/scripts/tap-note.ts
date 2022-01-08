import {
    And,
    bool,
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
    Or,
    ParticleEffect,
    Script,
    Subtract,
    Time,
    TouchId,
    TouchST,
    TouchStarted,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { buckets } from '../buckets'
import { Layer, windows } from './common/constants'
import {
    playNoteEffect,
    playNoteLaneEffect,
    playSlotEffect,
} from './common/effect'
import {
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
    noteCyanSprite,
    noteYellowSprite,
} from './common/note-sprite'
import { playCriticalTapJudgmentSFX, playTapJudgmentSFX } from './common/sfx'
import { checkTouchYInHitbox } from './common/touch'
import { disallowEmpties, disallowEnds, disallowStart } from './input'

const leniency = 0.75

export function tapNote(isCritical: boolean): Script {
    const bucket = isCritical
        ? buckets.criticalTapNoteIndex
        : buckets.tapNoteIndex
    const window = isCritical
        ? windows.tapNote.critical
        : windows.tapNote.normal
    const noteSprite = isCritical ? noteYellowSprite : noteCyanSprite

    const noteLayout = getNoteLayout(EntityMemory.to(0))

    const preprocess = [
        preprocessNote(bucket, window.good.late, leniency, Layer.NoteBody),
        calculateNoteLayout(NoteData.center, NoteData.width, noteLayout),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const initialize = initializeNoteSimLine()

    const touch = Or(
        options.isAutoplay,
        And(
            Not(bool(noteInputState)),
            checkNoteTimeInEarlyWindow(window.good.early),
            TouchStarted,
            Not(disallowStart),
            checkTouchYInHitbox(),
            checkTouchXInNoteHitbox(),
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

    function onComplete() {
        return [
            disallowStart.set(true),
            disallowEmpties.add(TouchId),
            disallowEnds.add(TouchId),
            noteInputState.set(InputState.Terminated),

            InputJudgment.set(
                window.judge(Subtract(TouchST, InputOffset), NoteData.time)
            ),
            InputAccuracy.set(Subtract(TouchST, InputOffset, NoteData.time)),
            InputBucket.set(bucket),
            InputBucketValue.set(Multiply(InputAccuracy, 1000)),

            playVisualEffects(),
            isCritical ? playCriticalTapJudgmentSFX() : playTapJudgmentSFX(),
        ]
    }

    function playVisualEffects() {
        return [
            playNoteLaneEffect(),
            playNoteEffect(
                isCritical
                    ? ParticleEffect.NoteCircularTapYellow
                    : ParticleEffect.NoteCircularTapCyan,
                isCritical
                    ? ParticleEffect.NoteLinearTapYellow
                    : ParticleEffect.NoteLinearTapCyan,
                0,
                'normal'
            ),
            playSlotEffect(isCritical ? 4 : 6),
        ]
    }
}
