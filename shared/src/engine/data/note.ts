export const note = {
    h: 75 / 850 / 2,
}

export const approach = (fromTime: number, toTime: number, now: number) =>
    1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now))
