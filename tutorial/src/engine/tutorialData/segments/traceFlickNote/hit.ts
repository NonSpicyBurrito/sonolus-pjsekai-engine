import { slotEffect } from '../../components/slotEffect.js'
import { slotGlowEffect } from '../../components/slotGlowEffect.js'
import { effect } from '../../effect.js'
import { particle, playDirectionalNoteEffect } from '../../particle.js'

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
