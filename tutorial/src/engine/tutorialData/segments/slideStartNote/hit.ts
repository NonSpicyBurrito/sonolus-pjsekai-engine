import { connector } from '../../components/connector.js'
import { slide } from '../../components/slide.js'
import { slotEffect } from '../../components/slotEffect.js'
import { slotGlowEffect } from '../../components/slotGlowEffect.js'
import { effect } from '../../effect.js'
import { drawHand } from '../../instruction.js'
import {
    particle,
    playCircularNoteEffect,
    playLaneEffects,
    playLinearNoteEffect,
    spawnCircularHoldEffect,
    spawnLinearHoldEffect,
} from '../../particle.js'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
const effectInstanceIds = tutorialMemory({
    circular: ParticleEffectInstanceId,
    linear: ParticleEffectInstanceId,
})

export const slideStartNoteHit = {
    enter() {
        slide.show()
        connector.showActive()

        effect.clips.normalPerfect.play(0)

        playLinearNoteEffect(particle.effects.slideNoteLinear)
        playCircularNoteEffect(particle.effects.slideNoteCircular)
        playLaneEffects()

        sfxInstanceId = effect.clips.normalHold.loop()
        effectInstanceIds.circular = spawnCircularHoldEffect()
        effectInstanceIds.linear = spawnLinearHoldEffect()

        slotGlowEffect.show('slide')
        slotEffect.show('slide')
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        slide.clear()
        connector.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceIds.circular)
        particle.effects.destroy(effectInstanceIds.linear)

        slotGlowEffect.clear()
        slotEffect.clear()
    },
}
