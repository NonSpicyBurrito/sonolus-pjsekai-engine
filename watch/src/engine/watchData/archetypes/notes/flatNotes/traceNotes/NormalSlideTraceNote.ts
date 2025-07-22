import { windows } from '../../../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../../../buckets.js'
import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { archetypes } from '../../../index.js'
import { TraceNote } from './TraceNote.js'

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
        circular: particle.effects.normalTraceNoteCircular,
        circularFallback: particle.effects.normalSlideTickNote,
        linear: particle.effects.normalTraceNoteLinear,
        linearFallback: particle.effects.slideNoteLinear,
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
