import { skin } from '../../../../skin.js'
import { TapNote } from './TapNote.js'

export class NormalTapNote extends TapNote {
    sprites = {
        left: skin.sprites.normalNoteLeft,
        middle: skin.sprites.normalNoteMiddle,
        right: skin.sprites.normalNoteRight,
        fallback: skin.sprites.normalNoteFallback,
    }
}
