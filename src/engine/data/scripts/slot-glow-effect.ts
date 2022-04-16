import {
    Abs,
    Add,
    customSkinSprite,
    Divide,
    Draw,
    EntityMemory,
    GreaterOr,
    Lerp,
    Multiply,
    Or,
    Power,
    Script,
    Subtract,
    Time,
    Unlerp,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { engineId, lane, Layer } from './common/constants'

export function slotGlowEffect(): Script {
    const sprite = EntityMemory.to<number>(0)
    const center = EntityMemory.to<number>(1)
    const width = EntityMemory.to<number>(2)

    const startTime = EntityMemory.to<number>(3)
    const endTime = EntityMemory.to<number>(4)

    const tL = EntityMemory.to<number>(5)
    const tR = EntityMemory.to<number>(6)
    const bL = EntityMemory.to<number>(7)
    const bR = EntityMemory.to<number>(8)
    const z = EntityMemory.to<number>(9)

    const tw = Multiply(lane.w, Lerp(1, 1.25, options.slotEffectSize))

    const initialize = [
        startTime.set(Time),
        endTime.set(Add(startTime, 0.25)),

        tL.set(Multiply(Subtract(center, width), tw)),
        tR.set(Multiply(Add(center, width), tw)),
        bL.set(Multiply(Subtract(center, width), lane.w)),
        bR.set(Multiply(Add(center, width), lane.w)),
        z.set(
            Add(
                Layer.SlotGlowEffect,
                Divide(Time, 1000),
                Divide(Abs(center), -10000)
            )
        ),
    ]

    const a = EntityMemory.to<number>(32)
    const p = EntityMemory.to<number>(33)
    const t = EntityMemory.to<number>(34)

    const updateParallel = Or(GreaterOr(Time, endTime), [
        a.set(Unlerp(endTime, startTime, Time)),
        p.set(Subtract(1, Power(a, 3))),
        t.set(Add(lane.b, Multiply(lane.w, 4, options.slotEffectSize, p))),
        Draw(
            sprite,
            bL,
            lane.b,
            Lerp(bL, tL, p),
            t,
            Lerp(bR, tR, p),
            t,
            bR,
            lane.b,
            z,
            a
        ),
    ])

    return {
        initialize,
        updateParallel,
    }
}

export function getSlotGlowSprite(color: number) {
    return customSkinSprite(engineId, 60 + color)
}
