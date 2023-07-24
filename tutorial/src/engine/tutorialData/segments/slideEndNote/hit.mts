import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { playCircularNoteEffect, playLaneEffects, playLinearNoteEffect } from '../../utils.mjs'

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
