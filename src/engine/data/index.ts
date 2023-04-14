import { archetypes } from './archetypes/index.js'
import { buckets } from './buckets.js'
import { effect } from './effect.js'
import { particle } from './particle.js'
import { skin } from './skin.js'

export const data = {
    skin,
    effect,
    particle,
    buckets,
    archetypes,

    globalResolver: (name: string) => eval(name),
}
