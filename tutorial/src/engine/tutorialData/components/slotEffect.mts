import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { perspectiveLayout } from '../utils.mjs'

const sprites = {
    normal: skin.sprites.normalSlot,
    slide: skin.sprites.slideSlot,
    flick: skin.sprites.flickSlot,
} as const

let mode = tutorialMemory(Boolean)

let id = tutorialMemory(SkinSpriteId)

export const slotEffect = {
    update() {
        if (!mode) return

        const a = Math.unlerpClamped(0.5, 0, segment.time)

        for (let i = 0; i < 4; i++) {
            skin.sprites.draw(
                id,
                perspectiveLayout({ l: i - 2, r: i - 1, b: 1 + note.h, t: 1 - note.h }),
                layer.slotEffect,
                a,
            )
        }
    },

    show(type: keyof typeof sprites) {
        for (const [key, sprite] of Object.entries(sprites)) {
            if (key !== type) continue
            if (!sprite.exists) continue

            mode = true
            id = sprite.id
        }
    },

    clear() {
        mode = false
    },
}
