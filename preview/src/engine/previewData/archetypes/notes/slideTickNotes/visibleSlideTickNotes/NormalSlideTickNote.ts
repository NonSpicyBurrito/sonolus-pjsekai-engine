import { skin } from '../../../../skin.js'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.js'

export class NormalSlideTickNote extends VisibleSlideTickNote {
    sprites = {
        tick: skin.sprites.normalSlideTickNote,
        fallback: skin.sprites.normalSlideTickNoteFallback,
    }
}
