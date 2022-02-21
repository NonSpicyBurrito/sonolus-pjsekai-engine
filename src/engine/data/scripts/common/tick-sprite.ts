import { SkinSprite } from 'sonolus-core'
import {
    Add,
    Code,
    customSkinSprite,
    Draw,
    HasSkinSprite,
    If,
    Multiply,
    Pointer,
    Subtract,
} from 'sonolus.js'
import { baseNote, engineId, halfNoteHeight, lane } from './constants'
import { getLayout, Tuple } from './utils'

export type TickLayout = Tuple<Code<number>, 6>
export type WritableTickLayout = Tuple<Pointer<number>, 6>

export function getTickLayout(pointer: Pointer) {
    return getLayout(pointer, 6)
}

export function calculateTickLayout(
    center: Code<number>,
    width: Code<number>,
    layout: WritableTickLayout
) {
    return [
        layout[0].set(Multiply(Subtract(center, width), baseNote.tw)),
        layout[1].set(Multiply(Add(center, width), baseNote.tw)),
        layout[2].set(Multiply(Subtract(center, width), baseNote.bw)),
        layout[3].set(Multiply(Add(center, width), baseNote.bw)),
        layout[4].set(Subtract(Multiply(center, lane.w), halfNoteHeight)),
        layout[5].set(Add(Multiply(center, lane.w), halfNoteHeight)),
    ]
}

export class TickSprite {
    public readonly sprite: Code<number>
    public readonly fallback: Code<number>
    public readonly exists: Code<boolean>

    public constructor(color: number) {
        this.sprite = customSkinSprite(engineId, 40 + color)
        this.fallback = SkinSprite.NoteTickNeutral + color
        this.exists = HasSkinSprite(this.sprite)
    }

    public draw(
        scale: Code<number>,
        bottom: Code<number>,
        top: Code<number>,
        layout: TickLayout,
        z: Code<number>
    ) {
        return If(
            this.exists,
            Draw(
                this.sprite,
                Multiply(layout[4], scale),
                bottom,
                Multiply(layout[4], scale),
                top,
                Multiply(layout[5], scale),
                top,
                Multiply(layout[5], scale),
                bottom,
                z,
                1
            ),
            Draw(
                this.fallback,
                Multiply(layout[2], scale),
                bottom,
                Multiply(layout[0], scale),
                top,
                Multiply(layout[1], scale),
                top,
                Multiply(layout[3], scale),
                bottom,
                z,
                1
            )
        )
    }
}

export const tickGreenSprite = new TickSprite(2)
export const tickYellowSprite = new TickSprite(4)
