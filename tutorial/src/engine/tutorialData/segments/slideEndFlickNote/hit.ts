import { slotEffect } from '../../components/slotEffect.js'
import { slotGlowEffect } from '../../components/slotGlowEffect.js'
import { effect } from '../../effect.js'
import {
    particle,
    playCircularNoteEffect,
    playDirectionalNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.js'

export const slideEndFlickNoteHit = {
    enter() {
        effect.clips.flickPerfect.play(0)

        playLinearNoteEffect(particle.effects.flickNoteLinear)
        playCircularNoteEffect(particle.effects.flickNoteCircular)
        playDirectionalNoteEffect(particle.effects.flickNoteDirectional)
        playLaneEffects()

        slotGlowEffect.show('flick')
        slotEffect.show('flick')
    },

    exit() {
        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
