import { noteDisplay } from '../../components/noteDisplay.mjs'
import { instruction } from '../../instruction.mjs'
import { segment } from '../../shared.mjs'
import { drawHand } from '../../utils.mjs'

export const slideEndNoteFrozen = {
    enter() {
        noteDisplay.showFrozen('slideEnd')

        instruction.texts.release.show()
    },

    update() {
        drawHand(
            Math.remapClamped(0.25, 0.75, Math.PI / 3, Math.PI / 6, segment.time % 1),
            0,
            Math.unlerpClamped(1, 0.75, segment.time % 1),
        )
    },

    exit() {
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
