import { slotEffect } from '../../components/slotEffect.js'
import { slotGlowEffect } from '../../components/slotGlowEffect.js'
import { effect } from '../../effect.js'
import { particle, playFlatNoteEffect, playLinearNoteEffect } from '../../particle.js'

export const traceNoteHit = {
    enter() {
        if (effect.clips.normalTrace.exists) {
            effect.clips.normalTrace.play(0)
        } else {
            effect.clips.normalPerfect.play(0)
        }

        if (particle.effects.normalTraceNoteLinear.exists) {
            playLinearNoteEffect(particle.effects.normalTraceNoteLinear)
        } else {
            playLinearNoteEffect(particle.effects.slideNoteLinear)
        }
        if (particle.effects.normalTraceNoteCircular.exists) {
            playFlatNoteEffect(particle.effects.normalTraceNoteCircular)
        } else {
            playFlatNoteEffect(particle.effects.normalSlideTickNote)
        }
    },

    exit() {
        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
