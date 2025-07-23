import { skin } from '../../skin.js'
import { SlideConnector } from './SlideConnector.js'

export class CriticalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.criticalSlideConnectorNormal,
        fallback: skin.sprites.criticalSlideConnectorFallback,
    }
}
