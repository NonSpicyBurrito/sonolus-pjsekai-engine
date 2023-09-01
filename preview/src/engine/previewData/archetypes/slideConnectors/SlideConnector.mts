import { EaseType, ease } from '../../../../../../shared/src/engine/data/EaseType.mjs'
import { panel } from '../../panel.mjs'
import { getZ, layer } from '../../skin.mjs'
import { SlideStartNote } from '../notes/flatNotes/slideStartNotes/SlideStartNote.mjs'

export abstract class SlideConnector extends Archetype {
    abstract sprites: {
        normal: SkinSprite
        fallback: SkinSprite
    }

    abstract slideStartNote: SlideStartNote

    data = this.defineData({
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        ease: { name: 'ease', type: DataType<EaseType> },
    })

    render() {
        const t = {
            min: bpmChanges.at(this.headData.beat).time,
            max: bpmChanges.at(this.tailData.beat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.h),
            max: Math.floor(t.max / panel.h),
        }

        const l = {
            min: this.headData.lane - this.headData.size,
            max: this.tailData.lane - this.tailData.size,
        }
        const r = {
            min: this.headData.lane + this.headData.size,
            max: this.tailData.lane + this.tailData.size,
        }

        const z = getZ(layer.note.connector, t.min, this.headData.lane)

        for (let i = index.min; i <= index.max; i++) {
            const x = i * panel.w

            const pt = {
                min: Math.max(t.min, i * panel.h),
                max: Math.min(t.max, (i + 1) * panel.h),
            }

            for (let j = 0; j < 10; j++) {
                const st = {
                    min: Math.lerp(pt.min, pt.max, j / 10),
                    max: Math.lerp(pt.min, pt.max, (j + 1) / 10),
                }

                const s = {
                    min: ease(this.data.ease, Math.unlerp(t.min, t.max, st.min)),
                    max: ease(this.data.ease, Math.unlerp(t.min, t.max, st.max)),
                }

                const pos = {
                    min: new Vec(x, st.min - i * panel.h),
                    max: new Vec(x, st.max - i * panel.h),
                }

                const layout = new Quad({
                    p1: pos.min.translate(Math.lerp(l.min, l.max, s.min), 0),
                    p2: pos.max.translate(Math.lerp(l.min, l.max, s.max), 0),
                    p3: pos.max.translate(Math.lerp(r.min, r.max, s.max), 0),
                    p4: pos.min.translate(Math.lerp(r.min, r.max, s.min), 0),
                })

                if (this.useFallbackSprite) {
                    this.sprites.fallback.draw(layout, z, 1)
                } else {
                    this.sprites.normal.draw(layout, z, 1)
                }
            }
        }
    }

    get headData() {
        return this.slideStartNote.data.get(this.data.headRef)
    }

    get tailData() {
        return this.slideStartNote.data.get(this.data.tailRef)
    }

    get useFallbackSprite() {
        return !this.sprites.normal.exists
    }
}
