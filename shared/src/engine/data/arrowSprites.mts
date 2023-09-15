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

    switch (Math.clamp(Math.round(size * 2), 1, 6)) {
        case 1:
            return getId(0)
        case 2:
            return getId(1)
        case 3:
            return getId(2)
        case 4:
            return getId(3)
        case 5:
            return getId(4)
        default:
            return getId(5)
    }
}
