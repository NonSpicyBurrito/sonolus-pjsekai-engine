import {
    USC,
    USCConnectionAttachNote,
    USCConnectionEndNote,
    USCConnectionStartNote,
    USCConnectionTickNote,
    USCObject,
    USCSlideNote,
} from '../usc/index.cjs'
import { NoteObject, analyze } from './analyze.cjs'

export const susToUSC = (sus: string): USC => {
    const score = analyze(sus)

    const flickMods = new Map<string, 'left' | 'up' | 'right'>()
    const criticalMods = new Set<string>()
    const tickRemoveMods = new Set<string>()
    const easeMods = new Map<string, 'in' | 'out'>()

    const preventSingles = new Set<string>()
    const dedupeSingles = new Set<string>()
    const dedupeSlides = new Map<string, USCSlideNote>()

    for (const slide of score.slides) {
        for (const note of slide) {
            const key = getKey(note)
            switch (note.type) {
                case 1:
                case 2:
                case 3:
                case 5:
                    preventSingles.add(key)
                    break
            }
        }
    }
    for (const note of score.directionalNotes) {
        const key = getKey(note)
        switch (note.type) {
            case 1:
                flickMods.set(key, 'up')
                break
            case 3:
                flickMods.set(key, 'left')
                break
            case 4:
                flickMods.set(key, 'right')
                break
            case 2:
                easeMods.set(key, 'in')
                break
            case 5:
            case 6:
                easeMods.set(key, 'out')
                break
        }
    }
    for (const note of score.tapNotes) {
        const key = getKey(note)
        switch (note.type) {
            case 2:
                criticalMods.add(key)
                break
            case 3:
                tickRemoveMods.add(key)
                break
        }
    }

    const objects: USCObject[] = []

    for (const timeScaleChange of score.timeScaleChanges) {
        objects.push({
            type: 'timeScale',
            beat: timeScaleChange.tick / score.ticksPerBeat,
            timeScale: timeScaleChange.timeScale,
        })
    }

    for (const bpmChange of score.bpmChanges) {
        objects.push({
            type: 'bpm',
            beat: bpmChange.tick / score.ticksPerBeat,
            bpm: bpmChange.bpm,
        })
    }

    for (const note of score.tapNotes) {
        if (note.lane <= 1 || note.lane >= 14) continue
        if (note.type !== 1 && note.type !== 2) continue

        const key = getKey(note)
        if (preventSingles.has(key)) continue

        if (dedupeSingles.has(key)) continue
        dedupeSingles.add(key)

        const object: USCObject = {
            type: 'single',
            beat: note.tick / score.ticksPerBeat,
            lane: note.lane - 8 + note.width / 2,
            size: note.width / 2,
            critical: note.type === 2,
        }

        const flickMod = flickMods.get(key)
        if (flickMod) object.direction = flickMod

        objects.push(object)
    }

    for (const slide of score.slides) {
        const startNote = slide.find(({ type }) => type === 1 || type === 2)
        if (!startNote) continue

        const object: USCSlideNote = {
            type: 'slide',
            critical: criticalMods.has(getKey(startNote)),
            connections: [] as never,
        }

        for (const note of slide) {
            const key = getKey(note)

            const beat = note.tick / score.ticksPerBeat
            const lane = note.lane - 8 + note.width / 2
            const size = note.width / 2
            const critical = object.critical || criticalMods.has(key)
            const ease = easeMods.get(key) ?? 'linear'

            switch (note.type) {
                case 1: {
                    const connection: USCConnectionStartNote = {
                        type: 'start',
                        beat,
                        lane,
                        size,
                        critical,
                        ease: easeMods.get(key) ?? 'linear',
                    }

                    object.connections.push(connection)
                    break
                }
                case 2: {
                    const connection: USCConnectionEndNote = {
                        type: 'end',
                        beat,
                        lane,
                        size,
                        critical,
                    }

                    const flickMod = flickMods.get(key)
                    if (flickMod) connection.direction = flickMod

                    object.connections.push(connection)
                    break
                }
                case 3: {
                    if (tickRemoveMods.has(key)) {
                        const connection: USCConnectionAttachNote = {
                            type: 'attach',
                            beat,
                            critical,
                        }

                        object.connections.push(connection)
                    } else {
                        const connection: USCConnectionTickNote = {
                            type: 'tick',
                            beat,
                            lane,
                            size,
                            critical,
                            ease,
                        }

                        object.connections.push(connection)
                    }
                    break
                }
                case 5: {
                    if (tickRemoveMods.has(key)) break

                    const connection: USCConnectionTickNote = {
                        type: 'tick',
                        beat,
                        lane,
                        size,
                        ease,
                    }

                    object.connections.push(connection)
                    break
                }
            }
        }

        objects.push(object)

        const key = getKey(startNote)
        const dupe = dedupeSlides.get(key)
        if (dupe) objects.splice(objects.indexOf(dupe), 1)

        dedupeSlides.set(key, object)
    }

    return {
        offset: score.offset,
        objects,
    }
}

const getKey = (note: NoteObject) => `${note.lane}-${note.tick}`
