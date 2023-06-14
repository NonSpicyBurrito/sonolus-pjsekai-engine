# Sonolus PJSekai Engine

A recreation of Project Sekai: Colorful Stage! engine in [Sonolus](https://sonolus.com).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

## Installation

```
npm install sonolus-pjsekai-engine
```

## Custom Resources

### Skin Sprites

| Name                                     |
| ---------------------------------------- |
| `Sekai Stage`                            |
| `Sekai Note Cyan Left`                   |
| `Sekai Note Cyan Middle`                 |
| `Sekai Note Cyan Right`                  |
| `Sekai Note Green Left`                  |
| `Sekai Note Green Middle`                |
| `Sekai Note Green Right`                 |
| `Sekai Note Red Left`                    |
| `Sekai Note Red Middle`                  |
| `Sekai Note Red Right`                   |
| `Sekai Note Yellow Left`                 |
| `Sekai Note Yellow Middle`               |
| `Sekai Note Yellow Right`                |
| `Sekai Diamond Green`                    |
| `Sekai Diamond Yellow`                   |
| `Sekai Slide Connection`                 |
| `Sekai Slide Connection Active`          |
| `Sekai Critical Slide Connection`        |
| `Sekai Critical Slide Connection Active` |
| `Sekai Slot Glow Cyan`                   |
| `Sekai Slot Glow Green`                  |
| `Sekai Slot Glow Red`                    |
| `Sekai Slot Glow Yellow`                 |
| `Sekai Slot Cyan`                        |
| `Sekai Slot Green`                       |
| `Sekai Slot Red`                         |
| `Sekai Slot Yellow`                      |
| `Sekai Flick Arrow Up 1`                 |
| `Sekai Flick Arrow Up 2`                 |
| `Sekai Flick Arrow Up 3`                 |
| `Sekai Flick Arrow Up 4`                 |
| `Sekai Flick Arrow Up 5`                 |
| `Sekai Flick Arrow Up 6`                 |
| `Sekai Flick Arrow Left 1`               |
| `Sekai Flick Arrow Left 2`               |
| `Sekai Flick Arrow Left 3`               |
| `Sekai Flick Arrow Left 4`               |
| `Sekai Flick Arrow Left 5`               |
| `Sekai Flick Arrow Left 6`               |
| `Sekai Critical Flick Arrow Up 1`        |
| `Sekai Critical Flick Arrow Up 2`        |
| `Sekai Critical Flick Arrow Up 3`        |
| `Sekai Critical Flick Arrow Up 4`        |
| `Sekai Critical Flick Arrow Up 5`        |
| `Sekai Critical Flick Arrow Up 6`        |
| `Sekai Critical Flick Arrow Left 1`      |
| `Sekai Critical Flick Arrow Left 2`      |
| `Sekai Critical Flick Arrow Left 3`      |
| `Sekai Critical Flick Arrow Left 4`      |
| `Sekai Critical Flick Arrow Left 5`      |
| `Sekai Critical Flick Arrow Left 6`      |

### Effect Clips

| Name                   |
| ---------------------- |
| `Sekai Tick`           |
| `Sekai Critical Tap`   |
| `Sekai Critical Flick` |
| `Sekai Critical Hold`  |
| `Sekai Critical Tick`  |

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

### `susToUSC(sus)`

Converts sus chart to USC (Universal Sekai Chart).

-   `sus`: sus chart.

### `uscToLevelData(usc, offset?)`

Converts USC (Universal Sekai Chart) to Level Data.

-   `usc`: usc chart.
-   `offset`: offset (default: `0`).
