import { buckets } from '../../../../buckets.mjs'
import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { windows } from '../../../../windows.mjs'
import { archetypes } from '../../../index.mjs'
import { TraceNote } from './TraceNote.mjs'

export class NormalSlideTraceNote extends TraceNote {
    sprites = {
        left: skin.sprites.normalTraceNoteLeft,
        middle: skin.sprites.normalTraceNoteMiddle,
        right: skin.sprites.normalTraceNoteRight,
        diamond: skin.sprites.normalTraceNoteDiamond,
        fallback: skin.sprites.normalTraceNoteFallback,
    }

    clips = {
        perfect: effect.clips.normalTrace,
        fallback: effect.clips.normalPerfect,
    }

    effects = {
        circular: particle.effects.slideNoteCircular,
        linear: particle.effects.slideNoteLinear,
    }

    windows = windows.slideTraceNote.normal

    bucket = buckets.normalSlideTraceNote

    get slotEffect() {
        return archetypes.SlideSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.SlideSlotGlowEffect
    }
}
