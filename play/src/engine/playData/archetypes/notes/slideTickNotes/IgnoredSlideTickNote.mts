import { Note } from '../Note.mjs'

export class IgnoredSlideTickNote extends Note {
    hasInput = false

    leniency = 0

    spawnOrder() {
        return 100000
    }

    shouldSpawn() {
        return false
    }
}
