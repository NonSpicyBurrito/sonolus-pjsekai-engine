import { skin } from '../../../skin.mjs'
import { ActiveSlideConnector } from './ActiveSlideConnector.mjs'

export class CriticalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.criticalActiveSlideConnectorNormal,
        fallback: skin.sprites.criticalActiveSlideConnectorFallback,
    }
}
