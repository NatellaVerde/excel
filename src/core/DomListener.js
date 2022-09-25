import {capitalize} from '@core/utils';

export class DomListener {
    constructor($root, listeners= []) {
        if (!$root) {
            throw new Error('Root is not defined')
        }
        this.$root = $root
        this.listeners = listeners
    }
    initDomListeners() {
        this.listeners.forEach((listener) => {
            const method = addOn(listener) || ''
            if (!this[method]) {
                throw new Error(`Meth ${method} wasn't implement ${this.$root}`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDomListeners() {
        this.listeners.forEach((listener) => {
            const method = addOn(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function addOn(str) {
    return `on${capitalize(str)}`
}

