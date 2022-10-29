import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        });
    }
    toHTML() {
        return `
      <input type="text" class="input" placeholder="Add new table"/>
      <div class="flex-row">
        <button class="button">
          <i class="material-icons">exit_to_app</i>
        </button>
        <button class="button">
          <i class="material-icons">delete</i>
        </button>`;
    }
}
