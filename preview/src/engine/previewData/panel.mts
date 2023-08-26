import { chart } from './chart.mjs'

export const panel = {
    get duration() {
        return 2
    },

    get count() {
        return Math.ceil(chart.duration / this.duration)
    },

    positionFromTime(time: number) {
        return this.positionFromLocation(Math.floor(time / this.duration), time % this.duration)
    },

    positionFromLocation(index: number, extraTime: number) {
        return new Vec(index * 20, extraTime / this.duration)
    },
}
