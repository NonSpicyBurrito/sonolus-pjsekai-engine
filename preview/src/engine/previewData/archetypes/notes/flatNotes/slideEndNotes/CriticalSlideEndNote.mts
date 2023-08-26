import { skin } from '../../../../skin.mjs'
import { SlideEndNote } from './SlideEndNote.mjs'

export class CriticalSlideEndNote extends SlideEndNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteEndFallback,
    }
}
