import {
    Add,
    Code,
    Draw,
    Lerp,
    Max,
    Min,
    Multiply,
    Pointer,
    SkinSprite,
    Subtract,
    SwitchInteger,
} from 'sonolus.js'
import { baseNote, origin } from './constants'
import { getLayout, Tuple } from './utils'

export type ArrowLayout = Tuple<Code<number>, 8>
export type WritableArrowLayout = Tuple<Pointer<number>, 8>

export function getArrowLayout(pointer: Pointer) {
    return getLayout(pointer, 8)
}

export function calculateArrowLayout(
    center: Code<number>,
    width: Code<number>,
    direction: Code<number>,
    layout: WritableArrowLayout,
    temp: Pointer<number>
) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = layout

    return [
        temp.set(Max(0.5, Min(1.5, Multiply(width, 0.5)))),
        SwitchInteger(
            direction,
            [rotate(Math.PI / 6), rotate(-Math.PI / 6)],
            [
                x1.set(Multiply(Subtract(center, temp), baseNote.tw)),
                y1.set(baseNote.t),
                x2.set(x1),
                y2.set(Add(baseNote.t, Multiply(temp, 2, baseNote.tw))),
                x3.set(Multiply(Add(center, temp), baseNote.tw)),
                y3.set(y2),
                x4.set(x3),
                y4.set(y1),
            ]
        ),
    ]

    function rotate(a: number) {
        const c1 = rotateCoefficient(-1, 0, a)
        const c2 = rotateCoefficient(-1, 2, a)
        const c3 = rotateCoefficient(1, 2, a)
        const c4 = rotateCoefficient(1, 0, a)

        return [
            x1.set(Multiply(Add(center, Multiply(temp, c1.x)), baseNote.tw)),
            y1.set(Add(baseNote.t, Multiply(temp, c1.y, baseNote.tw))),
            x2.set(Multiply(Add(center, Multiply(temp, c2.x)), baseNote.tw)),
            y2.set(Add(baseNote.t, Multiply(temp, c2.y, baseNote.tw))),
            x3.set(Multiply(Add(center, Multiply(temp, c3.x)), baseNote.tw)),
            y3.set(Add(baseNote.t, Multiply(temp, c3.y, baseNote.tw))),
            x4.set(Multiply(Add(center, Multiply(temp, c4.x)), baseNote.tw)),
            y4.set(Add(baseNote.t, Multiply(temp, c4.y, baseNote.tw))),
        ]
    }
}

export class ArrowSprite {
    public readonly sprite: Code<number>

    public constructor(color: number) {
        this.sprite = SkinSprite.DirectionalMarkerNeutral + color
    }

    public draw(scale: Code<number>, layout: ArrowLayout, z: Code<number>) {
        return [
            Draw(
                this.sprite,
                Multiply(layout[0], scale),
                Lerp(origin, layout[1], scale),
                Multiply(layout[2], scale),
                Lerp(origin, layout[3], scale),
                Multiply(layout[4], scale),
                Lerp(origin, layout[5], scale),
                Multiply(layout[6], scale),
                Lerp(origin, layout[7], scale),
                z,
                1
            ),
        ]
    }
}

export const arrowRedSprite = new ArrowSprite(1)
export const arrowYellowSprite = new ArrowSprite(4)

function rotateCoefficient(x: number, y: number, a: number) {
    const aOld = Math.atan2(y, x)
    const aNew = aOld + a
    const r = Math.sqrt(x * x + y * y)
    const dY = Math.sin(Math.abs(a)) * 0.5
    return {
        x: r * Math.cos(aNew),
        y: r * Math.sin(aNew) + dY,
    }
}
