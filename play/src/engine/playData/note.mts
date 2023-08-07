import { note as _note } from '../../../../shared/src/engine/data/note.mjs'
import { options } from '../configuration/options.mjs'

export const note = {
    ..._note,

    get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    },
}
