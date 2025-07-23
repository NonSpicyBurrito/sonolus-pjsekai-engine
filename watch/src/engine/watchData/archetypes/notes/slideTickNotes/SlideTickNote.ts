import { Note } from '../Note.js'

export abstract class SlideTickNote extends Note {
    globalPreprocess() {
        if (this.hasInput) this.life.miss = -40
    }
}
