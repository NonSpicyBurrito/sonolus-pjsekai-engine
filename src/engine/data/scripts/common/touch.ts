import {
    Add,
    And,
    Code,
    Greater,
    GreaterOr,
    Lerp,
    LessOr,
    Multiply,
    SwitchInteger,
    TouchX,
    TouchY,
} from 'sonolus.js'
import { lane } from './constants'

export function checkTouchXInHitbox(
    left: Code<number>,
    right: Code<number>,
    x: Code<number> = TouchX
) {
    return And(GreaterOr(x, left), LessOr(x, right))
}

export function checkTouchYInHitbox(y: Code<number> = TouchY) {
    return LessOr(y, Lerp(lane.t, lane.b, 0.7))
}

export function checkDirection(x: Code<number>, y: Code<number>, direction: Code<number>) {
    return SwitchInteger(
        direction,
        [isSameDirection(x, y, Math.PI / 2 + 1), isSameDirection(x, y, Math.PI / 2 - 1)],
        true
    )
}

function isSameDirection(x: Code<number>, y: Code<number>, angle: number) {
    return Greater(Add(Multiply(x, Math.cos(angle)), Multiply(y, Math.sin(angle))), 0)
}
