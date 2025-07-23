import { noteDisplay } from '../../components/noteDisplay.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const tapNoteFrozen = {
    enter() {
        noteDisplay.showFrozen('normal')

        instruction.texts.tap.show()
    },

    update() {
        drawHand(
            Math.remapClamped(0.25, 0.75, Math.PI / 6, Math.PI / 3, segment.time % 1),
            0,
            Math.unlerpClamped(0.5, 0.25, Math.abs((segment.time % 1) - 0.5)),
        )
    },

    exit() {
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
