import { effect } from './effect.js'
import { instruction } from './instruction.js'
import { particle } from './particle.js'
import { skin } from './skin.js'
import { tutorial } from './tutorial.js'

export const tutorialData = {
    skin,
    effect,
    particle,
    instruction,
    tutorial,

    globalResolver: (name: string) => eval(name) as unknown,
}
