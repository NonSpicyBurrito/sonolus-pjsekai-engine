import { SkinSpriteName } from '@sonolus/core'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    sprites: {
        lane: SkinSpriteName.Lane,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        simLine: SkinSpriteName.SimultaneousConnectionNeutral,

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

        criticalNoteLeft: 'Sekai Note Yellow Left',
        criticalNoteMiddle: 'Sekai Note Yellow Middle',
        criticalNoteRight: 'Sekai Note Yellow Right',
        criticalNoteFallback: SkinSpriteName.NoteHeadYellow,
        criticalNoteEndFallback: SkinSpriteName.NoteTailYellow,

        traceFlickNoteLeft: 'Sekai Trace Note Red Left',
        traceFlickNoteMiddle: 'Sekai Trace Note Red Middle',
        traceFlickNoteRight: 'Sekai Trace Note Red Right',
        traceFlickNoteDiamond: 'Sekai Trace Diamond Red',
        traceFlickNoteFallback: SkinSpriteName.NoteTickRed,

        normalTraceNoteLeft: 'Sekai Trace Note Green Left',
        normalTraceNoteMiddle: 'Sekai Trace Note Green Middle',
        normalTraceNoteRight: 'Sekai Trace Note Green Right',
        normalTraceNoteDiamond: 'Sekai Trace Diamond Green',
        normalTraceNoteFallback: SkinSpriteName.NoteTickGreen,

        criticalTraceNoteLeft: 'Sekai Trace Note Yellow Left',
        criticalTraceNoteMiddle: 'Sekai Trace Note Yellow Middle',
        criticalTraceNoteRight: 'Sekai Trace Note Yellow Right',
        criticalTraceNoteDiamond: 'Sekai Trace Diamond Yellow',
        criticalTraceNoteFallback: SkinSpriteName.NoteTickYellow,

        normalSlideTickNote: 'Sekai Diamond Green',
        normalSlideTickNoteFallback: SkinSpriteName.NoteTickGreen,

        criticalSlideTickNote: 'Sekai Diamond Yellow',
        criticalSlideTickNoteFallback: SkinSpriteName.NoteTickYellow,

        normalSlideConnectorNormal: 'Sekai Slide Connection Green',
        normalSlideConnectorFallback: SkinSpriteName.NoteConnectionGreenSeamless,

        criticalSlideConnectorNormal: 'Sekai Slide Connection Yellow',
        criticalSlideConnectorFallback: SkinSpriteName.NoteConnectionYellowSeamless,

        normalActiveSlideConnectorNormal: 'Sekai Active Slide Connection Green',
        normalActiveSlideConnectorFallback: SkinSpriteName.NoteConnectionGreenSeamless,

        criticalActiveSlideConnectorNormal: 'Sekai Active Slide Connection Yellow',
        criticalActiveSlideConnectorFallback: SkinSpriteName.NoteConnectionYellowSeamless,

        flickArrowUp1: 'Sekai Flick Arrow Red Up 1',
        flickArrowUp2: 'Sekai Flick Arrow Red Up 2',
        flickArrowUp3: 'Sekai Flick Arrow Red Up 3',
        flickArrowUp4: 'Sekai Flick Arrow Red Up 4',
        flickArrowUp5: 'Sekai Flick Arrow Red Up 5',
        flickArrowUp6: 'Sekai Flick Arrow Red Up 6',
        flickArrowLeft1: 'Sekai Flick Arrow Red Left 1',
        flickArrowLeft2: 'Sekai Flick Arrow Red Left 2',
        flickArrowLeft3: 'Sekai Flick Arrow Red Left 3',
        flickArrowLeft4: 'Sekai Flick Arrow Red Left 4',
        flickArrowLeft5: 'Sekai Flick Arrow Red Left 5',
        flickArrowLeft6: 'Sekai Flick Arrow Red Left 6',
        flickArrowFallback: SkinSpriteName.DirectionalMarkerRed,

        criticalArrowUp1: 'Sekai Flick Arrow Yellow Up 1',
        criticalArrowUp2: 'Sekai Flick Arrow Yellow Up 2',
        criticalArrowUp3: 'Sekai Flick Arrow Yellow Up 3',
        criticalArrowUp4: 'Sekai Flick Arrow Yellow Up 4',
        criticalArrowUp5: 'Sekai Flick Arrow Yellow Up 5',
        criticalArrowUp6: 'Sekai Flick Arrow Yellow Up 6',
        criticalArrowLeft1: 'Sekai Flick Arrow Yellow Left 1',
        criticalArrowLeft2: 'Sekai Flick Arrow Yellow Left 2',
        criticalArrowLeft3: 'Sekai Flick Arrow Yellow Left 3',
        criticalArrowLeft4: 'Sekai Flick Arrow Yellow Left 4',
        criticalArrowLeft5: 'Sekai Flick Arrow Yellow Left 5',
        criticalArrowLeft6: 'Sekai Flick Arrow Yellow Left 6',
        criticalArrowFallback: SkinSpriteName.DirectionalMarkerYellow,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
        timeScaleChangeLine: SkinSpriteName.GridYellow,
    },
})

export const layer = {
    note: {
        arrow: 102,
        tick: 101,
        body: 100,
        trace: 99,
        connector: 98,
    },

    simLine: 90,

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -6,
            r: 6,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    layer - time / 1000 - lane / 100000
