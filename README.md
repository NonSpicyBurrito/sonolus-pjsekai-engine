# Sonolus PJSekai Engine

A recreation of Project Sekai: Colorful Stage! engine in [Sonolus](https://sonolus.com).

## Links

- [Sonolus Website](https://sonolus.com)
- [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)

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
| `Sekai Slide Connection Green`                |
| `Sekai Slide Connection Green Active`         |
| `Sekai Slide Connection Yellow`               |
| `Sekai Slide Connection Yellow Active`        |
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

### Particle Effects

| Name                                       |
| ------------------------------------------ |
| `Sekai Trace Note Circular Green`          |
| `Sekai Trace Note Linear Green`            |
| `Sekai Trace Note Circular Yellow`         |
| `Sekai Trace Note Linear Yellow`           |
| `Sekai Note Lane Linear`                   |
| `Sekai Critical Lane Linear`               |
| `Sekai Critical Slide Circular Yellow` 
|
| `Sekai Critical Slide Linear Yellow`   
|
| `Sekai Critical Flick Circular Yellow`     |
| `Sekai Critical Flick Linear Yellow`       |

## Documentation

### `version`

Package version.

### `databaseEngineItem`

Partial database engine item compatible with [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

### `susToUSC(sus)`

Converts sus chart to USC (Universal Sekai Chart).

- `sus`: sus chart.

### `uscToLevelData(usc, offset?)`

Converts USC (Universal Sekai Chart) to Level Data.

- `usc`: usc chart.
- `offset`: offset (default: `0`).

### Assets

The following assets are exposed as package entry points:

- `EngineConfiguration`
- `EnginePlayData`
- `EngineWatchData`
- `EnginePreviewData`
- `EngineTutorialData`
- `EngineThumbnail`

In Node.js, you can obtain path to assets using `require.resolve('sonolus-pjsekai-engine/EngineConfiguration')` or `import.meta.resolve('sonolus-pjsekai-engine/EngineConfiguration')`.
