import {defaultStyle} from '@/constans';
import {parse} from '@core/parse';

export function createTable(rowsCount, state) {
    return table(rowsCount, state)
}

const DEFAULT_SIZE_WIDTH = 120
const DEFAULT_SIZE_HEIGHT = 24
const CODE = {
    A: 65,
    Z: 90
}

function toColumn({el, idx, width}) {
    return `<div class="column" 
              data-type="resizable" 
              data-col=${idx}
              style="width: ${width}"
              >
              ${el}
             <div class="resize-col" data-resize="col"></div>
            </div>`
}

function createRow(content, idx = '', state) {
      const resize = idx
          ? '<div class="resize-row" data-resize="row"></div>'
          : ''
      const height = getHeight(idx, state)
      return `<div class="row" 
                data-type="resizable"
                 data-row=${idx}
                 style="height: ${height}">
                <div class="row-info">${idx}
                  ${resize}
                </div>
                <div class="row-data">${content}</div>
              </div>
             `
}

function toCell(row, state) {
    return function(_, idx) {
        const id = `${row}:${idx}`
        const width = getWidth(idx, state.colState)
        const data = state.dataState[id]
        return `<div class="cell" 
                    contenteditable 
                    data-col=${idx} 
                    data-id=${id}
                    data-type="cell"
                    data-value="${data || ''}"
                    width=${width}
                    style="${toInlineStyles({
                        ...defaultStyle,
                        ...state.stylesState[id]
                    })}">
                    ${parse(data) || ''} 
                </div>`
    }
}

function camelCasaToKebab(str) {
    return str.replace(/[A-Z]/g, (m) => `${'-' + m.toLowerCase()}`)
}

function toInlineStyles(obj = {}) {
    return Object.keys(obj)
        .map((key) => `${camelCasaToKebab(key)}:${obj[key]}`)
        .join(';')
}

function getWidth(idx, state) {
    const width = state[idx]
    return (width || DEFAULT_SIZE_WIDTH) + 'px'
}

function getHeight(idx, state) {
    const height = state[idx]
    return (height || DEFAULT_SIZE_HEIGHT) + 'px'
}

function withWidthFrom(state) {
    return function(el, idx) {
        return {
            el, idx, width: getWidth(idx, state.colState)
        }
    }
}

function table(rowsCount, state = {}) {
    const colsCount = CODE.Z - CODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => String.fromCharCode(CODE.A + index))
        .map(withWidthFrom(state))
        .map(toColumn)
        .join(' ')
    rows.push(createRow(cols, null, {}))
    for (let row = 0; row < rowsCount; row++) {
        // rows.push(createRow(i + 1))
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row, state))
            .join(' ')
        rows.push(createRow(cells, row + 1, state.rowState))
    }
    return rows.join(' ')
}
