import { options } from '../../configuration/options.mjs'

const disallowedEmpties = levelMemory({
    old: Collection(16, TouchId),
    now: Collection(16, TouchId),
})

export const canEmpty = (touch: Touch) => !disallowedEmpties.now.has(touch.id)

export const disallowEmpty = (touch: Touch) => disallowedEmpties.now.add(touch.id)

const claimedStarts = levelMemory(
    Dictionary(16, Number, {
        index: Number,
        time: Number,
        accurate: Boolean,
    }),
)

export const tryClaimStart = (index: number, time: number, hitbox: Rect, fullHitbox: Rect) => {
    for (const touch of touches) {
        if (!touch.started) continue
        if (!fullHitbox.contains(touch.position)) continue

        const claimedIndex = claimedStarts.indexOf(touch.index)
        if (claimedIndex === -1) {
            claimedStarts.set(touch.index, {
                index,
                time,
                accurate: hitbox.contains(touch.position),
            })

            continue
        }

        const claimedStart = claimedStarts.getValue(claimedIndex)
        if (time > claimedStart.time) continue

        if (time < claimedStart.time) {
            claimedStarts.set(touch.index, {
                index,
                time,
                accurate: hitbox.contains(touch.position),
            })

            continue
        }

        if (claimedStart.accurate) continue

        if (!hitbox.contains(touch.position)) continue

        claimedStarts.set(touch.index, {
            index,
            time,
            accurate: true,
        })
    }
}

export const getClaimedStartTouchIndex = (index: number) => {
    for (const [touchIndex, claimedStart] of claimedStarts) {
        if (claimedStart.index === index) return touchIndex
    }

    return -1
}

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

        claimedStarts.clear()

        for (const touch of touches) {
            if (disallowedEmpties.old.has(touch.id)) disallowedEmpties.now.add(touch.id)

            const index = disallowedEnds.old.indexOf(touch.id)
            if (index !== -1) disallowedEnds.now.set(touch.id, disallowedEnds.old.getValue(index))
        }
    }
}
