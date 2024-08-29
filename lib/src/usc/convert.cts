import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from '@sonolus/core'
import {
    USC,
    USCBpmChange,
    USCObject,
    USCSingleNote,
    USCSlideNote,
    USCTimeScaleChange,
} from './index.cjs'

type Intermediate = {
    archetype: string
    data: Record<string, number | Intermediate | undefined>
    sim: boolean
}

type Append = (intermediate: Intermediate) => void

type Handler<T extends USCObject> = (object: T, append: Append) => void

export const uscToLevelData = (usc: USC, offset = 0): LevelData => {
    const entities: LevelDataEntity[] = []

    const timeToIntermediates = new Map<number, Intermediate[]>()

    const intermediateToRef = new Map<Intermediate, string>()
    const intermediateToEntity = new Map<Intermediate, LevelDataEntity>()

    let i = 0
    const getRef = (intermediate: Intermediate) => {
        let ref = intermediateToRef.get(intermediate)
        if (ref) return ref

        ref = (i++).toString(36)
        intermediateToRef.set(intermediate, ref)

        const entity = intermediateToEntity.get(intermediate)
        if (entity) entity.name = ref

        return ref
    }

    const append: Append = (intermediate) => {
        const entity: LevelDataEntity = {
            archetype: intermediate.archetype,
            data: [],
        }

        if (intermediate.sim) {
            const beat = intermediate.data[EngineArchetypeDataName.Beat]
            if (typeof beat !== 'number') throw new Error('Unexpected beat')

            const intermediates = timeToIntermediates.get(beat)
            if (intermediates) {
                intermediates.push(intermediate)
            } else {
                timeToIntermediates.set(beat, [intermediate])
            }
        }

        const ref = intermediateToRef.get(intermediate)
        if (ref) entity.name = ref

        intermediateToEntity.set(intermediate, entity)
        entities.push(entity)

        for (const [name, value] of Object.entries(intermediate.data)) {
            if (value === undefined) continue

            if (typeof value === 'number') {
                entity.data.push({
                    name,
                    value,
                })
            } else {
                entity.data.push({
                    name,
                    ref: getRef(value),
                })
            }
        }
    }

    append({
        archetype: 'Initialization',
        data: {},
        sim: false,
    })
    append({
        archetype: 'Stage',
        data: {},
        sim: false,
    })

    for (const object of usc.objects) {
        handlers[object.type](object as never, append)
    }

    for (const intermediates of timeToIntermediates.values()) {
        for (let i = 1; i < intermediates.length; i++) {
            append({
                archetype: 'SimLine',
                data: {
                    a: intermediates[i - 1],
                    b: intermediates[i],
                },
                sim: false,
            })
        }
    }

    return {
        bgmOffset: usc.offset + offset,
        entities,
    }
}

const directions = {
    left: -1,
    up: 0,
    right: 1,
} as const

const eases = {
    out: -1,
    linear: 0,
    in: 1,
} as const

const bpm: Handler<USCBpmChange> = (object, append) => {
    append({
        archetype: EngineArchetypeName.BpmChange,
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            [EngineArchetypeDataName.Bpm]: object.bpm,
        },
        sim: false,
    })
}

const timeScale: Handler<USCTimeScaleChange> = (object, append) => {
    append({
        archetype: EngineArchetypeName.TimeScaleChange,
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            [EngineArchetypeDataName.TimeScale]: object.timeScale,
        },
        sim: false,
    })
}

const single: Handler<USCSingleNote> = (object, append) => {
    const intermediate: Intermediate = {
        archetype: object.direction
            ? object.trace
                ? object.critical
                    ? 'CriticalTraceFlickNote'
                    : 'NormalTraceFlickNote'
                : object.critical
                  ? 'CriticalFlickNote'
                  : 'NormalFlickNote'
            : object.trace
              ? object.critical
                  ? 'CriticalTraceNote'
                  : 'NormalTraceNote'
              : object.critical
                ? 'CriticalTapNote'
                : 'NormalTapNote',
        data: {
            [EngineArchetypeDataName.Beat]: object.beat,
            lane: object.lane,
            size: object.size,
            direction: object.direction && directions[object.direction],
        },
        sim: true,
    }

    append(intermediate)
}

