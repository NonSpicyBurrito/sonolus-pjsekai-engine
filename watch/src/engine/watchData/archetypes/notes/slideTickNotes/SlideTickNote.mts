import { Note } from '../Note.mjs'

export abstract class SlideTickNote extends Note {
    globalPreprocess() {
        if (this.hasInput) this.life.miss = -40
    }
}
