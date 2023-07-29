import { connector } from './components/connector.mjs'
import { flickArrow } from './components/flickArrow.mjs'
import { initialization } from './components/initialization.mjs'
import { noteDisplay } from './components/noteDisplay.mjs'
import { slide } from './components/slide.mjs'
import { slotEffect } from './components/slotEffect.mjs'
import { slotGlowEffect } from './components/slotGlowEffect.mjs'
import { stage } from './components/stage.mjs'
import { flickNoteFall } from './segments/flickNote/fall.mjs'
import { flickNoteFrozen } from './segments/flickNote/frozen.mjs'
import { flickNoteHit } from './segments/flickNote/hit.mjs'
import { flickNoteIntro } from './segments/flickNote/intro.mjs'
import { slideEndFlickNoteFall } from './segments/slideEndFlickNote/fall.mjs'
import { slideEndFlickNoteFrozen } from './segments/slideEndFlickNote/frozen.mjs'
import { slideEndFlickNoteHit } from './segments/slideEndFlickNote/hit.mjs'
import { slideEndFlickNoteIntro } from './segments/slideEndFlickNote/intro.mjs'
import { slideEndNoteFall } from './segments/slideEndNote/fall.mjs'
import { slideEndNoteFrozen } from './segments/slideEndNote/frozen.mjs'
import { slideEndNoteHit } from './segments/slideEndNote/hit.mjs'
import { slideEndNoteIntro } from './segments/slideEndNote/intro.mjs'
import { slideStartNoteFall } from './segments/slideStartNote/fall.mjs'
import { slideStartNoteFrozen } from './segments/slideStartNote/frozen.mjs'
import { slideStartNoteHit } from './segments/slideStartNote/hit.mjs'
import { slideStartNoteIntro } from './segments/slideStartNote/intro.mjs'
import { tapNoteFall } from './segments/tapNote/fall.mjs'
import { tapNoteFrozen } from './segments/tapNote/frozen.mjs'
import { tapNoteHit } from './segments/tapNote/hit.mjs'
import { tapNoteIntro } from './segments/tapNote/intro.mjs'
import { segment } from './shared.mjs'

const components = [
    initialization,
    stage,
    flickArrow,
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

    const index = current % 4
    if (index === 0) {
        endTime += 1
    } else if (index === 2) {
        endTime += 4
    } else {
        endTime += 2
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
