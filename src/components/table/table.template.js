export function createTable() {
    return table()
}

const CODE = {
    A: 65,
    Z: 90
}

function toColumn(el) {
    return `<div class="column">${el}</div>`
}

function createRow(content, idx = '') {
      return `<div class="row">
                <div class="row-info">${idx}</div>
                <div class="row-data">${content}</div>
              </div>
             `
}

function toCell() {
    return `<div class="cell" contenteditable>
        </div>`
    }

function table(rowsCount = 35) {
    const colsCount = CODE.Z - CODE.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => String.fromCharCode(CODE.A + index))
        .map((el) => toColumn(el))
        .join(' ')
    rows.push(createRow(cols))
    for (let i = 0; i < rowsCount; i++) {
        // rows.push(createRow(i + 1))
        const cells = new Array(colsCount)
            .fill('')
            .map((el) => toCell(el))
            .join(' ')
        rows.push(createRow(cells, i + 1))
    }
    return rows.join(' ')
}
