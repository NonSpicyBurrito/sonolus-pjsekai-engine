import { lane, note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { skin } from '../skin.mjs'
import { perspectiveLayout } from '../utils.mjs'

const sprites = {
    stage: skin.sprites.sekaiStage,

    fallback: {
        leftBorder: skin.sprites.stageLeftBorder,
        rightBorder: skin.sprites.stageRightBorder,
        lane: skin.sprites.lane,
        judgmentLine: skin.sprites.judgmentLine,
    },

    get useFallback() {
        return !this.stage.exists
    },
}

export const stage = {
    update() {
        if (sprites.useFallback) {
            this.drawFallbackStage()
        } else {
            this.drawSekaiStage()
        }
    },

    drawSekaiStage() {
        const w = ((2048 / 1420) * 12) / 2
        const h = 1176 / 850

        const layout = new Rect({ l: -w, r: w, t: lane.t, b: lane.t + h })

        sprites.stage.draw(layout, layer.stage, 1)
    },

    drawFallbackStage() {
        sprites.fallback.leftBorder.draw(
            perspectiveLayout({ l: -6.5, r: -6, b: lane.b, t: lane.t }),
            layer.stage,
            1,
        )
        sprites.fallback.rightBorder.draw(
            perspectiveLayout({ l: 6, r: 6.5, b: lane.b, t: lane.t }),
            layer.stage,
            1,
        )

        for (let i = 0; i < 6; i++) {
            sprites.fallback.lane.draw(
                perspectiveLayout({ l: i * 2 - 6, r: i * 2 - 4, b: lane.b, t: lane.t }),
                layer.stage,
                1,
            )
        }

        sprites.fallback.judgmentLine.draw(
            perspectiveLayout({ l: -6, r: 6, b: 1 + note.h, t: 1 - note.h }),
            layer.judgmentLine,
            1,
        )
    },
}
