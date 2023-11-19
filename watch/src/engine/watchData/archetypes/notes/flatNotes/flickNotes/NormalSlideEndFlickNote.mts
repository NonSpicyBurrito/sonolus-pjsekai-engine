import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { archetypes } from '../../../index.mjs'
import { FlickNote } from './FlickNote.mjs'

export class NormalSlideEndFlickNote extends FlickNote {
    sprites = {
        left: skin.sprites.flickNoteLeft,
        middle: skin.sprites.flickNoteMiddle,
        right: skin.sprites.flickNoteRight,
        fallback: skin.sprites.flickNoteEndFallback,
    }

    clips = {
        perfect: effect.clips.flickPerfect,
    }

    effects = {
        circular: particle.effects.flickNoteCircular,
        linear: particle.effects.flickNoteLinear,
    }

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

    get slotEffect() {
        return archetypes.FlickSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.FlickSlotGlowEffect
    }
}
