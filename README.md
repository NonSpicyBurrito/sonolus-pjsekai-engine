# Sonolus PJSekai Engine

A recreation of Project Sekai: Colorful Stage! engine in [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-pjsekai-engine --save
```

## Custom Resources

Engine ID: `2`

### Skin Sprites

| ID    | Sprite        |
| ----- | ------------- |
| 1     | Stage         |
| 10-16 | Note (left)   |
| 20-26 | Note (middle) |
| 30-36 | Note (right)  |
| 40-46 | Diamond       |
| 50-56 | Slot          |
| 60-66 | Slot Glow     |
| 71-94 | Flick Arrow   |

### Effect Clips

| ID  | Clip           |
| --- | -------------- |
| 1   | Critical Tap   |
| 2   | Critical Tick  |
| 3   | Critical Flick |
| 4   | Tick           |
| 5   | Critical Hold  |

## Documentation

### `version`

Package version.

### `engineInfo`

Partial engine information compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `engineConfiguration`

Engine Configuration.

-   `engineConfiguration.path`: path to file.
-   `engineConfiguration.buffer`: buffer of file.
-   `engineConfiguration.hash`: hash of file.

### `engineData`

Engine Data.

-   `engineData.path`: path to file.
-   `engineData.buffer`: buffer of file.
-   `engineData.hash`: hash of file.

### `engineThumbnail`

Engine Thumbnail.

-   `engineThumbnail.path`: path to file.
-   `engineThumbnail.buffer`: buffer of file.
-   `engineThumbnail.hash`: hash of file.

### `fromSus(sus, offset)`

Converts sus chart to Level Data.

-   `sus`: sus chart.
-   `bgmOffset`: bgm offset (default: `0`).
-   `chartOffset`: chart offset (default: `0`).

### `fromFannithm(fannithm, offset)`

Converts Fannithm chart to Level Data.

-   `fannithm`: Fannithm chart.
-   `bgmOffset`: bgm offset (default: `0`).
-   `chartOffset`: chart offset (default: `0`).
