import { effect } from '../../../effect.js'
import { particle } from '../../../particle.js'
import { skin } from '../../../skin.js'
import { archetypes } from '../../index.js'
import { ActiveSlideConnector } from './ActiveSlideConnector.js'

export class CriticalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.criticalActiveSlideConnectorNormal,
        active: skin.sprites.criticalActiveSlideConnectorActive,
        fallback: skin.sprites.criticalActiveSlideConnectorFallback,
    }

    glowSprite = skin.sprites.criticalSlotGlow

    slideSprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }

    clips = {
        hold: effect.clips.criticalHold,
        fallback: effect.clips.normalHold,
    }

    effects = {
        circular: particle.effects.criticalSlideConnectorCircular,
        linear: particle.effects.criticalSlideConnectorLinear,
    }

    get slideStartNote() {
        return archetypes.CriticalSlideStartNote
    }
}
