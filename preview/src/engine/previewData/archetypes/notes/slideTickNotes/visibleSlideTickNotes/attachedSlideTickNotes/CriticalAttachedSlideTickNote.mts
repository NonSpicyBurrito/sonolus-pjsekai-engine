import { skin } from '../../../../../skin.mjs'
import { AttachedSlideTickNote } from './AttachedSlideTickNote.mjs'

export class CriticalAttachedSlideTickNote extends AttachedSlideTickNote {
    sprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }
}
