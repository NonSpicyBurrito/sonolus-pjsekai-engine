import { panel } from './panel.mjs'
import { skin } from './skin.mjs'

export const print = (
    value: number,
    time: number,
    format: PrintFormat,
    decimalPlaces: number | 'auto',
    color: PrintColor,
    side: 'left' | 'right',
) =>
    canvas.print({
        value,
        format,
        decimalPlaces,
        anchor: getAnchor(panel.getPos(time).translate(side === 'left' ? -6 : 6, 0)),
        pivot: { x: side === 'left' ? 1 : 0, y: 0.5 },
        size: { x: screen.h / 10, y: screen.h / 20 },
        rotation: 0,
        color,
        alpha: 1,
        horizontalAlign: side === 'left' ? HorizontalAlign.Right : HorizontalAlign.Left,
        background: false,
    })

const getAnchor = (pos: Vec) => {
    const anchor = pos.transform(skin.transform)
    anchor.y = Math.clamp(anchor.y, screen.b + screen.h / 40, screen.t - screen.h / 40)

    return anchor
}
