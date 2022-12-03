import { ParticleEffect } from 'sonolus-core'
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
    LessOr,
    Multiply,
    Not,
    Or,
    Script,
    Subtract,
    Time,
    TouchEnded,
    TouchId,
    TouchT,
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
    noteGreenSprite,
    noteYellowSprite,
} from './common/note-sprite'
import { getTapClip, playJudgmentSFX } from './common/sfx'
import { checkTouchYInHitbox } from './common/touch'
import { disallowEnds } from './input'

const leniency = 1

export function slideEnd(isCritical: boolean): Script {
    const bucket = isCritical ? buckets.criticalSlideEndIndex : buckets.slideEndIndex
    const window = isCritical ? windows.slideEnd.critical : windows.slideEnd.normal
    const noteSprite = isCritical ? noteYellowSprite : noteGreenSprite
    const circularEffect = isCritical
        ? ParticleEffect.NoteCircularTapYellow
        : ParticleEffect.NoteCircularTapGreen
    const linearEffect = isCritical
        ? ParticleEffect.NoteLinearTapYellow
        : ParticleEffect.NoteLinearTapGreen
    const slotColor = isCritical ? 4 : 2

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
            TouchEnded,
            Or(
                Not(disallowEnds.contains(TouchId)),
                LessOr(disallowEnds.get(TouchId), Subtract(NoteData.time, window.good.early))
            ),
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
            And(GreaterOr(Time, noteVisibleTime), isNotHidden(), [
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
            noteInputState.set(InputState.Terminated),

            InputJudgment.set(window.judge(Subtract(TouchT, InputOffset), NoteData.time)),
            InputAccuracy.set(Subtract(TouchT, InputOffset, NoteData.time)),
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
