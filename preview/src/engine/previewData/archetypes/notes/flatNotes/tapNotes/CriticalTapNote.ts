import { skin } from '../../../../skin.js'
import { TapNote } from './TapNote.js'

export class CriticalTapNote extends TapNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }
}
