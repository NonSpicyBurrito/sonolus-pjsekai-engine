import { And, Code, LevelMemory, Or, Script, TouchId } from 'sonolus.js'
import { options } from '../../configuration/options'
import { List } from './common/list'

class TouchList {
    private readonly old: List<number>
    private readonly now: List<number>

    public constructor(offset: number, size: number) {
        this.old = new List<number>(LevelMemory.to(offset), size - 1)
        this.now = new List<number>(LevelMemory.to(offset + size), size - 1)
    }

    public flush() {
        return [this.now.copyTo(this.old), this.now.clear()]
    }

    public update(touchId: Code<number>) {
        return And(this.old.contains(touchId), this.now.add(touchId))
    }

    public add(touchId: Code<number>) {
        return Or(this.now.contains(touchId), this.now.add(touchId))
    }

    public contains(touchId: Code<number>) {
        return this.now.contains(touchId)
    }
}

export const disallowStart = LevelMemory.to<boolean>(0)
export const disallowEmpties = new TouchList(1, 16)
export const disallowEnds = new TouchList(33, 16)

export function input(): Script {
    const spawnOrder = -998

    const shouldSpawn = true

    const updateSequential = Or(options.isAutoplay, [
        disallowEmpties.flush(),
        disallowEnds.flush(),
    ])

    const touch = Or(options.isAutoplay, [
        disallowStart.set(false),
        disallowEmpties.update(TouchId),
        disallowEnds.update(TouchId),
    ])

    return {
        spawnOrder,
        shouldSpawn,
        updateSequential,
        touch,
    }
}
