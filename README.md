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

| Name                                          |
| --------------------------------------------- |
| `Sekai Stage`                                 |
| `Sekai Note Red Left`                         |
| `Sekai Note Red Middle`                       |
| `Sekai Note Red Right`                        |
| `Sekai Note Green Left`                       |
| `Sekai Note Green Middle`                     |
| `Sekai Note Green Right`                      |
| `Sekai Note Yellow Left`                      |
| `Sekai Note Yellow Middle`                    |
| `Sekai Note Yellow Right`                     |
| `Sekai Note Cyan Left`                        |
| `Sekai Note Cyan Middle`                      |
| `Sekai Note Cyan Right`                       |
| `Sekai Diamond Green`                         |
| `Sekai Diamond Yellow`                        |
| `Sekai Trace Note Red`                        |
| `Sekai Trace Note Red Left`                   |
| `Sekai Trace Note Red Middle`                 |
| `Sekai Trace Note Red Right`                  |
| `Sekai Trace Note Green`                      |
| `Sekai Trace Note Green Left`                 |
| `Sekai Trace Note Green Middle`               |
| `Sekai Trace Note Green Right`                |
| `Sekai Trace Note Yellow`                     |
| `Sekai Trace Note Yellow Left`                |
| `Sekai Trace Note Yellow Middle`              |
| `Sekai Trace Note Yellow Right`               |
| `Sekai Trace Diamond Red`                     |
| `Sekai Trace Diamond Green`                   |
| `Sekai Trace Diamond Yellow`                  |
| `Sekai Active Slide Connection Green`         |
| `Sekai Active Slide Connection Green Active`  |
| `Sekai Active Slide Connection Yellow`        |
| `Sekai Active Slide Connection Yellow Active` |
| `Sekai Slot Glow Red`                         |
| `Sekai Slot Glow Green`                       |
| `Sekai Slot Glow Yellow`                      |
| `Sekai Slot Glow Cyan`                        |
| `Sekai Slot Red`                              |
| `Sekai Slot Green`                            |
| `Sekai Slot Yellow`                           |
| `Sekai Slot Cyan`                             |
| `Sekai Flick Arrow Red Up 1`                  |
| `Sekai Flick Arrow Red Up 2`                  |
| `Sekai Flick Arrow Red Up 3`                  |
| `Sekai Flick Arrow Red Up 4`                  |
| `Sekai Flick Arrow Red Up 5`                  |
| `Sekai Flick Arrow Red Up 6`                  |
| `Sekai Flick Arrow Red Left 1`                |
| `Sekai Flick Arrow Red Left 2`                |
| `Sekai Flick Arrow Red Left 3`                |
| `Sekai Flick Arrow Red Left 4`                |
| `Sekai Flick Arrow Red Left 5`                |
| `Sekai Flick Arrow Red Left 6`                |
| `Sekai Flick Arrow Yellow Up 1`               |
| `Sekai Flick Arrow Yellow Up 2`               |
| `Sekai Flick Arrow Yellow Up 3`               |
| `Sekai Flick Arrow Yellow Up 4`               |
| `Sekai Flick Arrow Yellow Up 5`               |
| `Sekai Flick Arrow Yellow Up 6`               |
| `Sekai Flick Arrow Yellow Left 1`             |
| `Sekai Flick Arrow Yellow Left 2`             |
| `Sekai Flick Arrow Yellow Left 3`             |
| `Sekai Flick Arrow Yellow Left 4`             |
| `Sekai Flick Arrow Yellow Left 5`             |
| `Sekai Flick Arrow Yellow Left 6`             |

### Effect Clips

| Name                   |
| ---------------------- |
| `Sekai Tick`           |
| `Sekai Trace`          |
| `Sekai Critical Tap`   |
| `Sekai Critical Trace` |
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

### `enginePlayData`

Engine Play Data.

-   `enginePlayData.path`: path to file.
-   `enginePlayData.buffer`: buffer of file.
-   `enginePlayData.hash`: hash of file.

### `enginePreviewData`

Engine Preview Data.

-   `enginePreviewData.path`: path to file.
-   `enginePreviewData.buffer`: buffer of file.
-   `enginePreviewData.hash`: hash of file.

### `engineTutorialData`

Engine Tutorial Data.

-   `engineTutorialData.path`: path to file.
-   `engineTutorialData.buffer`: buffer of file.
-   `engineTutorialData.hash`: hash of file.

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
