import {
    Add,
    And,
    AudioOffset,
    EntityInfo,
    EntityMemory,
    GreaterOr,
    Or,
    PlayScheduled,
    Script,
    Subtract,
    Switch,
    Time,
} from 'sonolus.js'
import { archetypes } from '../archetypes'
import { minSFXDistance } from './common/constants'
import { NoteData } from './common/note'
import {
    getCriticalFlickClip,
    getCriticalTapClip,
    getCriticalTickClip,
    getFlickClip,
    getTapClip,
    getTickClip,
} from './common/sfx'

export function autoSFX(): Script {
    const noteIndex = EntityMemory.to<number>(0)
    const noteInfo = EntityInfo.of(noteIndex)
    const noteData = NoteData.of(noteIndex)

    const initialize = noteIndex.set(3)

    const updateParallel = Or(
        Switch(
            noteInfo.archetype,
            [
                archetypes.tapNoteIndex,
                archetypes.flickNoteIndex,
                archetypes.slideStartIndex,
                archetypes.slideTickIndex,
                archetypes.slideEndIndex,
                archetypes.slideEndFlickIndex,

                archetypes.criticalTapNoteIndex,
                archetypes.criticalFlickNoteIndex,
                archetypes.criticalSlideStartIndex,
                archetypes.criticalSlideTickIndex,
                archetypes.criticalSlideEndIndex,
                archetypes.criticalSlideEndFlickIndex,
            ].map((index) => [index, false]),
            true
        ),
        And(GreaterOr(Time, Subtract(noteData.time, AudioOffset, 1)), [
            PlayScheduled(
                Switch(
                    noteInfo.archetype,
                    [
                        [archetypes.flickNoteIndex, getFlickClip()],
                        [archetypes.slideTickIndex, getTickClip()],
                        [archetypes.slideEndFlickIndex, getFlickClip()],
                        [archetypes.criticalTapNoteIndex, getCriticalTapClip()],
                        [archetypes.criticalFlickNoteIndex, getCriticalFlickClip()],
                        [archetypes.criticalSlideTickIndex, getCriticalTickClip()],
                        [archetypes.criticalSlideEndFlickIndex, getCriticalFlickClip()],
                    ],
                    getTapClip()
                ),
                noteData.time,
                minSFXDistance
            ),
            noteIndex.set(Add(noteIndex, 1)),
        ])
    )

    return {
        initialize,
        updateParallel,
    }
}
