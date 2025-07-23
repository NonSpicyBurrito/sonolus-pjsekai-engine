import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.js'

export class CriticalSlideTickNote extends VisibleSlideTickNote {
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
