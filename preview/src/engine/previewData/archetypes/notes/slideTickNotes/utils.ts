import { ease } from '../../../../../../../shared/src/engine/data/EaseType.js'
import { archetypes } from '../../index.js'

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

    const s = ease(attachImport.ease, Math.unlerpClamped(t.min, t.max, targetTime))

    return {
        lane: Math.lerp(imports.head.lane, imports.tail.lane, s),
        size: Math.lerp(imports.head.size, imports.tail.size, s),
    }
}
