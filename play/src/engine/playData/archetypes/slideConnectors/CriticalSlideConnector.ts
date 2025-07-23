import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { SlideConnector } from './SlideConnector.js'

export class CriticalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.criticalSlideConnectorNormal,
        active: skin.sprites.criticalSlideConnectorActive,
        fallback: skin.sprites.criticalSlideConnectorFallback,
    }

    get slideStartNote() {
        return archetypes.CriticalSlideStartNote
    }
}
