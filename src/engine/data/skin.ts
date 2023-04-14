import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        cover: SkinSpriteName.StageCover,

        lane: SkinSpriteName.Lane,
        judgmentLine: SkinSpriteName.JudgmentLine,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        sekaiStage: 'Sekai Stage',

        simLine: SkinSpriteName.SimultaneousConnectionNeutral,

        normalNoteLeft: 'Sekai Note Cyan Left',
        normalNoteMiddle: 'Sekai Note Cyan Middle',
        normalNoteRight: 'Sekai Note Cyan Right',
        normalNoteFallback: SkinSpriteName.NoteHeadCyan,

        slideNoteLeft: 'Sekai Note Green Left',
        slideNoteMiddle: 'Sekai Note Green Middle',
        slideNoteRight: 'Sekai Note Green Right',
        slideNoteFallback: SkinSpriteName.NoteHeadGreen,

        flickNoteLeft: 'Sekai Note Red Left',
        flickNoteMiddle: 'Sekai Note Red Middle',
        flickNoteRight: 'Sekai Note Red Right',
        flickNoteFallback: SkinSpriteName.NoteHeadRed,

        criticalNoteLeft: 'Sekai Note Yellow Left',
        criticalNoteMiddle: 'Sekai Note Yellow Middle',
        criticalNoteRight: 'Sekai Note Yellow Right',
        criticalNoteFallback: SkinSpriteName.NoteHeadYellow,

        normalSlideTickNote: 'Sekai Diamond Green',
        normalSlideTickNoteFallback: SkinSpriteName.NoteTickGreen,

        criticalSlideTickNote: 'Sekai Diamond Yellow',
        criticalSlideTickNoteFallback: SkinSpriteName.NoteTickYellow,

        normalSlideConnectorNormal: 'Sekai Slide Connection',
        normalSlideConnectorActive: 'Sekai Slide Connection Active',
        normalSlideConnectorFallback: SkinSpriteName.NoteConnectionGreenSeamless,

        criticalSlideConnectorNormal: 'Sekai Critical Slide Connection',
        criticalSlideConnectorActive: 'Sekai Critical Slide Connection Active',
        criticalSlideConnectorFallback: SkinSpriteName.NoteConnectionYellowSeamless,

        normalSlotGlow: 'Sekai Slot Glow Cyan',
        slideSlotGlow: 'Sekai Slot Glow Green',
        flickSlotGlow: 'Sekai Slot Glow Red',
        criticalSlotGlow: 'Sekai Slot Glow Yellow',

        normalSlot: 'Sekai Slot Cyan',
        slideSlot: 'Sekai Slot Green',
        flickSlot: 'Sekai Slot Red',
        criticalSlot: 'Sekai Slot Yellow',

        flickArrowUp1: 'Sekai Flick Arrow Up 1',
        flickArrowUp2: 'Sekai Flick Arrow Up 2',
        flickArrowUp3: 'Sekai Flick Arrow Up 3',
        flickArrowUp4: 'Sekai Flick Arrow Up 4',
        flickArrowUp5: 'Sekai Flick Arrow Up 5',
        flickArrowUp6: 'Sekai Flick Arrow Up 6',
        flickArrowLeft1: 'Sekai Flick Arrow Left 1',
        flickArrowLeft2: 'Sekai Flick Arrow Left 2',
        flickArrowLeft3: 'Sekai Flick Arrow Left 3',
        flickArrowLeft4: 'Sekai Flick Arrow Left 4',
        flickArrowLeft5: 'Sekai Flick Arrow Left 5',
        flickArrowLeft6: 'Sekai Flick Arrow Left 6',
        flickArrowFallback: SkinSpriteName.DirectionalMarkerRed,

        criticalArrowUp1: 'Sekai Critical Flick Arrow Up 1',
        criticalArrowUp2: 'Sekai Critical Flick Arrow Up 2',
        criticalArrowUp3: 'Sekai Critical Flick Arrow Up 3',
        criticalArrowUp4: 'Sekai Critical Flick Arrow Up 4',
        criticalArrowUp5: 'Sekai Critical Flick Arrow Up 5',
        criticalArrowUp6: 'Sekai Critical Flick Arrow Up 6',
        criticalArrowLeft1: 'Sekai Critical Flick Arrow Left 1',
        criticalArrowLeft2: 'Sekai Critical Flick Arrow Left 2',
        criticalArrowLeft3: 'Sekai Critical Flick Arrow Left 3',
        criticalArrowLeft4: 'Sekai Critical Flick Arrow Left 4',
        criticalArrowLeft5: 'Sekai Critical Flick Arrow Left 5',
        criticalArrowLeft6: 'Sekai Critical Flick Arrow Left 6',
        criticalArrowFallback: SkinSpriteName.DirectionalMarkerYellow,
    },
})
