import { ParticleEffectName } from 'sonolus-core'

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
