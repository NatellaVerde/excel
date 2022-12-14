import {$} from '@/core/Dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDataPage} from '@/components/redux/action';
import {preventDefault} from '@core/utils';

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.subscriber = new StoreSubscriber(this.store)
    }
    getRoot() {
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }
        const $root = $.create('div', 'excel')
        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            // debug
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    init() {
        if (process.env.NODE_ENV === 'product') {
          document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDataPage())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach((component) => component.init())
    }
    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach((component) => component.destroy())
    }
}
