import { chart } from './chart.mjs'

export const panel = {
    w: 20,
    h: 2,

    get count() {
        return Math.ceil(chart.duration / this.h)
    },

    getX(time: number) {
        return Math.floor(time / this.h) * this.w
    },

    getY(time: number) {
        return time % this.h
    },

    getPos(time: number) {
        return new Vec(this.getX(time), this.getY(time))
    },
}
