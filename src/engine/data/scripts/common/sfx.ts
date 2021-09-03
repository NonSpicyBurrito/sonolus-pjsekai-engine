import {
    Add,
    And,
    Code,
    EffectClip,
    HasEffectClip,
    If,
    InputJudgment,
    Play,
} from 'sonolus.js'
import { options } from '../../../configuration/options'
import {
    criticalFlickClip,
    criticalTapClip,
    criticalTickClip,
    minSFXDistance,
} from './constants'

export function getCriticalTapClip(judgment: Code<number> = 1) {
    return If(
        HasEffectClip(criticalTapClip),
        criticalTapClip,
        Add(EffectClip.Miss, judgment)
    )
}

export function getCriticalTickClip(judgment: Code<number> = 1) {
    return If(
        HasEffectClip(criticalTickClip),
        criticalTickClip,
        Add(EffectClip.Miss, judgment)
    )
}

export function getCriticalFlickClip(judgment: Code<number> = 1) {
    return If(
        HasEffectClip(criticalFlickClip),
        criticalFlickClip,
        Add(EffectClip.MissAlternative, judgment)
    )
}

export function playStageSFX() {
    return And(options.isSFXEnabled, Play(EffectClip.Stage, minSFXDistance))
}

export function playTapJudgmentSFX() {
    return And(
        options.isSFXEnabled,
        Play(Add(EffectClip.Miss, InputJudgment), minSFXDistance)
    )
}

export function playCriticalTapJudgmentSFX() {
    return And(
        options.isSFXEnabled,
        Play(getCriticalTapClip(InputJudgment), minSFXDistance)
    )
}

export function playCriticalTickJudgmentSFX() {
    return And(
        options.isSFXEnabled,
        Play(getCriticalTickClip(InputJudgment), minSFXDistance)
    )
}

export function playFlickJudgmentSFX() {
    return And(
        options.isSFXEnabled,
        Play(Add(EffectClip.MissAlternative, InputJudgment), minSFXDistance)
    )
}

export function playCriticalFlickJudgmentSFX() {
    return And(
        options.isSFXEnabled,
        Play(getCriticalFlickClip(InputJudgment), minSFXDistance)
    )
}
