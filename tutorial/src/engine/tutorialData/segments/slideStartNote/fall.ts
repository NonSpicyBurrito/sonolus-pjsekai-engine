import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

export const slideStartNoteFall = {
    enter() {
        noteDisplay.showFall('slide')
        connector.showFallIn()
    },

    exit() {
        noteDisplay.clear()
        connector.clear()
    },
}
