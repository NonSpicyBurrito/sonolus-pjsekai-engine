import { DatabaseEngineItem } from '@sonolus/core'

export { susToUSC } from './sus/convert.cjs'
export { uscToLevelData } from './usc/convert.cjs'
export * from './usc/index.cjs'

export const version = '1.8.6'

export const databaseEngineItem = {
    name: 'pjsekai',
    version: 13,
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
        en: 'Burrito#1000',
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
} as const satisfies Partial<DatabaseEngineItem>
