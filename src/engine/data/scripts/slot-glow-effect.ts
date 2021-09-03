import {
    Abs,
    Add,
    Divide,
    EntityMemory,
    GreaterOr,
    Or,
    SScript,
    Time,
    Unlerp,
} from 'sonolus.js'
import { Layer } from './common/constants'
import {
    calculateSlotGlowLayout,
    getSlotGlowLayout,
    SlotGlowSprite,
} from './common/slot-glow-sprite'

export function slotGlowEffect(slotGlowSprite: SlotGlowSprite): SScript {
    const center = EntityMemory.to<number>(0)
    const width = EntityMemory.to<number>(1)

    const startTime = EntityMemory.to<number>(2)
    const endTime = EntityMemory.to<number>(3)

    const layout = getSlotGlowLayout(EntityMemory.to(4))
    const z = EntityMemory.to<number>(8)

    const initialize = [
        startTime.set(Time),
        endTime.set(Add(startTime, 0.25)),

        calculateSlotGlowLayout(center, width, layout),
        z.set(
            Add(
                Layer.SlotGlowEffect,
                Divide(Time, 1000),
                Divide(Abs(center), -10000)
            )
        ),
    ]

    const updateParallel = Or(
        GreaterOr(Time, endTime),
        slotGlowSprite.draw(layout, z, Unlerp(endTime, startTime, Time))
    )

    return {
        initialize: {
            code: initialize,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
