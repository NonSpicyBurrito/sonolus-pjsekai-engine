import { EngineArchetypeDataName } from 'sonolus-core'
import { print } from '../print.mjs'
import { line, skin } from '../skin.mjs'

export class TimeScaleChange extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        timeScale: { name: EngineArchetypeDataName.TimeScale, type: Number },
    })

    render() {
        line(skin.sprites.timeScaleChangeLine, this.import.beat, 0.5)

        print(
            this.import.timeScale,
            bpmChanges.at(this.import.beat).time,
            PrintFormat.TimeScale,
            'auto',
            PrintColor.Yellow,
            'left',
        )
    }
}
