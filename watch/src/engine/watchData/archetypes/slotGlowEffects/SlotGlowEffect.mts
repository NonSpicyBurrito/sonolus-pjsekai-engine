import { options } from '../../../configuration/options.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, layer } from '../../skin.mjs'

export abstract class SlotGlowEffect extends SpawnableArchetype({
    startTime: Number,
    lane: Number,
    size: Number,
}) {
    abstract sprite: SkinSprite

    endTime = this.entityMemory(Number)

    layout = this.entityMemory({
        l: {
            min: Number,
            max: Number,
        },
        r: {
            min: Number,
            max: Number,
        },
        h: Number,
    })
    z = this.entityMemory(Number)

    spawnTime() {
        return timeScaleChanges.at(this.spawnData.startTime).scaledTime
    }

    despawnTime() {
        return timeScaleChanges.at(this.spawnData.startTime + 0.5).scaledTime
    }

    initialize() {
        this.endTime = this.spawnData.startTime + 0.25

        const s = 1 + 0.25 * options.slotEffectSize

        this.layout.l.min = this.spawnData.lane - this.spawnData.size
        this.layout.l.max = this.layout.l.min * s

        this.layout.r.min = this.spawnData.lane + this.spawnData.size
        this.layout.r.max = this.layout.r.min * s

        this.layout.h = 4 * options.slotEffectSize * scaledScreen.wToH

        this.z = getZ(
            layer.slotGlowEffect,
            -this.spawnData.startTime,
            Math.abs(this.spawnData.lane),
        )
    }

    updateParallel() {
        const a = Math.unlerp(this.endTime, this.spawnData.startTime, time.now)
        const p = 1 - a ** 3

        const t = 1 - this.layout.h * p

        this.sprite.draw(
            {
                x1: this.layout.l.min,
                x2: Math.lerp(this.layout.l.min, this.layout.l.max, p),
                x3: Math.lerp(this.layout.r.min, this.layout.r.max, p),
                x4: this.layout.r.min,
                y1: 1,
                y2: t,
                y3: t,
                y4: 1,
            },
            this.z,
            a,
        )
    }
}
