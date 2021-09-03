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
    calculateSlotLayout,
    getSlotLayout,
    SlotSprite,
} from './common/slot-sprite'

export function slotEffect(slotSprite: SlotSprite): SScript {
    const center = EntityMemory.to<number>(0)

    const startTime = EntityMemory.to<number>(1)
    const endTime = EntityMemory.to<number>(2)

    const layout = getSlotLayout(EntityMemory.to(3))
    const z = EntityMemory.to<number>(7)

    const initialize = [
        startTime.set(Time),
        endTime.set(Add(startTime, 0.5)),

        calculateSlotLayout(center, layout),
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
        slotSprite.draw(layout, z, Unlerp(endTime, startTime, Time))
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
