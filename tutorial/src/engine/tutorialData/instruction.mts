import { InstructionIconName, InstructionText } from 'sonolus-core'

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
