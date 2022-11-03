import {ExcelComponent} from '@core/ExcelComponent';
import {titleChange} from '@/components/redux/action';
import {$} from '@core/Dom';
import {defaultTitle} from '@/constans';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
        <button class="button">
          <i class="material-icons">exit_to_app</i>
        </button>
        <button class="button">
          <i class="material-icons">delete</i>
        </button>`;
    }
    onInput(e) {
        const $target = $(e.target)
        this.$dispatch(titleChange($target.text()))
    }
}
