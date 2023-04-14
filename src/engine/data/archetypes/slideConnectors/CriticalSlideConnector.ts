import { effect } from '../../effect.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { SlideConnector } from './SlideConnector.js'

export class CriticalSlideConnector extends SlideConnector {
    sprites = {
        connector: {
            normal: skin.sprites.criticalSlideConnectorNormal,
            active: skin.sprites.criticalSlideConnectorActive,
            fallback: skin.sprites.criticalSlideConnectorFallback,
        },

        slide: {
            left: skin.sprites.criticalNoteLeft,
            middle: skin.sprites.criticalNoteMiddle,
            right: skin.sprites.criticalNoteRight,
            fallback: skin.sprites.criticalNoteFallback,
        },
    }

    clip = effect.clips.criticalHold

    effects = {
        circular: particle.effects.criticalSlideConnectorCircular,
        linear: particle.effects.criticalSlideConnectorLinear,
    }

    get slideStartNote() {
        return archetypes.CriticalSlideStartNote
    }
}
