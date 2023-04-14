import { options } from '../../configuration/options.js'
import { effect } from '../effect.js'
import { particle } from '../particle.js'
import { skin } from '../skin.js'
import { canEmpty } from './InputManager.js'
import { lane, minSFXDistance, note } from './constants.js'
import { layer } from './layer.js'
import { scaledScreen } from './shared.js'
import { perspectiveLayout } from './utils.js'

export class Stage extends Archetype {
    hitbox = this.entityMemory(Rect)

    initialize() {
        new Rect(lane.hitbox).transform(skin.transform).copyTo(this.hitbox)
    }

    spawnOrder() {
        return 2
    }

    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    touchOrder = 3
    touch() {
        if (options.autoplay) return

        for (const touch of touches) {
            if (!this.hitbox.contains(touch.position)) continue
            if (!canEmpty(touch)) continue

            if (touch.started) {
                this.onEmptyStart(touch)
            } else {
                this.onEmptyMove(touch)
            }
        }
    }

    updateParallel() {
        if (skin.sprites.sekaiStage.exists) {
            this.drawSekaiStage()
        } else {
            this.drawFallbackStage()
        }

        this.drawStageCover()
    }

    onEmptyStart(touch: Touch) {
        this.playEmptyEffects(this.xToL(touch.position.x))
    }

    onEmptyMove(touch: Touch) {
        const l = this.xToL(touch.position.x)
        const oldL = this.xToL(touch.lastPosition.x)
        if (l === oldL) return

        this.playEmptyEffects(l)
    }

    xToL(x: number) {
        return Math.floor(Math.unlerp(this.hitbox.l, this.hitbox.r, x) * 12 - 6)
    }

    playEmptyEffects(l: number) {
        if (options.sfxEnabled) this.playEmptySFX()
        if (options.laneEffectEnabled) this.playEmptyLaneEffects(l)
    }

    playEmptySFX() {
        effect.clips.stage.play(minSFXDistance)
    }

    playEmptyLaneEffects(l: number) {
        particle.effects.lane.spawn(
            perspectiveLayout({ l, r: l + 1, b: lane.b, t: lane.t }),
            0.3,
            false,
        )
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
