type Line = [string, string]

type MeasureChange = [number, number]

type Meta = Map<string, string>

type BarLengthObject = {
    measure: number
    length: number
}

type RawObject = {
    tick: number
    value: string
}

export type TimeScaleChangeObject = {
    tick: number
    timeScale: number
}

export type BpmChangeObject = {
    tick: number
    bpm: number
}

export type NoteObject = {
    tick: number
    lane: number
    width: number
    type: number
}

export type SlideObject = {
    type: number
    notes: NoteObject[]
}

export type Score = {
    offset: number
    ticksPerBeat: number
    timeScaleChanges: TimeScaleChangeObject[]
    bpmChanges: BpmChangeObject[]
    tapNotes: NoteObject[]
    directionalNotes: NoteObject[]
    slides: SlideObject[]
}

type ToTick = (measure: number, p: number, q: number) => number

export const analyze = (sus: string): Score => {
    const { lines, measureChanges, meta } = parse(sus)

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const offset = -+(meta.get('WAVEOFFSET') || '0')
    if (Number.isNaN(offset)) throw new Error('Unexpected offset')

    const ticksPerBeat = getTicksPerBeat(meta)
    if (!ticksPerBeat) throw new Error('Missing or unexpected ticks per beat')

    const barLengths = getBarLengths(lines, measureChanges)

    const toTick = getToTick(barLengths, ticksPerBeat)

    const bpms = new Map<string, number>()
    const bpmChanges: BpmChangeObject[] = []
    const timeScaleChanges: TimeScaleChangeObject[] = []
    const tapNotes: NoteObject[] = []
    const directionalNotes: NoteObject[] = []
    const streams = new Map<string, SlideObject>()

    for (const [index, line] of lines.entries()) {
        const [header, data] = line
        const measureOffset = measureChanges.find(([changeIndex]) => changeIndex <= index)?.[1] ?? 0

        // Time Scale Changes
        if (header.length === 5 && header.startsWith('TIL')) {
            timeScaleChanges.push(...toTimeScaleChanges(line, toTick))
            continue
        }

        // BPM
        if (header.length === 5 && header.startsWith('BPM')) {
            bpms.set(header.substring(3), +data)
            continue
        }

        // BPM Changes
        if (header.length === 5 && header.endsWith('08')) {
            bpmChanges.push(...toBpmChanges(line, measureOffset, bpms, toTick))
            continue
        }

        // Tap Notes
        if (header.length === 5 && header[3] === '1') {
            tapNotes.push(...toNotes(line, measureOffset, toTick))
            continue
        }

        // Streams
        if (header.length === 6 && (header[3] === '3' || header[3] === '9')) {
            const key = `${header[5]}-${header[3]}`
            const stream = streams.get(key)

            if (stream) {
                stream.notes.push(...toNotes(line, measureOffset, toTick))
            } else {
                streams.set(key, {
                    type: +header[3],
                    notes: toNotes(line, measureOffset, toTick),
                })
            }
            continue
        }

        // Directional Notes
        if (header.length === 5 && header[3] === '5') {
            directionalNotes.push(...toNotes(line, measureOffset, toTick))
            continue
        }
    }

    const slides = [...streams.values()].flatMap(toSlides)

    return {
        offset,
        ticksPerBeat,
        timeScaleChanges,
        bpmChanges,
        tapNotes,
        directionalNotes,
        slides,
    }
}

const parse = (
    sus: string,
): {
    lines: Line[]
    measureChanges: MeasureChange[]
    meta: Meta
} => {
    const lines: Line[] = []
    const measureChanges: MeasureChange[] = []
    const meta: Meta = new Map()

    for (const line of sus
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('#'))) {
        const isLine = line.includes(':')

        const index = line.indexOf(isLine ? ':' : ' ')
        if (index === -1) continue

        const left = line.substring(1, index).trim()
        const right = line.substring(index + 1).trim()

        if (isLine) {
            lines.push([left, right])
        } else if (left === 'MEASUREBS') {
            measureChanges.unshift([lines.length, +right])
        } else {
            meta.set(left, right)
        }
    }

    return {
        lines,
        measureChanges,
        meta,
    }
}

