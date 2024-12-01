export type Windows = {
    perfect: Range
    great: Range
    good: Range
}

const toMs = ({ min, max }: Range) => new Range(Math.round(min * 1000), Math.round(max * 1000))

export const toBucketWindows = (windows: Windows) => ({
    perfect: toMs(windows.perfect),
    great: toMs(windows.great),
    good: toMs(windows.good),
})

type Frames = number | [min: number, max: number]

const fromFrames = (perfect: Frames, great: Frames, good: Frames) => {
    const toWindow = (frames: Frames) =>
        typeof frames === 'number'
            ? Range.one.mul(frames).div(60)
            : new Range(-frames[0], frames[1]).div(60)

    return {
        perfect: toWindow(perfect),
        great: toWindow(great),
        good: toWindow(good),
    }
}

export const windows = {
    tapNote: {
        normal: fromFrames(2.5, 5, 7.5),
        critical: fromFrames(3.3, 4.5, 7.5),
    },
    flickNote: {
        normal: fromFrames(2.5, [6.5, 7.5], [7.5, 8.5]),
        critical: fromFrames(3.5, [6.5, 7.5], [7.5, 8.5]),
    },
    traceNote: {
        normal: fromFrames(3.5, 3.5, 3.5),
        critical: fromFrames(3.5, 3.5, 3.5),
    },
    traceFlickNote: {
        normal: fromFrames([6.5, 7.5], [6.5, 7.5], [6.5, 7.5]),
        critical: fromFrames([6.5, 7.5], [6.5, 7.5], [6.5, 7.5]),
    },
    slideTraceNote: {
        normal: fromFrames(3.5, 3.5, 3.5),
        critical: fromFrames(3.5, 3.5, 3.5),
    },
    slideStartNote: {
        normal: fromFrames(2.5, 5, 7.5),
        critical: fromFrames(3.3, 4.5, 7.5),
    },
    slideEndNote: {
        normal: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
        critical: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
    },
    slideEndTraceNote: {
        normal: fromFrames([6, 8.5], [6, 8.5], [6, 8.5]),
        critical: fromFrames([6, 8.5], [6, 8.5], [6, 8.5]),
    },
    slideEndFlickNote: {
        normal: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
        critical: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
    },

    slideEndLockoutDuration: 0.25,
}
