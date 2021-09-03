import { defineBuckets, SkinSprite } from 'sonolus.js'

export const buckets = defineBuckets({
    tapNote: {
        sprites: [
            {
                id: SkinSprite.NoteHeadCyan,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    flickNote: {
        sprites: [
            {
                id: SkinSprite.NoteHeadRed,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: SkinSprite.DirectionalMarkerRed,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    slideStart: {
        sprites: [
            {
                id: SkinSprite.NoteConnectionGreen,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: SkinSprite.NoteHeadGreen,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    slideEnd: {
        sprites: [
            {
                id: SkinSprite.NoteConnectionGreen,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: SkinSprite.NoteHeadGreen,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    slideEndFlick: {
        sprites: [
            {
                id: SkinSprite.NoteConnectionGreen,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: SkinSprite.NoteHeadRed,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: SkinSprite.DirectionalMarkerRed,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },

    criticalTapNote: {
        sprites: [
            {
                id: SkinSprite.NoteHeadYellow,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    criticalFlickNote: {
        sprites: [
            {
                id: SkinSprite.NoteHeadYellow,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: SkinSprite.DirectionalMarkerYellow,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    criticalSlideStart: {
        sprites: [
            {
                id: SkinSprite.NoteConnectionYellow,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: SkinSprite.NoteHeadYellow,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    criticalSlideEnd: {
        sprites: [
            {
                id: SkinSprite.NoteConnectionYellow,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: SkinSprite.NoteHeadYellow,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
    criticalSlideEndFlick: {
        sprites: [
            {
                id: SkinSprite.NoteConnectionYellow,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: SkinSprite.NoteHeadYellow,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: SkinSprite.DirectionalMarkerYellow,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
    },
})
