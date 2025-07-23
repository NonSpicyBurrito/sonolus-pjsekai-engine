import { lane } from '../../../../../shared/src/engine/data/lane.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { particle } from '../particle.js'

export class EmptyEffect extends SpawnableArchetype({
    l: Number,
}) {
    initialized = this.entityMemory(Boolean)

    layout = this.entityMemory(Quad)

    nextTime = this.entityMemory(Number)

    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        let shouldUpdate = false
        let shouldSpawn = false
        if (time.skip) {
            shouldUpdate = true
        } else if (time.now >= this.nextTime) {
            shouldUpdate = true
            shouldSpawn = true
        }

        if (shouldUpdate) {
            this.nextTime = streams.getNextKey(this.spawnData.l, time.now)
            if (this.nextTime === time.now) this.nextTime = 999999
        }

        if (shouldSpawn) {
            particle.effects.lane.spawn(this.layout, 0.3, false)
        }
    }

    globalInitialize() {
        this.layout.copyFrom(
            perspectiveLayout({
                l: this.spawnData.l,
                r: this.spawnData.l + 1,
                b: lane.b,
                t: lane.t,
            }),
        )
    }
}
