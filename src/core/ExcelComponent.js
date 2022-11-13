import {DomListener} from './DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.emitter = options.emitter
        this.store = options.store
        this.unsubscribe = []
        this.storeSub = null
        this.subscribe = options.subscribe || []
        this.prepare()
    }
    toHTML() {
        return ''
    }
    prepare() {}
    init() {
        this.initDomListeners()
    }
    storeChange(data) {
        console.log(data)
    }
    isWatching(key) {
        return this.subscribe.includes(key)
    }
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    $on(event, fn) {
        this.emitter.subscribe(event, fn)
    }
    $dispatch(action) {
        this.store.dispatch(action)
    }
    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
        // this.storeSub.unsubscribe()
    }
    destroy() {
        this.removeDomListeners()
        // this.unsubscribe((unsub) => unsub())
        // this.storeSub.unsubscribe()
    }
}
