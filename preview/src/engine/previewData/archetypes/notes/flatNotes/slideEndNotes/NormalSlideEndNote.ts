import { skin } from '../../../../skin.js'
import { SlideEndNote } from './SlideEndNote.js'

export class NormalSlideEndNote extends SlideEndNote {
    sprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteEndFallback,
    }
}
