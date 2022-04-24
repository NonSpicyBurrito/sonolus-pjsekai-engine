import { LevelData } from 'sonolus-core'
import { Fannithm, fromFannithm as _fromFannithm } from './fannithm/convert'
import { Resource } from './Resource'
import { fromSus as _fromSus } from './sus/convert'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const archetypes = require('./archetypes')

export const version = '0.1.0'

export const engineInfo = {
    name: 'pjsekai',
    version: 5,
    title: {
        en: 'Project Sekai',
        ja: 'プロセカ',
        ko: '프로젝트 세카이',
        'zh-hans': '世界计划',
        'zh-hant': '世界計劃',
    },
    subtitle: {
        en: 'Project Sekai: Colorful Stage!',
        ja: 'プロジェクトセカイ カラフルステージ!',
        ko: '프로젝트 세카이: 컬러풀 스테이지!',
        'zh-hans': '世界计划 彩色舞台',
        'zh-hant': '世界計畫 繽紛舞台！',
    },
    author: {
        en: 'Burrito',
    },
    description: {
        en: [
            'A recreation of Project Sekai: Colorful Stage! engine in Sonolus.',
            `Version: ${version}`,
            '',
            'GitHub Repository',
            'https://github.com/NonSpicyBurrito/sonolus-pjsekai-engine',
        ].join('\n'),
    },
} as const

export const engineConfiguration = new Resource('EngineConfiguration')
export const engineData = new Resource('EngineData')
export const engineThumbnail = new Resource('thumbnail.png')

export function fromSus(sus: string, offset = 0): LevelData {
    return _fromSus(sus, offset, archetypes)
}

export function fromFannithm(fannithm: Fannithm, offset = 0): LevelData {
    return _fromFannithm(fannithm, offset, archetypes)
}
