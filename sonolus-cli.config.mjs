import { copyFileSync } from 'node:fs'

/** @type import('sonolus.js').SonolusCLIConfig */
export default {
    entry: './src/index.mts',
    devServer(sonolus) {
        copyFileSync('./src/level/bgm.mp3', './.dev/bgm.mp3')

        const level = sonolus.db.levels[0]
        level.bgm = {
            type: 'LevelBgm',
            hash: '4ecc2a4f2b382ba1195cc0d2aa15a2efd353680d',
            url: '/bgm.mp3',
        }
    },
}
