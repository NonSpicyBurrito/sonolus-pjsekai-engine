import { approach } from '../../../../../shared/src/engine/data/note.js'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.js'
import { options } from '../../configuration/options.js'
import { note } from '../note.js'
import { getZ, layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class SimLine extends Archetype {
    import = this.defineImport({
        aRef: { name: 'a', type: Number },
        bRef: { name: 'b', type: Number },
    })

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    initialized = this.entityMemory(Boolean)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        this.targetTime = bpmChanges.at(this.aImport.beat).time

        this.visualTime.copyFrom(
            Range.l.mul(note.duration).add(timeScaleChanges.at(this.targetTime).scaledTime),
        )
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime(): number {
        return replay.isReplay
            ? Math.min(
                  this.visualTime.max,
                  this.aSharedMemory.despawnTime,
                  this.bSharedMemory.despawnTime,
              )
            : this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.scaled > this.hiddenTime) return

        this.render()
    }

    get aImport() {
        return archetypes.NormalTapNote.import.get(this.import.aRef)
    }

    get aSharedMemory() {
        return archetypes.NormalTapNote.sharedMemory.get(this.import.aRef)
    }

    get bImport() {
        return archetypes.NormalTapNote.import.get(this.import.bRef)
    }

    get bSharedMemory() {
        return archetypes.NormalTapNote.sharedMemory.get(this.import.bRef)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        let l = this.aImport.lane
        let r = this.bImport.lane
        if (l > r) [l, r] = [r, l]

        const b = 1 + note.h
        const t = 1 - note.h

        perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)

        this.z = getZ(layer.simLine, this.targetTime, l)
    }

    render() {
        const y = approach(this.visualTime.min, this.visualTime.max, time.scaled)

        skin.sprites.simLine.draw(this.spriteLayout.mul(y), this.z, 1)
    }
}
