import {
    Add,
    And,
    AudioOffset,
    Code,
    createEntityData,
    createEntitySharedMemory,
    Divide,
    EntityInfo,
    EntityMemory,
    Equal,
    GreaterOr,
    If,
    InputAccuracy,
    InputBucket,
    InputJudgment,
    InputOffset,
    Lerp,
    LessOr,
    Min,
    Mod,
    Multiply,
    Or,
    PlayScheduled,
    Pointer,
    Power,
    Spawn,
    Subtract,
    Switch,
    SwitchInteger,
    Time,
    TouchX,
} from 'sonolus.js'
import { scripts } from '..'
import { options } from '../../../configuration/options'
import { archetypes } from '../../archetypes'
import { baseNote, lane, minSFXDistance, noteOnScreenDuration, origin } from './constants'
import { checkTouchXInHitbox } from './touch'

export enum InputState {
    Waiting,
    Activated,
    Terminated,
}

// Data

export class NoteDataPointer extends Pointer {
    public get time() {
        return this.to<number>(0)
    }

    public get center() {
        return this.to<number>(1)
    }

    public get width() {
        return this.to<number>(2)
    }

    public get direction() {
        return this.to<number>(3)
    }

    public get headIndex() {
        return this.to<number>(4)
    }

    public get headSharedMemory() {
        return NoteSharedMemory.of(this.headIndex)
    }
}

export const NoteData = createEntityData(NoteDataPointer)

// Shared Memory

export class NoteSharedMemoryPointer extends Pointer {
    public get slideTime() {
        return this.to<number>(0)
    }

    public get slideHitboxL() {
        return this.to<number>(1)
    }

    public get slideHitboxR() {
        return this.to<number>(2)
    }
}

export const NoteSharedMemory = createEntitySharedMemory(NoteSharedMemoryPointer)

// Memory

export const noteSpawnTime = EntityMemory.to<number>(32)
export const noteVisibleTime = EntityMemory.to<number>(33)
export const noteZ = EntityMemory.to<number>(34)
export const noteHitboxL = EntityMemory.to<number>(35)
export const noteHitboxR = EntityMemory.to<number>(36)
export const noteInputState = EntityMemory.to<InputState>(37)

export const noteAutoSFXScheduleTime = EntityMemory.to<number>(38)
export const noteNeedScheduleAutoSFX = EntityMemory.to<boolean>(39)

export const noteScale = EntityMemory.to<number>(48)
export const noteBottom = EntityMemory.to<number>(49)
export const noteTop = EntityMemory.to<number>(50)

// Touch

export function checkTouchXInNoteHitbox(x: Code<number> = TouchX) {
    return checkTouchXInHitbox(noteHitboxL, noteHitboxR, x)
}

export function checkNoteTimeInEarlyWindow(earlyWindow: number) {
    return LessOr(Subtract(NoteData.time, Subtract(Time, InputOffset)), earlyWindow)
}

// Note

export function approach(time: Code<number>) {
    return Power(
        1.06,
        Multiply(Subtract(Subtract(1, Divide(Subtract(time, Time), noteOnScreenDuration)), 1), 45)
    )
}

export function getVisibleTime(time: Code<number>) {
    return Subtract(time, noteOnScreenDuration)
}
export function getScheduleTime(time: Code<number>) {
    return Subtract(time, AudioOffset, 0.5)
}
export function getSpawnTime(time: Code<number>) {
    return Min(getVisibleTime(time), getScheduleTime(time))
}

export function getZ(
    layer: number,
    time: Code<number> = NoteData.time,
    index: Code<number> = EntityInfo.index
) {
    return Subtract(layer, Divide(Mod(time, 10), 10), Divide(Mod(index, 100), 100000))
}

export function isNotHidden(time: Code<number> = NoteData.time) {
    return Or(
        LessOr(options.hidden, 0),
        GreaterOr(Divide(Subtract(time, Time), noteOnScreenDuration), options.hidden)
    )
}

export function applyLevelSpeed(...times: Pointer<number>[]) {
    return times.map((time) => time.set(Divide(time, options.speed)))
}
export function applyMirrorCenters(...centers: Pointer<number>[]) {
    return And(
        options.isMirrorEnabled,
        centers.map((center) => center.set(Multiply(center, -1)))
    )
}
export function applyMirrorDirections(...directions: Pointer<number>[]) {
    return And(
        options.isMirrorEnabled,
        directions.map((direction) => direction.set(SwitchInteger(direction, [1, 0], -1)))
    )
}

export function calculateHitbox(
    center: Code<number>,
    width: Code<number>,
    leniency: number,
    hitboxL: Pointer<number>,
    hitboxR: Pointer<number>
) {
    return [
        hitboxL.set(Multiply(Subtract(center, width, leniency), lane.w)),
        hitboxR.set(Multiply(Add(center, width, leniency), lane.w)),
    ]
}

export function preprocessNote(
    bucket: number,
    missAccuracy: number,
    leniency: number,
    layer: number
) {
    return [
        applyLevelSpeed(NoteData.time),
        applyMirrorCenters(NoteData.center),

        noteSpawnTime.set(getSpawnTime(NoteData.time)),
        noteVisibleTime.set(getVisibleTime(NoteData.time)),
        noteZ.set(getZ(layer)),
        calculateHitbox(NoteData.center, NoteData.width, leniency, noteHitboxL, noteHitboxR),

        If(
            options.isAutoplay,
            [InputJudgment.set(1), InputBucket.set(bucket)],
            InputAccuracy.set(missAccuracy)
        ),

        And(options.isSFXEnabled, Or(options.isAutoplay, options.isAutoSFX), [
            noteAutoSFXScheduleTime.set(getScheduleTime(NoteData.time)),
            noteNeedScheduleAutoSFX.set(true),
        ]),
    ]
}

export function initializeNoteSimLine() {
    const lIndex = Subtract(EntityInfo.index, 1)

    return And(
        options.isSimLineEnabled,
        Equal(NoteData.time, NoteData.of(lIndex).time),
        Switch(
            EntityInfo.of(lIndex).archetype,
            [
                archetypes.tapNoteIndex,
                archetypes.flickNoteIndex,
                archetypes.slideStartIndex,
                archetypes.slideEndIndex,
                archetypes.slideEndFlickIndex,
                archetypes.criticalTapNoteIndex,
                archetypes.criticalFlickNoteIndex,
                archetypes.criticalSlideStartIndex,
                archetypes.criticalSlideEndIndex,
                archetypes.criticalSlideEndFlickIndex,
            ].map((archetype) => [archetype, true]),
            false
        ),
        Spawn(scripts.simLineIndex, [EntityInfo.index])
    )
}

export function scheduleNoteAutoSFX(clip: Code<number>) {
    return And(
        options.isSFXEnabled,
        Or(options.isAutoplay, options.isAutoSFX),
        noteNeedScheduleAutoSFX,
        GreaterOr(Time, noteAutoSFXScheduleTime),
        [PlayScheduled(clip, NoteData.time, minSFXDistance), noteNeedScheduleAutoSFX.set(false)]
    )
}

export function updateNoteY() {
    return [
        noteScale.set(approach(NoteData.time)),
        noteBottom.set(Lerp(origin, baseNote.b, noteScale)),
        noteTop.set(Lerp(origin, baseNote.t, noteScale)),
    ]
}
