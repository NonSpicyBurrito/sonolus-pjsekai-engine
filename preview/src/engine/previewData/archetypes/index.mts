import { EngineArchetypeName } from 'sonolus-core'
import { BpmChange } from './BpmChange.mjs'
import { Initialization } from './Initialization.mjs'
import { SimLine } from './SimLine.mjs'
import { Stage } from './Stage.mjs'
import { TimeScaleChange } from './TimeScaleChange.mjs'
import { CriticalFlickNote } from './notes/flatNotes/flickNotes/singleFlickNotes/CriticalFlickNote.mjs'
import { NormalFlickNote } from './notes/flatNotes/flickNotes/singleFlickNotes/NormalFlickNote.mjs'
import { CriticalSlideEndFlickNote } from './notes/flatNotes/flickNotes/slideEndFlickNotes/CriticalSlideEndFlickNote.mjs'
import { NormalSlideEndFlickNote } from './notes/flatNotes/flickNotes/slideEndFlickNotes/NormalSlideEndFlickNote.mjs'
import { CriticalSlideEndNote } from './notes/flatNotes/slideEndNotes/CriticalSlideEndNote.mjs'
import { NormalSlideEndNote } from './notes/flatNotes/slideEndNotes/NormalSlideEndNote.mjs'
import { CriticalSlideStartNote } from './notes/flatNotes/slideStartNotes/CriticalSlideStartNote.mjs'
import { NormalSlideStartNote } from './notes/flatNotes/slideStartNotes/NormalSlideStartNote.mjs'
import { CriticalTapNote } from './notes/flatNotes/tapNotes/CriticalTapNote.mjs'
import { NormalTapNote } from './notes/flatNotes/tapNotes/NormalTapNote.mjs'
import { HiddenSlideTickNote } from './notes/slideTickNotes/HiddenSlideTickNote.mjs'
import { IgnoredSlideTickNote } from './notes/slideTickNotes/IgnoredSlideTickNote.mjs'
import { CriticalSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/CriticalSlideTickNote.mjs'
import { NormalSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/NormalSlideTickNote.mjs'
import { CriticalAttachedSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/CriticalAttachedSlideTickNote.mjs'
import { NormalAttachedSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/NormalAttachedSlideTickNote.mjs'
import { CriticalSlideConnector } from './slideConnectors/CriticalSlideConnector.mjs'
import { NormalSlideConnector } from './slideConnectors/NormalSlideConnector.mjs'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,
    [EngineArchetypeName.TimeScaleChange]: TimeScaleChange,

    Stage,

    NormalTapNote,
    CriticalTapNote,

    NormalFlickNote,
    CriticalFlickNote,

    NormalSlideStartNote,
    CriticalSlideStartNote,

    NormalSlideEndNote,
    CriticalSlideEndNote,

    NormalSlideEndFlickNote,
    CriticalSlideEndFlickNote,

    IgnoredSlideTickNote,
    NormalSlideTickNote,
    CriticalSlideTickNote,

    HiddenSlideTickNote,
    NormalAttachedSlideTickNote,
    CriticalAttachedSlideTickNote,

    NormalSlideConnector,
    CriticalSlideConnector,

    SimLine,
})
