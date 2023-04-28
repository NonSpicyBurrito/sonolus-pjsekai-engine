import { options } from '../../configuration/options.js'

const disallowedEmpties = levelMemory({
    old: Collection(16, TouchId),
    now: Collection(16, TouchId),
})

export const canEmpty = (touch: Touch) => !disallowedEmpties.now.has(touch.id)

export const disallowEmpty = (touch: Touch) => disallowedEmpties.now.add(touch.id)

const disallowedStarts = levelMemory(Collection(16, TouchId))

export const canStart = (touch: Touch) => !disallowedStarts.has(touch.id)

export const disallowStart = (touch: Touch) => disallowedStarts.add(touch.id)

const disallowedEnds = levelMemory({
    old: Dictionary(16, TouchId, Number),
    now: Dictionary(16, TouchId, Number),
})

export const canEnd = (touch: Touch, afterTime: number) => {
    const index = disallowedEnds.now.indexOf(touch.id)
    if (index === -1) return true

    return disallowedEnds.now.getValue(index) < afterTime
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

        disallowedEmpties.now.copyTo(disallowedEmpties.old)
        disallowedEmpties.now.clear()

        disallowedEnds.now.copyTo(disallowedEnds.old)
        disallowedEnds.now.clear()
    }

    touch() {
        if (options.autoplay) return

        disallowedStarts.clear()

        for (const touch of touches) {
            if (disallowedEmpties.old.has(touch.id)) disallowedEmpties.now.add(touch.id)

            const index = disallowedEnds.old.indexOf(touch.id)
            if (index !== -1) disallowedEnds.now.set(touch.id, disallowedEnds.old.getValue(index))
        }
    }
}
