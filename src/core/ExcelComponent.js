import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.emitter = options.emitter
        this.unsubscribe = []
    }
    toHTML() {
        return ''
    }
    prepare() {}
    init() {
        this.initDomListeners()
    }
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    $on(event, fn) {
        this.emitter.subscribe(event, fn)
    }
    destroy() {
        this.removeDomListeners()
        this.unsubscribe((unsub) => unsub())
    }
}
