import { options } from '../../configuration/options.mjs'
import { ClaimManager } from './ClaimManager.mjs'

const disallowedEmpties = levelMemory({
    old: Collection(16, TouchId),
    now: Collection(16, TouchId),
})

export const canEmpty = (touch: Touch) => !disallowedEmpties.now.has(touch.id)

export const disallowEmpty = (touch: Touch) => disallowedEmpties.now.add(touch.id)

export const claimStartManager = new ClaimManager((touch) => touch.started)

export const claimEndManager = new ClaimManager((touch) => touch.ended && canEnd(touch))

const disallowedEnds = levelMemory({
    old: Dictionary(16, TouchId, Number),
    now: Dictionary(16, TouchId, Number),
})

export const canEnd = (touch: Touch) => {
    const index = disallowedEnds.now.indexOf(touch.id)
    if (index === -1) return true

    return disallowedEnds.now.getValue(index) < touch.time
}

export const disallowEnd = (touch: Touch, untilTime: number) =>
    disallowedEnds.now.set(touch.id, untilTime)

export class InputManager extends Archetype {
    spawnOrder() {
        return 1
    }

    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    updateSequential() {
        if (options.autoplay) return

        claimStartManager.clear()

        claimEndManager.clear()

        disallowedEmpties.now.copyTo(disallowedEmpties.old)
        disallowedEmpties.now.clear()

        disallowedEnds.now.copyTo(disallowedEnds.old)
        disallowedEnds.now.clear()

        for (const touch of touches) {
            if (disallowedEmpties.old.has(touch.id)) disallowedEmpties.now.add(touch.id)

            const index = disallowedEnds.old.indexOf(touch.id)
            if (index !== -1) disallowedEnds.now.set(touch.id, disallowedEnds.old.getValue(index))
        }
    }
}
