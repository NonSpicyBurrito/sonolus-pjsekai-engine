import { archetypes } from './archetypes/index.mjs'
import { buckets } from './buckets.mjs'
import { effect } from './effect.mjs'
import { particle } from './particle.mjs'
import { skin } from './skin.mjs'

export const playData = {
    skin,
    effect,
    particle,
    buckets,
    archetypes,

    globalResolver: (name: string) => eval(name) as unknown,
}
