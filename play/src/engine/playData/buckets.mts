import { UnitText } from 'sonolus-core'
import { skin } from './skin.mjs'

export const buckets = defineBuckets({
    normalTapNote: {
        sprites: [
            {
                id: skin.sprites.normalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalTapNote: {
        sprites: [
            {
                id: skin.sprites.criticalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalFlickNote: {
        sprites: [
            {
                id: skin.sprites.flickNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.flickArrowFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalFlickNote: {
        sprites: [
            {
                id: skin.sprites.criticalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalArrowFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalTraceNote: {
        sprites: [
            {
                id: skin.sprites.normalTraceNote.id,
                fallbackId: skin.sprites.normalTraceNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.normalTraceNoteDiamond.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalTraceNote: {
        sprites: [
            {
                id: skin.sprites.criticalTraceNote.id,
                fallbackId: skin.sprites.criticalTraceNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalTraceNoteDiamond.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalTraceFlickNote: {
        sprites: [
            {
                id: skin.sprites.traceFlickNote.id,
                fallbackId: skin.sprites.traceFlickNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.traceFlickNoteDiamond.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.flickArrowFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalTraceFlickNote: {
        sprites: [
            {
                id: skin.sprites.criticalTraceNote.id,
                fallbackId: skin.sprites.criticalTraceNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalTraceNoteDiamond.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalArrowFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalSlideTraceNote: {
        sprites: [
            {
                id: skin.sprites.normalActiveSlideConnectorFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.normalTraceNote.id,
                fallbackId: skin.sprites.normalTraceNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.normalTraceNoteDiamond.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalSlideTraceNote: {
        sprites: [
            {
                id: skin.sprites.criticalActiveSlideConnectorFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalTraceNote.id,
                fallbackId: skin.sprites.criticalTraceNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalTraceNoteDiamond.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalSlideStartNote: {
        sprites: [
            {
                id: skin.sprites.normalActiveSlideConnectorFallback.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.slideNoteFallback.id,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalSlideStartNote: {
        sprites: [
            {
                id: skin.sprites.criticalActiveSlideConnectorFallback.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalNoteFallback.id,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalSlideEndNote: {
        sprites: [
            {
                id: skin.sprites.normalActiveSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.slideNoteEndFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalSlideEndNote: {
        sprites: [
            {
                id: skin.sprites.criticalActiveSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalNoteEndFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalSlideEndTraceNote: {
        sprites: [
            {
                id: skin.sprites.normalActiveSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.normalTraceNote.id,
                fallbackId: skin.sprites.normalTraceNoteFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.normalTraceNoteDiamond.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalSlideEndTraceNote: {
        sprites: [
            {
                id: skin.sprites.criticalActiveSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalTraceNote.id,
                fallbackId: skin.sprites.criticalTraceNoteFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalTraceNoteDiamond.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },

    normalSlideEndFlickNote: {
        sprites: [
            {
                id: skin.sprites.normalActiveSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.flickNoteFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.flickArrowFallback.id,
                x: 3,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    criticalSlideEndFlickNote: {
        sprites: [
            {
                id: skin.sprites.criticalActiveSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalNoteEndFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: skin.sprites.criticalArrowFallback.id,
                x: 3,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
})
