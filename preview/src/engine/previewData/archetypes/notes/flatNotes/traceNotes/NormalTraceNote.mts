import { skin } from '../../../../skin.mjs'
import { TraceNote } from './TraceNote.mjs'

export class NormalTraceNote extends TraceNote {
    sprites = {
        left: skin.sprites.normalTraceNoteLeft,
        middle: skin.sprites.normalTraceNoteMiddle,
        right: skin.sprites.normalTraceNoteRight,
        diamond: skin.sprites.normalTraceNoteDiamond,
        fallback: skin.sprites.normalTraceNoteFallback,
    }
}
