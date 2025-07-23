import { note } from '../../../../note.js'
import { panel } from '../../../../panel.js'
import { scaledScreen } from '../../../../scaledScreen.js'
import { getZ, layer } from '../../../../skin.js'
import { SlideTickNote } from '../SlideTickNote.js'

export abstract class VisibleSlideTickNote extends SlideTickNote {
    abstract sprites: {
        tick: SkinSprite
        fallback: SkinSprite
    }

    render() {
        const time = bpmChanges.at(this.import.beat).time
        const pos = panel.getPos(time)

        const z = getZ(layer.note.tick, time, this.import.lane)

        const b = -note.h
        const t = note.h

        if (this.useFallbackSprite) {
            const l = this.import.lane - this.import.size
            const r = this.import.lane + this.import.size

            this.sprites.fallback.draw(new Rect({ l, r, b, t }).add(pos), z, 1)
        } else {
            const w = note.h / scaledScreen.wToH

            const l = this.import.lane - w
            const r = this.import.lane + w

            this.sprites.tick.draw(new Rect({ l, r, b, t }).add(pos), z, 1)
        }
    }

    get useFallbackSprite() {
        return !this.sprites.tick.exists
    }
}
