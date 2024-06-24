import { windows } from '../../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../../buckets.mjs'
import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { archetypes } from '../../../index.mjs'
import { TapNote } from './TapNote.mjs'

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

    laneEffects = {
        lane: particle.effects.lane,
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
