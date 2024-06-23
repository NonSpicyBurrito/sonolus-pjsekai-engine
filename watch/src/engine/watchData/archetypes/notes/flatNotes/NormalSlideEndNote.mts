import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { effect } from '../../../effect.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { archetypes } from '../../index.mjs'
import { FlatNote } from './FlatNote.mjs'
import { lane } from '../../../../../../../shared/src/engine/data/lane.mjs'
import { perspectiveLayout } from '../../../../../../../shared/src/engine/data/utils.mjs'

export class NormalSlideEndNote extends FlatNote {
    sprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteEndFallback,
    }

    clips = {
        perfect: effect.clips.normalPerfect,
        great: effect.clips.normalPerfect,
        good: effect.clips.normalPerfect,
    }

    effects = {
        circular: particle.effects.slideNoteCircular,
        linear: particle.effects.slideNoteLinear,
    }

    windows = windows.slideEndNote.normal

    bucket = buckets.normalSlideEndNote

    get slotEffect() {
        return archetypes.SlideSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.SlideSlotGlowEffect
    }

    playLaneEffects() {
        particle.effects.lane.spawn(
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
