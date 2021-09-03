import { Code, Judge, LevelBucket } from 'sonolus.js'

type JudgmentWindow = {
    early: number
    late: number
}

type Frame = number | [number, number]

export class Window {
    public readonly perfect: JudgmentWindow
    public readonly great: JudgmentWindow
    public readonly good: JudgmentWindow

    public constructor(perfect: Frame, great: Frame, good: Frame) {
        this.perfect = frameToWindow(perfect)
        this.great = frameToWindow(great)
        this.good = frameToWindow(good)
    }

    public judge(src: Code<number>, dst: Code<number>) {
        return Judge(
            src,
            dst,
            -this.perfect.early,
            this.perfect.late,
            -this.great.early,
            this.great.late,
            -this.good.early,
            this.good.late
        )
    }

    public setBucket(index: number) {
        return LevelBucket.of(index).setBucket(
            format(-this.perfect.early),
            format(this.perfect.late),
            format(-this.great.early),
            format(this.great.late),
            format(-this.good.early),
            format(this.good.late)
        )
    }
}

function frameToWindow(frame: Frame) {
    return typeof frame === 'number'
        ? { early: frame / 60, late: frame / 60 }
        : { early: frame[0] / 60, late: frame[1] / 60 }
}

function format(value: number) {
    return Math.round(value * 1000 * 10) / 10
}
