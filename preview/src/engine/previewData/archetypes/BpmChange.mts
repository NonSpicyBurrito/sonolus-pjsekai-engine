import { EngineArchetypeDataName } from 'sonolus-core'
import { print } from '../print.mjs'
import { line, skin } from '../skin.mjs'

export class BpmChange extends Archetype {
    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        bpm: { name: EngineArchetypeDataName.Bpm, type: Number },
    })

    render() {
        line(skin.sprites.bpmChangeLine, this.data.beat, 0.5)

        print(
            this.data.bpm,
            bpmChanges.at(this.data.beat).time,
            PrintFormat.BPM,
            'auto',
            PrintColor.Purple,
            'right',
        )
    }
}
