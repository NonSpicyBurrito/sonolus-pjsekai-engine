import {
    Add,
    customEffectClip,
    customSkinSprite,
    Divide,
    GreaterOr,
    If,
    Lerp,
    Multiply,
    Power,
    Remap,
    ScreenAspectRatio,
    Subtract,
    UnlerpClamped,
} from 'sonolus.js'
import { options } from '../../../configuration/options'
import { Window } from './window'

// Engine

export const engineId = 2

// Input

export const minFlickVR = 0.5

// Windows

export const windows = {
    tapNote: {
        normal: new Window(2.5, 5, 7.5),
        critical: new Window(3.3, 4.5, 7.5),
    },
    flickNote: {
        normal: new Window(2.5, [6.5, 7.5], [7.5, 8.5]),
        critical: new Window(3.5, [6.5, 7.5], [7.5, 8.5]),
    },
    slideStart: {
        normal: new Window(2.5, 5, 7.5),
        critical: new Window(3.3, 4.5, 7.5),
    },
    slideEnd: {
        normal: new Window([3.5, 4], [6.5, 8], [7.5, 8.5]),
        critical: new Window([3.5, 4], [6.5, 8], [7.5, 8.5]),
    },
    slideEndFlick: {
        normal: new Window([3.5, 4], [6.5, 8], [7.5, 8.5]),
        critical: new Window([3.5, 4], [6.5, 8], [7.5, 8.5]),
    },
}

// SFX

export const minSFXDistance = 0.02

// Sekai SFX

export const criticalTapClip = customEffectClip(engineId, 1)
export const criticalTickClip = customEffectClip(engineId, 2)
export const criticalFlickClip = customEffectClip(engineId, 3)
export const tickClip = customEffectClip(engineId, 4)
export const criticalHoldClip = customEffectClip(engineId, 5)

// Layers

export enum Layer {
    Cover = 1000,
    SlotGlowEffect = 200,
    NoteArrow = 102,
    NoteTick = 101,
    NoteBody = 100,
    NoteSlide = 99,
    NoteConnector = 98,
    SimLine = 97,
    SlotEffect = 50,
    JudgmentLine = 1,
    Stage = 0,
}

// Screen

export const screen = {
    w: Multiply(ScreenAspectRatio, 2),
    h: 2,

    l: Multiply(ScreenAspectRatio, -1),
    r: ScreenAspectRatio,
    b: -1,
    t: 1,
}

// Stage

const targetAspectRatio = 16 / 9

const stageWidth = If(
    options.isStageAspectRatioLocked,
    If(GreaterOr(ScreenAspectRatio, targetAspectRatio), targetAspectRatio * screen.h, screen.w),
    screen.w
)
const stageHeight = If(
    options.isStageAspectRatioLocked,
    If(
        GreaterOr(ScreenAspectRatio, targetAspectRatio),
        screen.h,
        Divide(screen.w, targetAspectRatio)
    ),
    screen.h
)
export const stage = {
    w: stageWidth,
    h: stageHeight,

    l: Multiply(stageWidth, -0.5),
    r: Multiply(stageWidth, 0.5),
    b: Multiply(stageHeight, -0.5),
    t: Multiply(stageHeight, 0.5),
}

export const origin = Multiply(stage.h, 0.5 + 1.15875 * (47 / 1176))

const laneHeight = Multiply(stage.h, 1.15875 * (803 / 1176))
export const lane = {
    w: Multiply(stage.w, (1.15875 * (1420 / 1176)) / targetAspectRatio / 12),
    h: laneHeight,

    t: stage.t,
    b: Subtract(stage.t, laneHeight),
}

// Stage with Sekai Sprites

export const SekaiStageSprite = customSkinSprite(engineId, 1)

const sekaiStageWidth = Multiply(stage.w, (1.15875 * (2048 / 1176)) / targetAspectRatio)
const sekaiStageHeight = Multiply(stage.h, 1.15875)

export const sekaiStage = {
    w: sekaiStageWidth,
    h: sekaiStageHeight,

    l: Multiply(sekaiStageWidth, -0.5),
    r: Multiply(sekaiStageWidth, 0.5),
    b: Subtract(stage.t, sekaiStageHeight),
    t: stage.t,
}

// Note

export const noteHeight = Multiply(stage.h, 1.15875 * (75 / 1176))
export const halfNoteHeight = Multiply(noteHeight, 0.5)

const baseNoteTop = Add(lane.b, halfNoteHeight)
const baseNoteBottom = Subtract(lane.b, halfNoteHeight)
export const baseNote = {
    t: baseNoteTop,
    b: baseNoteBottom,

    tw: Remap(origin, lane.b, 0, lane.w, baseNoteTop),
    bw: Remap(origin, lane.b, 0, lane.w, baseNoteBottom),
}

export const noteOnScreenDuration = Lerp(
    0.35,
    4,
    Power(UnlerpClamped(12, 1, options.noteSpeed), 1.31)
)

// Tap Effect

const circularTapEffectHeight = Multiply(lane.w, 1.05, options.noteEffectSize)
const circularTapEffectTop = Add(lane.b, circularTapEffectHeight)
const circularTapEffectBottom = Subtract(lane.b, circularTapEffectHeight)
export const circularTapEffect = {
    t: circularTapEffectTop,
    b: circularTapEffectBottom,

    w: Multiply(lane.w, 1.75, options.noteEffectSize),
    tw: Remap(origin, lane.b, 0, lane.w, circularTapEffectTop),
    bw: Remap(origin, lane.b, 0, lane.w, circularTapEffectBottom),
}

export const circularTickEffectSize = Multiply(lane.w, 4, options.noteEffectSize)

export const linearTapEffect = {
    t: Add(lane.b, Multiply(lane.w, 2, options.noteEffectSize)),

    w: Multiply(lane.w, options.noteEffectSize),
    tw: Multiply(lane.w, Lerp(1, 1.125, options.noteEffectSize)),
}

// Hold Effect

const circularHoldEffectHeight = Multiply(lane.w, 2.1, options.noteEffectSize)
const circularHoldEffectTop = Add(lane.b, circularHoldEffectHeight)
const circularHoldEffectBottom = Subtract(lane.b, circularHoldEffectHeight)
export const circularHoldEffect = {
    t: circularHoldEffectTop,
    b: circularHoldEffectBottom,

    w: Multiply(lane.w, 3.5, options.noteEffectSize),
    tw: Remap(origin, lane.b, 0, lane.w, circularHoldEffectTop),
    bw: Remap(origin, lane.b, 0, lane.w, circularHoldEffectBottom),
}

export const linearHoldEffect = {
    t: Add(lane.b, Multiply(lane.w, 2, options.noteEffectSize)),

    w: Multiply(lane.w, options.noteEffectSize),
    tw: Multiply(lane.w, Lerp(1, 1.125, options.noteEffectSize)),
}
