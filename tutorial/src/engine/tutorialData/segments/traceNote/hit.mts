import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
} from '../../particle.mjs'

export const traceNoteHit = {
    enter() {
        if (effect.clips.normalTrace.exists) {
            effect.clips.normalTrace.play(0)
        } else {
            effect.clips.normalPerfect.play(0)
        }

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
