export class Emitter {
    constructor() {
        this.listeners = {}
    }
    // уведомление о событии
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
           return false
        }
        this.listeners[event].forEach((listener) => listener(...args))
        return true
    }
    // подписка на события
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] = this.listeners[event]
                .filter((listener) => listener != fn)
        }
    }
}

// const emitter = new Emitter()
//
// emitter.subscribe('newEvent', (data) => {
//     console.log('sub', data)
// })
// emitter.emit('newEvent', 45)
// emitter.emit('newEvent', [123, {'a': 15}])
// emitter.emit('new', 'gn')

