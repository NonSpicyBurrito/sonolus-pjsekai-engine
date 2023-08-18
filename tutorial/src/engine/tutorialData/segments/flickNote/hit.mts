import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import {
    particle,
    playCircularNoteEffect,
    playDirectionalNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.mjs'

export const flickNoteHit = {
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
