import { SEntity, SLevelData } from 'sonolus.js'
import { analyze, NoteObject } from './analyze'

type Wrapper = {
    group: number
    time: number
    entity: SEntity
    ref?: Wrapper
}

type NoteInfo = {
    note: NoteObject
    key: string
    time: number
    isCritical: boolean
}

const ticksPerBeat = 480

export function fromSus(
    sus: string,
    archetypes: {
        initializationIndex: number
        stageIndex: number

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
): SLevelData {
    const score = analyze(sus, ticksPerBeat)

    const flickMods = new Map<string, -1 | 0 | 1>()
    const criticalMods = new Set<string>()
    const tickRemoveMods = new Set<string>()
    const easeInMods = new Set<string>()
    const easeOutMods = new Set<string>()

    const slides = new Set<string>()

    score.slides.forEach((slide) => {
        slide.forEach((note) => {
            const key = getKey(note)
            switch (note.type) {
                case 1:
                case 2:
                case 3:
                case 5:
                    slides.add(key)
                    break
            }
        })
    })
    score.directionalNotes.forEach((note) => {
        const key = getKey(note)
        switch (note.type) {
            case 1:
                flickMods.set(key, -1)
                break
            case 3:
                flickMods.set(key, 0)
                break
            case 4:
                flickMods.set(key, 1)
                break
            case 2:
                easeInMods.add(key)
                break
            case 5:
            case 6:
                easeOutMods.add(key)
                break
        }
    })
    score.tapNotes.forEach((note) => {
        const key = getKey(note)
        switch (note.type) {
            case 2:
                criticalMods.add(key)
                break
            case 3:
                tickRemoveMods.add(key)
                break
        }
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
    ]

    const taps = new Set<string>()
    score.tapNotes
        .filter((note) => note.lane > 1 && note.lane < 14)
        .forEach((note) => {
            const key = getKey(note)
            if (slides.has(key)) return

            const time = score.toTime(note.tick)
            switch (note.type) {
                case 1: {
                    if (taps.has(key)) break
                    taps.add(key)

                    const flickMod = flickMods.get(key)
                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype:
                                flickMod === undefined
                                    ? archetypes.tapNoteIndex
                                    : archetypes.flickNoteIndex,
                            data: {
                                index: 0,
                                values: [
                                    time,
                                    note.lane - 8 + note.width / 2,
                                    note.width / 2,
                                    flickMod || 0,
                                ],
                            },
                        },
                    })
                    break
                }
                case 2: {
                    if (taps.has(key)) break
                    taps.add(key)

                    const flickMod = flickMods.get(key)
                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype:
                                flickMod === undefined
                                    ? archetypes.criticalTapNoteIndex
                                    : archetypes.criticalFlickNoteIndex,
                            data: {
                                index: 0,
                                values: [
                                    time,
                                    note.lane - 8 + note.width / 2,
                                    note.width / 2,
                                    flickMod || 0,
                                ],
                            },
                        },
                    })
                    break
                }
            }
        })

    score.slides.forEach((slide) => {
        const startNote = slide.find(({ type }) => type === 1 || type === 2)
        if (!startNote) return

        const isStartCritical = criticalMods.has(getKey(startNote))
        const hiddenStartTicks = startNote.tick + ticksPerBeat / 2

        let head: NoteInfo | undefined
        let ref: Wrapper | undefined
        const connectedNotes: NoteInfo[] = []
        slide.forEach((note) => {
            const key = getKey(note)
            const time = score.toTime(note.tick)
            const isCritical = isStartCritical || criticalMods.has(key)

            let newHead: NoteInfo | undefined
            switch (note.type) {
                case 1: {
                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype: isCritical
                                ? archetypes.criticalSlideStartIndex
                                : archetypes.slideStartIndex,
                            data: {
                                index: 0,
                                values: [
                                    time,
                                    note.lane - 8 + note.width / 2,
                                    note.width / 2,
                                ],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = {
                        note,
                        key,
                        time,
                        isCritical,
                    }
                    break
                }
                case 2: {
                    const flickMod = flickMods.get(key)
                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype: isCritical
                                ? flickMod === undefined
                                    ? archetypes.criticalSlideEndIndex
                                    : archetypes.criticalSlideEndFlickIndex
                                : flickMod === undefined
                                ? archetypes.slideEndIndex
                                : archetypes.slideEndFlickIndex,
                            data: {
                                index: 0,
                                values: [
                                    time,
                                    note.lane - 8 + note.width / 2,
                                    note.width / 2,
                                    flickMod || 0,
                                ],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = {
                        note,
                        key,
                        time,
                        isCritical,
                    }
                    break
                }
                case 3: {
                    if (tickRemoveMods.has(key)) {
                        connectedNotes.push({
                            note,
                            key,
                            time,
                            isCritical,
                        })
                        break
                    }

                    wrappers.push({
                        group: 0,
                        time,
                        entity: {
                            archetype: isCritical
                                ? archetypes.criticalSlideTickIndex
                                : archetypes.slideTickIndex,
                            data: {
                                index: 0,
                                values: [
                                    time,
                                    note.lane - 8 + note.width / 2,
                                    note.width / 2,
                                ],
                            },
                        },
                    })
                    ref = ref || wrappers[wrappers.length - 1]
                    newHead = {
                        note,
                        key,
                        time,
                        isCritical,
                    }
                    break
                }
                case 5: {
                    if (tickRemoveMods.has(key)) break

                    newHead = {
                        note,
                        key,
                        time,
                        isCritical,
                    }
                }
            }

            if (!newHead) return
            if (!head) {
                head = newHead
                connectedNotes.length = 0
                return
            }

            const easeType = easeInMods.has(head.key)
                ? 0
                : easeOutMods.has(head.key)
                ? 1
                : -1

            const h = head
            connectedNotes.forEach((info) => {
                const y = ease((info.time - h.time) / (time - h.time), easeType)
                const lane = h.note.lane + (note.lane - h.note.lane) * y
                const width = h.note.width + (note.width - h.note.width) * y

                wrappers.push({
                    group: 0,
                    time: info.time,
                    entity: {
                        archetype: info.isCritical
                            ? archetypes.criticalSlideTickIndex
                            : archetypes.slideTickIndex,
                        data: {
                            index: 0,
                            values: [
                                info.time,
                                lane - 8 + width / 2,
                                width / 2,
                            ],
                        },
                    },
                })
            })

            wrappers.push({
                group: 1,
                time,
                ref,
                entity: {
                    archetype: head.isCritical
                        ? archetypes.criticalSlideConnectorIndex
                        : archetypes.slideConnectorIndex,
                    data: {
                        index: 0,
                        values: [
                            head.time,
                            head.note.lane - 8 + head.note.width / 2,
                            head.note.width / 2,
                            time,
                            note.lane - 8 + note.width / 2,
                            note.width / 2,
                            easeType,
                        ],
                    },
                },
            })

            const beginTicks = head.note.tick
            const endTicks = note.tick
            for (
                let i = hiddenStartTicks;
                i < endTicks;
                i += ticksPerBeat / 2
            ) {
                if (i < beginTicks) continue

                const t = score.toTime(i)
                const y = ease((t - h.time) / (time - h.time), easeType)
                const lane = h.note.lane + (note.lane - h.note.lane) * y
                const width = h.note.width + (note.width - h.note.width) * y

                wrappers.push({
                    group: 1,
                    time: t,
                    entity: {
                        archetype: archetypes.slideHiddenTickIndex,
                        data: {
                            index: 0,
                            values: [t, lane - 8 + width / 2, width / 2],
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

        wrapper.entity.data.values.unshift(wrappers.indexOf(wrapper.ref))
    })

    return { entities: wrappers.map(({ entity }) => entity) }
}

function getKey(note: NoteObject) {
    return `${note.tick}-${note.lane}-${note.width}`
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
