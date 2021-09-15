import {
    Add,
    And,
    Code,
    createEntityData,
    createEntitySharedMemory,
    Divide,
    EntityInfo,
    EntityMemory,
    Equal,
    If,
    InputAccuracy,
    InputBucket,
    InputJudgment,
    InputOffset,
    Lerp,
    LessOr,
    Multiply,
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
import { baseNote, lane, noteOnScreenDuration, origin } from './constants'
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

export const NoteSharedMemory = createEntitySharedMemory(
    NoteSharedMemoryPointer
)

// Memory

export const noteSpawnTime = EntityMemory.to<number>(32)
export const noteZ = EntityMemory.to<number>(33)
export const noteHitboxL = EntityMemory.to<number>(34)
export const noteHitboxR = EntityMemory.to<number>(35)
export const noteInputState = EntityMemory.to<InputState>(36)

export const noteScale = EntityMemory.to<number>(48)
export const noteBottom = EntityMemory.to<number>(49)
export const noteTop = EntityMemory.to<number>(50)

// Touch

export function checkTouchXInNoteHitbox(x: Code<number> = TouchX) {
    return checkTouchXInHitbox(noteHitboxL, noteHitboxR, x)
}

export function checkNoteTimeInEarlyWindow(earlyWindow: number) {
    return LessOr(
        Subtract(NoteData.time, Subtract(Time, InputOffset)),
        earlyWindow
    )
}

// Note

export function approach(x: Code<number>) {
    return Power(1.06, Multiply(Subtract(x, 1), 45))
}
export function approachNote(time: Code<number>) {
    return approach(
        Subtract(1, Divide(Subtract(time, Time), noteOnScreenDuration))
    )
}

export function getSpawnTime(time: Code<number>) {
    return Subtract(time, noteOnScreenDuration)
}

export function getZ(layer: number, time: Code<number>, center: Code<number>) {
    return Subtract(layer, Divide(time, 1000), Divide(center, -10000))
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
        directions.map((direction) =>
            direction.set(SwitchInteger(direction, [1, 0], -1))
        )
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
        noteZ.set(getZ(layer, NoteData.time, NoteData.center)),
        calculateHitbox(
            NoteData.center,
            NoteData.width,
            leniency,
            noteHitboxL,
            noteHitboxR
        ),

        If(
            options.isAutoplay,
            [InputJudgment.set(1), InputBucket.set(bucket)],
            InputAccuracy.set(missAccuracy)
        ),
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

export function updateNoteY() {
    return [
        noteScale.set(approachNote(NoteData.time)),
        noteBottom.set(Lerp(origin, baseNote.b, noteScale)),
        noteTop.set(Lerp(origin, baseNote.t, noteScale)),
    ]
}
