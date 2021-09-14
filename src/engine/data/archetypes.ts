import { defineArchetypes } from 'sonolus.js'
import { scripts } from './scripts'

export const archetypes = defineArchetypes({
    initialization: {
        script: scripts.initializationIndex,
    },
    stage: {
        script: scripts.stageIndex,
    },
    input: {
        script: scripts.inputIndex,
    },

    tapNote: {
        script: scripts.tapNoteIndex,
        input: true,
    },
    flickNote: {
        script: scripts.flickNoteIndex,
        input: true,
    },
    slideStart: {
        script: scripts.slideStartIndex,
        input: true,
    },
    slideTick: {
        script: scripts.slideTickIndex,
        input: true,
    },
    slideEnd: {
        script: scripts.slideEndIndex,
        input: true,
    },
    slideEndFlick: {
        script: scripts.slideEndFlickIndex,
        input: true,
    },
    slideConnector: {
        script: scripts.slideConnectorIndex,
    },

    criticalTapNote: {
        script: scripts.criticalTapNoteIndex,
        input: true,
    },
    criticalFlickNote: {
        script: scripts.criticalFlickNoteIndex,
        input: true,
    },
    criticalSlideStart: {
        script: scripts.criticalSlideStartIndex,
        input: true,
    },
    criticalSlideTick: {
        script: scripts.criticalSlideTickIndex,
        input: true,
    },
    criticalSlideEnd: {
        script: scripts.criticalSlideEndIndex,
        input: true,
    },
    criticalSlideEndFlick: {
        script: scripts.criticalSlideEndFlickIndex,
        input: true,
    },
    criticalSlideConnector: {
        script: scripts.criticalSlideConnectorIndex,
    },

    slideHiddenTick: {
        script: scripts.slideHiddenTickIndex,
        input: true,
    },
})
