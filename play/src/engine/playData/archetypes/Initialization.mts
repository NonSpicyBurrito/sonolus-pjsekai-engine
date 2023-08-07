import { options } from '../../configuration/options.mjs'
import { particle } from '../particle.mjs'
import { skin } from '../skin.mjs'
import { archetypes } from './index.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export class Initialization extends Archetype {
    preprocess() {
        const targetAspectRatio = 16 / 9

        const stage = {
            w: options.lockStageAspectRatio
                ? screen.aspectRatio >= targetAspectRatio
                    ? targetAspectRatio * screen.h
                    : screen.w
                : screen.w,
            h: options.lockStageAspectRatio
                ? screen.aspectRatio >= targetAspectRatio
                    ? screen.h
                    : screen.w / targetAspectRatio
                : screen.h,
        }

        const t = stage.h * (0.5 + 1.15875 * (47 / 1176))
        const b = stage.h * (0.5 - 1.15875 * (803 / 1176))

        const w = stage.w * ((1.15875 * (1420 / 1176)) / targetAspectRatio / 12)

        scaledScreen.l = screen.l / w
        scaledScreen.r = screen.r / w
        scaledScreen.b = screen.b / (b - t)
        scaledScreen.t = screen.t / (b - t)

        scaledScreen.wToH = w / (t - b)

        const transform = Mat.identity.scale(w, b - t).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        score.base.set({
            perfect: 1,
            great: 0.7,
            good: 0.5,
        })
        score.consecutive.great.set({
            multiplier: 0.01,
            step: 100,
            cap: 1000,
        })

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
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.lt.add(
                new Vec(0.715, -0.035).mul(ui.configuration.metric.primary.scale),
            ),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.55, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.rt
                .sub(new Vec(gap, 0))
                .sub(new Vec(0.15, 0).mul(ui.configuration.menu.scale))
                .sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: stage.w * 0.355, y: stage.h * 0.0875 },
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(0, stage.h * 0.14).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })
        ui.combo.text.set({
            anchor: { x: stage.w * 0.355, y: stage.h * 0.0875 },
            pivot: { x: 0.5, y: -2.25 },
            size: new Vec(0, stage.h * 0.14 * 0.25).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: 0, y: stage.h * -0.115 },
            pivot: { x: 0.5, y: 0.5 },
            size: new Vec(0, stage.h * 0.0475).mul(ui.configuration.judgment.scale),
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        this.despawn = true
    }
}
