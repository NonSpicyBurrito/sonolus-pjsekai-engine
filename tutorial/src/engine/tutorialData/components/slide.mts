import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { noteSprites } from '../noteSprites.mjs'
import { perspectiveLayout } from '../utils.mjs'

const sprites = {
    left: noteSprites.slide.left,
    middle: noteSprites.slide.middle,
    right: noteSprites.slide.right,

    fallback: noteSprites.slide.fallback,

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