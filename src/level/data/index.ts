import { readFileSync } from 'fs-extra'
import { archetypes } from '../../engine/data/archetypes'
import { fromSus } from '../../lib/convert'

export const levelData = fromSus(
    readFileSync(__dirname + '/expert.sus', 'utf8'),
    archetypes
)
