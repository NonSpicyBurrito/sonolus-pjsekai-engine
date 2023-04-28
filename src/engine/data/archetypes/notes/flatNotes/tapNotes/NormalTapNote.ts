import { buckets } from '../../../../buckets.js'
import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { archetypes } from '../../../index.js'
import { windows } from '../../../windows.js'
import { TapNote } from './TapNote.js'

export class NormalTapNote extends TapNote {
    sprites = {
        left: skin.sprites.normalNoteLeft,
        middle: skin.sprites.normalNoteMiddle,
        right: skin.sprites.normalNoteRight,
        fallback: skin.sprites.normalNoteFallback,
    }

    clips = {
        perfect: effect.clips.normalPerfect,
        great: effect.clips.normalGreat,
        good: effect.clips.normalGood,
    }

    effects = {
        circular: particle.effects.normalNoteCircular,
        linear: particle.effects.normalNoteLinear,
    }

    windows = windows.tapNote.normal

    bucket = buckets.normalTapNote

    get slotEffect() {
        return archetypes.NormalSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.NormalSlotGlowEffect
    }
}
