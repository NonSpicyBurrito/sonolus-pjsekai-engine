import { options } from '../../../../configuration/options.js'
import { Note } from '../Note.js'

export class IgnoredSlideTickNote extends Note {
    hasInput = false

    leniency = 0

    preprocess() {
        if (options.mirror) this.data.lane *= -1
    }

    spawnOrder() {
        return 100000
    }

    shouldSpawn() {
        return false
    }

    complete() {}
}