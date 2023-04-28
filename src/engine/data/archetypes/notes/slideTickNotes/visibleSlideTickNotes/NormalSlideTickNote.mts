import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.mjs'

export class NormalSlideTickNote extends VisibleSlideTickNote {
    sprites = {
        tick: skin.sprites.normalSlideTickNote,
        fallback: skin.sprites.normalSlideTickNoteFallback,
    }

    clip = effect.clips.normalTick

    effect = particle.effects.normalSlideTickNote
}
