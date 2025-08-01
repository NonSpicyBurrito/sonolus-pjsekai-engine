import { options } from '../../configuration/options.js'
import { note } from '../note.js'
import { panel } from '../panel.js'
import { getZ, layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class SimLine extends Archetype {
    import = this.defineImport({
        aRef: { name: 'a', type: Number },
        bRef: { name: 'b', type: Number },
    })

    render() {
        if (!options.simLineEnabled) return

        let l = this.aImport.lane
        let r = this.bImport.lane
        if (l > r) [l, r] = [r, l]

        const time = bpmChanges.at(this.aImport.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer.simLine, time, l)

        const b = -note.h
        const t = note.h

        skin.sprites.simLine.draw(new Rect({ l, r, b, t }).add(pos), z, 1)
    }

    get aImport() {
        return archetypes.NormalTapNote.import.get(this.import.aRef)
    }

    get bImport() {
        return archetypes.NormalTapNote.import.get(this.import.bRef)
    }
}
