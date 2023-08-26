import { ease } from '../../../../../../../shared/src/engine/data/EaseType.mjs'
import { archetypes } from '../../index.mjs'

export const getAttached = (ref: number, targetTime: number) => {
    const attachData = archetypes.NormalSlideConnector.data.get(ref)

    const data = {
        head: archetypes.NormalSlideStartNote.data.get(attachData.headRef),
        tail: archetypes.NormalSlideStartNote.data.get(attachData.tailRef),
    }

    const t = {
        min: bpmChanges.at(data.head.beat).time,
        max: bpmChanges.at(data.tail.beat).time,
    }

    const s = ease(attachData.ease, Math.unlerpClamped(t.min, t.max, targetTime))

    return {
        lane: Math.lerp(data.head.lane, data.tail.lane, s),
        size: Math.lerp(data.head.size, data.tail.size, s),
    }
}
