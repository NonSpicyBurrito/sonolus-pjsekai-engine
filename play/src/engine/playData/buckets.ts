import { createBucketDefinition } from '../../../../shared/src/engine/data/buckets.js'
import { skin } from './skin.js'

export const buckets = defineBuckets(createBucketDefinition(skin.sprites))
