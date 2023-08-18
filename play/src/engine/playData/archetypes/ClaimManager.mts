export class ClaimManager {
    claimed = levelMemory(
        Dictionary(16, Number, {
            index: Number,
            time: Number,
            hitbox: Rect,
            fullHitbox: Rect,
        }),
    )

    claim(
        index: number,
        time: number,
        hitbox: Rect,
        fullHitbox: Rect,
        checkTouch: (touch: Touch) => boolean,
    ) {
        // eslint-disable-next-line no-constant-condition, @typescript-eslint/no-unnecessary-condition
        while (true) {
            const touchIndex = this.findBestTouchIndex(time, hitbox, fullHitbox, checkTouch)
            if (touchIndex === -1) return

            const claimedIndex = this.claimed.indexOf(touchIndex)
            if (claimedIndex === -1) {
                this.claimed.set(touchIndex, {
                    index,
                    time,
                    hitbox,
                    fullHitbox,
                })
                return
            }

            const replaced = this.claimed.getValue(claimedIndex)

            this.claimed.set(touchIndex, {
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

    getClaimedTouchIndex(index: number) {
        for (const [touchIndex, claimedStart] of this.claimed) {
            if (claimedStart.index === index) return touchIndex
        }

        return -1
    }

    clear() {
        this.claimed.clear()
    }

    findBestTouchIndex(
        time: number,
        hitbox: Rect,
        fullHitbox: Rect,
        checkTouch: (touch: Touch) => boolean,
    ) {
        const x = (hitbox.l + hitbox.r) / 2

        let i = -1
        let minDist = 0

        for (const touch of touches) {
            if (!checkTouch(touch)) continue
            if (!fullHitbox.contains(touch.position)) continue

            const dist = Math.abs(touch.position.x - x)
            if (i !== -1 && dist >= minDist) continue

            const claimedIndex = this.claimed.indexOf(touch.index)
            if (claimedIndex === -1) {
                i = touch.index
                minDist = dist
                continue
            }

            const claimedStart = this.claimed.getValue(claimedIndex)
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
}
