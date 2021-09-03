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
    SScript,
    Subtract,
    Time,
} from 'sonolus.js'
import { scripts } from '.'
import { options } from '../../configuration/options'
import { Layer } from './common/constants'
import { playNoteEffect } from './common/effect'
import {
    checkNoteTimeInEarlyWindow,
    checkTouchXInNoteHitbox,
    initializeAutoNoteEffect,
    noteBottom,
    NoteData,
    noteScale,
    noteSpawnTime,
    noteTop,
    noteZ,
    preprocessNote,
    updateNoteY,
} from './common/note'
import { playCriticalTickJudgmentSFX, playTapJudgmentSFX } from './common/sfx'
import {
    calculateTickLayout,
    getTickLayout,
    tickGreenSprite,
    tickYellowSprite,
} from './common/tick-sprite'
import { checkTouchYInHitbox } from './common/touch'

export function slideTick(isCritical: boolean, isVisible = true): SScript {
    const tickSprite = isCritical ? tickYellowSprite : tickGreenSprite

    const tickLayout = getTickLayout(EntityMemory.to(0))

    const preprocess = [
        preprocessNote(-1, -0.125, 0.75, Layer.NoteTick),
        calculateTickLayout(NoteData.center, NoteData.width, tickLayout),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const initialize =
        isVisible &&
        initializeAutoNoteEffect(
            isCritical
                ? scripts.autoCriticalTickNoteEffectIndex
                : scripts.autoTickNoteEffectIndex
        )

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
            InputJudgment.set(1),
            InputAccuracy.set(0),

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
                    : playTapJudgmentSFX(),
            ],
        ]
    }
}
