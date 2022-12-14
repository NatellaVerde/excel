import {Page} from '@core/Page';
import {$} from '@core/Dom';
import {createTable} from './dashboardFunction'

export class DashboardPage extends Page {
    getRoot() {
        const id = Date.now().toString()
        return $.create('div', 'db').html(
           `<div class="db__header">
               <h1>DashboardPage Excel</h1>
           </div>
        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${id}" class="db__create">
                    New <br/> table
                </a>
            </div>
        </div>
        ${createTable()}
        `)
    }
    destroy() {
        super.destroy();
    }
}
