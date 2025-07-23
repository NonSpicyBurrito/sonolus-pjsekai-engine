import { slotEffect } from '../../components/slotEffect.js'
import { slotGlowEffect } from '../../components/slotGlowEffect.js'
import { effect } from '../../effect.js'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.js'

export const slideEndNoteHit = {
    enter() {
        effect.clips.normalPerfect.play(0)

        playLinearNoteEffect(particle.effects.slideNoteLinear)
        playCircularNoteEffect(particle.effects.slideNoteCircular)
        playLaneEffects()

        slotGlowEffect.show('slide')
        slotEffect.show('slide')
    },

    exit() {
        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
