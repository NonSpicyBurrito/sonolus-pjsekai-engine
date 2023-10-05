import { SlideConnector } from '../SlideConnector.mjs'

export abstract class ActiveSlideConnector extends SlideConnector {
    getAlpha() {
        return 1
    }
}
