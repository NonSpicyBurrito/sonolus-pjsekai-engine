import { lane } from './constants.mjs'
import { instruction } from './instruction.mjs'
import { particle } from './particle.mjs'
import { hand, scaledScreen } from './shared.mjs'

export const perspectiveLayout = ({ l, r, b, t }: RectLike) =>
    new Quad({
        x1: l * b,
        x2: l * t,
        x3: r * t,
        x4: r * b,
        y1: b,
        y2: t,
        y3: t,
        y4: b,
    })

const circularEffectLayout = ({ w, h }: { w: number; h: number }) => {
    const l = -w
    const r = w

    const b = 1 + h * scaledScreen.wToH
    const t = 1 - h * scaledScreen.wToH

    return new Rect({ l, r, b, t })
}

const linearEffectLayout = () => {
    const l = -1
    const r = 1

    const b = 1
    const t = 1 - 2 * scaledScreen.wToH

    return new Rect({ l, r, b, t })
}

export const approach = (now: number) => 1.06 ** (45 * Math.remap(0, 2, -1, 0, now))

export const playLinearNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(linearEffectLayout(), 0.5, false)

export const playCircularNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(circularEffectLayout({ w: 1.75, h: 1.05 }), 0.6, false)

export const playDirectionalNoteEffect = (effect: ParticleEffect) =>
    effect.spawn(linearEffectLayout(), 0.32, false)

export const playLaneEffects = () =>
    particle.effects.lane.spawn(
        perspectiveLayout({ l: -2, r: 2, b: lane.b, t: lane.t }),
        0.3,
        false,
    )

export const spawnCircularHoldEffect = () =>
    particle.effects.normalSlideConnectorCircular.spawn(
        circularEffectLayout({ w: 3.5, h: 2.1 }),
        1,
        true,
    )

export const spawnLinearHoldEffect = () =>
    particle.effects.normalSlideConnectorLinear.spawn(linearEffectLayout(), 1, true)

export const drawHand = (angle: number, y: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(0, 1)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position)
            .translate(0, y),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI,
        0,
        a * ui.configuration.instruction.alpha,
    )
