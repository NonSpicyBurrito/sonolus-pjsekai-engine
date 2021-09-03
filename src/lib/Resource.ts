import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export class Resource {
    public readonly path: string

    private _hash?: string
    private _buffer?: Buffer

    public constructor(path: string) {
        this.path = resolve(__dirname, path)
    }

    public get hash(): string {
        if (!this._hash) {
            this._hash = createHash('sha1').update(this.buffer).digest('hex')
        }

        return this._hash
    }

    public get buffer(): Buffer {
        if (!this._buffer) {
            this._buffer = readFileSync(this.path)
        }

        return this._buffer
    }
}
