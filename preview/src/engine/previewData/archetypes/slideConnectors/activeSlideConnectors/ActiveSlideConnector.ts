import { SlideConnector } from '../SlideConnector.js'

export abstract class ActiveSlideConnector extends SlideConnector {
    getAlpha() {
        return 1
    }
}
