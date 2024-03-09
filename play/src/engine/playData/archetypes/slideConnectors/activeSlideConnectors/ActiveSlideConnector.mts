import { perspectiveLayout } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../configuration/options.mjs'
import { effect, getScheduleSFXTime } from '../../../effect.mjs'
import { note } from '../../../note.mjs'
import { circularEffectLayout, linearEffectLayout, particle } from '../../../particle.mjs'
import { scaledScreen } from '../../../scaledScreen.mjs'
import { getZ, layer } from '../../../skin.mjs'
import { SlideConnector, VisualType } from '../SlideConnector.mjs'

export abstract class ActiveSlideConnector extends SlideConnector {
    abstract glowSprite: SkinSprite

    abstract slideSprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        fallback: SkinSprite
    }

    abstract clips: {
        hold: EffectClip
        fallback: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    scheduleSFXTime = this.entityMemory(Number)

    hasSFXScheduled = this.entityMemory(Boolean)

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)
    effectInstanceIds = this.entityMemory({
        circular: ParticleEffectInstanceId,
        linear: ParticleEffectInstanceId,
    })

    glowZ = this.entityMemory(Number)

    slideZ = this.entityMemory(Number)

    preprocess() {
        super.preprocess()

        this.scheduleSFXTime = getScheduleSFXTime(this.head.time)

        this.spawnTime = Math.min(
            this.visualTime.min,
            timeScaleChanges.at(this.scheduleSFXTime).scaledTime,
        )
    }

    initialize() {
        super.initialize()

        this.glowZ = getZ(layer.connectorSlotGlowEffect, this.head.time, this.headImport.lane)

        this.slideZ = getZ(layer.note.slide, this.head.time, this.headImport.lane)
    }

    updateParallel() {
        this.updateExport()

        if (time.now >= this.tail.time) {
            this.despawn = true
            return
        }

        if (this.shouldScheduleSFX && !this.hasSFXScheduled && time.now >= this.scheduleSFXTime)
            this.scheduleSFX()

        if (time.scaled < this.visualTime.min) return

        this.updateVisualType()

        this.renderConnector()

        if (time.now < this.head.time) return

        if (this.effectInstanceIds.circular) this.updateCircularEffect()

        if (this.effectInstanceIds.linear) this.updateLinearEffect()

        this.renderGlow()

        this.renderSlide()
    }

    terminate() {
        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (this.shouldPlayCircularEffect && this.effectInstanceIds.circular)
            this.destroyCircularEffect()

        if (this.shouldPlayLinearEffect && this.effectInstanceIds.linear) this.destroyLinearEffect()
    }

    onActivate() {
        super.onActivate()

        if (this.shouldPlaySFX && !this.sfxInstanceId) this.playSFX()

        if (this.shouldPlayCircularEffect && !this.effectInstanceIds.circular)
            this.spawnCircularEffect()

        if (this.shouldPlayLinearEffect && !this.effectInstanceIds.linear) this.spawnLinearEffect()
    }

    onDeactivate() {
        super.onDeactivate()

        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (this.shouldPlayCircularEffect && this.effectInstanceIds.circular)
            this.destroyCircularEffect()

        if (this.shouldPlayLinearEffect && this.effectInstanceIds.linear) this.destroyLinearEffect()
    }

    get shouldScheduleSFX() {
        return (
            options.sfxEnabled &&
            (this.useFallbackClip ? this.clips.fallback.exists : this.clips.hold.exists) &&
            options.autoSFX
        )
    }

    get shouldPlaySFX() {
        return (
            options.sfxEnabled &&
            (this.useFallbackClip ? this.clips.fallback.exists : this.clips.hold.exists) &&
            !options.autoSFX
        )
    }

    get shouldPlayCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists
    }

    get shouldPlayLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists
    }

    get useFallbackSlideSprite() {
        return (
            !this.slideSprites.left.exists ||
            !this.slideSprites.middle.exists ||
            !this.slideSprites.right.exists
        )
    }

    get useFallbackClip() {
        return !this.clips.hold.exists
    }

    scheduleSFX() {
        const id = this.useFallbackClip
            ? this.clips.fallback.scheduleLoop(this.head.time)
            : this.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)

        this.hasSFXScheduled = true
    }

    playSFX() {
        this.sfxInstanceId = this.useFallbackClip
            ? this.clips.fallback.loop()
            : this.clips.hold.loop()
    }

    stopSFX() {
        effect.clips.stopLoop(this.sfxInstanceId)
        this.sfxInstanceId = 0
    }

    spawnCircularEffect() {
        this.effectInstanceIds.circular = this.effects.circular.spawn(new Quad(), 1, true)
    }

    updateCircularEffect() {
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)

        particle.effects.move(
            this.effectInstanceIds.circular,
            circularEffectLayout({
                lane,
                w: 3.5,
                h: 2.1,
            }),
        )
    }

    destroyCircularEffect() {
        particle.effects.destroy(this.effectInstanceIds.circular)
        this.effectInstanceIds.circular = 0
    }

    spawnLinearEffect() {
        this.effectInstanceIds.linear = this.effects.linear.spawn(new Quad(), 1, true)
    }

    updateLinearEffect() {
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)

        particle.effects.move(
            this.effectInstanceIds.linear,
            linearEffectLayout({
                lane,
                shear: 0,
            }),
        )
    }

    destroyLinearEffect() {
        particle.effects.destroy(this.effectInstanceIds.linear)
        this.effectInstanceIds.linear = 0
    }

    getAlpha() {
        return this.visual === VisualType.NotActivated ? 0.5 : 1
    }

    renderGlow() {
        if (!options.slotEffectEnabled) return

        if (this.visual !== VisualType.Activated) return

        const s = this.getScale(time.scaled)

        const l = this.getL(s)
        const r = this.getR(s)

        const shear = 1 + 0.25 * options.slotEffectSize
        const h = 4 * options.slotEffectSize * scaledScreen.wToH

        this.glowSprite.draw(
            {
                x1: l,
                x2: l * shear,
                x3: r * shear,
                x4: r,
                y1: 1,
                y2: 1 - h,
                y3: 1 - h,
                y4: 1,
            },
            this.glowZ,
            (Math.cos((time.now - this.start.time) * 8 * Math.PI) + 1) / 20 + 0.1,
        )
    }

    renderSlide() {
        const s = this.getScale(time.scaled)

        const l = this.getL(s)
        const r = this.getR(s)

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSlideSprite) {
            this.slideSprites.fallback.draw(perspectiveLayout({ l, r, b, t }), this.slideZ, 1)
        } else {
            const ml = l + 0.25
            const mr = r - 0.25

            this.slideSprites.left.draw(perspectiveLayout({ l, r: ml, b, t }), this.slideZ, 1)
            this.slideSprites.middle.draw(perspectiveLayout({ l: ml, r: mr, b, t }), this.slideZ, 1)
            this.slideSprites.right.draw(perspectiveLayout({ l: mr, r, b, t }), this.slideZ, 1)
        }
    }
}
