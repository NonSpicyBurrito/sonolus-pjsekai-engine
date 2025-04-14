import { windows } from '../../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../../buckets.mjs'
import { effect } from '../../../../effect.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { archetypes } from '../../../index.mjs'
import { SlideStartNote } from './SlideStartNote.mjs'
import { lane } from '../../../../../../../../shared/src/engine/data/lane.mjs'
import { perspectiveLayout } from '../../../../../../../../shared/src/engine/data/utils.mjs'

export class CriticalSlideStartNote extends SlideStartNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }

    clips = {
        perfect: effect.clips.normalPerfect,
    }

    effects = {
        circular: particle.effects.criticalSlideCircular,
        circularFallback: particle.effects.criticalNoteCircular,
        linear: particle.effects.criticalSlideLinear,
        linearFallback: particle.effects.criticalNoteLinear,
    }

    windows = windows.slideStartNote.critical

    bucket = buckets.criticalSlideStartNote

    get slotEffect() {
        return archetypes.CriticalSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.CriticalSlotGlowEffect
    }

    playLaneEffects() {
        if (particle.effects.criticalLane.exists) {
            particle.effects.criticalLane.spawn(
                perspectiveLayout({
                    l: this.import.lane - this.import.size,
                    r: this.import.lane + this.import.size,
                    b: lane.b,
                    t: lane.t,
                }),
                1,
                false, 
            )
        } else {
            particle.effects.lane.spawn(
                perspectiveLayout({
                    l: this.import.lane - this.import.size,
                    r: this.import.lane + this.import.size,
                    b: lane.b,
                    t: lane.t,
                }),
                0.3,
                false,
            )
        }
    }
}
