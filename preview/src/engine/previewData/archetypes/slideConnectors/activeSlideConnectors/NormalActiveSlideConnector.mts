import { skin } from '../../../skin.mjs'
import { ActiveSlideConnector } from './ActiveSlideConnector.mjs'

export class NormalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.normalActiveSlideConnectorNormal,
        fallback: skin.sprites.normalActiveSlideConnectorFallback,
    }
}
