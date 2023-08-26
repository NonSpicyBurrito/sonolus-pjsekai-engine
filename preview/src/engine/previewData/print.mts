import { panel } from './panel.mjs'
import { skin } from './skin.mjs'

export const print = (
    value: number,
    time: number,
    format: PrintFormat,
    decimalPlaces: number | 'auto',
    color: PrintColor,
    position: 'left' | 'right',
) =>
    canvas.print({
        value,
        format,
        decimalPlaces,
        anchor: getAnchor(panel.positionFromTime(time).translate(position === 'left' ? -6 : 6, 0)),
        pivot: { x: position === 'left' ? 1 : 0, y: 0.5 },
        size: { x: screen.h / 10, y: screen.h / 20 },
        rotation: 0,
        color,
        alpha: 1,
        horizontalAlign: position === 'left' ? HorizontalAlign.Right : HorizontalAlign.Left,
        background: false,
    })

const getAnchor = (position: Vec) => {
    const anchor = position.transform(skin.transform)
    anchor.y = Math.clamp(anchor.y, screen.b + screen.h / 40, screen.t - screen.h / 40)

    return anchor
}
