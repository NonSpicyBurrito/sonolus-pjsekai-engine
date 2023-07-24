import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { playCircularNoteEffect, playLaneEffects, playLinearNoteEffect } from '../../utils.mjs'

export const tapNoteHit = {
    enter() {
        effect.clips.normalPerfect.play(0)

        playLinearNoteEffect(particle.effects.normalNoteLinear)
        playCircularNoteEffect(particle.effects.normalNoteCircular)
        playLaneEffects()

        slotGlowEffect.show('normal')
        slotEffect.show('normal')
    },

    exit() {
        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
