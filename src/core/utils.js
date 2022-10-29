export function capitalize(str) {
    if (typeof str !== 'string') {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [start, end] = [end, start]
    }
    const length = end - start + 1
    const newArr = new Array(length)
        .fill('')
        .map((_, idx) => start + idx)
    return newArr
}
