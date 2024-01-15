import { EngineDataBucket, UnitText } from 'sonolus-core'

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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
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
            unit: UnitText.Millisecond,
        },
    }) as const satisfies Record<string, EngineDataBucket>
