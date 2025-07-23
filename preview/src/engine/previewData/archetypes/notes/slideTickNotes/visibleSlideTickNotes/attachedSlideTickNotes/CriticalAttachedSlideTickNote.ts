import { skin } from '../../../../../skin.js'
import { AttachedSlideTickNote } from './AttachedSlideTickNote.js'

export class CriticalAttachedSlideTickNote extends AttachedSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }
}
