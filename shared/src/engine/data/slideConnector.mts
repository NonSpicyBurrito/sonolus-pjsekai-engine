type Key = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export const slideConnectorReplayKeys = Array.range(12).map((i) => [i, `start${i}`, `end${i}`]) as [
    Key,
    `start${Key}`,
    `end${Key}`,
][]

export const slideConnectorReplayImport = Object.fromEntries(
    Array.range(12)
        .flatMap((i) => [`start${i}`, `end${i}`])
        .map((k) => [k, { name: k, type: Number }]),
) as Record<`${'start' | 'end'}${Key}`, { name: string; type: NumberConstructor }>