const slide: Handler<USCSlideNote> = (object, append) => {
    type ConnectionIntermediate = Intermediate & {
        ease?: 'out' | 'linear' | 'in'
    }

    const cis: ConnectionIntermediate[] = []
    const joints: ConnectionIntermediate[] = []
    const attaches: ConnectionIntermediate[] = []
    const ends: ConnectionIntermediate[] = []

    const connections = getConnections(object)
    for (const [i, connection] of connections.entries()) {
        if (i === 0) {
            switch (connection.type) {
                case 'start': {
                    const ci: ConnectionIntermediate = {
                        archetype: connection.trace
                            ? connection.critical
                                ? 'CriticalSlideTraceNote'
                                : 'NormalSlideTraceNote'
                            : connection.critical
                              ? 'CriticalSlideStartNote'
                              : 'NormalSlideStartNote',
                        data: {
                            [EngineArchetypeDataName.Beat]: connection.beat,
                            lane: connection.lane,
                            size: connection.size,
                        },
                        sim: true,
                        ease: connection.ease,
                    }

                    cis.push(ci)
                    joints.push(ci)
                    continue
                }
                case 'ignore': {
                    const ci: ConnectionIntermediate = {
                        archetype: 'IgnoredSlideTickNote',
                        data: {
                            [EngineArchetypeDataName.Beat]: connection.beat,
                            lane: connection.lane,
                            size: connection.size,
                        },
                        sim: false,
                        ease: connection.ease,
                    }

                    cis.push(ci)
                    joints.push(ci)
                    continue
                }
                default:
                    throw new Error('Unexpected slide start')
            }
        }

        if (i === connections.length - 1) {
            switch (connection.type) {
                case 'end': {
                    const ci: ConnectionIntermediate = {
                        archetype: connection.direction
                            ? connection.trace
                                ? connection.critical
                                    ? 'CriticalTraceFlickNote'
                                    : 'NormalTraceFlickNote'
                                : connection.critical
                                  ? 'CriticalSlideEndFlickNote'
                                  : 'NormalSlideEndFlickNote'
                            : connection.trace
                              ? connection.critical
                                  ? 'CriticalSlideEndTraceNote'
                                  : 'NormalSlideEndTraceNote'
                              : connection.critical
                                ? 'CriticalSlideEndNote'
                                : 'NormalSlideEndNote',
                        data: {
                            [EngineArchetypeDataName.Beat]: connection.beat,
                            lane: connection.lane,
                            size: connection.size,
                            direction: connection.direction && directions[connection.direction],
                        },
                        sim: true,
                    }

                    cis.push(ci)
                    joints.push(ci)
                    ends.push(ci)
                    continue
                }
                case 'ignore': {
                    const ci: ConnectionIntermediate = {
                        archetype: 'IgnoredSlideTickNote',
                        data: {
                            [EngineArchetypeDataName.Beat]: connection.beat,
                            lane: connection.lane,
                            size: connection.size,
                        },
                        sim: false,
                        ease: connection.ease,
                    }

                    cis.push(ci)
                    joints.push(ci)
                    continue
                }
                default:
                    throw new Error('Unexpected slide end')
            }
        }

        switch (connection.type) {
            case 'ignore': {
                const ci: ConnectionIntermediate = {
                    archetype: 'IgnoredSlideTickNote',
                    data: {
                        [EngineArchetypeDataName.Beat]: connection.beat,
                        lane: connection.lane,
                        size: connection.size,
                    },
                    sim: false,
                    ease: connection.ease,
                }

                cis.push(ci)
                joints.push(ci)
                break
            }
            case 'tick': {
                const ci: ConnectionIntermediate = {
                    archetype: connection.trace
                        ? connection.critical
                            ? 'CriticalSlideTraceNote'
                            : 'NormalSlideTraceNote'
                        : connection.critical
                          ? 'CriticalSlideTickNote'
                          : 'NormalSlideTickNote',
                    data: {
                        [EngineArchetypeDataName.Beat]: connection.beat,
                        lane: connection.lane,
                        size: connection.size,
                    },
                    sim: false,
                    ease: connection.ease,
                }

                cis.push(ci)
                joints.push(ci)
                break
            }
            case 'hidden': {
                const ci: ConnectionIntermediate = {
                    archetype: 'HiddenSlideTickNote',
                    data: {
                        [EngineArchetypeDataName.Beat]: connection.beat,
                    },
                    sim: false,
                }

                cis.push(ci)
                attaches.push(ci)
                break
            }
            case 'attach': {
                const ci: ConnectionIntermediate = {
                    archetype: connection.critical
                        ? 'CriticalAttachedSlideTickNote'
                        : 'NormalAttachedSlideTickNote',
                    data: {
                        [EngineArchetypeDataName.Beat]: connection.beat,
                    },
                    sim: false,
                }

                cis.push(ci)
                attaches.push(ci)
                break
            }
            default:
                throw new Error('Unexpected slide tick')
        }
    }

    const connectors: Intermediate[] = []

    const start = cis[0]
    const end = cis[cis.length - 1]

    for (const [i, joint] of joints.entries()) {
        if (i === 0) continue

        const head = joints[i - 1]
        if (!head.ease) throw new Error('Unexpected missing ease')

        connectors.push({
            archetype: object.active
                ? object.critical
                    ? 'CriticalActiveSlideConnector'
                    : 'NormalActiveSlideConnector'
                : object.critical
                  ? 'CriticalSlideConnector'
                  : 'NormalSlideConnector',
            data: {
                start,
                end,
                head,
                tail: joint,
                ease: eases[head.ease],
            },
            sim: false,
        })
    }

    for (const attach of attaches) {
        const index = cis.indexOf(attach)
        const tailIndex = joints.findIndex((c) => cis.indexOf(c) > index)

        attach.data.attach = connectors[tailIndex - 1]
    }

    for (const end of ends) {
        end.data.slide = connectors[connectors.length - 1]
    }

    for (const ci of cis) {
        append(ci)
    }

    for (const connector of connectors) {
        append(connector)
    }
}

const handlers: {
    [K in USCObject['type']]: Handler<Extract<USCObject, { type: K }>>
} = {
    bpm,
    single,
    timeScale,
    slide,
}

const getConnections = (object: USCSlideNote) => {
    if (!object.active) return object.connections

    const connections = [...object.connections]

    const beats = connections.map(({ beat }) => beat).sort((a, b) => a - b)

    const min = beats[0]
    const max = beats[beats.length - 1]

    const start = Math.max(Math.ceil(min / 0.5) * 0.5, Math.floor(min / 0.5 + 1) * 0.5)

    for (let beat = start; beat < max; beat += 0.5) {
        connections.push({
            type: 'hidden',
            beat,
        })
    }

    return connections.sort((a, b) => a.beat - b.beat)
}
