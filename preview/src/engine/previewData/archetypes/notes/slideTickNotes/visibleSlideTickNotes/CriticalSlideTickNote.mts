import { skin } from '../../../../skin.mjs'
import { VisibleSlideTickNote } from './VisibleSlideTickNote.mjs'

export class CriticalSlideTickNote extends VisibleSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }
}
