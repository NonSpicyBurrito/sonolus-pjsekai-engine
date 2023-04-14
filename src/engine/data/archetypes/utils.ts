import { options } from '../../configuration/options.js'
import { skin } from '../skin.js'
import { lane } from './constants.js'
import { scaledScreen } from './shared.js'

export const perspectiveLayout = ({ l, r, b, t }: RectLike) => {
    return new Quad({
        x1: l * b,
        x2: l * t,
        x3: r * t,
        x4: r * b,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    })
}

export const circularEffectLayout = ({ lane, w, h }: { lane: number; w: number; h: number }) => {
    w *= options.noteEffectSize
    h *= options.noteEffectSize * scaledScreen.wToH

    const b = 1 + h
    const t = 1 - h

    return {
        x1: lane * b + w,
        x2: lane * t + w,
        x3: lane * t - w,
        x4: lane * b - w,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    }
}

export const linearEffectLayout = ({ lane, shear }: { lane: number; shear: number }) => {
    const w = options.noteEffectSize
    const h = options.noteEffectSize * scaledScreen.wToH
    const p = 1 + 0.125 * options.noteEffectSize

    const b = 1
    const t = 1 - 2 * h

    shear *= options.noteEffectSize

    return {
        x1: lane - w,
        x2: lane * p - w + shear,
        x3: lane * p + w + shear,
        x4: lane + w,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    }
}

export const getHitbox = (options: { l: number; r: number; leniency: number }) =>
    new Rect({
        l: options.l - options.leniency,
        r: options.r + options.leniency,
        b: lane.hitbox.b,
        t: lane.hitbox.t,
    }).transform(skin.transform)

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000

export const getScheduleSFXTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)
