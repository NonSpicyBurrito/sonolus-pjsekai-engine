import { noteDisplay } from '../../components/noteDisplay.js'

export const tapNoteFall = {
    enter() {
        noteDisplay.showFall('normal')
    },

    exit() {
        noteDisplay.clear()
    },
}
