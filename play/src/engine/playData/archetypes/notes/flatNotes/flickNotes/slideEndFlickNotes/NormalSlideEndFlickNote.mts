import { windows } from '../../../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../../../buckets.mjs'
import { effect } from '../../../../../effect.mjs'
import { particle } from '../../../../../particle.mjs'
import { skin } from '../../../../../skin.mjs'
import { archetypes } from '../../../../index.mjs'
import { SlideEndFlickNote } from './SlideEndFlickNote.mjs'

export class NormalSlideEndFlickNote extends SlideEndFlickNote {
    sprites = {
        left: skin.sprites.flickNoteLeft,
        middle: skin.sprites.flickNoteMiddle,
        right: skin.sprites.flickNoteRight,
        fallback: skin.sprites.flickNoteEndFallback,
    }

    clips = {
        perfect: effect.clips.flickPerfect,
        great: effect.clips.flickGreat,
        good: effect.clips.flickGood,
    }

    effects = {
        circular: particle.effects.flickNoteCircular,
        linear: particle.effects.flickNoteLinear,
    }

    laneEffects = {}

    arrowSprites = {
        up: [
            skin.sprites.flickArrowUp1,
            skin.sprites.flickArrowUp2,
            skin.sprites.flickArrowUp3,
            skin.sprites.flickArrowUp4,
            skin.sprites.flickArrowUp5,
            skin.sprites.flickArrowUp6,
        ],
        left: [
            skin.sprites.flickArrowLeft1,
            skin.sprites.flickArrowLeft2,
            skin.sprites.flickArrowLeft3,
            skin.sprites.flickArrowLeft4,
            skin.sprites.flickArrowLeft5,
            skin.sprites.flickArrowLeft6,
        ],
        fallback: skin.sprites.flickArrowFallback,
    }

    directionalEffect = particle.effects.flickNoteDirectional

    windows = windows.slideEndFlickNote.normal

    bucket = buckets.normalSlideEndFlickNote

    get slotEffect() {
        return archetypes.FlickSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.FlickSlotGlowEffect
    }

    playLaneEffects() {
        // removed
    }
}
