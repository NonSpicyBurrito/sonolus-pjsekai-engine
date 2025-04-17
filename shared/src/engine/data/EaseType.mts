export enum EaseType {
    Out = -1,
    Linear = 0,
    In = 1,
    OutIn = 2,
}

export const ease = (ease: EaseType, s: number) => {
    switch (ease) {
        case EaseType.In:
            return Math.ease('In', 'Quad', s)
        case EaseType.Out:
            return Math.ease('Out', 'Quad', s)
            case EaseType.OutIn:
                return Math.ease('OutIn', 'Quart', s)
        default:
            return s
    }
}
