import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.mjs'

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
