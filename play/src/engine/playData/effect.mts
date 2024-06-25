import { EffectClipName } from '@sonolus/core'

const MaxInstances = 15

const AudioPools: { [key: string]: HTMLAudioElement[] } = {}

Object.values(EffectClipName).forEach((clipName) => {
    AudioPools[clipName] = Array.from({ length: MaxInstances }, () => new Audio(clipName))
})

const GetNextAudioInstance = (clipName: string): HTMLAudioElement => {
    const pool = AudioPools[clipName]
    for (const audio of pool) {
        if (audio.paused) {
            return audio
        }
    }
    return pool[0]
}

const PlayEffect = (clipName: string) => {
    const audio = GetNextAudioInstance(clipName)
    audio.currentTime = 0
    audio.play()
}

// Define effects
export const Effect = DefineEffect({
    Clips: {
        Stage: EffectClipName.Stage,

        NormalPerfect: EffectClipName.Perfect,
        NormalGreat: EffectClipName.Great,
        NormalGood: EffectClipName.Good,

        FlickPerfect: EffectClipName.PerfectAlternative,
        FlickGreat: EffectClipName.GreatAlternative,
        FlickGood: EffectClipName.GoodAlternative,

        NormalHold: EffectClipName.Hold,

        NormalTick: 'Sekai Tick',

        NormalTrace: 'Sekai Trace',

        CriticalTap: 'Sekai Critical Tap',

        CriticalFlick: 'Sekai Critical Flick',

        CriticalHold: 'Sekai Critical Hold',

        CriticalTick: 'Sekai Critical Tick',

        CriticalTrace: 'Sekai Critical Trace',
    },
})

export const SfxDistance = 0.02

export const GetScheduleSfxTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)
