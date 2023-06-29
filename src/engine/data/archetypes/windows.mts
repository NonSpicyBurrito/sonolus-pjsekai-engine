type Frames = number | [min: number, max: number]

const fromFrames = (perfect: Frames, great: Frames, good: Frames) => {
    const toWindow = (frames: Frames) =>
        typeof frames === 'number'
            ? { min: -frames / 60, max: frames / 60 }
            : { min: -frames[0] / 60, max: frames[1] / 60 }

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
    slideStartNote: {
        normal: fromFrames(2.5, 5, 7.5),
        critical: fromFrames(3.3, 4.5, 7.5),
    },
    slideEndNote: {
        normal: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
        critical: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
    },
    slideEndFlickNote: {
        normal: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
        critical: fromFrames([3.5, 4], [6.5, 8], [7.5, 8.5]),
    },

    slideEndLockoutDuration: 0.25,
}
