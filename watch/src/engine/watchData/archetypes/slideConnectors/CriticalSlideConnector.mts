import { skin } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { SlideConnector } from './SlideConnector.mjs'

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
