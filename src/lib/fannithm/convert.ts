import { LevelData, LevelDataEntity } from 'sonolus-core'

export type Fannithm = {
    timelines: {
        id: string
        name: string
    }[]
    bpms: {
        id: string
        timeline: string
        beat: Beat
        bpm: number
    }[]
    notes: ({
        id: string
        timeline: string
        beat: Beat
        lane: number
        width: number
        critical?: boolean
    } & (
        | {
              type: NoteType.Tap
          }
        | {
              type: NoteType.Flick
              direction: Direction
          }
    ))[]
    slides: {
        id: string
        timeline: string
        critical?: boolean
        notes: ({
            id: string
            beat: Beat
        } & (
            | {
                  type: NoteType.Visible
                  lane?: number
                  width?: number
                  curve?: Curve
              }
            | {
                  type: NoteType.Start | NoteType.Invisible | NoteType.EndDefault
                  lane: number
                  width: number
                  curve: Curve
              }
            | {
                  type: NoteType.EndFlick
                  lane: number
                  width: number
                  curve: Curve
                  direction: Direction
                  critical?: boolean
              }
        ))[]
    }[]
}

type Beat = [number, number, number]

enum NoteType {
    Tap,
    Flick,
    Start,
    Invisible,
    Visible,
    EndDefault,
    EndFlick,
}

enum Direction {
    Up,
    Left,
    Right,
}

enum Curve {
    Linear = 1,
    EaseIn,
    EaseOut,
}

type Wrapper = {
    group: number
    time: number
    entity: LevelDataEntity
    ref?: Wrapper
}

type NoteInfo = {
    note: Fannithm['slides'][number]['notes'][number]
    time: number
}

const ticksPerHidden = 0.5

