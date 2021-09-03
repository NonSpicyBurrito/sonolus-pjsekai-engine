import {
    Add,
    And,
    Code,
    customSkinSprite,
    Draw,
    HasSkinSprite,
    Multiply,
    Pointer,
    Subtract,
} from 'sonolus.js'
import { baseNote, engineId } from './constants'
import { getLayout, Tuple } from './utils'

export type SlotLayout = Tuple<Code<number>, 4>
export type WritableSlotLayout = Tuple<Pointer<number>, 4>

export function getSlotLayout(pointer: Pointer) {
    return getLayout(pointer, 4)
}

export function calculateSlotLayout(
    center: Code<number>,
    layout: WritableSlotLayout
) {
    return [
        layout[0].set(Multiply(Subtract(center, 0.5), baseNote.tw)),
        layout[1].set(Multiply(Add(center, 0.5), baseNote.tw)),
        layout[2].set(Multiply(Subtract(center, 0.5), baseNote.bw)),
        layout[3].set(Multiply(Add(center, 0.5), baseNote.bw)),
    ]
}

export class SlotSprite {
    public readonly sprite: Code<number>
    public readonly exists: Code<boolean>

    public constructor(color: number) {
        this.sprite = customSkinSprite(engineId, 50 + color)
        this.exists = HasSkinSprite(this.sprite)
    }

    public draw(layout: SlotLayout, z: Code<number>, a: Code<number>) {
        return And(
            this.exists,
            Draw(
                this.sprite,
                layout[2],
                baseNote.b,
                layout[0],
                baseNote.t,
                layout[1],
                baseNote.t,
                layout[3],
                baseNote.b,
                z,
                a
            )
        )
    }
}

export const slotRedSprite = new SlotSprite(1)
export const slotGreenSprite = new SlotSprite(2)
export const slotYellowSprite = new SlotSprite(4)
export const slotCyanSprite = new SlotSprite(6)
