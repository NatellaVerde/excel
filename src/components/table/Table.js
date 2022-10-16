import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from '@/components/table/resizeHandler';
import {shouldRender} from '@/components/table/shouldRender';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable()
    }
    onMousedown(e) {
        if (shouldRender) {
            resizeHandler(this.$root, e)
        }
    }
}
