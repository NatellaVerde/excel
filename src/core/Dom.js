class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return ''
    }
    on(eventName, callback) {
        this.$el.addEventListener(eventName, callback)
    }
    off(eventName, callback) {
        this.$el.removeEventListener(eventName, callback)
    }
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }
    get data() {
        return this.$el.dataset
    }
    getOffset() {
        return this.$el.getBoundingClientRect()
    }
    getClosest(selector) {
        return $(this.$el.closest(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    css(newStyle = {}) {
        Object.keys(newStyle)
            .map((key) => this.$el.style[key] = newStyle[key])
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className = '') => {
    const newEl = document.createElement(tagName)
    if (className) {
        newEl.classList.add(className)
    }
    return $(newEl)
}

