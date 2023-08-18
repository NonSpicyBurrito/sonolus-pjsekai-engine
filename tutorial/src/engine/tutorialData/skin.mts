import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        lane: SkinSpriteName.Lane,
        judgmentLine: SkinSpriteName.JudgmentLine,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        sekaiStage: 'Sekai Stage',

        normalNoteLeft: 'Sekai Note Cyan Left',
        normalNoteMiddle: 'Sekai Note Cyan Middle',
        normalNoteRight: 'Sekai Note Cyan Right',
        normalNoteFallback: SkinSpriteName.NoteHeadCyan,

        slideNoteLeft: 'Sekai Note Green Left',
        slideNoteMiddle: 'Sekai Note Green Middle',
        slideNoteRight: 'Sekai Note Green Right',
        slideNoteFallback: SkinSpriteName.NoteHeadGreen,
        slideNoteEndFallback: SkinSpriteName.NoteTailGreen,

        flickNoteLeft: 'Sekai Note Red Left',
        flickNoteMiddle: 'Sekai Note Red Middle',
        flickNoteRight: 'Sekai Note Red Right',
        flickNoteFallback: SkinSpriteName.NoteHeadRed,
        flickNoteEndFallback: SkinSpriteName.NoteTailRed,

        normalSlideConnectorNormal: 'Sekai Slide Connection',
        normalSlideConnectorActive: 'Sekai Slide Connection Active',
        normalSlideConnectorFallback: SkinSpriteName.NoteConnectionGreenSeamless,

        normalSlotGlow: 'Sekai Slot Glow Cyan',
        slideSlotGlow: 'Sekai Slot Glow Green',
        flickSlotGlow: 'Sekai Slot Glow Red',

        normalSlot: 'Sekai Slot Cyan',
        slideSlot: 'Sekai Slot Green',
        flickSlot: 'Sekai Slot Red',

        flickArrow: 'Sekai Flick Arrow Up 4',
        flickArrowFallback: SkinSpriteName.DirectionalMarkerRed,
    },
})

export const layer = {
    slotGlowEffect: 200,

    note: {
        arrow: 101,
        body: 100,
        slide: 99,
        connector: 98,
    },

    slotEffect: 50,

    judgmentLine: 1,
    stage: 0,
}
