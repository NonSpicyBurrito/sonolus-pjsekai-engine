import { options } from '../../configuration/options.mjs'
import { layer } from '../layer.mjs'
import { note } from '../note.mjs'
import { skin } from '../skin.mjs'
import { getZ, perspectiveLayout } from '../utils.mjs'
import { archetypes } from './index.mjs'
import { Note } from './notes/Note.mjs'

export class SimLine extends Archetype {
    data = this.defineData({
        aRef: { name: 'a', type: Number },
        bRef: { name: 'b', type: Number },
    })

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    spawnTime = this.entityMemory(Number)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        this.targetTime = bpmChanges.at(this.aData.beat).time

        this.visualTime.max = timeScaleChanges.at(this.targetTime).scaledTime
        this.visualTime.min = this.visualTime.max - Note.duration

        this.spawnTime = this.visualTime.min
    }

    spawnOrder() {
        if (!options.simLineEnabled) return 100000

        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        if (!options.simLineEnabled) return false

        return time.scaled >= this.spawnTime
    }

    initialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - Note.duration * options.hidden

        let l = this.aData.lane
        let r = this.bData.lane
        if (l > r) [l, r] = [r, l]

        const b = 1 + note.h
        const t = 1 - note.h

        perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)

        this.z = getZ(layer.simLine, this.targetTime, l)
    }

    updateParallel() {
        if (options.autoplay) {
            if (time.now >= this.targetTime) this.despawn = true
        } else {
            if (
                this.aInfo.state === EntityState.Despawned ||
                this.bInfo.state === EntityState.Despawned
            )
                this.despawn = true
        }
        if (this.despawn) return

        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        this.render()
    }

    get aData() {
        return archetypes.NormalTapNote.data.get(this.data.aRef)
    }

    get aInfo() {
        return entityInfos.get(this.data.aRef)
    }

    get bData() {
        return archetypes.NormalTapNote.data.get(this.data.bRef)
    }

    get bInfo() {
        return entityInfos.get(this.data.bRef)
    }

    render() {
        this.y = Note.approach(this.visualTime.min, this.visualTime.max, time.scaled)

        skin.sprites.simLine.draw(this.spriteLayout.mul(this.y), this.z, 1)
    }
}
