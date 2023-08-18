import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export class Resource {
    public readonly path: string

    private _hash: string | undefined
    private _buffer: Buffer | undefined

    public constructor(path: string) {
        this.path = resolve(__dirname, path)
    }

    public get hash(): string {
        this._hash ??= createHash('sha1').update(this.buffer).digest('hex')

        return this._hash
    }

    public get buffer(): Buffer {
        this._buffer ??= readFileSync(this.path)

        return this._buffer
    }
}
