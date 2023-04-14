type ObjectBase = {
    beat: number
}

export type BPMChange = ObjectBase & {
    type: 'bpm'
    bpm: number
}

export type TimeScaleChange = ObjectBase & {
    type: 'timeScale'
    timeScale: number
}

type NoteBase = ObjectBase & {
    lane: number
    size: number
}

export type Single = NoteBase & {
    type: 'single'
    critical: boolean
    direction?: 'left' | 'up' | 'right'
}

export type ConnectionStart = NoteBase & {
    type: 'start'
    critical: boolean
    ease: 'out' | 'linear' | 'in'
}

export type ConnectionTick = NoteBase & {
    type: 'tick'
    critical?: boolean
    ease: 'out' | 'linear' | 'in'
}

export type ConnectionAttach = ObjectBase & {
    type: 'attach'
    critical?: boolean
}

export type ConnectionEnd = NoteBase & {
    type: 'end'
    critical: boolean
    direction?: 'left' | 'up' | 'right'
}

export type Slide = {
    type: 'slide'
    critical: boolean
    connections: [ConnectionStart, ...(ConnectionTick | ConnectionAttach)[], ConnectionEnd]
}

export type USCObject = BPMChange | TimeScaleChange | Single | Slide

export type USC = {
    offset: number
    objects: USCObject[]
}
