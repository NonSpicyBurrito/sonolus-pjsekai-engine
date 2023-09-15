import { EngineArchetypeDataName } from 'sonolus-core'
import { print } from '../print.mjs'
import { line, skin } from '../skin.mjs'

export class TimeScaleChange extends Archetype {
    data = this.defineData({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        timeScale: { name: EngineArchetypeDataName.TimeScale, type: Number },
    })

    render() {
        line(skin.sprites.timeScaleChangeLine, this.data.beat, 0.5)

        print(
            this.data.timeScale,
            bpmChanges.at(this.data.beat).time,
            PrintFormat.TimeScale,
            'auto',
            PrintColor.Yellow,
            'left',
        )
    }
}
