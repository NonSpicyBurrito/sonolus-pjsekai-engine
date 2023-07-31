import { particle } from '../particle.mjs'
import { hand, scaledScreen } from '../shared.mjs'
import { skin } from '../skin.mjs'

export const initialization = {
    preprocess() {
        const targetAspectRatio = 16 / 9

        const stage = {
            w: screen.aspectRatio >= targetAspectRatio ? targetAspectRatio * screen.h : screen.w,
            h: screen.aspectRatio >= targetAspectRatio ? screen.h : screen.w / targetAspectRatio,
        }

        const t = stage.h * (0.5 + 1.15875 * (47 / 1176))
        const b = stage.h * (0.5 - 1.15875 * (803 / 1176))

        const w = stage.w * ((1.15875 * (1420 / 1176)) / targetAspectRatio / 12)

        scaledScreen.wToH = w / (t - b)

        new Vec(0, -1)
            .rotate(Math.PI / 3)
            .mul(0.25 * ui.configuration.instruction.scale)
            .translate(0, b)
            .copyTo(hand.position)

        const transform = Mat.identity.scale(w, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        const gap = 0.05
        const uiRect = new Rect({
            l: screen.l + gap,
            r: screen.r - gap,
            b: screen.b + gap,
            t: screen.t - gap,
        })

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            background: true,
        })

        ui.navigation.previous.set({
            anchor: { x: uiRect.l, y: 0 },
            pivot: { x: 0, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 0,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })
        ui.navigation.next.set({
            anchor: { x: uiRect.r, y: 0 },
            pivot: { x: 1, y: 0.5 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.navigation.scale),
            rotation: 0,
            alpha: ui.configuration.navigation.alpha,
            background: true,
        })

        ui.instruction.set({
            anchor: Vec.zero,
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(1.2, 0.15).mul(ui.configuration.instruction.scale),
            rotation: 0,
            alpha: ui.configuration.instruction.alpha,
            background: true,
        })
    },
}
