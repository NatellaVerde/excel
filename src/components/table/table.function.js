export function shouldResize(e) {
    return e.target.dataset.resize
}

export function isCell(e) {
    return e.target.dataset.type === 'cell'
}

export function matrix(cols, rows) {
    return cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, row, col) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Tab':
        case 'ArrowRight':
            col++
            break;
        case 'Enter':
        case 'ArrowDown':
            row++
            break;
        case 'ArrowUp':
            row = row === MIN_VALUE ? MIN_VALUE : row - 1
            break;
        case 'ArrowLeft':
            col = col === MIN_VALUE ? MIN_VALUE : col - 1
            break;
    }

    return `[data-id="${row}:${col}"]`
}
