import { EffectClipName } from '@sonolus/core'

const maxInstances = 15

const effectPools: { [key: string]: HTMLAudioElement[] } = {}

Object.values(EffectClipName).forEach((clipName) => {
    effectPools[clipName] = Array.from({ length: maxInstances }, () => new Effect(`path/to/effect/${clipName}.mp3`))
})

const getNextEffectInstance = (clipName: string): HTMLAudioElement => {
    const pool = effectPools[clipName]
    for (const effect of pool) {
        if (effect.paused) {
            return effect
        }
    }
    return pool[0]
}

const playEffect = (clipName: string) => {
    const audio = getNextAudioInstance(clipName)
    audio.currentTime = 0
    audio.play()
}

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

export const sfxDistance = 0.02

export const getScheduleSFXTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)

// Example usage: playEffect(effect.clips.normalPerfect)
