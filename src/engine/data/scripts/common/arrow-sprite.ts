import { SkinSprite } from 'sonolus-core'
import {
    Abs,
    Add,
    And,
    Clamp,
    Code,
    customSkinSprite,
    Divide,
    Draw,
    HasSkinSprite,
    If,
    Lerp,
    Max,
    Min,
    Mod,
    Multiply,
    Pointer,
    Round,
    Subtract,
    SwitchInteger,
    TemporaryMemory,
    Time,
} from 'sonolus.js'
import { engineId, lane, origin } from './constants'
import { getLayout, Tuple } from './utils'

export type ArrowLayout = Tuple<Code<number>, 10>
export type WritableArrowLayout = Tuple<Pointer<number>, 10>

export function getArrowLayout(pointer: Pointer) {
    return getLayout(pointer, 10)
}

export class ArrowSprite {
    public readonly base: number
    public readonly fallback: Code<number>

    public constructor(isCritical: boolean) {
        this.base = isCritical ? 82 : 70
        this.fallback = SkinSprite.DirectionalMarkerNeutral + (isCritical ? 4 : 1)
    }

    public calculateLayout(
        center: Code<number>,
        width: Code<number>,
        direction: Code<number>,
        layout: WritableArrowLayout
    ) {
        const [sprite, x1, y1, x2, y2, x3, y3, x4, y4, dx] = layout

        const size = Clamp(Round(Multiply(width, 2)), 1, 6)
        const spriteUp = customSkinSprite(engineId, Add(this.base, size))
        const spriteSide = customSkinSprite(engineId, Add(this.base, size, 6))

        return If(
            And(HasSkinSprite(spriteUp), HasSkinSprite(spriteSide)),
            [
                sprite.set(Multiply(Clamp(width, 0, 3), 0.5, SwitchInteger(direction, [1, -1], 1))),
                x1.set(Multiply(Subtract(center, sprite), lane.w)),
                y1.set(lane.b),
                x2.set(x1),
                y2.set(Add(lane.b, Multiply(Abs(sprite), 2, lane.w))),
                x3.set(Multiply(Add(center, sprite), lane.w)),
                y3.set(y2),
                x4.set(x3),
                y4.set(y1),

                sprite.set(Multiply(lane.w, 0.25, SwitchInteger(direction, [1, -1]))),
                x1.set(Subtract(x1, sprite)),
                x2.set(Subtract(x2, sprite)),
                x3.set(Subtract(x3, sprite)),
                x4.set(Subtract(x4, sprite)),

                sprite.set(SwitchInteger(direction, [spriteSide, spriteSide], spriteUp)),
                dx.set(Multiply(lane.w, SwitchInteger(direction, [-1, 1]))),
            ],
            [
                sprite.set(Max(1, Min(3, width))),
                SwitchInteger(
                    direction,
                    [rotate(Math.PI / 6), rotate(-Math.PI / 6)],
                    [
                        x1.set(Multiply(Subtract(center, sprite), lane.w)),
                        y1.set(lane.b),
                        x2.set(x1),
                        y2.set(Add(lane.b, Multiply(sprite, 2, lane.w))),
                        x3.set(Multiply(Add(center, sprite), lane.w)),
                        y3.set(y2),
                        x4.set(x3),
                        y4.set(y1),
                    ]
                ),

                sprite.set(this.fallback),
                dx.set(Multiply(lane.w, SwitchInteger(direction, [-1, 1]))),
            ]
        )

        function rotate(a: number) {
            const c1 = rotateCoefficient(-1, 0, a)
            const c2 = rotateCoefficient(-1, 2, a)
            const c3 = rotateCoefficient(1, 2, a)
            const c4 = rotateCoefficient(1, 0, a)

            return [
                x1.set(Multiply(Add(center, Multiply(sprite, c1.x)), lane.w)),
                y1.set(Add(lane.b, Multiply(sprite, c1.y, lane.w))),
                x2.set(Multiply(Add(center, Multiply(sprite, c2.x)), lane.w)),
                y2.set(Add(lane.b, Multiply(sprite, c2.y, lane.w))),
                x3.set(Multiply(Add(center, Multiply(sprite, c3.x)), lane.w)),
                y3.set(Add(lane.b, Multiply(sprite, c3.y, lane.w))),
                x4.set(Multiply(Add(center, Multiply(sprite, c4.x)), lane.w)),
                y4.set(Add(lane.b, Multiply(sprite, c4.y, lane.w))),
            ]
        }
    }

    public draw(scale: Code<number>, layout: ArrowLayout, z: Code<number>) {
        const [sprite, x1, y1, x2, y2, x3, y3, x4, y4, dx] = layout

        const t = TemporaryMemory.to<number>(0)
        const tx = TemporaryMemory.to<number>(1)
        const ty = TemporaryMemory.to<number>(2)

        return [
            t.set(Divide(Mod(Time, 0.5), 0.5)),
            tx.set(Multiply(dx, t)),
            ty.set(Multiply(lane.w, 2, t)),

            Draw(
                sprite,
                Multiply(Add(x1, tx), scale),
                Lerp(origin, Add(y1, ty), scale),
                Multiply(Add(x2, tx), scale),
                Lerp(origin, Add(y2, ty), scale),
                Multiply(Add(x3, tx), scale),
                Lerp(origin, Add(y3, ty), scale),
                Multiply(Add(x4, tx), scale),
                Lerp(origin, Add(y4, ty), scale),
                z,
                Subtract(1, t)
            ),
        ]
    }
}

export const arrowRedSprite = new ArrowSprite(false)
export const arrowYellowSprite = new ArrowSprite(true)

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
