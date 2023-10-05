import { skin } from '../../skin.mjs'
import { SlideConnector } from './SlideConnector.mjs'

export class NormalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.normalSlideConnectorNormal,
        fallback: skin.sprites.normalSlideConnectorFallback,
    }
}
