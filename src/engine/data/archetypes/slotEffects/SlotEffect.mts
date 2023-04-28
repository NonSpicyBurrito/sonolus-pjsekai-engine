import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { getZ, perspectiveLayout } from '../utils.mjs'

export abstract class SlotEffect extends SpawnableArchetype({
    startTime: Number,
    lane: Number,
}) {
    abstract sprite: SkinSprite

    endTime = this.entityMemory(Number)

    layout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    initialize() {
        this.endTime = this.spawnData.startTime + 0.5

        perspectiveLayout({
            l: this.spawnData.lane - 0.5,
            r: this.spawnData.lane + 0.5,
            b: 1 + note.h,
            t: 1 - note.h,
        }).copyTo(this.layout)

        this.z = getZ(layer.slotEffect, -this.spawnData.startTime, Math.abs(this.spawnData.lane))
    }

    updateParallel() {
        if (time.now >= this.endTime) {
            this.despawn = true
            return
        }

        const a = Math.unlerp(this.endTime, this.spawnData.startTime, time.now)

        this.sprite.draw(this.layout, this.z, a)
    }
}
