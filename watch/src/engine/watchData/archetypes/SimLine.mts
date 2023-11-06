import { approach } from '../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

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

    initialized = this.entityMemory(Boolean)

    spriteLayout = this.entityMemory(Quad)
    z = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        this.targetTime = bpmChanges.at(this.aData.beat).time

        this.visualTime.max = timeScaleChanges.at(this.targetTime).scaledTime
        this.visualTime.min = this.visualTime.max - note.duration
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        this.render()
    }

    get aData() {
        return archetypes.NormalTapNote.data.get(this.data.aRef)
    }

    get bData() {
        return archetypes.NormalTapNote.data.get(this.data.bRef)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        let l = this.aData.lane
        let r = this.bData.lane
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
