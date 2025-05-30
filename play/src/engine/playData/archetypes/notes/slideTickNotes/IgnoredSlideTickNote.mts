import { Note } from '../Note.mjs'

export class IgnoredSlideTickNote extends Note {
    hasInput = false

    leniency = 0

    spawnOrder() {
        return 999999
    }

    shouldSpawn() {
        return false
    }
}
