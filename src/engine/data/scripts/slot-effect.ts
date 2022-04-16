import {
    Abs,
    Add,
    customSkinSprite,
    Divide,
    Draw,
    EntityMemory,
    GreaterOr,
    Multiply,
    Or,
    Script,
    Subtract,
    Time,
    Unlerp,
} from 'sonolus.js'
import { baseNote, engineId, Layer } from './common/constants'

export function slotEffect(): Script {
    const sprite = EntityMemory.to<number>(0)
    const center = EntityMemory.to<number>(1)

    const startTime = EntityMemory.to<number>(2)
    const endTime = EntityMemory.to<number>(3)

    const tL = EntityMemory.to<number>(4)
    const tR = EntityMemory.to<number>(5)
    const bL = EntityMemory.to<number>(6)
    const bR = EntityMemory.to<number>(7)
    const z = EntityMemory.to<number>(8)

    const initialize = [
        startTime.set(Time),
        endTime.set(Add(startTime, 0.5)),

        tL.set(Multiply(Subtract(center, 0.5), baseNote.tw)),
        tR.set(Multiply(Add(center, 0.5), baseNote.tw)),
        bL.set(Multiply(Subtract(center, 0.5), baseNote.bw)),
        bR.set(Multiply(Add(center, 0.5), baseNote.bw)),
        z.set(
            Add(
                Layer.SlotEffect,
                Divide(Time, 1000),
                Divide(Abs(center), -10000)
            )
        ),
    ]

    const updateParallel = Or(
        GreaterOr(Time, endTime),
        Draw(
            sprite,
            bL,
            baseNote.b,
            tL,
            baseNote.t,
            tR,
            baseNote.t,
            bR,
            baseNote.b,
            z,
            Unlerp(endTime, startTime, Time)
        )
    )

    return {
        initialize,
        updateParallel,
    }
}

export function getSlotSprite(color: number) {
    return customSkinSprite(engineId, 50 + color)
}
