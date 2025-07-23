import { slotEffect } from '../../components/slotEffect.js'
import { slotGlowEffect } from '../../components/slotGlowEffect.js'
import { effect } from '../../effect.js'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.js'

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
