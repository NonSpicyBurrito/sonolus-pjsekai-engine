import { noteDisplay } from '../../components/noteDisplay.mjs'

export const tapNoteIntro = {
    enter() {
        noteDisplay.showOverlay('normal')
    },

    exit() {
        noteDisplay.clear()
    },
}
