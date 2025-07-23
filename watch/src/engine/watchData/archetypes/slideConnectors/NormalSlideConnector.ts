import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { SlideConnector } from './SlideConnector.js'

export class NormalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.normalSlideConnectorNormal,
        active: skin.sprites.normalSlideConnectorActive,
        fallback: skin.sprites.normalSlideConnectorFallback,
    }

    get slideStartNote() {
        return archetypes.NormalSlideStartNote
    }
}
