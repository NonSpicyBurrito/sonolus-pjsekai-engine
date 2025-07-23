import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../../configuration/options.js'

export abstract class Note extends Archetype {
    hasInput = true

    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
    })

    targetTime = this.entityMemory(Number)

    preprocess() {
        if (options.mirror) this.import.lane *= -1

        this.targetTime = bpmChanges.at(this.import.beat).time

        if (this.hasInput) this.result.time = this.targetTime
    }
}
