import { skin } from './skin.mjs'

export const noteSprites = {
    normal: {
        left: skin.sprites.normalNoteLeft,
        middle: skin.sprites.normalNoteMiddle,
        right: skin.sprites.normalNoteRight,

        fallback: skin.sprites.normalNoteFallback,
    },
    slide: {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,

        fallback: skin.sprites.slideNoteFallback,
    },
    flick: {
        left: skin.sprites.flickNoteLeft,
        middle: skin.sprites.flickNoteMiddle,
        right: skin.sprites.flickNoteRight,

        fallback: skin.sprites.flickNoteFallback,
    },
}
