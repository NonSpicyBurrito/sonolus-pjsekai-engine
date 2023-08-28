import { FlickDirection } from './FlickDirection.mjs'

type ArrowSprites = {
    up: { id: SkinSpriteId }[]
    left: { id: SkinSpriteId }[]
}

export const getArrowSpriteId = (
    arrowSprites: ArrowSprites,
    size: number,
    direction: FlickDirection,
) => {
    const getId = (index: number) =>
        direction ? arrowSprites.left[index].id : arrowSprites.up[index].id

    size = Math.clamp(Math.round(size * 2), 1, 6)
    if (size === 1) {
        return getId(0)
    } else if (size === 2) {
        return getId(1)
    } else if (size === 3) {
        return getId(2)
    } else if (size === 4) {
        return getId(3)
    } else if (size === 5) {
        return getId(4)
    } else {
        return getId(5)
    }
}
