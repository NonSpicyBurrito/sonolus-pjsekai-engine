import { approach, note } from '../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    normal: skin.sprites.normalSlideConnectorNormal,
    active: skin.sprites.normalSlideConnectorActive,

    fallback: skin.sprites.normalSlideConnectorFallback,

    get useFallback() {
        return !this.normal.exists || !this.active.exists
    },
}

enum Mode {
    None,
    OverlayIn,
    OverlayOut,
    FallIn,
    FallOut,
    Frozen,
    Active,
}

let mode = tutorialMemory(DataType<Mode>)

export const connector = {
    update() {
        if (!mode) return

        if (mode === Mode.OverlayIn || mode === Mode.OverlayOut) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -3
            const r = 3

            const t = 0.5 - (mode === Mode.OverlayIn ? note.h * 9 : 0)
            const b = 0.5 + (mode === Mode.OverlayOut ? note.h * 9 : 0)

            const layout = new Rect({ l, r, t, b })

            if (sprites.useFallback) {
                sprites.fallback.draw(layout, layer.note.connector, a)
            } else if (mode === Mode.OverlayIn) {
                sprites.normal.draw(layout, layer.note.connector, a)
            } else {
                sprites.active.draw(layout, layer.note.connector, a)
            }
        } else if (mode === Mode.FallIn || mode === Mode.Frozen) {
            const t = approach(0, 2, 0)
            const b = approach(0, 2, mode === Mode.FallIn ? segment.time : 2)

            const layout = perspectiveLayout({ l: -2, r: 2, b, t })

            if (sprites.useFallback) {
                sprites.fallback.draw(layout, layer.note.connector, 1)
            } else {
                sprites.normal.draw(layout, layer.note.connector, 1)
            }
        } else {
            const t = approach(0, 2, mode === Mode.FallOut ? segment.time : 0)
            const b = approach(0, 2, 2)

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
        mode = Mode.OverlayIn
    },

    showOverlayOut() {
        mode = Mode.OverlayOut
    },

    showFallIn() {
        mode = Mode.FallIn
    },

    showFallOut() {
        mode = Mode.FallOut
    },

    showFrozen() {
        mode = Mode.Frozen
    },

    showActive() {
        mode = Mode.Active
    },

    clear() {
        mode = Mode.None
    },
}