const getTicksPerBeat = (meta: Map<string, string>) => {
    const request = meta.get('REQUEST')
    if (!request) return

    if (!request.startsWith('"ticks_per_beat ') || !request.endsWith('"')) return

    return +request.slice(16, -1)
}

const getBarLengths = (lines: Line[], measureChanges: MeasureChange[]) => {
    const barLengths: BarLengthObject[] = []

    for (const [index, line] of lines.entries()) {
        const [header, data] = line

        if (header.length !== 5) continue
        if (!header.endsWith('02')) continue

        const measure =
            +header.substring(0, 3) +
            (measureChanges.find(([changeIndex]) => changeIndex <= index)?.[1] ?? 0)
        if (Number.isNaN(measure)) continue

        barLengths.push({ measure, length: +data })
    }

    return barLengths
}

const getToTick = (barLengths: BarLengthObject[], ticksPerBeat: number): ToTick => {
    let ticks = 0
    const bars = barLengths
        .sort((a, b) => a.measure - b.measure)
        .map(({ measure, length }, i, values) => {
            if (i) {
                const prev = values[i - 1]
                ticks += (measure - prev.measure) * prev.length * ticksPerBeat
            }

            return { measure, ticksPerMeasure: length * ticksPerBeat, ticks }
        })
        .reverse()

    return (measure, p, q) => {
        const bar = bars.find((bar) => measure >= bar.measure)
        if (!bar) throw new Error('Unexpected missing bar')

        return (
            bar.ticks +
            (measure - bar.measure) * bar.ticksPerMeasure +
            (p * bar.ticksPerMeasure) / q
        )
    }
}

const toBpmChanges = (
    line: Line,
    measureOffset: number,
    bpms: Map<string, number>,
    toTick: ToTick,
) =>
    toRaws(line, measureOffset, toTick).map(({ tick, value }) => ({
        tick,
        bpm: bpms.get(value) ?? 0,
    }))

const toTimeScaleChanges = ([, data]: Line, toTick: ToTick) => {
    if (!data.startsWith('"') || !data.endsWith('"'))
        throw new Error('Unexpected time scale changes')

    return data
        .slice(1, -1)
        .split(',')
        .map((segment) => segment.trim())
        .filter((segment) => !!segment)
        .map((segment) => {
            const [l, rest] = segment.split("'")
            const [m, r] = rest.split(':')

            const measure = +l
            const tick = +m
            const timeScale = +r

            if (Number.isNaN(measure) || Number.isNaN(tick) || Number.isNaN(timeScale))
                throw new Error('Unexpected time scale change')

            return {
                tick: toTick(measure, 0, 1) + tick,
                timeScale,
            }
        })
        .sort((a, b) => a.tick - b.tick)
}

const toNotes = (line: Line, measureOffset: number, toTick: ToTick) => {
    const [header] = line
    const lane = parseInt(header[4], 36)

    return toRaws(line, measureOffset, toTick).map(({ tick, value }) => {
        const width = parseInt(value[1], 36)

        return {
            tick,
            lane,
            width,
            type: parseInt(value[0], 36),
        }
    })
}

const toSlides = (stream: SlideObject) => {
    const slides: SlideObject[] = []

    let notes: NoteObject[] | undefined
    for (const note of stream.notes.sort((a, b) => a.tick - b.tick)) {
        if (!notes) {
            notes = []
            slides.push({
                type: stream.type,
                notes,
            })
        }

        notes.push(note)

        if (note.type === 2) {
            notes = undefined
        }
    }

    return slides
}

const toRaws = ([header, data]: Line, measureOffset: number, toTick: ToTick) => {
    const measure = +header.substring(0, 3) + measureOffset
    return (data.match(/.{2}/g) ?? [])
        .map(
            (value, i, values) =>
                value !== '00' && {
                    tick: toTick(measure, i, values.length),
                    value,
                },
        )
        .filter((object): object is RawObject => !!object)
}
