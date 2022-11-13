import {ExcelComponent} from '@core/ExcelComponent';
import {titleChange} from '@/components/redux/action';
import {$} from '@core/Dom';
import {defaultTitle} from '@/constans';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/router/activeRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }
    prepare() {
       this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.store.getState().titleApp || defaultTitle
        return `
      <input type="text" 
        class="input" 
        placeholder="Add new table" 
        value='${title}'/>
      <div class="flex-row">
        <button class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </button>
        <button class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </button>`;
    }
    onInput(e) {
        const $target = $(e.target)
        this.$dispatch(titleChange($target.text()))
    }
    onClick(e) {
        const target = $(e.target)
        if (target.data.button === 'remove') {
            const decision =
                confirm('You want to delete this table, are you sure?')
            if (decision) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`)
                ActiveRoute.rout('')
            }
        } else if (target.data.button === 'exit') {
            ActiveRoute.rout('')
        }
    }
}
