import { archetypes } from './archetypes/index.mjs'
import { buckets } from './buckets.mjs'
import { effect } from './effect.mjs'
import { particle } from './particle.mjs'
import { skin } from './skin.mjs'
import { updateSpawn } from './updateSpawn.mjs'

export const watchData = {
    skin,
    effect,
    particle,
    buckets,
    archetypes,
    updateSpawn,

    globalResolver: (name: string) => eval(name) as unknown,
}
