import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.js'

export class NormalSlideTickNote extends VisibleSlideTickNote {
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
