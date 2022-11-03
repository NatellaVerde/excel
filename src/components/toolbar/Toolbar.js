import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {toolbarCreate} from '@/components/toolbar/toolbar.template';
import {$} from '@core/Dom';
import {defaultStyle} from '@/constans';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }
    prepare() {
        this.initState(defaultStyle)
    }
    toHTML() {
        return this.template
    }
    get template() {
        return toolbarCreate(this.state)
    }
    storeChange(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
        }
    }
}

