export type USC = {
    offset: number
    objects: USCObject[]
}

export type USCObject = USCBpmChange | USCTimeScaleChange | USCSingleNote | USCSlideNote

type BaseUSCObject = {
    beat: number
}

export type USCBpmChange = BaseUSCObject & {
    type: 'bpm'
    bpm: number
}

export type USCTimeScaleChange = BaseUSCObject & {
    type: 'timeScale'
    timeScale: number
}

type BaseUSCNote = BaseUSCObject & {
    lane: number
    size: number
}

export type USCSingleNote = BaseUSCNote & {
    type: 'single'
    critical: boolean
    direction?: 'left' | 'up' | 'right'
}

export type USCConnectionStartNote = BaseUSCNote & {
    type: 'start'
    critical: boolean
    ease: 'out' | 'linear' | 'in'
}

export type USCConnectionTickNote = BaseUSCNote & {
    type: 'tick'
    critical?: boolean
    ease: 'out' | 'linear' | 'in'
}

export type USCConnectionAttachNote = BaseUSCObject & {
    type: 'attach'
    critical?: boolean
}

export type USCConnectionEndNote = BaseUSCNote & {
    type: 'end'
    critical: boolean
    direction?: 'left' | 'up' | 'right'
}

export type USCSlideNote = {
    type: 'slide'
    critical: boolean
    connections: [
        USCConnectionStartNote,
        ...(USCConnectionTickNote | USCConnectionAttachNote)[],
        USCConnectionEndNote,
    ]
}
