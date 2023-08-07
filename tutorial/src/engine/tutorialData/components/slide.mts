import { note } from '../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    left: skin.sprites.slideNoteLeft,
    middle: skin.sprites.slideNoteMiddle,
    right: skin.sprites.slideNoteRight,

    fallback: skin.sprites.slideNoteFallback,

    get useFallback() {
        return !this.left.exists || !this.middle.exists || !this.right.exists
    },
}

let mode = tutorialMemory(Boolean)

export const slide = {
    update() {
        if (!mode) return

        const l = -2
        const r = 2

        const ml = l + 0.25
        const mr = r - 0.25

        const t = 1 - note.h
        const b = 1 + note.h

        if (sprites.useFallback) {
            sprites.fallback.draw(perspectiveLayout({ l, r, t, b }), layer.note.slide, 1)
        } else {
            sprites.left.draw(perspectiveLayout({ l, r: ml, t, b }), layer.note.slide, 1)
            sprites.middle.draw(perspectiveLayout({ l: ml, r: mr, t, b }), layer.note.slide, 1)
            sprites.right.draw(perspectiveLayout({ l: mr, r, t, b }), layer.note.slide, 1)
        }
    },

    show() {
        mode = true
    },

    clear() {
        mode = false
    },
}
