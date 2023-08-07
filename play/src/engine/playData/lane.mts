import { lane as _lane } from '../../../../shared/src/engine/data/lane.mjs'
import { skin } from './skin.mjs'

export const lane = {
    ..._lane,

    hitbox: {
        l: -6,
        r: 6,
        t: (803 / 850) * 0.6,
        b: 1.5,
    },
}

export const getHitbox = ({ l, r, leniency }: { l: number; r: number; leniency: number }) =>
    new Rect({
        l: l - leniency,
        r: r + leniency,
        b: lane.hitbox.b,
        t: lane.hitbox.t,
    }).transform(skin.transform)
