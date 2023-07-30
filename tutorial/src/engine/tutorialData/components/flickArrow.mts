import { layer } from '../layer.mjs'
import { scaledScreen, segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach } from '../utils.mjs'

const sprites = {
    arrow: skin.sprites.flickArrow,

    fallback: skin.sprites.flickArrowFallback,

    get useFallback() {
        return !this.arrow.exists
    },
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)

export const flickArrow = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            if (sprites.useFallback) {
                const l = -0.75
                const r = 0.75

                const t = 0.5 - 1.5 * scaledScreen.wToH
                const b = 0.5

                sprites.fallback.draw(new Rect({ l, r, b, t }), layer.note.arrow, a)
            } else {
                const l = -1.5
                const r = 1.5

                const t = 0.5 - 3 * scaledScreen.wToH
                const b = 0.5

                sprites.arrow.draw(new Rect({ l, r, b, t }), layer.note.arrow, a)
            }
        } else {
            const y = mode === 2 ? approach(segment.time) : 1
            const s = mode === 2 ? Math.mod(segment.time, 0.5) / 0.5 : 0

            if (sprites.useFallback) {
                const l = -0.5
                const r = 0.5

                const h = 1 * scaledScreen.wToH

                const t = 1 - h
                const b = 1

                sprites.fallback.draw(
                    new Rect({ l, r, b, t }).translate(0, -h * s).mul(y),
                    layer.note.arrow,
                    1 - Math.ease('In', 'Cubic', s),
                )
            } else {
                const l = -1
                const r = 1

                const h = 2 * scaledScreen.wToH

                const t = 1 - h
                const b = 1

                sprites.arrow.draw(
                    new Rect({ l, r, b, t }).translate(0, -h * s).mul(y),
                    layer.note.arrow,
                    1 - Math.ease('In', 'Cubic', s),
                )
            }
        }
    },

    showOverlay() {
        mode = 1
    },

    showFall() {
        mode = 2
    },

    showFrozen() {
        mode = 3
    },

    clear() {
        mode = 0
    },
}
