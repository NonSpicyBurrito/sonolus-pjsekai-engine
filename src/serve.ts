import { serve } from 'sonolus.js'
import { buildOutput } from '.'

const sonolus = serve(buildOutput, { port: 3000 })
sonolus.db.levels[0].bgm = sonolus.add('LevelBgm', __dirname + '/bgm.mp3')
