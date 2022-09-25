import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }
    toHTML() {
        return `<div class="info">fn</div>
                <div class="input" contenteditable spellcheck="false">
                </div>`;
    }
    onInput(event) {
        console.log('Input', event.target.textContent.trim())
    }
    onClick(event) {
        console.log(`Click formula: ${event}`)
    }
}