import { effect } from '../../../../../effect.mjs'
import { particle } from '../../../../../particle.mjs'
import { skin } from '../../../../../skin.mjs'
import { AttachedSlideTickNote } from './AttachedSlideTickNote.mjs'

export class CriticalAttachedSlideTickNote extends AttachedSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }

    clip = effect.clips.criticalTick

    effect = particle.effects.criticalSlideTickNote
}
