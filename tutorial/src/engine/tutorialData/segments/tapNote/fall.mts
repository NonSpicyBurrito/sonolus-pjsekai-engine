import { noteDisplay } from '../../components/noteDisplay.mjs'

export const tapNoteFall = {
    enter() {
        noteDisplay.showFall('normal')
    },

    exit() {
        noteDisplay.clear()
    },
}
