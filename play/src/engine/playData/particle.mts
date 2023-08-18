import { ParticleEffectName } from 'sonolus-core'
import { options } from '../configuration/options.mjs'
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

        criticalNoteCircular: ParticleEffectName.NoteCircularTapYellow,
        criticalNoteLinear: ParticleEffectName.NoteLinearTapYellow,
        criticalNoteDirectional: ParticleEffectName.NoteLinearAlternativeYellow,

        normalSlideTickNote: ParticleEffectName.NoteCircularAlternativeGreen,

        criticalSlideTickNote: ParticleEffectName.NoteCircularAlternativeYellow,

        normalSlideConnectorCircular: ParticleEffectName.NoteCircularHoldGreen,
        normalSlideConnectorLinear: ParticleEffectName.NoteLinearHoldGreen,

        criticalSlideConnectorCircular: ParticleEffectName.NoteCircularHoldYellow,
        criticalSlideConnectorLinear: ParticleEffectName.NoteLinearHoldYellow,
    },
})

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
