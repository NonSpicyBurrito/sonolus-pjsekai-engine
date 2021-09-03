import {
    Add,
    And,
    Code,
    customSkinSprite,
    Draw,
    EntityMemory,
    HasSkinSprite,
    Lerp,
    Multiply,
    Pointer,
    Power,
    Subtract,
} from 'sonolus.js'
import { engineId, lane } from './constants'
import { getLayout, Tuple } from './utils'

export type SlotGlowLayout = Tuple<Code<number>, 4>
export type WritableSlotGlowLayout = Tuple<Pointer<number>, 4>

export function getSlotGlowLayout(pointer: Pointer) {
    return getLayout(pointer, 4)
}

export function calculateSlotGlowLayout(
    center: Code<number>,
    width: Code<number>,
    layout: WritableSlotGlowLayout
) {
    return [
        layout[0].set(Multiply(Subtract(center, width), lane.w, 1.25)),
        layout[1].set(Multiply(Add(center, width), lane.w, 1.25)),
        layout[2].set(Multiply(Subtract(center, width), lane.w)),
        layout[3].set(Multiply(Add(center, width), lane.w)),
    ]
}

export class SlotGlowSprite {
    public readonly sprite: Code<number>
    public readonly exists: Code<boolean>

    public constructor(color: number) {
        this.sprite = customSkinSprite(engineId, 60 + color)
        this.exists = HasSkinSprite(this.sprite)
    }

    public draw(
        layout: SlotGlowLayout,
        z: Code<number>,
        progress: Code<number>,
        temp1: Pointer<number> = EntityMemory.to<number>(62),
        temp2: Pointer<number> = EntityMemory.to<number>(63)
    ) {
        return And(this.exists, [
            temp1.set(Subtract(1, Power(progress, 3))),
            temp2.set(Add(lane.b, Multiply(lane.w, 4, temp1))),
            Draw(
                this.sprite,
                layout[2],
                lane.b,
                Lerp(layout[2], layout[0], temp1),
                temp2,
                Lerp(layout[3], layout[1], temp1),
                temp2,
                layout[3],
                lane.b,
                z,
                progress
            ),
        ])
    }
}

export const slotGlowRedSprite = new SlotGlowSprite(1)
export const slotGlowGreenSprite = new SlotGlowSprite(2)
export const slotGlowYellowSprite = new SlotGlowSprite(4)
export const slotGlowCyanSprite = new SlotGlowSprite(6)
