import { EffectClipName } from 'sonolus-core'

export const effect = defineEffect({
    clips: {
        stage: EffectClipName.Stage,

        normalPerfect: EffectClipName.Perfect,
        normalGreat: EffectClipName.Great,
        normalGood: EffectClipName.Good,

        flickPerfect: EffectClipName.PerfectAlternative,
        flickGreat: EffectClipName.GreatAlternative,
        flickGood: EffectClipName.GoodAlternative,

        normalHold: EffectClipName.Hold,

        normalTick: 'Sekai Tick',

        criticalTap: 'Sekai Critical Tap',

        criticalFlick: 'Sekai Critical Flick',

        criticalHold: 'Sekai Critical Hold',

        criticalTick: 'Sekai Tick',
    },
})
