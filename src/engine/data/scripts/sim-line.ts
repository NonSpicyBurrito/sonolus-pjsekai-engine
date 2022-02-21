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
import { approachNote, NoteData } from './common/note'
import { rectByEdge } from './common/utils'

export function simLine(): Script {
    const rIndex = EntityMemory.to<number>(0)
    const lIndex = Subtract(rIndex, 1)

    const time = EntityMemory.to<number>(1)
    const isSlide = EntityMemory.to<boolean>(2)

    const lineL = EntityMemory.to<number>(3)
    const lineR = EntityMemory.to<number>(4)

    const lineScale = EntityMemory.to<number>(5)
    const lineB = EntityMemory.to<number>(6)
    const lineT = EntityMemory.to<number>(7)

    const initialize = [
        time.set(NoteData.of(rIndex).time),
        isSlide.set(
            Or(
                ...[lIndex, rIndex].map((index) =>
                    Switch(
                        EntityInfo.of(index).archetype,
                        [
                            archetypes.slideStartIndex,
                            archetypes.criticalSlideStartIndex,
                        ].map((archetype) => [archetype, true]),
                        false
                    )
                )
            )
        ),

        lineL.set(Multiply(NoteData.of(lIndex).center, lane.w)),
        lineR.set(Multiply(NoteData.of(rIndex).center, lane.w)),
    ]

    const updateParallel = Or(
        And(options.isAutoplay, GreaterOr(Time, time)),
        And(isSlide, GreaterOr(Time, time)),
        Equal(EntityInfo.of(lIndex).state, State.Despawned),
        Equal(EntityInfo.of(rIndex).state, State.Despawned),
        [
            lineScale.set(approachNote(time)),
            lineB.set(Lerp(origin, baseNote.b, lineScale)),
            lineT.set(Lerp(origin, baseNote.t, lineScale)),

            Draw(
                SkinSprite.SimultaneousConnectionNeutral,
                ...rectByEdge(
                    Multiply(lineL, lineScale),
                    Multiply(lineR, lineScale),
                    lineB,
                    lineT
                ),
                Layer.SimLine,
                1
            ),
        ]
    )

    return {
        initialize: {
            code: initialize,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
