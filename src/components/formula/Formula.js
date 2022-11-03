import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });
    }
    init() {
        super.init();
        this.$formula = this.$root.find('#formula-input')
        this.$on('table:select', ($cell) => {
            this.$formula.text($cell.data.value)
        })
    }

    storeChange({currentText}) {
        this.$formula.text(currentText)
    }

    toHTML() {
        return `<div class="info">fn</div>
                <div class="input" 
                  id="formula-input"
                  contenteditable 
                  spellcheck="false">
                </div>`;
    }
    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }
    onKeydown(event) {
        const key = ['Enter', 'Tab']
        if (key.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
