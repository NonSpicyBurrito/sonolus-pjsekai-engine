import { skin } from '../../skin.mjs'
import { SlideConnector } from './SlideConnector.mjs'

export class CriticalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.criticalSlideConnectorNormal,
        fallback: skin.sprites.criticalSlideConnectorFallback,
    }
}
