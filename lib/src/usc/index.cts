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
    trace: boolean
    critical: boolean
    direction?: 'left' | 'up' | 'right'
}

export type USCConnectionStartNote = BaseUSCNote & {
    type: 'start'
    trace: boolean
    critical: boolean
    ease: 'out' | 'linear' | 'in'
}

export type USCConnectionIgnoreNote = BaseUSCNote & {
    type: 'ignore'
    ease: 'out' | 'linear' | 'in'
}

export type USCConnectionTickNote = BaseUSCNote & {
    type: 'tick'
    trace: boolean
    critical: boolean
    ease: 'out' | 'linear' | 'in'
}

export type USCConnectionHiddenNote = BaseUSCObject & {
    type: 'hidden'
}

export type USCConnectionAttachNote = BaseUSCObject & {
    type: 'attach'
    critical: boolean
}

export type USCConnectionEndNote = BaseUSCNote & {
    type: 'end'
    trace: boolean
    critical: boolean
    direction?: 'left' | 'up' | 'right'
}

export type USCSlideNote = {
    type: 'slide'
    active: boolean
    critical: boolean
    connections: [
        USCConnectionStartNote | USCConnectionIgnoreNote,
        ...(
            | USCConnectionIgnoreNote
            | USCConnectionTickNote
            | USCConnectionHiddenNote
            | USCConnectionAttachNote
        )[],
        USCConnectionEndNote | USCConnectionIgnoreNote,
    ]
}
