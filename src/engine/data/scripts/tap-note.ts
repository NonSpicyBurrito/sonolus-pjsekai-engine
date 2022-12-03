import { ParticleEffect } from 'sonolus-core'
import {
    Add,
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
import { playNoteEffect, playNoteLaneEffect, playSlotEffect } from './common/effect'
import {
    checkNoteTimeInEarlyWindow,
    checkTouchXInNoteHitbox,
    initializeNoteSimLine,
    InputState,
    isNotHidden,
    noteBottom,
    NoteData,
    noteInputState,
    noteScale,
    noteSpawnTime,
    noteTop,
    noteVisibleTime,
    noteZ,
    preprocessNote,
    scheduleNoteAutoSFX,
    updateNoteY,
} from './common/note'
import {
    calculateNoteLayout,
    getNoteLayout,
    noteCyanSprite,
    noteYellowSprite,
} from './common/note-sprite'
import { getTapClip, playJudgmentSFX } from './common/sfx'
import { checkTouchYInHitbox } from './common/touch'
import { disallowEmpties, disallowEnds, disallowStart } from './input'

const leniency = 0.75

export function tapNote(isCritical: boolean): Script {
    const bucket = isCritical ? buckets.criticalTapNoteIndex : buckets.tapNoteIndex
    const window = isCritical ? windows.tapNote.critical : windows.tapNote.normal
    const noteSprite = isCritical ? noteYellowSprite : noteCyanSprite
    const circularEffect = isCritical
        ? ParticleEffect.NoteCircularTapYellow
        : ParticleEffect.NoteCircularTapCyan
    const linearEffect = isCritical
        ? ParticleEffect.NoteLinearTapYellow
        : ParticleEffect.NoteLinearTapCyan
    const slotColor = isCritical ? 4 : 6

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

    const updateParallel = [
        scheduleNoteAutoSFX(getTapClip(isCritical)),

        Or(
            And(options.isAutoplay, GreaterOr(Time, NoteData.time)),
            Equal(noteInputState, InputState.Terminated),
            Greater(Subtract(Time, NoteData.time, InputOffset), window.good.late),
            And(isNotHidden(), GreaterOr(Time, noteVisibleTime), [
                updateNoteY(),

                noteSprite.draw(noteScale, noteBottom, noteTop, noteLayout, noteZ),
            ])
        ),
    ]

    const terminate = And(options.isAutoplay, playVisualEffects())

    return {
        preprocess,
        spawnOrder,
        shouldSpawn,
        initialize,
        touch,
        updateParallel,
        terminate,
    }

    function onComplete() {
        return [
            disallowStart.set(true),
            disallowEmpties.add(TouchId),
            disallowEnds.add(TouchId, Add(NoteData.time, window.good.late)),
            noteInputState.set(InputState.Terminated),

            InputJudgment.set(window.judge(Subtract(TouchST, InputOffset), NoteData.time)),
            InputAccuracy.set(Subtract(TouchST, InputOffset, NoteData.time)),
            InputBucket.set(bucket),
            InputBucketValue.set(Multiply(InputAccuracy, 1000)),

            playVisualEffects(),
            playJudgmentSFX(isCritical, getTapClip),
        ]
    }

    function playVisualEffects() {
        return [
            playNoteLaneEffect(),
            playNoteEffect(circularEffect, linearEffect, 0, 'normal'),
            playSlotEffect(slotColor),
        ]
    }
}
