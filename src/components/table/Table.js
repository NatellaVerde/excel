import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from '@/components/table/resizeHandler';
import {shouldResize, isCell, matrix, nextSelector} from './table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@/core/Dom';
import {range} from '@core/utils';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }
    toHTML() {
        return createTable()
    }
    init() {
        super.init();
        this.selection = new TableSelection();
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selectCell($cell)
        this.$on('formula:input', (data) => {
            this.selection.current.text(data)
        })
        this.$on('formula:done', (data) => {
            this.selection.current.focus()
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(this.$root, e)
        } else if (isCell(e)) {
            const $target = $(e.target)
            if (e.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const cols = range(current.col, target.col)
                const rows = range(current.row, target.row)
                const cells = matrix(cols, rows)
                    .map((id) => this.$root.find(`[data-id="${id}"]`) )
                this.selection.selectGroup(cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onInput(e) {
        this.$emit('table:input', $(e.target))
    }

    onKeydown(e) {
        const keyDown = [
            'Tab',
            'Enter',
            'ArrowRight',
            'ArrowLeft',
            'ArrowUp',
            'ArrowDown'
        ]

        const {key} = e
        if (keyDown.includes(key) && !e.shiftKey) {
            e.preventDefault()
            const {row, col} = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, row, col))
            this.selectCell($next)
        }
    }
}
