import { layer } from '../layer.mjs'
import { scaledScreen, segment } from '../shared.mjs'
import { skin } from '../skin.mjs'

const sprites = {
    normal: skin.sprites.normalSlotGlow,
    slide: skin.sprites.slideSlotGlow,
    flick: skin.sprites.flickSlotGlow,
} as const

let mode = tutorialMemory(Boolean)

let id = tutorialMemory(SkinSpriteId)

export const slotGlowEffect = {
    update() {
        if (!mode) return

        const a = Math.unlerpClamped(0.25, 0, segment.time)
        const p = 1 - a ** 3

        const t = 1 - 4 * scaledScreen.wToH * p

        skin.sprites.draw(
            id,
            {
                x1: -2,
                x2: Math.lerp(-2, -2.5, p),
                x3: Math.lerp(2, 2.5, p),
                x4: 2,
                y1: 1,
                y2: t,
                y3: t,
                y4: 1,
            },
            layer.slotGlowEffect,
            a,
        )
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
