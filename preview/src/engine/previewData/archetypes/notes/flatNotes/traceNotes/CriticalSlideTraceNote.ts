import { skin } from '../../../../skin.js'
import { TraceNote } from './TraceNote.js'

export class CriticalSlideTraceNote extends TraceNote {
    sprites = {
        left: skin.sprites.criticalTraceNoteLeft,
        middle: skin.sprites.criticalTraceNoteMiddle,
        right: skin.sprites.criticalTraceNoteRight,
        diamond: skin.sprites.criticalTraceNoteDiamond,
        fallback: skin.sprites.criticalTraceNoteFallback,
    }
}
