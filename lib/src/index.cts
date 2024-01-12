import { resolve } from 'node:path'
import { EngineInfo } from 'sonolus-core'

export { susToUSC } from './sus/convert.cjs'
export { uscToLevelData } from './usc/convert.cjs'
export * from './usc/index.cjs'

export const version = '1.5.0'

export const engineInfo = {
    name: 'pjsekai',
    version: 11,
    title: {
        en: 'Project Sekai',
        ja: 'プロセカ',
        ko: '프로젝트 세카이',
        zhs: '世界计划',
        zht: '世界計劃',
    },
    subtitle: {
        en: 'Project Sekai: Colorful Stage!',
        ja: 'プロジェクトセカイ カラフルステージ!',
        ko: '프로젝트 세카이: 컬러풀 스테이지!',
        zhs: '世界计划 彩色舞台',
        zht: '世界計畫 繽紛舞台！',
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
} as const satisfies Partial<EngineInfo>

export const engineConfigurationPath = resolve(__dirname, 'EngineConfiguration')
export const enginePlayDataPath = resolve(__dirname, 'EnginePlayData')
export const engineWatchDataPath = resolve(__dirname, 'EngineWatchData')
export const enginePreviewDataPath = resolve(__dirname, 'EnginePreviewData')
export const engineTutorialDataPath = resolve(__dirname, 'EngineTutorialData')
export const engineThumbnailPath = resolve(__dirname, 'thumbnail.png')
