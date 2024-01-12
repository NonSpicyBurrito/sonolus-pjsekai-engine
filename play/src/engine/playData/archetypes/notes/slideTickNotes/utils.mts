import { ease } from '../../../../../../../shared/src/engine/data/EaseType.mjs'
import { archetypes } from '../../index.mjs'

export const getAttached = (ref: number, targetTime: number) => {
    const attachImport = archetypes.NormalSlideConnector.import.get(ref)

    const imports = {
        head: archetypes.NormalSlideStartNote.import.get(attachImport.headRef),
        tail: archetypes.NormalSlideStartNote.import.get(attachImport.tailRef),
    }

    const t = {
        min: bpmChanges.at(imports.head.beat).time,
        max: bpmChanges.at(imports.tail.beat).time,
    }

    const st = {
        min: timeScaleChanges.at(t.min).scaledTime,
        max: timeScaleChanges.at(t.max).scaledTime,
        tick: timeScaleChanges.at(targetTime).scaledTime,
    }

    const s = ease(attachImport.ease, Math.unlerpClamped(st.min, st.max, st.tick))

    return {
        lane: Math.lerp(imports.head.lane, imports.tail.lane, s),
        size: Math.lerp(imports.head.size, imports.tail.size, s),
    }
}
