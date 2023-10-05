import { approach, note } from '../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    normal: skin.sprites.normalTraceNoteDiamond,
    flick: skin.sprites.traceFlickNoteDiamond,
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

let id = tutorialMemory(DataType<0 | SkinSpriteId>)

export const traceDiamond = {
    update() {
        if (!mode) return
        if (!id) return

        if (mode === Mode.Overlay) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = (-note.h * 3) / scaledScreen.wToH
            const r = (note.h * 3) / scaledScreen.wToH

            const t = 0.5 - note.h * 3
            const b = 0.5 + note.h * 3

            skin.sprites.draw(id, new Rect({ l, r, t, b }), layer.note.tick, a)
        } else {
            const y = mode === Mode.Fall ? approach(0, 2, segment.time) : 1

            const l = -note.h / scaledScreen.wToH
            const r = note.h / scaledScreen.wToH

            const t = 1 - note.h
            const b = 1 + note.h

            skin.sprites.draw(id, perspectiveLayout({ l, r, t, b }).mul(y), layer.note.tick, 1)
        }
    },

    showOverlay(type: keyof typeof sprites) {
        mode = Mode.Overlay
        this.setType(type)
    },

    showFall(type: keyof typeof sprites) {
        mode = Mode.Fall
        this.setType(type)
    },

    showFrozen(type: keyof typeof sprites) {
        mode = Mode.Frozen
        this.setType(type)
    },

    clear() {
        mode = Mode.None
    },

    setType(type: keyof typeof sprites) {
        for (const [key, sprite] of Object.entries(sprites)) {
            if (key !== type) continue

            if (sprite.exists) {
                id = sprite.id
            } else {
                id = 0
            }
        }
    },
}
