import { EffectClip } from 'sonolus-core'
import { Add, And, Code, HasEffectClip, If, InputJudgment, Not, Play } from 'sonolus.js'
import { options } from '../../../configuration/options'
import {
    criticalFlickClip,
    criticalHoldClip,
    criticalTapClip,
    criticalTickClip,
    minSFXDistance,
    tickClip,
} from './constants'

export const getTapClip = (isCritical: boolean, judgment: Code<number> = 1) =>
    getClipIfCritical(isCritical, criticalTapClip, Add(EffectClip.Miss, judgment))

export const getTickClip = (isCritical: boolean, judgment: Code<number> = 1) =>
    getClipIfCritical(
        isCritical,
        criticalTickClip,
        getClip(tickClip, Add(EffectClip.Miss, judgment))
    )

export const getFlickClip = (isCritical: boolean, judgment: Code<number> = 1) =>
    getClipIfCritical(isCritical, criticalFlickClip, Add(EffectClip.MissAlternative, judgment))

export const getHoldClip = (isCritical: boolean) =>
    getClipIfCritical(isCritical, criticalHoldClip, EffectClip.Hold)

export const playJudgmentSFX = (
    isCritical: boolean,
    getClip: (isCritical: boolean, judgment: Code<number>) => Code<number>
) =>
    And(
        options.isSFXEnabled,
        Not(options.isAutoSFX),
        Play(getClip(isCritical, InputJudgment), minSFXDistance)
    )

const getClipIfCritical = (isCritical: boolean, criticalId: Code<number>, id: Code<number>) =>
    isCritical ? getClip(criticalId, id) : id

const getClip = (id: Code<number>, fallback: Code<number>) => If(HasEffectClip(id), id, fallback)
