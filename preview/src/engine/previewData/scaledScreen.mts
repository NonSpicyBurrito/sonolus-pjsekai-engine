import { panel } from './panel.mjs'

export const scaledScreen = {
    get wToH() {
        return panel.h / 40
    },
}
