import { SkinSprite } from 'sonolus-core'
import {
    Add,
    And,
    Code,
    customSkinSprite,
    Draw,
    HasSkinSprite,
    If,
    Multiply,
    Pointer,
    Subtract,
} from 'sonolus.js'
import { baseNote, engineId } from './constants'
import { getLayout, Tuple } from './utils'

export type NoteLayout = Tuple<Code<number>, 8>
export type WritableNoteLayout = Tuple<Pointer<number>, 8>

export function getNoteLayout(pointer: Pointer) {
    return getLayout(pointer, 8)
}

export function calculateNoteLayout(
    center: Code<number>,
    width: Code<number>,
    layout: WritableNoteLayout
) {
    return [
        layout[0].set(Multiply(Subtract(center, width), baseNote.tw)),
        layout[1].set(Multiply(Add(center, width), baseNote.tw)),
        layout[2].set(Multiply(Subtract(center, width), baseNote.bw)),
        layout[3].set(Multiply(Add(center, width), baseNote.bw)),
        layout[4].set(Add(layout[0], Multiply(baseNote.tw, 0.25))),
        layout[5].set(Add(layout[1], Multiply(baseNote.tw, -0.25))),
        layout[6].set(Add(layout[2], Multiply(baseNote.bw, 0.25))),
        layout[7].set(Add(layout[3], Multiply(baseNote.bw, -0.25))),
    ]
}

export class NoteSprite {
    public readonly left: Code<number>
    public readonly mid: Code<number>
    public readonly right: Code<number>
    public readonly fallback: Code<number>
    public readonly exists: Code<boolean>

    public constructor(color: number) {
        this.left = customSkinSprite(engineId, 10 + color)
        this.mid = customSkinSprite(engineId, 20 + color)
        this.right = customSkinSprite(engineId, 30 + color)
        this.fallback = SkinSprite.NoteHeadNeutral + color
        this.exists = And(...[this.left, this.mid, this.right].map(HasSkinSprite))
    }

    public draw(
        scale: Code<number>,
        bottom: Code<number>,
        top: Code<number>,
        layout: NoteLayout,
        z: Code<number>
    ) {
        return If(
            this.exists,
            [
                Draw(
                    this.mid,
                    Multiply(layout[6], scale),
                    bottom,
                    Multiply(layout[4], scale),
                    top,
                    Multiply(layout[5], scale),
                    top,
                    Multiply(layout[7], scale),
                    bottom,
                    z,
                    1
                ),
                Draw(
                    this.left,
                    Multiply(layout[2], scale),
                    bottom,
                    Multiply(layout[0], scale),
                    top,
                    Multiply(layout[4], scale),
                    top,
                    Multiply(layout[6], scale),
                    bottom,
                    z,
                    1
                ),
                Draw(
                    this.right,
                    Multiply(layout[7], scale),
                    bottom,
                    Multiply(layout[5], scale),
                    top,
                    Multiply(layout[1], scale),
                    top,
                    Multiply(layout[3], scale),
                    bottom,
                    z,
                    1
                ),
            ],
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

export const noteRedSprite = new NoteSprite(1)
export const noteGreenSprite = new NoteSprite(2)
export const noteYellowSprite = new NoteSprite(4)
export const noteCyanSprite = new NoteSprite(6)
