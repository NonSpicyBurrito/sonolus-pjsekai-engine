import { effect } from '../../../../../effect.js'
import { particle } from '../../../../../particle.js'
import { skin } from '../../../../../skin.js'
import { AttachedSlideTickNote } from './AttachedSlideTickNote.js'

export class CriticalAttachedSlideTickNote extends AttachedSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }

    clips = {
        tick: effect.clips.criticalTick,
        fallback: effect.clips.normalPerfect,
    }

    effect = particle.effects.criticalSlideTickNote
}
