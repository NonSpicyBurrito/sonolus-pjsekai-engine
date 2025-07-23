import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../configuration/options.js'
import { print } from '../print.js'
import { line, skin } from '../skin.js'

export class TimeScaleChange extends Archetype {
    import = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        timeScale: { name: EngineArchetypeDataName.TimeScale, type: Number },
    })

    render() {
        if (!options.previewTimeScale) return

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
