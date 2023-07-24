import { buckets } from '../../../../buckets.mjs'
import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { archetypes } from '../../../index.mjs'
import { windows } from '../../../windows.mjs'
import { SlideEndNote } from './SlideEndNote.mjs'

export class NormalSlideEndNote extends SlideEndNote {
    sprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteEndFallback,
    }

    clips = {
        perfect: effect.clips.normalPerfect,
        great: effect.clips.normalGreat,
        good: effect.clips.normalGood,
    }

    effects = {
        circular: particle.effects.slideNoteCircular,
        linear: particle.effects.slideNoteLinear,
    }

    windows = windows.slideEndNote.normal

    bucket = buckets.normalSlideEndNote

    get slotEffect() {
        return archetypes.SlideSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.SlideSlotGlowEffect
    }
}
