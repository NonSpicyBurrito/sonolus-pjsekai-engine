import { perspectiveLayout } from '../../../../../../../../../shared/src/engine/data/utils.mjs'
import { windows } from '../../../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../../../buckets.mjs'
import { effect } from '../../../../../effect.mjs'
import { lane } from '../../../../../lane.mjs'
import { particle } from '../../../../../particle.mjs'
import { skin } from '../../../../../skin.mjs'
import { archetypes } from '../../../../index.mjs'
import { TraceFlickNote } from './TraceFlickNote.mjs'

export class CriticalTraceFlickNote extends TraceFlickNote {
    sprites = {
        left: skin.sprites.criticalTraceNoteLeft,
        middle: skin.sprites.criticalTraceNoteMiddle,
        right: skin.sprites.criticalTraceNoteRight,
        diamond: skin.sprites.criticalTraceNoteDiamond,
        fallback: skin.sprites.criticalTraceNoteFallback,
    }

    clips = {
        perfect: effect.clips.criticalFlick,
        fallback: effect.clips.flickPerfect,
    }

    effects = {
        circular: particle.effects.criticalNoteCircular,
        linear: particle.effects.criticalNoteLinear,
    }

    arrowSprites = {
        up: [
            skin.sprites.criticalArrowUp1,
            skin.sprites.criticalArrowUp2,
            skin.sprites.criticalArrowUp3,
            skin.sprites.criticalArrowUp4,
            skin.sprites.criticalArrowUp5,
            skin.sprites.criticalArrowUp6,
        ],
        left: [
            skin.sprites.criticalArrowLeft1,
            skin.sprites.criticalArrowLeft2,
            skin.sprites.criticalArrowLeft3,
            skin.sprites.criticalArrowLeft4,
            skin.sprites.criticalArrowLeft5,
            skin.sprites.criticalArrowLeft6,
        ],
        fallback: skin.sprites.criticalArrowFallback,
    }

    directionalEffect = particle.effects.criticalNoteDirectional

    windows = windows.traceFlickNote.critical

    bucket = buckets.criticalTraceFlickNote

    get slotEffect() {
        return archetypes.CriticalSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.CriticalSlotGlowEffect
    }

    playLaneEffects() {
        if (particle.effects.criticalFlickLane.exists) {
            particle.effects.criticalFlickLane.spawn(
                perspectiveLayout({
                    l: this.import.lane - this.import.size,
                    r: this.import.lane + this.import.size,
                    b: lane.b,
                    t: lane.t,
                }),
                1,
                false,
            )
        }
    }
}