export function fromFannithm(
    fannithm: Fannithm,
    bgmOffset: number,
    chartOffset: number,
    archetypes: {
        initializationIndex: number
        stageIndex: number
        inputIndex: number

        tapNoteIndex: number
        flickNoteIndex: number
        slideStartIndex: number
        slideTickIndex: number
        slideEndIndex: number
        slideEndFlickIndex: number
        slideConnectorIndex: number

        criticalTapNoteIndex: number
        criticalFlickNoteIndex: number
        criticalSlideStartIndex: number
        criticalSlideTickIndex: number
        criticalSlideEndIndex: number
        criticalSlideEndFlickIndex: number
        criticalSlideConnectorIndex: number

        slideHiddenTickIndex: number
    }
): LevelData {
    const timelineToTimes = new Map<string, (beat: Beat) => number>()
    fannithm.timelines.forEach(({ id }) => {
        let time = 0
        const timings = fannithm.bpms
            .filter(({ timeline }) => timeline === id)
            .sort((a, b) => toTick(a.beat) - toTick(b.beat))
            .map(({ beat, bpm }) => ({ tick: toTick(beat), bpm }))
            .map(({ tick, bpm }, i, values) => {
                const prev = values[i - 1]
                if (prev) {
                    time += ((tick - prev.tick) * 60) / prev.bpm
                }

                return { tick, bpm, time }
            })

        timelineToTimes.set(id, (beat: Beat) => {
            const tick = toTick(beat)
            const timing = timings.find((timing) => tick >= timing.tick)
            if (!timing) throw 'Unexpected missing timing'

            return timing.time + chartOffset + ((tick - timing.tick) * 60) / timing.bpm
        })
    })

    const wrappers: Wrapper[] = [
        {
            group: -1,
            time: -1000,
            entity: {
                archetype: archetypes.initializationIndex,
            },
        },
        {
            group: -1,
            time: -999,
            entity: {
                archetype: archetypes.stageIndex,
            },
        },
        {
            group: -1,
            time: -998,
            entity: {
                archetype: archetypes.inputIndex,
            },
        },
    ]

    fannithm.notes.forEach((note) => {
        const time = toTime(note.timeline, note.beat)
        switch (note.type) {
            case NoteType.Tap: {
                wrappers.push({
                    group: 0,
                    time,
                    entity: {
                        archetype: note.critical
                            ? archetypes.criticalTapNoteIndex
                            : archetypes.tapNoteIndex,
                        data: {
                            index: 0,
                            values: [time, note.lane - 6 + note.width / 2, note.width / 2, 0],
                        },
                    },
                })
                break
            }
            case NoteType.Flick: {
                wrappers.push({
                    group: 0,
                    time,
                    entity: {
                        archetype: note.critical
                            ? archetypes.criticalFlickNoteIndex
                            : archetypes.flickNoteIndex,
                        data: {
                            index: 0,
                            values: [
                                time,
                                note.lane - 6 + note.width / 2,
                                note.width / 2,
                                toMod(note.direction),
                            ],
                        },
                    },
                })
                break
            }
        }
    })

    fannithm.slides.forEach((slide) => {
        const minHiddenTick =
            Math.floor(toTick(slide.notes[0].beat) / ticksPerHidden + 1) * ticksPerHidden

        let head: NoteInfo | undefined
        let ref: Wrapper | undefined
        const connectedNotes: NoteInfo[] = []
        slide.notes.forEach((note) => {
            const time = toTime(slide.timeline, note.beat)

            let newHead: NoteInfo | undefined
            switch (note.type) {
                case NoteType.Start: {
                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype: slide.critical
                                ? archetypes.criticalSlideStartIndex
                                : archetypes.slideStartIndex,
                            data: {
                                index: 0,
                                values: [time, note.lane - 6 + note.width / 2, note.width / 2],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = { note, time }
                    break
                }
                case NoteType.EndDefault: {
                    wrappers.push({
                        group: 0,
                        time,
                        ref,
                        entity: {
                            archetype: slide.critical
                                ? archetypes.criticalSlideEndIndex
                                : archetypes.slideEndIndex,
                            data: {
                                index: 0,
                                values: [time, note.lane - 6 + note.width / 2, note.width / 2, 0],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = { note, time }
                    break
                }
                case NoteType.EndFlick: {
                    wrappers.push({
                        group: 0,
                        time,
                        ref,
                        entity: {
                            archetype:
                                slide.critical || note.critical
                                    ? archetypes.criticalSlideEndFlickIndex
                                    : archetypes.slideEndFlickIndex,
                            data: {
                                index: 0,
                                values: [
                                    time,
                                    note.lane - 6 + note.width / 2,
                                    note.width / 2,
                                    toMod(note.direction),
                                ],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = { note, time }
                    break
                }
                case NoteType.Visible: {
                    if (
                        note.lane === undefined ||
                        note.width === undefined ||
                        note.curve === undefined
                    ) {
                        connectedNotes.push({ note, time })
                        break
                    }

                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype: slide.critical
                                ? archetypes.criticalSlideTickIndex
                                : archetypes.slideTickIndex,
                            data: {
                                index: 0,
                                values: [time, note.lane - 6 + note.width / 2, note.width / 2],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = { note, time }
                    break
                }
                case NoteType.Invisible: {
                    newHead = { note, time }
                    break
                }
            }

            if (!newHead) return
            if (!head) {
                head = newHead
                connectedNotes.length = 0
                return
            }

            if (
                head.note.lane === undefined ||
                head.note.width === undefined ||
                note.lane === undefined ||
                note.width === undefined
            )
                throw 'Unexpected connection'

            const easeType =
                head.note.curve === Curve.EaseIn ? 0 : head.note.curve === Curve.EaseOut ? 1 : -1

            for (const info of connectedNotes) {
                const y = ease((info.time - head.time) / (time - head.time), easeType)
                const lane = head.note.lane + (note.lane - head.note.lane) * y
                const width = head.note.width + (note.width - head.note.width) * y

                wrappers.push({
                    group: 0,
                    time: info.time,
                    entity: {
                        archetype: slide.critical
                            ? archetypes.criticalSlideTickIndex
                            : archetypes.slideTickIndex,
                        data: {
                            index: 0,
                            values: [info.time, lane - 6 + width / 2, width / 2],
                        },
                    },
                })
            }

            wrappers.push({
                group: 1,
                time,
                ref,
                entity: {
                    archetype: slide.critical
                        ? archetypes.criticalSlideConnectorIndex
                        : archetypes.slideConnectorIndex,
                    data: {
                        index: 0,
                        values: [
                            head.time,
                            head.note.lane - 6 + head.note.width / 2,
                            head.note.width / 2,
                            time,
                            note.lane - 6 + note.width / 2,
                            note.width / 2,
                            easeType,
                        ],
                    },
                },
            })

            const endTick = toTick(note.beat)
            for (
                let i = Math.max(
                    Math.ceil(toTick(head.note.beat) / ticksPerHidden) * ticksPerHidden,
                    minHiddenTick
                );
                i < endTick;
                i += ticksPerHidden
            ) {
                const t = toTime(slide.timeline, [i, 0, 1])
                const y = ease((t - head.time) / (time - head.time), easeType)
                const lane = head.note.lane + (note.lane - head.note.lane) * y
                const width = head.note.width + (note.width - head.note.width) * y
                if (t === 65.8) {
                    console.log({
                        tail: note,
                        head: head.note,
                        ct: t,
                        tt: time,
                        ht: head.time,
                        easeType,
                        y,
                        lane,
                        width,
                    })
                }

                wrappers.push({
                    group: 1,
                    time: t,
                    entity: {
                        archetype: archetypes.slideHiddenTickIndex,
                        data: {
                            index: 0,
                            values: [t, lane - 6 + width / 2, width / 2],
                        },
                    },
                })
            }

            head = newHead
            connectedNotes.length = 0
        })
    })

    wrappers.sort((a, b) => a.group - b.group || a.time - b.time)

    wrappers.forEach((wrapper) => {
        if (!wrapper.ref) return
        if (!wrapper.entity.data) return

        wrapper.entity.data.values.push(wrappers.indexOf(wrapper.ref))
    })

    return {
        bgmOffset,
        entities: wrappers.map(({ entity }) => entity),
    }

    function toTime(timelineId: string, beat: Beat) {
        const toTime = timelineToTimes.get(timelineId)
        if (!toTime) throw 'Unexpected missing timeline'

        return toTime(beat)
    }
}

function toTick(beat: Beat) {
    return beat[0] + beat[1] / beat[2]
}

function toMod(direction: Direction) {
    return [-1, 0, 1][direction]
}

function ease(x: number, type: 0 | 1 | -1) {
    switch (type) {
        case 0:
            return x * x
        case 1:
            return 1 - (1 - x) * (1 - x)
        case -1:
            return x
    }
}
