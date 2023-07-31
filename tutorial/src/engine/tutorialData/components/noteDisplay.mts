import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach, perspectiveLayout } from '../utils.mjs'

const noteSprites = {
    normal: {
        left: skin.sprites.normalNoteLeft,
        middle: skin.sprites.normalNoteMiddle,
        right: skin.sprites.normalNoteRight,

        fallback: skin.sprites.normalNoteFallback,
    },
    slide: {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,

        fallback: skin.sprites.slideNoteFallback,
    },
    slideEnd: {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,

        fallback: skin.sprites.slideNoteEndFallback,
    },
    flick: {
        left: skin.sprites.flickNoteLeft,
        middle: skin.sprites.flickNoteMiddle,
        right: skin.sprites.flickNoteRight,

        fallback: skin.sprites.flickNoteFallback,
    },
    flickEnd: {
        left: skin.sprites.flickNoteLeft,
        middle: skin.sprites.flickNoteMiddle,
        right: skin.sprites.flickNoteRight,

        fallback: skin.sprites.flickNoteEndFallback,
    },
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)
let useFallback = tutorialMemory(Boolean)

const ids = tutorialMemory({
    left: SkinSpriteId,
    middle: SkinSpriteId,
    right: SkinSpriteId,
    fallback: SkinSpriteId,
})

export const noteDisplay = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -3
            const r = 3

            const ml = l + 0.5
            const mr = r - 0.5

            const t = 0.5 - note.h * 3
            const b = 0.5 + note.h * 3

            if (useFallback) {
                skin.sprites.draw(ids.fallback, new Rect({ l, r, t, b }), layer.note.body, a)
            } else {
                skin.sprites.draw(ids.left, new Rect({ l, r: ml, t, b }), layer.note.body, a)
                skin.sprites.draw(ids.middle, new Rect({ l: ml, r: mr, t, b }), layer.note.body, a)
                skin.sprites.draw(ids.right, new Rect({ l: mr, r, t, b }), layer.note.body, a)
            }
        } else {
            const y = mode === 2 ? approach(segment.time) : 1

            const l = -2
            const r = 2

            const ml = l + 0.25
            const mr = r - 0.25

            const t = 1 - note.h
            const b = 1 + note.h

            if (useFallback) {
                skin.sprites.draw(
                    ids.fallback,
                    perspectiveLayout({ l, r, t, b }).mul(y),
                    layer.note.body,
                    1,
                )
            } else {
                skin.sprites.draw(
                    ids.left,
                    perspectiveLayout({ l, r: ml, t, b }).mul(y),
                    layer.note.body,
                    1,
                )
                skin.sprites.draw(
                    ids.middle,
                    perspectiveLayout({ l: ml, r: mr, t, b }).mul(y),
                    layer.note.body,
                    1,
                )
                skin.sprites.draw(
                    ids.right,
                    perspectiveLayout({ l: mr, r, t, b }).mul(y),
                    layer.note.body,
                    1,
                )
            }
        }
    },

    showOverlay(type: keyof typeof noteSprites) {
        mode = 1
        this.setType(type)
    },

    showFall(type: keyof typeof noteSprites) {
        mode = 2
        this.setType(type)
    },

    showFrozen(type: keyof typeof noteSprites) {
        mode = 3
        this.setType(type)
    },

    clear() {
        mode = 0
    },

    setType(type: keyof typeof noteSprites) {
        for (const [key, sprites] of Object.entries(noteSprites)) {
            if (key !== type) continue

            if (sprites.left.exists && sprites.middle.exists && sprites.right.exists) {
                useFallback = false
                ids.left = sprites.left.id
                ids.middle = sprites.middle.id
                ids.right = sprites.right.id
            } else {
                useFallback = true
                ids.fallback = sprites.fallback.id
            }
        }
    },
}
