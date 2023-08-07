import { options } from '../configuration/options.mjs'

export const note = {
    h: 75 / 850 / 2,

    get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    },
}

export const approach = (fromTime: number, toTime: number, now: number) =>
    1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now))
