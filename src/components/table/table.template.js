export function createTable() {
    return table()
}

const CODE = {
    A: 65,
    Z: 90
}

function toColumn(el, idx) {
    return `<div class="column" data-type="resizable" data-col=${idx}>
              ${el}
             <div class="resize-col" data-resize="col"></div>
            </div>`
}

function createRow(content, idx = '') {
      const resize = idx
          ? '<div class="resize-row" data-resize="row"></div>'
          : ''
      return `<div class="row" data-type="resizable">
                <div class="row-info">${idx}
                  ${resize}
                </div>
                <div class="row-data">${content}</div>
              </div>
             `
}

function toCell(row) {
    return function(_, idx) {
        return `<div class="cell" 
                    contenteditable 
                    data-col=${idx} 
                    data-id=${row}:${idx}
                    data-type="cell"
                    >
                </div>`
    }
}

function table(rowsCount = 35) {
    const colsCount = CODE.Z - CODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => String.fromCharCode(CODE.A + index))
        .map((el, idx) => toColumn(el, idx))
        .join(' ')
    rows.push(createRow(cols))
    for (let row = 0; row < rowsCount; row++) {
        // rows.push(createRow(i + 1))
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(row))
            .join(' ')
        rows.push(createRow(cells, row + 1))
    }
    return rows.join(' ')
}
