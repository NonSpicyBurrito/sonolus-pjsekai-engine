import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../../configuration/options.js'
import { chart } from '../../chart.js'

export abstract class Note extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.import.beat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.import.beat).time)

        if (options.mirror) this.import.lane *= -1
    }
}
