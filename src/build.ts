import { copySync, emptyDirSync, outputFileSync, outputJsonSync } from 'fs-extra'
import { buildOutput } from '.'
import { archetypes } from './engine/data/archetypes'

const distPath = './dist'

emptyDirSync(distPath)
copySync('./src/res', distPath)

outputFileSync(`${distPath}/EngineConfiguration`, buildOutput.engine.configuration.buffer)

outputFileSync(`${distPath}/EngineData`, buildOutput.engine.data.buffer)

outputJsonSync(
    `${distPath}/archetypes.json`,
    Object.fromEntries(Object.entries(archetypes).filter(([key]) => key.endsWith('Index')))
)
