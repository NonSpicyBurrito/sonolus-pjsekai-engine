import { skin } from '../../../skin.js'
import { ActiveSlideConnector } from './ActiveSlideConnector.js'

export class NormalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.normalActiveSlideConnectorNormal,
        fallback: skin.sprites.normalActiveSlideConnectorFallback,
    }
}
