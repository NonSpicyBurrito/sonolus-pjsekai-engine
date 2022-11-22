import { EffectClip } from 'sonolus-core'
import {
    Add,
    And,
    Code,
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
    tickClip,
} from './constants'

export const getTapClip = (judgment: Code<number> = 1) =>
    Add(EffectClip.Miss, judgment)

export const getCriticalTapClip = (judgment: Code<number> = 1) =>
    getClip(criticalTapClip, getTapClip(judgment))

export const getTickClip = (judgment: Code<number> = 1) =>
    getClip(tickClip, Add(EffectClip.Miss, judgment))

export const getCriticalTickClip = (judgment: Code<number> = 1) =>
    getClip(criticalTickClip, getTickClip(judgment))

export const getFlickClip = (judgment: Code<number> = 1) =>
    Add(EffectClip.MissAlternative, judgment)

export const getCriticalFlickClip = (judgment: Code<number> = 1) =>
    getClip(criticalFlickClip, getFlickClip(judgment))

export const playStageSFX = () => playSFX(EffectClip.Stage)

export const playTapJudgmentSFX = () => playJudgmentSFX(getTapClip)

export const playCriticalTapJudgmentSFX = () =>
    playJudgmentSFX(getCriticalTapClip)

export const playTickJudgmentSFX = () => playJudgmentSFX(getTickClip)

export const playCriticalTickJudgmentSFX = () =>
    playJudgmentSFX(getCriticalTickClip)

export const playFlickJudgmentSFX = () => playJudgmentSFX(getFlickClip)

export const playCriticalFlickJudgmentSFX = () =>
    playJudgmentSFX(getCriticalFlickClip)

const getClip = (id: Code<number>, fallback: Code<number>) =>
    If(HasEffectClip(id), id, fallback)

const playSFX = (id: Code<number>) =>
    And(options.isSFXEnabled, Play(id, minSFXDistance))

const playJudgmentSFX = (getClip: (judgment: Code<number>) => Code<number>) =>
    playSFX(getClip(InputJudgment))
