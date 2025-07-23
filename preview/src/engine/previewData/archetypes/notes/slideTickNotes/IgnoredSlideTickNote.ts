import { options } from '../../../../configuration/options.js'
import { Note } from '../Note.js'

export class IgnoredSlideTickNote extends Note {
    preprocess() {
        if (options.mirror) this.import.lane *= -1
    }
}
