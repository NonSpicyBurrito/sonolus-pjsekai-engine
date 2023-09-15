import { panel } from '../panel.mjs'
import { skin } from '../skin.mjs'

export class Initialization extends Archetype {
    preprocess() {
        const transform = Mat.identity
            .translate(panel.w / 2, 0)
            .scale(screen.h / 40, screen.h / panel.h)
            .translate(screen.l, screen.b)
        skin.transform.set(transform)

        const gap = 0.05
        const uiRect = screen.rect.shrink(gap, gap)

        ui.menu.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            background: true,
        })
    }
}
