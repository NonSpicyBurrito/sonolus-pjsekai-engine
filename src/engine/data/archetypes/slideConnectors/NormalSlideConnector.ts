import { effect } from '../../effect.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { SlideConnector } from './SlideConnector.js'

export class NormalSlideConnector extends SlideConnector {
    sprites = {
        connector: {
            normal: skin.sprites.normalSlideConnectorNormal,
            active: skin.sprites.normalSlideConnectorActive,
            fallback: skin.sprites.normalSlideConnectorFallback,
        },

        slide: {
            left: skin.sprites.slideNoteLeft,
            middle: skin.sprites.slideNoteMiddle,
            right: skin.sprites.slideNoteRight,
            fallback: skin.sprites.slideNoteFallback,
        },
    }

    clip = effect.clips.normalHold

    effects = {
        circular: particle.effects.normalSlideConnectorCircular,
        linear: particle.effects.normalSlideConnectorLinear,
    }

    get slideStartNote() {
        return archetypes.NormalSlideStartNote
    }
}
