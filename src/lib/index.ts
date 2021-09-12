import { SLevelData } from 'sonolus.js'
import { Resource } from './Resource'
import { fromSus as _fromSus } from './sus/convert'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const archetypes = require('./archetypes')

export const version = '0.1.0'

export const engineInfo = {
    name: 'pjsekai',
    version: 4,
    title: {
        en: 'Project Sekai',
    },
    subtitle: {
        en: 'Project Sekai: Colorful Stage!',
    },
    author: {
        en: 'Burrito',
    },
    description: {
        en: [
            'A recreation of Project Sekai: Colorful Stage! engine in Sonolus.',
            '',
            'GitHub Repository',
            'https://github.com/NonSpicyBurrito/sonolus-pjsekai-engine',
        ].join('\n'),
    },
}

export const engineConfiguration = new Resource('EngineConfiguration')
export const engineData = new Resource('EngineData')
export const engineThumbnail = new Resource('thumbnail.png')

export function fromSus(sus: string): SLevelData {
    return _fromSus(sus, archetypes)
}
