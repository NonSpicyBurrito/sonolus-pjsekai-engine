import {
    Add,
    And,
    Code,
    DataType,
    Equal,
    Less,
    Or,
    Pointer,
    Switch,
    SwitchInteger,
} from 'sonolus.js'

export class Dictionary<T extends DataType> {
    private readonly pointer: Pointer
    private readonly count: Pointer<number>
    private readonly keys: Pointer<number>
    private readonly values: Pointer<T>
    private readonly size: number

    public constructor(pointer: Pointer, size: number) {
        this.pointer = pointer
        this.count = pointer.to(0)
        this.keys = pointer.to(1)
        this.values = pointer.to(1 + size)
        this.size = size
    }

    public clear() {
        return this.count.set(0)
    }

    public add(key: Code<number>, value: Code<T>) {
        return SwitchInteger(
            this.count,
            [...Array(this.size).keys()].map((i) => [
                this.keys.to(i).set(key),
                this.values.to(i).set(value),
                this.count.set(Add(this.count, 1)),
            ])
        )
    }

    public contains(key: Code<number>) {
        return Or(
            ...[...Array(this.size).keys()].map((i) =>
                And(Less(i, this.count), Equal(key, this.keys.to(i)))
            )
        )
    }

    public get(key: Code<number>) {
        return Switch(
            key,
            [...Array(this.size).keys()].map((i) => [
                this.keys.to(i),
                And(Less(i, this.count), this.values.to(i)),
            ])
        ) as Code<T>
    }

    public copyTo(dictionary: Dictionary<T>) {
        return [...Array(this.size * 2 + 1).keys()].map((i) =>
            dictionary.pointer.to(i).set(this.pointer.to(i))
        )
    }
}
