import { EngineDataBucket, Text } from 'sonolus-core'

export const createBucketDefinition = (
    sprites: Record<
        | 'normalNoteFallback'
        | 'criticalNoteFallback'
        | 'flickNoteFallback'
        | 'flickArrowFallback'
        | 'criticalArrowFallback'
        | 'normalTraceNote'
        | 'normalTraceNoteFallback'
        | 'normalTraceNoteDiamond'
        | 'criticalTraceNote'
        | 'criticalTraceNoteFallback'
        | 'criticalTraceNoteDiamond'
        | 'traceFlickNote'
        | 'traceFlickNoteFallback'
        | 'traceFlickNoteDiamond'
        | 'normalActiveSlideConnectorFallback'
        | 'criticalActiveSlideConnectorFallback'
        | 'slideNoteFallback'
        | 'slideNoteEndFallback'
        | 'criticalNoteEndFallback',
        { id: number }
    >,
) =>
    ({
        normalTapNote: {
            sprites: [
                {
                    id: sprites.normalNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalTapNote: {
            sprites: [
                {
                    id: sprites.criticalNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalFlickNote: {
            sprites: [
                {
                    id: sprites.flickNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.flickArrowFallback.id,
                    x: 1,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalFlickNote: {
            sprites: [
                {
                    id: sprites.criticalNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalArrowFallback.id,
                    x: 1,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalTraceNote: {
            sprites: [
                {
                    id: sprites.normalTraceNote.id,
                    fallbackId: sprites.normalTraceNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.normalTraceNoteDiamond.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalTraceNote: {
            sprites: [
                {
                    id: sprites.criticalTraceNote.id,
                    fallbackId: sprites.criticalTraceNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalTraceNoteDiamond.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalTraceFlickNote: {
            sprites: [
                {
                    id: sprites.traceFlickNote.id,
                    fallbackId: sprites.traceFlickNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.traceFlickNoteDiamond.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.flickArrowFallback.id,
                    x: 1,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalTraceFlickNote: {
            sprites: [
                {
                    id: sprites.criticalTraceNote.id,
                    fallbackId: sprites.criticalTraceNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalTraceNoteDiamond.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalArrowFallback.id,
                    x: 1,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalSlideTraceNote: {
            sprites: [
                {
                    id: sprites.normalActiveSlideConnectorFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.normalTraceNote.id,
                    fallbackId: sprites.normalTraceNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.normalTraceNoteDiamond.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalSlideTraceNote: {
            sprites: [
                {
                    id: sprites.criticalActiveSlideConnectorFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.criticalTraceNote.id,
                    fallbackId: sprites.criticalTraceNoteFallback.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalTraceNoteDiamond.id,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalSlideStartNote: {
            sprites: [
                {
                    id: sprites.normalActiveSlideConnectorFallback.id,
                    x: 0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.slideNoteFallback.id,
                    x: -2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalSlideStartNote: {
            sprites: [
                {
                    id: sprites.criticalActiveSlideConnectorFallback.id,
                    x: 0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.criticalNoteFallback.id,
                    x: -2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalSlideEndNote: {
            sprites: [
                {
                    id: sprites.normalActiveSlideConnectorFallback.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.slideNoteEndFallback.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalSlideEndNote: {
            sprites: [
                {
                    id: sprites.criticalActiveSlideConnectorFallback.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.criticalNoteEndFallback.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalSlideEndTraceNote: {
            sprites: [
                {
                    id: sprites.normalActiveSlideConnectorFallback.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.normalTraceNote.id,
                    fallbackId: sprites.normalTraceNoteFallback.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.normalTraceNoteDiamond.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalSlideEndTraceNote: {
            sprites: [
                {
                    id: sprites.criticalActiveSlideConnectorFallback.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.criticalTraceNote.id,
                    fallbackId: sprites.criticalTraceNoteFallback.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalTraceNoteDiamond.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },

        normalSlideEndFlickNote: {
            sprites: [
                {
                    id: sprites.normalActiveSlideConnectorFallback.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.flickNoteFallback.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.flickArrowFallback.id,
                    x: 3,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
        criticalSlideEndFlickNote: {
            sprites: [
                {
                    id: sprites.criticalActiveSlideConnectorFallback.id,
                    x: -0.5,
                    y: 0,
                    w: 2,
                    h: 5,
                    rotation: -90,
                },
                {
                    id: sprites.criticalNoteEndFallback.id,
                    x: 2,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
                {
                    id: sprites.criticalArrowFallback.id,
                    x: 3,
                    y: 0,
                    w: 2,
                    h: 2,
                    rotation: -90,
                },
            ],
            unit: Text.MillisecondUnit,
        },
    }) as const satisfies Record<string, EngineDataBucket>
