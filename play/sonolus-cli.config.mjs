import { error, log } from 'node:console'
import { copyFileSync, readFileSync } from 'node:fs'
import { hash } from 'sonolus-core'

/** @type {import('sonolus.js').SonolusCLIConfig} */
export default {
    type: 'play',
    entry: './play/src/index.mts',

    devServer(sonolus) {
        try {
            copyFileSync('./play/src/level/bgm.mp3', './.dev/bgm.mp3')

            const level = sonolus.db.levels[0]
            level.bgm = {
                type: 'LevelBgm',
                hash: hash(readFileSync('./.dev/bgm.mp3')),
                url: '/bgm.mp3',
            }
        } catch (_) {
            error('Error: failed to setup bgm, using fallback')
            log()
        }
    },
}
