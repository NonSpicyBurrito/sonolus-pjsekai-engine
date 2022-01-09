import {
    And,
    EntityMemory,
    GreaterOr,
    InputAccuracy,
    InputJudgment,
    InputOffset,
    Less,
    Or,
    ParticleEffect,
    Script,
    Subtract,
    Time,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { Layer } from './common/constants'
import { playNoteEffect } from './common/effect'
import {
    checkNoteTimeInEarlyWindow,
    checkTouchXInNoteHitbox,
    noteBottom,
    NoteData,
    noteScale,
    noteSpawnTime,
    noteTop,
    noteZ,
    preprocessNote,
    updateNoteY,
} from './common/note'
import { playCriticalTickJudgmentSFX, playTickJudgmentSFX } from './common/sfx'
import {
    calculateTickLayout,
    getTickLayout,
    tickGreenSprite,
    tickYellowSprite,
} from './common/tick-sprite'
import { checkTouchYInHitbox } from './common/touch'

const leniency = 1

export function slideTick(isCritical: boolean, isVisible = true): Script {
    const tickSprite = isCritical ? tickYellowSprite : tickGreenSprite

    const tickLayout = getTickLayout(EntityMemory.to(0))

    const preprocess = [
        preprocessNote(-1, -0.125, leniency, Layer.NoteTick),
        calculateTickLayout(NoteData.center, NoteData.width, tickLayout),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const touch = Or(
        options.isAutoplay,
        And(
            checkNoteTimeInEarlyWindow(0),
            checkTouchYInHitbox(),
            checkTouchXInNoteHitbox(),
            onComplete()
        )
    )

    const updateParallel = Or(
        And(options.isAutoplay, GreaterOr(Time, NoteData.time)),
        GreaterOr(Subtract(Time, NoteData.time, InputOffset), 0),
        isVisible &&
            And(Less(Time, NoteData.time), [
                updateNoteY(),

                tickSprite.draw(
                    noteScale,
                    noteBottom,
                    noteTop,
                    tickLayout,
                    noteZ
                ),
            ])
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
        return [InputJudgment.set(1), InputAccuracy.set(0), playVisualEffects()]
    }

    function playVisualEffects() {
        return (
            isVisible && [
                playNoteEffect(
                    isCritical
                        ? ParticleEffect.NoteCircularAlternativeYellow
                        : ParticleEffect.NoteCircularAlternativeGreen,
                    isCritical
                        ? ParticleEffect.NoteLinearTapYellow
                        : ParticleEffect.NoteLinearTapGreen,
                    0,
                    'tick'
                ),
                isCritical
                    ? playCriticalTickJudgmentSFX()
                    : playTickJudgmentSFX(),
            ]
        )
    }
}
