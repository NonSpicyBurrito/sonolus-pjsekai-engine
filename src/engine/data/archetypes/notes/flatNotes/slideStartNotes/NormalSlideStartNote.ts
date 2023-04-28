import { buckets } from '../../../../buckets.js'
import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { archetypes } from '../../../index.js'
import { windows } from '../../../windows.js'
import { SlideStartNote } from './SlideStartNote.js'

export class NormalSlideStartNote extends SlideStartNote {
    sprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteFallback,
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

    windows = windows.slideStartNote.normal

    bucket = buckets.normalSlideStartNote

    get slotEffect() {
        return archetypes.SlideSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.SlideSlotGlowEffect
    }
}
