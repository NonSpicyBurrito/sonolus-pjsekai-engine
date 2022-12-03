import { SkinSprite } from 'sonolus-core'
import {
    And,
    Draw,
    EntityInfo,
    EntityMemory,
    Equal,
    GreaterOr,
    Lerp,
    Multiply,
    Or,
    Script,
    State,
    Subtract,
    Switch,
    Time,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { archetypes } from '../archetypes'
import { baseNote, lane, Layer, origin } from './common/constants'
import { approach, getVisibleTime, getZ, isNotHidden, NoteData } from './common/note'
import { rectByEdge } from './common/utils'

export function simLine(): Script {
    const rIndex = EntityMemory.to<number>(0)
    const lIndex = Subtract(rIndex, 1)

    const time = EntityMemory.to<number>(1)
    const visibleTime = EntityMemory.to<number>(2)
    const isSlide = EntityMemory.to<boolean>(3)

    const lineL = EntityMemory.to<number>(4)
    const lineR = EntityMemory.to<number>(5)

    const lineScale = EntityMemory.to<number>(6)
    const lineB = EntityMemory.to<number>(7)
    const lineT = EntityMemory.to<number>(8)

    const z = EntityInfo.to<number>(8)

    const initialize = [
        time.set(NoteData.of(rIndex).time),
        visibleTime.set(getVisibleTime(time)),
        isSlide.set(
            Or(
                ...[lIndex, rIndex].map((index) =>
                    Switch(
                        EntityInfo.of(index).archetype,
                        [archetypes.slideStartIndex, archetypes.criticalSlideStartIndex].map(
                            (archetype) => [archetype, true]
                        ),
                        false
                    )
                )
            )
        ),

        lineL.set(Multiply(NoteData.of(lIndex).center, lane.w)),
        lineR.set(Multiply(NoteData.of(rIndex).center, lane.w)),

        z.set(getZ(Layer.SimLine, time, rIndex)),
    ]

    const updateParallel = Or(
        And(options.isAutoplay, GreaterOr(Time, time)),
        And(isSlide, GreaterOr(Time, time)),
        Equal(EntityInfo.of(lIndex).state, State.Despawned),
        Equal(EntityInfo.of(rIndex).state, State.Despawned),
        And(GreaterOr(Time, visibleTime), isNotHidden(time), [
            lineScale.set(approach(time)),
            lineB.set(Lerp(origin, baseNote.b, lineScale)),
            lineT.set(Lerp(origin, baseNote.t, lineScale)),

            Draw(
                SkinSprite.SimultaneousConnectionNeutral,
                ...rectByEdge(Multiply(lineL, lineScale), Multiply(lineR, lineScale), lineB, lineT),
                z,
                1
            ),
        ])
    )

    return {
        initialize,
        updateParallel,
    }
}
