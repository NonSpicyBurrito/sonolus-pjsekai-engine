import {
    And,
    Code,
    LevelMemory,
    Or,
    SScript,
    TemporaryMemory,
    TouchId,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { List } from './common/list'

export const noStartAllowed = TemporaryMemory.to<boolean>(0)

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
        return And(this.contains(touchId), this.add(touchId))
    }

    public add(touchId: Code<number>) {
        return this.now.add(touchId)
    }

    public contains(touchId: Code<number>) {
        return Or(this.old.contains(touchId), this.now.contains(touchId))
    }
}

export const anyOccupied = new TouchList(0, 16)
export const tapOccupied = new TouchList(32, 16)

export function input(): SScript {
    const spawnOrder = -998

    const shouldSpawn = true

    const updateSequential = Or(options.isAutoplay, [
        anyOccupied.flush(),
        tapOccupied.flush(),
    ])

    const touch = Or(options.isAutoplay, [
        anyOccupied.update(TouchId),
        tapOccupied.update(TouchId),
    ])

    return {
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        updateSequential: {
            code: updateSequential,
        },
        touch: {
            code: touch,
            order: 1000,
        },
    }
}
