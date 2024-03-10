import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import {
    particle,
    playFlatNoteEffect,
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
        playLaneEffects()

        slotGlowEffect.show('slide')
        slotEffect.show('slide')
    },

    exit() {
        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
