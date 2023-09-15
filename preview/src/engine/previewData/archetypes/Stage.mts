import { chart } from '../chart.mjs'
import { panel } from '../panel.mjs'
import { print } from '../print.mjs'
import { layer, line, skin } from '../skin.mjs'

export class Stage extends Archetype {
    preprocessOrder = 2
    preprocess() {
        canvas.set({
            scroll: Scroll.LeftToRight,
            size: (panel.count * panel.w * screen.h) / 40,
        })
    }

    render() {
        this.renderPanels()

        this.renderBeats()

        this.printTimes()
        this.printMeasures()
    }

    renderPanels() {
        for (let i = 0; i < panel.count; i++) {
            const x = i * panel.w

            const b = 0
            const t = panel.h

            skin.sprites.stageLeftBorder.draw(
                new Rect({
                    l: x - 6.5,
                    r: x - 6,
                    b,
                    t,
                }),
                layer.stage,
                1,
            )
            skin.sprites.stageRightBorder.draw(
                new Rect({
                    l: x + 6,
                    r: x + 6.5,
                    b,
                    t,
                }),
                layer.stage,
                1,
            )

            for (let j = 0; j < 6; j++) {
                skin.sprites.lane.draw(
                    new Rect({
                        l: x + (j - 3) * 2,
                        r: x + (j - 2) * 2,
                        b,
                        t,
                    }),
                    layer.stage,
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
