import {
    Add,
    And,
    Ceil,
    Code,
    EntityMemory,
    Floor,
    GreaterOr,
    HasSkinSprite,
    LessOr,
    Multiply,
    ParticleEffect,
    Pointer,
    Remap,
    Spawn,
    SpawnParticleEffect,
    Subtract,
    SwitchInteger,
} from 'sonolus.js'
import { scripts } from '..'
import { options } from '../../../configuration/options'
import { getSlotSprite } from '../slot-effect'
import { getSlotGlowSprite } from '../slot-glow-effect'
import {
    circularTapEffect,
    circularTickEffectSize,
    lane,
    linearTapEffect,
    origin,
    screen,
    stage,
} from './constants'
import { NoteData, NoteDataPointer } from './note'
import { rectBySize } from './utils'

export function playEmptyLaneEffect(index: Code<number>) {
    return And(
        options.isLaneEffectEnabled,
        SpawnParticleEffect(
            ParticleEffect.LaneLinear,
            Remap(origin, lane.b, 0, Multiply(index, lane.w), screen.b),
            screen.b,
            Remap(origin, lane.b, 0, Multiply(index, lane.w), stage.t),
            stage.t,
            Remap(origin, lane.b, 0, Multiply(Add(index, 1), lane.w), stage.t),
            stage.t,
            Remap(origin, lane.b, 0, Multiply(Add(index, 1), lane.w), screen.b),
            screen.b,
            0.3,
            false
        )
    )
}

export function playNoteLaneEffect(noteData: NoteDataPointer = NoteData) {
    return And(
        options.isLaneEffectEnabled,
        SpawnParticleEffect(
            ParticleEffect.LaneLinear,
            Remap(origin, lane.b, 0, noteData.laneL, screen.b),
            screen.b,
            Remap(origin, lane.b, 0, noteData.laneL, stage.t),
            stage.t,
            Remap(origin, lane.b, 0, noteData.laneR, stage.t),
            stage.t,
            Remap(origin, lane.b, 0, noteData.laneR, screen.b),
            screen.b,
            0.3,
            false
        )
    )
}

export function playNoteEffect(
    circular: number,
    linear: number,
    alternative: number,
    type: 'normal' | 'tick' | 'flick',
    center: Code<number> = NoteData.center,
    direction: Code<number> = NoteData.direction
) {
    const flickDirectionShear = SwitchInteger(
        direction,
        [Multiply(lane.w, -2), Multiply(lane.w, 2)],
        0
    )

    return And(options.isNoteEffectEnabled, [
        type === 'tick'
            ? SpawnParticleEffect(
                  circular,
                  ...rectBySize(
                      Multiply(center, lane.w),
                      lane.b,
                      circularTickEffectSize,
                      circularTickEffectSize
                  ),
                  0.6,
                  false
              )
            : SpawnParticleEffect(
                  circular,
                  Subtract(
                      Multiply(center, circularTapEffect.bw),
                      circularTapEffect.w
                  ),
                  circularTapEffect.b,
                  Subtract(
                      Multiply(center, circularTapEffect.tw),
                      circularTapEffect.w
                  ),
                  circularTapEffect.t,
                  Add(
                      Multiply(center, circularTapEffect.tw),
                      circularTapEffect.w
                  ),
                  circularTapEffect.t,
                  Add(
                      Multiply(center, circularTapEffect.bw),
                      circularTapEffect.w
                  ),
                  circularTapEffect.b,
                  0.6,
                  false
              ),

        type !== 'tick' &&
            SpawnParticleEffect(
                linear,
                Subtract(Multiply(center, lane.w), lane.w),
                lane.b,
                Subtract(Multiply(center, linearTapEffect.tw), lane.w),
                linearTapEffect.t,
                Add(Multiply(center, linearTapEffect.tw), lane.w),
                linearTapEffect.t,
                Add(Multiply(center, lane.w), lane.w),
                lane.b,
                0.5,
                false
            ),

        type === 'flick' &&
            SpawnParticleEffect(
                alternative,
                Subtract(Multiply(center, lane.w), lane.w),
                lane.b,
                Add(
                    Subtract(Multiply(center, linearTapEffect.tw), lane.w),
                    flickDirectionShear
                ),
                linearTapEffect.t,
                Add(
                    Add(Multiply(center, linearTapEffect.tw), lane.w),
                    flickDirectionShear
                ),
                linearTapEffect.t,
                Add(Multiply(center, lane.w), lane.w),
                lane.b,
                0.32,
                false
            ),

        false,
    ])
}

export function playSlotEffect(
    color: number,
    center: Code<number> = NoteData.center,
    width: Code<number> = NoteData.width,
    temp1: Pointer<number> = EntityMemory.to<number>(62),
    temp2: Pointer<number> = EntityMemory.to<number>(63)
) {
    const slotSprite = getSlotSprite(color)
    const slotGlowSprite = getSlotGlowSprite(color)

    return And(options.isSlotEffectEnabled, [
        And(HasSkinSprite(slotSprite), [
            temp1.set(Floor(Subtract(center, width))),
            temp2.set(Ceil(Add(center, width))),
            [...Array(12).keys()]
                .map((i) => i - 5.5)
                .map((center) =>
                    And(
                        GreaterOr(center, temp1),
                        LessOr(center, temp2),
                        Spawn(scripts.slotEffectIndex, [slotSprite, center])
                    )
                ),
        ]),
        And(
            HasSkinSprite(slotGlowSprite),
            Spawn(scripts.slotGlowEffectIndex, [slotGlowSprite, center, width])
        ),
    ])
}
