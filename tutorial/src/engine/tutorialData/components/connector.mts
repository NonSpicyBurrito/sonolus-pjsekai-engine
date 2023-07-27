import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach, perspectiveLayout } from '../utils.mjs'

const sprites = {
    normal: skin.sprites.normalSlideConnectorNormal,
    active: skin.sprites.normalSlideConnectorActive,

    fallback: skin.sprites.normalSlideConnectorFallback,

    get useFallback() {
        return !this.normal.exists || !this.active.exists
    },
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3 | 4 | 5 | 6>)

export const connector = {
    update() {
        if (!mode) return

        if (mode === 1 || mode === 2) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -3
            const r = 3

            const t = 0.5 - (mode === 1 ? note.h * 9 : 0)
            const b = 0.5 + (mode === 2 ? note.h * 9 : 0)

            const layout = new Rect({ l, r, t, b })

            if (sprites.useFallback) {
                sprites.fallback.draw(layout, layer.note.connector, a)
            } else if (mode === 1) {
                sprites.normal.draw(layout, layer.note.connector, a)
            } else {
                sprites.active.draw(layout, layer.note.connector, a)
            }
        } else if (mode === 3 || mode === 5) {
            const t = approach(0)
            const b = approach(mode === 3 ? segment.time : 2)

            const layout = perspectiveLayout({ l: -2, r: 2, b, t })

            if (sprites.useFallback) {
                sprites.fallback.draw(layout, layer.note.connector, 1)
            } else {
                sprites.normal.draw(layout, layer.note.connector, 1)
            }
        } else {
            const t = approach(mode === 4 ? segment.time : 0)
            const b = approach(2)

            const layout = perspectiveLayout({ l: -2, r: 2, b, t })

            if (sprites.useFallback) {
                sprites.fallback.draw(layout, layer.note.connector, 1)
            } else {
                const a = (Math.sin(segment.time * 2 * Math.PI) + 1) / 2

                sprites.active.draw(layout, layer.note.connector, a)
                sprites.normal.draw(layout, layer.note.connector, 1 - a)
            }
        }
    },

    showOverlayIn() {
        mode = 1
    },

    showOverlayOut() {
        mode = 2
    },

    showFallIn() {
        mode = 3
    },

    showFallOut() {
        mode = 4
    },

    showFrozen() {
        mode = 5
    },

    showActive() {
        mode = 6
    },

    clear() {
        mode = 0
    },
}
