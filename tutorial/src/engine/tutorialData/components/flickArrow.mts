import { approach } from '../../../../../shared/src/engine/data/note.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    arrow: skin.sprites.flickArrow,

    fallback: skin.sprites.flickArrowFallback,

    get useFallback() {
        return !this.arrow.exists
    },
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

export const flickArrow = {
    update() {
        if (!mode) return

        if (mode === Mode.Overlay) {
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
            const y = mode === Mode.Fall ? approach(0, 2, segment.time) : 1
            const s = mode === Mode.Fall ? Math.mod(segment.time, 0.5) / 0.5 : 0

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
        mode = Mode.Overlay
    },

    showFall() {
        mode = Mode.Fall
    },

    showFrozen() {
        mode = Mode.Frozen
    },

    clear() {
        mode = Mode.None
    },
}
