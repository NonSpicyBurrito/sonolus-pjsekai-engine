import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.mjs'

export class CriticalSlideTickNote extends VisibleSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }

    clip = effect.clips.criticalTick

    effect = particle.effects.criticalSlideTickNote
}
