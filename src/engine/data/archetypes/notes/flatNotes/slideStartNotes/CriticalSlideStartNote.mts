import { buckets } from '../../../../buckets.mjs'
import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { archetypes } from '../../../index.mjs'
import { windows } from '../../../windows.mjs'
import { SlideStartNote } from './SlideStartNote.mjs'

export class CriticalSlideStartNote extends SlideStartNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }

    clips = {
        perfect: effect.clips.criticalTap,
    }

    effects = {
        circular: particle.effects.criticalNoteCircular,
        linear: particle.effects.criticalNoteLinear,
    }

    windows = windows.slideStartNote.critical

    bucket = buckets.criticalSlideStartNote

    get slotEffect() {
        return archetypes.CriticalSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.CriticalSlotGlowEffect
    }
}
