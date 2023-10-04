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
import { CriticalTraceFlickNote } from './notes/flatNotes/flickNotes/traceFlickNotes/CriticalTraceFlickNote.mjs'
import { NormalTraceFlickNote } from './notes/flatNotes/flickNotes/traceFlickNotes/NormalTraceFlickNote.mjs'
import { CriticalSlideEndNote } from './notes/flatNotes/slideEndNotes/CriticalSlideEndNote.mjs'
import { NormalSlideEndNote } from './notes/flatNotes/slideEndNotes/NormalSlideEndNote.mjs'
import { CriticalSlideStartNote } from './notes/flatNotes/slideStartNotes/CriticalSlideStartNote.mjs'
import { NormalSlideStartNote } from './notes/flatNotes/slideStartNotes/NormalSlideStartNote.mjs'
import { CriticalTapNote } from './notes/flatNotes/tapNotes/CriticalTapNote.mjs'
import { NormalTapNote } from './notes/flatNotes/tapNotes/NormalTapNote.mjs'
import { CriticalSlideEndTraceNote } from './notes/flatNotes/traceNotes/CriticalSlideEndTraceNote.mjs'
import { CriticalSlideTraceNote } from './notes/flatNotes/traceNotes/CriticalSlideTraceNote.mjs'
import { CriticalTraceNote } from './notes/flatNotes/traceNotes/CriticalTraceNote.mjs'
import { NormalSlideEndTraceNote } from './notes/flatNotes/traceNotes/NormalSlideEndTraceNote.mjs'
import { NormalSlideTraceNote } from './notes/flatNotes/traceNotes/NormalSlideTraceNote.mjs'
import { NormalTraceNote } from './notes/flatNotes/traceNotes/NormalTraceNote.mjs'
import { HiddenSlideTickNote } from './notes/slideTickNotes/HiddenSlideTickNote.mjs'
import { IgnoredSlideTickNote } from './notes/slideTickNotes/IgnoredSlideTickNote.mjs'
import { CriticalSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/CriticalSlideTickNote.mjs'
import { NormalSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/NormalSlideTickNote.mjs'
import { CriticalAttachedSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/CriticalAttachedSlideTickNote.mjs'
import { NormalAttachedSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/NormalAttachedSlideTickNote.mjs'
import { CriticalSlideConnector } from './slideConnectors/CriticalSlideConnector.mjs'
import { NormalSlideConnector } from './slideConnectors/NormalSlideConnector.mjs'
import { CriticalActiveSlideConnector } from './slideConnectors/activeSlideConnectors/CriticalActiveSlideConnector.mjs'
import { NormalActiveSlideConnector } from './slideConnectors/activeSlideConnectors/NormalActiveSlideConnector.mjs'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,
    [EngineArchetypeName.TimeScaleChange]: TimeScaleChange,

    Stage,

    NormalTapNote,
    CriticalTapNote,

    NormalFlickNote,
    CriticalFlickNote,

    NormalTraceNote,
    CriticalTraceNote,

    NormalTraceFlickNote,
    CriticalTraceFlickNote,

    NormalSlideTraceNote,
    CriticalSlideTraceNote,

    NormalSlideStartNote,
    CriticalSlideStartNote,

    NormalSlideEndNote,
    CriticalSlideEndNote,

    NormalSlideEndTraceNote,
    CriticalSlideEndTraceNote,

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

    NormalActiveSlideConnector,
    CriticalActiveSlideConnector,

    SimLine,
})
