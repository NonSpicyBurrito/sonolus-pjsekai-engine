import { effect } from '../../../../../effect.mjs'
import { particle } from '../../../../../particle.mjs'
import { skin } from '../../../../../skin.mjs'
import { AttachedSlideTickNote } from './AttachedSlideTickNote.mjs'

export class NormalAttachedSlideTickNote extends AttachedSlideTickNote {
    sprites = {
        tick: skin.sprites.normalSlideTickNote,
        fallback: skin.sprites.normalSlideTickNoteFallback,
    }

    clip = effect.clips.normalTick

    effect = particle.effects.normalSlideTickNote
}
