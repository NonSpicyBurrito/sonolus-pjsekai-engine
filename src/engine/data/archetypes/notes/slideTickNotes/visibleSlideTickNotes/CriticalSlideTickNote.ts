import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.js'

export class CriticalSlideTickNote extends VisibleSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }

    clip = effect.clips.criticalTick

    effect = particle.effects.criticalSlideTickNote
}
