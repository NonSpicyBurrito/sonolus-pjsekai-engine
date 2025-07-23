import { noteDisplay } from '../../components/noteDisplay.js'

export const tapNoteIntro = {
    enter() {
        noteDisplay.showOverlay('normal')
    },

    exit() {
        noteDisplay.clear()
    },
}
