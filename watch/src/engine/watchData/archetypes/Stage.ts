import { lane } from '../../../../../shared/src/engine/data/lane.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { options } from '../../configuration/options.js'
import { effect, sfxDistance } from '../effect.js'
import { note } from '../note.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class Stage extends Archetype {
    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    preprocess() {
        if (options.sfxEnabled) {
            let t = -999999
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            while (true) {
                const nt = streams.getNextKey(-9999, t)
                if (nt === t) break

                t = nt
                effect.clips.stage.schedule(t, sfxDistance)
            }
        }

        if (options.laneEffectEnabled) {
            for (let i = 0; i < 12; i++) {
                archetypes.EmptyEffect.spawn({
                    l: i - 6,
                })
            }
        }
    }

    updateParallel() {
        if (this.useFallbackStage) {
            this.drawFallbackStage()
        } else {
            this.drawSekaiStage()
        }

        this.drawStageCover()
    }

    get useFallbackStage() {
        return !skin.sprites.sekaiStage.exists
    }

    drawSekaiStage() {
        const w = ((2048 / 1420) * 12) / 2
        const h = 1176 / 850

        const layout = new Rect({ l: -w, r: w, t: lane.t, b: lane.t + h })

        skin.sprites.sekaiStage.draw(layout, layer.stage, 1)
    }

    drawFallbackStage() {
        skin.sprites.stageLeftBorder.draw(
            perspectiveLayout({ l: -6.5, r: -6, b: lane.b, t: lane.t }),
            layer.stage,
            1,
        )
        skin.sprites.stageRightBorder.draw(
            perspectiveLayout({ l: 6, r: 6.5, b: lane.b, t: lane.t }),
            layer.stage,
            1,
        )

        for (let i = 0; i < 6; i++) {
            skin.sprites.lane.draw(
                perspectiveLayout({ l: i * 2 - 6, r: i * 2 - 4, b: lane.b, t: lane.t }),
                layer.stage,
                1,
            )
        }

        skin.sprites.judgmentLine.draw(
            perspectiveLayout({ l: -6, r: 6, b: 1 + note.h, t: 1 - note.h }),
            layer.judgmentLine,
            1,
        )
    }

    drawStageCover() {
        if (options.stageCover <= 0) return

        skin.sprites.cover.draw(
            new Rect({
                l: scaledScreen.l,
                r: scaledScreen.r,
                t: scaledScreen.t,
                b: Math.lerp(lane.t, 1, options.stageCover),
            }),
            layer.cover,
            1,
        )
    }
}
