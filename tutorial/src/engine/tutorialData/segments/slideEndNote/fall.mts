import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { slide } from '../../components/slide.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { drawHand, spawnCircularHoldEffect, spawnLinearHoldEffect } from '../../utils.mjs'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
const effectInstanceIds = tutorialMemory({
    circular: ParticleEffectInstanceId,
    linear: ParticleEffectInstanceId,
})

export const slideEndNoteFall = {
    enter() {
        noteDisplay.showFall('slideEnd')
        slide.show()
        connector.showFallOut()

        sfxInstanceId = effect.clips.normalHold.loop()
        effectInstanceIds.circular = spawnCircularHoldEffect()
        effectInstanceIds.linear = spawnLinearHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        noteDisplay.clear()
        slide.clear()
        connector.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceIds.circular)
        particle.effects.destroy(effectInstanceIds.linear)
    },
}
