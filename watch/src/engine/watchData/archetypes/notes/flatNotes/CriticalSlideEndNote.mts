import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { effect } from '../../../effect.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { archetypes } from '../../index.mjs'
import { FlatNote } from './FlatNote.mjs'
import { lane } from '../../../../../../../shared/src/engine/data/lane.mjs'
import { perspectiveLayout } from '../../../../../../../shared/src/engine/data/utils.mjs'

export class CriticalSlideEndNote extends FlatNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteEndFallback,
    }

    clips = {
        perfect: effect.clips.criticalTap,
        fallback: effect.clips.normalPerfect,
    }

    effects = {
        circular: particle.effects.criticalSlideNoteCircular,
        circularFallback: particle.effects.criticalNoteCircular,
        linear: particle.effects.criticalSlideNoteLinear,
        linearFallback: particle.effects.criticalNoteLinear,
    }

    windows = windows.slideEndNote.critical

    bucket = buckets.criticalSlideEndNote

    get slotEffect() {
        return archetypes.CriticalSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.CriticalSlotGlowEffect
    }

    get laneEffect() {
        return particle.effects.criticalTapLane.exists ? particle.effects.criticalTapLane : particle.effects.lane;
    }

    playLaneEffects() {
        const laneEffect = this.laneEffect;

        laneEffect.spawn(
            perspectiveLayout({
                l: this.import.lane - this.import.size,
                r: this.import.lane + this.import.size,
                b: lane.b,
                t: lane.t,
            }),
            1,
            false,
        );
    }
}
