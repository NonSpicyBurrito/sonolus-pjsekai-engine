import { skin } from '../../../../skin.mjs'
import { SlideEndNote } from './SlideEndNote.mjs'

export class NormalSlideEndNote extends SlideEndNote {
    sprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteEndFallback,
    }
}
