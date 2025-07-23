import { effect } from '../../../effect.js'
import { particle } from '../../../particle.js'
import { skin } from '../../../skin.js'
import { archetypes } from '../../index.js'
import { ActiveSlideConnector } from './ActiveSlideConnector.js'

export class NormalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.normalActiveSlideConnectorNormal,
        active: skin.sprites.normalActiveSlideConnectorActive,
        fallback: skin.sprites.normalActiveSlideConnectorFallback,
    }

    glowSprite = skin.sprites.slideSlotGlow

    slideSprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteFallback,
    }

    clips = {
        hold: effect.clips.normalHold,
        fallback: effect.clips.normalHold,
    }

    effects = {
        circular: particle.effects.normalSlideConnectorCircular,
        linear: particle.effects.normalSlideConnectorLinear,
    }

    get slideStartNote() {
        return archetypes.NormalSlideStartNote
    }
}
