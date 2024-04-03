import { EngineArchetypeDataName } from '@sonolus/core'
import { print } from '../print.mjs'
import { line, skin } from '../skin.mjs'

export class BpmChange extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        bpm: { name: EngineArchetypeDataName.Bpm, type: Number },
    })

    render() {
        line(skin.sprites.bpmChangeLine, this.import.beat, 0.5)

        print(
            this.import.bpm,
            bpmChanges.at(this.import.beat).time,
            PrintFormat.BPM,
            'auto',
            PrintColor.Purple,
            'right',
        )
    }
}
