import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export class Resource {
    public readonly path: string

    private _hash?: string
    private _buffer?: Buffer

    public constructor(path: string) {
        this.path = fileURLToPath(new URL(path, import.meta.url))
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
