import { skin } from '../../../../skin.mjs'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.mjs'

export class NormalSlideTickNote extends VisibleSlideTickNote {
    sprites = {
        tick: skin.sprites.normalSlideTickNote,
        fallback: skin.sprites.normalSlideTickNoteFallback,
    }
}
