import { skin } from '../../../../skin.mjs'
import { TapNote } from './TapNote.mjs'

export class CriticalTapNote extends TapNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }
}
