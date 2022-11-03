import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from '@/components/table/resizeHandler';
import {shouldResize, isCell, matrix, nextSelector} from './table.function';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@/core/Dom';
import {range} from '@core/utils';
import * as actions from '@/components/redux/action';
import {defaultStyle} from '@/constans';
import {parse} from '@core/parse';

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
        const state = this.store.getState()
        return createTable(35, state)
    }
    init() {
        super.init();
        this.selection = new TableSelection();
        const $cell = this.$root.find(`[data-id="0:0"]`)
        this.selectCell($cell)
        this.$on('formula:input', (value) => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula:done', (data) => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }
    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const style = $cell.getStyles(Object.keys(defaultStyle))
        this.$dispatch(actions.stylesChange(style))
    }
    async tableResize(e) {
        try {
            const data = await resizeHandler(this.$root, e)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Error', e.message)
        }
    }
    onMousedown(e) {
        if (shouldResize(e)) {
            this.tableResize(e)
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
                this.selectCell($target)
            }
        }
    }
    storeChange(changes) {
        console.log('changes', changes)
    }

    updateTextInStore(value) {
        this.$dispatch(actions.textChange({
            id: this.selection.current.id(),
            value
        }))
    }
    onInput(e) {
        this.updateTextInStore($(e.target).text())
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
