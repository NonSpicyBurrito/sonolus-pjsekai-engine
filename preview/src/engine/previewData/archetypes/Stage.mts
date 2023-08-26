import { chart } from '../chart.mjs'
import { panel } from '../panel.mjs'
import { print } from '../print.mjs'
import { line, skin } from '../skin.mjs'

export class Stage extends Archetype {
    preprocessOrder = 2
    preprocess() {
        canvas.size = (panel.count * screen.h) / 2
    }

    render() {
        this.renderPanels()

        this.renderBeats()

        this.printTimes()
        this.printMeasures()
    }

    renderPanels() {
        for (let i = 0; i < panel.count; i++) {
            skin.sprites.stageLeftBorder.draw(
                new Rect({
                    l: i * 20 - 6.5,
                    r: i * 20 - 6,
                    b: 0,
                    t: 1,
                }),
                0,
                1,
            )
            skin.sprites.stageRightBorder.draw(
                new Rect({
                    l: i * 20 + 6,
                    r: i * 20 + 6.5,
                    b: 0,
                    t: 1,
                }),
                0,
                1,
            )

            for (let j = 0; j < 6; j++) {
                skin.sprites.lane.draw(
                    new Rect({
                        l: i * 20 + (j - 3) * 2,
                        r: i * 20 + (j - 2) * 2,
                        b: 0,
                        t: 1,
                    }),
                    0,
                    1,
                )
            }
        }
    }

    renderBeats() {
        for (let i = 0; i <= Math.floor(chart.beats); i++) {
            line(skin.sprites.beatLine, i, i % 4 === 0 ? 0.25 : 0.125)
        }
    }

    printTimes() {
        for (let i = 1; i <= Math.floor(chart.duration); i++) {
            print(i, i, PrintFormat.Time, 0, PrintColor.Neutral, 'left')
        }
    }

    printMeasures() {
        for (let i = 4; i <= Math.floor(chart.beats); i += 4) {
            print(
                i / 4 + 1,
                bpmChanges.at(i).time,
                PrintFormat.MeasureCount,
                0,
                PrintColor.Neutral,
                'right',
            )
        }
    }
}
