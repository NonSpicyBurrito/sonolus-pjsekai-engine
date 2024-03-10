import { slotEffect } from '../../components/slotEffect.mjs'
import { slotGlowEffect } from '../../components/slotGlowEffect.mjs'
import { effect } from '../../effect.mjs'
import { particle, playDirectionalNoteEffect } from '../../particle.mjs'

export const traceFlickNoteHit = {
    enter() {
        effect.clips.flickPerfect.play(0)

        playDirectionalNoteEffect(particle.effects.flickNoteDirectional)
    },

    exit() {
        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
