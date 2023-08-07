import { InstructionIconName, InstructionText } from 'sonolus-core'
import { hand } from './hand.mjs'

export const instruction = defineInstruction({
    texts: {
        tap: InstructionText.Tap,
        tapAndFlick: InstructionText.TapAndFlick,
        tapAndHold: InstructionText.TapAndHold,
        release: InstructionText.Release,
        flick: InstructionText.Flick,
    },

    icons: {
        hand: InstructionIconName.Hand,
    },
})

export const drawHand = (angle: number, y: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(0, 1)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position)
            .translate(0, y),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI,
        0,
        a * ui.configuration.instruction.alpha,
    )
