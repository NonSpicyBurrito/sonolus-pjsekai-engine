import { EngineConfigurationUI } from 'sonolus-core'

export const ui: EngineConfigurationUI = {
    scope: 'Sekai',
    primaryMetric: 'arcade',
    secondaryMetric: 'life',
    menuVisibility: {
        scale: 1,
        alpha: 1,
    },
    judgmentVisibility: {
        scale: 1,
        alpha: 1,
    },
    comboVisibility: {
        scale: 1,
        alpha: 1,
    },
    primaryMetricVisibility: {
        scale: 1,
        alpha: 1,
    },
    secondaryMetricVisibility: {
        scale: 1,
        alpha: 1,
    },
    progressVisibility: {
        scale: 1,
        alpha: 1,
    },
    tutorialNavigationVisibility: {
        scale: 1,
        alpha: 1,
    },
    tutorialInstructionVisibility: {
        scale: 1,
        alpha: 1,
    },
    judgmentAnimation: {
        scale: {
            from: 0,
            to: 1,
            duration: 0.075,
            ease: 'linear',
        },
        alpha: {
            from: 1,
            to: 0,
            duration: 0.3,
            ease: 'none',
        },
    },
    comboAnimation: {
        scale: {
            from: 0.6,
            to: 1,
            duration: 0.15,
            ease: 'linear',
        },
        alpha: {
            from: 1,
            to: 1,
            duration: 0,
            ease: 'linear',
        },
    },
    judgmentErrorStyle: 'arrowDown',
    judgmentErrorPlacement: 'both',
    judgmentErrorMin: 20,
}
