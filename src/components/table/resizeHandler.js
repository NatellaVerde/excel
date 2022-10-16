import {$} from '@core/Dom';

export function resizeHandler($root, e) {
    const $resizer = $(e.target)
    const $parent = $resizer.getClosest(`[data-type="resizable"]`)
    const startResize = $parent.getOffset()
    const colNum = $parent.data.col
    const cells = $root.findAll(`[data-col="${colNum}"]`)
    const type = $resizer.data.resize
    let value

    document.onmousemove = (event) => {
        const sideProp = type === 'col' ? 'bottom' : 'right'
        $resizer.css({
            bottom: '-5000px',
            zIndex: '1000',
            opacity: 1,
            [sideProp]: '-5000px'
        })
        if (type === 'col') {
            const delta = event.pageX - startResize.right
            value = startResize.width + delta
            $resizer.css({
                right: - delta + 'px'
            })
        } else {
            const delta = event.pageY - startResize.bottom
            value = startResize.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = (event) => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            $parent.$el.style.width = value + 'px'
            $parent.css({width: `${value}px`})
            cells.forEach( (el) => el.style.width = value + 'px')
        } else {
            const delta = event.pageY - startResize.bottom
            value = startResize.height + delta
            $parent.css({height: `${value}px`})
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}
