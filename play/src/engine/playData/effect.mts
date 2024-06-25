import { EffectClipName } from '@sonolus/core'

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

        normalTrace: 'Sekai Trace',

        criticalTap: 'Sekai Critical Tap',

        criticalFlick: 'Sekai Critical Flick',

        criticalHold: 'Sekai Critical Hold',

        criticalTick: 'Sekai Critical Tick',

        criticalTrace: 'Sekai Critical Trace',
    },
})

export const sfxDistance = 0

export const getScheduleSFXTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)
