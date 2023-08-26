import { archetypes } from './archetypes/index.mjs'
import { skin } from './skin.mjs'

export const previewData = {
    skin,
    archetypes,

    globalResolver: (name: string) => eval(name) as unknown,
}
