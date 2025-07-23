import { connector } from './components/connector.js'
import { flickArrow } from './components/flickArrow.js'
import { initialization } from './components/initialization.js'
import { noteDisplay } from './components/noteDisplay.js'
import { slide } from './components/slide.js'
import { slotEffect } from './components/slotEffect.js'
import { slotGlowEffect } from './components/slotGlowEffect.js'
import { stage } from './components/stage.js'
import { traceDiamond } from './components/traceDiamond.js'
import { segment } from './segment.js'
import { flickNoteFall } from './segments/flickNote/fall.js'
import { flickNoteFrozen } from './segments/flickNote/frozen.js'
import { flickNoteHit } from './segments/flickNote/hit.js'
import { flickNoteIntro } from './segments/flickNote/intro.js'
import { slideEndFlickNoteFall } from './segments/slideEndFlickNote/fall.js'
import { slideEndFlickNoteFrozen } from './segments/slideEndFlickNote/frozen.js'
import { slideEndFlickNoteHit } from './segments/slideEndFlickNote/hit.js'
import { slideEndFlickNoteIntro } from './segments/slideEndFlickNote/intro.js'
import { slideEndNoteFall } from './segments/slideEndNote/fall.js'
import { slideEndNoteFrozen } from './segments/slideEndNote/frozen.js'
import { slideEndNoteHit } from './segments/slideEndNote/hit.js'
import { slideEndNoteIntro } from './segments/slideEndNote/intro.js'
import { slideStartNoteFall } from './segments/slideStartNote/fall.js'
import { slideStartNoteFrozen } from './segments/slideStartNote/frozen.js'
import { slideStartNoteHit } from './segments/slideStartNote/hit.js'
import { slideStartNoteIntro } from './segments/slideStartNote/intro.js'
import { tapNoteFall } from './segments/tapNote/fall.js'
import { tapNoteFrozen } from './segments/tapNote/frozen.js'
import { tapNoteHit } from './segments/tapNote/hit.js'
import { tapNoteIntro } from './segments/tapNote/intro.js'
import { traceFlickNoteFall } from './segments/traceFlickNote/fall.js'
import { traceFlickNoteFrozen } from './segments/traceFlickNote/frozen.js'
import { traceFlickNoteHit } from './segments/traceFlickNote/hit.js'
import { traceFlickNoteIntro } from './segments/traceFlickNote/intro.js'
import { traceNoteFall } from './segments/traceNote/fall.js'
import { traceNoteFrozen } from './segments/traceNote/frozen.js'
import { traceNoteHit } from './segments/traceNote/hit.js'
import { traceNoteIntro } from './segments/traceNote/intro.js'

const components = [
    initialization,
    stage,
    flickArrow,
    traceDiamond,
    noteDisplay,
    slide,
    connector,
    slotGlowEffect,
    slotEffect,
] as const

const segments = [
    tapNoteIntro,
    tapNoteFall,
    tapNoteFrozen,
    tapNoteHit,

    flickNoteIntro,
    flickNoteFall,
    flickNoteFrozen,
    flickNoteHit,

    traceNoteIntro,
    traceNoteFall,
    traceNoteFrozen,
    traceNoteHit,

    traceFlickNoteIntro,
    traceFlickNoteFall,
    traceFlickNoteFrozen,
    traceFlickNoteHit,

    slideStartNoteIntro,
    slideStartNoteFall,
    slideStartNoteFrozen,
    slideStartNoteHit,

    slideEndNoteIntro,
    slideEndNoteFall,
    slideEndNoteFrozen,
    slideEndNoteHit,

    slideEndFlickNoteIntro,
    slideEndFlickNoteFall,
    slideEndFlickNoteFrozen,
    slideEndFlickNoteHit,
] as const

let current = tutorialMemory(Number)
let next = tutorialMemory(Number)
let startTime = tutorialMemory(Number)
let endTime = tutorialMemory(Number)

const preprocess = () => {
    current = -1
}

const preprocessComponent = (index: number) => {
    index -= 1

    const component = components[index]
    if (!('preprocess' in component)) return

    component.preprocess()
}

const navigate = () => {
    if (navigation.direction > 0) {
        next = Math.mod(current + navigation.direction * (current % 4 ? 1 : 4), segments.length)
    } else {
        next = Math.mod(Math.floor(current / 4) * 4 - 4, segments.length)
    }
}

const finishSegment = () => {
    if (current !== next) return
    if (time.now < endTime) return

    next = Math.mod(current + 1, segments.length)
}

const exitCurrentSegment = (index: number) => {
    if (current === next) return

    index -= 1
    if (index !== current) return

    const segment = segments[index]
    if (!('exit' in segment)) return

    segment.exit()
}

const enterNextSegment = (index: number) => {
    if (current === next) return

    index -= 1 + segments.length
    if (index !== next) return

    const segment = segments[index]
    if (!('enter' in segment)) return

    segment.enter()
}

const moveNext = () => {
    if (current === next) return

    current = next

    startTime = time.now
    endTime = startTime

    switch (current % 4) {
        case 0:
            endTime += 1
            break
        case 2:
            endTime += 4
            break
        default:
            endTime += 2
            break
    }
}

const updateSegmentTime = () => {
    segment.time = time.now - startTime
}

const updateCurrentSegment = (index: number) => {
    index -= 3 + segments.length * 2
    if (index !== current) return

    const segment = segments[index]
    if (!('update' in segment)) return

    segment.update()
}

const updateComponent = (index: number) => {
    index -= 3 + segments.length * 3

    const component = components[index]
    if (!('update' in component)) return

    component.update()
}

const forEach = (items: readonly unknown[], callback: (index: number) => void) =>
    items.map(() => callback)

export const tutorial = {
    preprocess: [preprocess, ...forEach(components, preprocessComponent)],

    navigate: [navigate],

    update: [
        finishSegment,
        ...forEach(segments, exitCurrentSegment),
        ...forEach(segments, enterNextSegment),
        moveNext,
        updateSegmentTime,
        ...forEach(segments, updateCurrentSegment),
        ...forEach(components, updateComponent),
    ],
}
