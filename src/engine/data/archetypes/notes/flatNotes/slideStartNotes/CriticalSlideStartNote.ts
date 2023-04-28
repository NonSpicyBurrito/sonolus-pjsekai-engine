import { buckets } from '../../../../buckets.js'
import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { archetypes } from '../../../index.js'
import { windows } from '../../../windows.js'
import { SlideStartNote } from './SlideStartNote.js'

export class CriticalSlideStartNote extends SlideStartNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }

    clips = effect.clips.criticalTap

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
