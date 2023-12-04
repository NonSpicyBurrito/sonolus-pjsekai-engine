import { EffectClipName } from 'sonolus-core'

export const effect = defineEffect({
    clips: {
        normalPerfect: EffectClipName.Perfect,

        flickPerfect: EffectClipName.PerfectAlternative,

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

export const sfxDistance = 0.02
