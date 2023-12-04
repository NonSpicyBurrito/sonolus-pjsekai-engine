import { effect } from '../../../../../effect.mjs'
import { particle } from '../../../../../particle.mjs'
import { skin } from '../../../../../skin.mjs'
import { AttachedSlideTickNote } from './AttachedSlideTickNote.mjs'

export class NormalAttachedSlideTickNote extends AttachedSlideTickNote {
    sprites = {
        tick: skin.sprites.normalSlideTickNote,
        fallback: skin.sprites.normalSlideTickNoteFallback,
    }

    clips = {
        tick: effect.clips.normalTick,
        fallback: effect.clips.normalPerfect,
    }

    effect = particle.effects.normalSlideTickNote
}
