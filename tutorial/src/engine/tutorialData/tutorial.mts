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

export const tutorial = {
    preprocess() {
        current = -1

        for (const component of components) {
            if (!('preprocess' in component)) continue

            component.preprocess()
        }
    },

    navigate() {
        if (navigation.direction > 0) {
            next = Math.mod(current + navigation.direction * (current % 4 ? 1 : 4), segments.length)
        } else {
            next = Math.mod(Math.floor(current / 4) * 4 - 4, segments.length)
        }
    },

    update() {
        this.updateNavigation()

        segment.time = time.now - startTime

        this.updateCurrentSegment()

        for (const component of components) {
            if (!('update' in component)) continue

            component.update()
        }
    },

    updateNavigation() {
        if (current === next) {
            if (time.now < endTime) return

            next = Math.mod(current + 1, segments.length)
        }

        this.exitCurrentSegment()
        this.enterNextSegment()

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
    },

    exitCurrentSegment() {
        for (const [i, segment] of segments.entries()) {
            if (i !== current) continue
            if (!('exit' in segment)) continue

            segment.exit()
            return
        }
    },

    enterNextSegment() {
        for (const [i, segment] of segments.entries()) {
            if (i !== next) continue
            if (!('enter' in segment)) continue

            segment.enter()
            return
        }
    },

    updateCurrentSegment() {
        for (const [i, segment] of segments.entries()) {
            if (i !== current) continue
            if (!('update' in segment)) continue

            segment.update()
            return
        }
    },
}
