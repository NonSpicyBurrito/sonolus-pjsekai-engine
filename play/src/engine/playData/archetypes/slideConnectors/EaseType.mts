export const EaseType = {
    Out: -1,
    Linear: 0,
    In: 1,
} as const

export type EaseType = (typeof EaseType)[keyof typeof EaseType]

export const ease = (ease: EaseType, s: number) => {
    if (ease === EaseType.In) {
        return Math.ease('In', 'Quad', s)
    } else if (ease === EaseType.Out) {
        return Math.ease('Out', 'Quad', s)
    } else {
        return s
    }
}
