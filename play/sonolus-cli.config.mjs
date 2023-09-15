import { error, log } from 'node:console'
import { copyFileSync, readFileSync } from 'node:fs'
import { hash } from 'sonolus-core'

/** @type {import('sonolus.js').SonolusCLIConfig} */
export default {
    type: 'play',

    devServer(sonolus) {
        try {
            copyFileSync('./shared/src/level/bgm.mp3', './.dev/bgm.mp3')

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
