import { hash } from '@sonolus/core'
import { error, log } from 'node:console'
import { copyFileSync, readFileSync } from 'node:fs'

/** @type {import('@sonolus/sonolus.js').SonolusCLIConfig} */
export default {
    type: 'watch',

    devServer(sonolus) {
        try {
            copyFileSync('./shared/src/level/bgm.mp3', './.dev/bgm.mp3')

            const level = sonolus.level.items[0]
            level.bgm = {
                hash: hash(readFileSync('./.dev/bgm.mp3')),
                url: '/bgm.mp3',
            }
        } catch {
            error('Error: failed to setup bgm, using fallback')
            log()
        }
    },
}
