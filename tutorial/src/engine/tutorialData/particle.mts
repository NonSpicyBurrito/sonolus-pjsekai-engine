import { ParticleEffectName } from 'sonolus-core'
import { lane } from '../../../../shared/src/engine/data/lane.mjs'
import { perspectiveLayout } from '../../../../shared/src/engine/data/utils.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const particle = defineParticle({
    effects: {
        lane: ParticleEffectName.LaneLinear,

        normalNoteCircular: ParticleEffectName.NoteCircularTapCyan,
        normalNoteLinear: ParticleEffectName.NoteLinearTapCyan,

        slideNoteCircular: ParticleEffectName.NoteCircularTapGreen,
        slideNoteLinear: ParticleEffectName.NoteLinearTapGreen,

        flickNoteCircular: ParticleEffectName.NoteCircularTapRed,
        flickNoteLinear: ParticleEffectName.NoteLinearTapRed,
        flickNoteDirectional: ParticleEffectName.NoteLinearAlternativeRed,

        normalSlideConnectorCircular: ParticleEffectName.NoteCircularHoldGreen,
        normalSlideConnectorLinear: ParticleEffectName.NoteLinearHoldGreen,
    },
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
