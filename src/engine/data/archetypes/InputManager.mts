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
        hitbox: Rect,
        fullHitbox: Rect,
    }),
)

export const tryClaimStart = (index: number, time: number, hitbox: Rect, fullHitbox: Rect) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const touchIndex = findBestTouchIndex(time, hitbox, fullHitbox)
        if (touchIndex === -1) return

        const claimedIndex = claimedStarts.indexOf(touchIndex)
        if (claimedIndex === -1) {
            claimedStarts.set(touchIndex, {
                index,
                time,
                hitbox,
                fullHitbox,
            })
            return
        }

        const replaced = claimedStarts.getValue(claimedIndex)

        claimedStarts.set(touchIndex, {
            index,
            time,
            hitbox,
            fullHitbox,
        })

        index = replaced.index
        time = replaced.time
        hitbox.copyFrom(replaced.hitbox)
        fullHitbox.copyFrom(replaced.fullHitbox)
    }
}

const findBestTouchIndex = (time: number, hitbox: Rect, fullHitbox: Rect) => {
    const x = (hitbox.l + hitbox.r) / 2

    let i = -1
    let minDist = 0

    for (const touch of touches) {
        if (!touch.started) continue
        if (!fullHitbox.contains(touch.position)) continue

        const dist = Math.abs(touch.position.x - x)
        if (i !== -1 && dist >= minDist) continue

        const claimedIndex = claimedStarts.indexOf(touch.index)
        if (claimedIndex === -1) {
            i = touch.index
            minDist = dist
            continue
        }

        const claimedStart = claimedStarts.getValue(claimedIndex)
        if (time > claimedStart.time) continue

        if (time < claimedStart.time) {
            i = touch.index
            minDist = dist
            continue
        }

        if (claimedStart.hitbox.contains(touch.position)) continue

        if (!hitbox.contains(touch.position)) continue

        i = touch.index
        minDist = dist
    }

    return i
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
