import {$} from '@core/Dom';
import {ActiveRoute} from '@core/router/activeRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not providing in Route')
        }
        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.hashChangeHandler = this
            .hashChangeHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.hashChangeHandler)
        this.hashChangeHandler()
    }

    hashChangeHandler() {
        if (this.page) {
           this.page.destroy()
        }
        this.$placeholder.clear()
        const Page = ActiveRoute.path.includes('excel')
            ? this.routes.excel : this.routes.dashboard
        this.page = new Page(ActiveRoute.param)
        this.$placeholder.append(this.page.getRoot())
        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.hashChangeHandler)
    }
}
