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
    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
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

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }
    focus() {
        this.$el.focus()
        return this
    }
    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value)
            return this
        }
        return this.$el.getAttribute(name)
    }
    id(parse) {
        if (parse) {
           const parsed = this.id().split(':')
           return {
               row: +parsed[0],
               col: +parsed[1]
           }
        }
        return this.data.id
    }
    css(newStyle = {}) {
        Object.keys(newStyle)
            .map((key) => this.$el.style[key] = newStyle[key])
    }
    addClass(newClass) {
        this.$el.classList.add(newClass)
        return this
    }
    getStyles(style = []) {
        return style.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res
        }, {})
    }
    removeClass(newClass) {
        this.$el.classList.remove(newClass)
        return this
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

