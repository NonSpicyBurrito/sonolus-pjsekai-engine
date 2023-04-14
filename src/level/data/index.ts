import { readFileSync } from 'node:fs'
import { LevelData } from 'sonolus-core'

export const data: LevelData = JSON.parse(readFileSync('./src/level/data/expert.json', 'utf8'))
