import { options } from '../../../../configuration/options.mjs'
import { Note } from '../Note.mjs'

export class IgnoredSlideTickNote extends Note {
    preprocess() {
        if (options.mirror) this.import.lane *= -1
    }
}
