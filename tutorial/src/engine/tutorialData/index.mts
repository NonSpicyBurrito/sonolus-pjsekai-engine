import { effect } from './effect.mjs'
import { instruction } from './instruction.mjs'
import { particle } from './particle.mjs'
import { skin } from './skin.mjs'
import { tutorial } from './tutorial.mjs'

export const tutorialData = {
    skin,
    effect,
    particle,
    instruction,
    tutorial,

    globalResolver: (name: string) => eval(name) as unknown,
}
