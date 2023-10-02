import { skin } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { SlideConnector } from './SlideConnector.mjs'

export class CriticalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.criticalActiveSlideConnectorNormal,
        fallback: skin.sprites.criticalActiveSlideConnectorFallback,
    }

    get slideStartNote() {
        return archetypes.CriticalSlideStartNote
    }
}
