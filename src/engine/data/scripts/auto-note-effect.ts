import { And, EntityMemory, GreaterOr, SScript, Time } from 'sonolus.js'
import {
    playNoteEffect,
    playNoteLaneEffect,
    playSlotEffect,
} from './common/effect'
import { NoteData } from './common/note'

export function autoNoteEffect(
    circular: number,
    linear: number,
    alternative: number,
    slotEffectType: 'red' | 'green' | 'yellow' | 'cyan',
    type: 'normal' | 'tick' | 'flick'
): SScript {
    const noteIndex = EntityMemory.to<number>(0)
    const noteData = NoteData.of(noteIndex)

    const updateParallel = And(GreaterOr(Time, noteData.time), [
        playNoteEffect(
            circular,
            linear,
            alternative,
            type,
            noteData.center,
            noteData.direction
        ),
        type !== 'tick' && [
            playNoteLaneEffect(noteData),
            playSlotEffect(slotEffectType, noteData.center, noteData.width),
        ],

        true,
    ])

    return {
        updateParallel: {
            code: updateParallel,
        },
    }
}
