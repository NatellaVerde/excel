import {storage} from '@core/utils';

export function toHtml(key) {
    const model = storage(key)
    const id = key.split(':')[1]
    return `
    <li class="db__record">
        <a href="#excel/${id}">${model.titleApp}</a>
        <strong>${new Date(model.dateOpenedPage).toLocaleDateString()}
                ${new Date(model.dateOpenedPage).toLocaleTimeString()}
        </strong>
    </li>`
}

export function getAllKey() {
    const keys = []
    for (let i=0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createTable() {
    const keys = getAllKey()
    if (!keys.length) {
        return '<p class="db__table db__view"> There is any table here</p>'
    }
    return `
        <div class="db__table db__view">
            <div class="db__list-header">
                <span>Name</span>
                <span>Open date</span>
            </div>
            <ul class="db__list">
                ${keys.map(toHtml).join('')}
            </ul>
        </div>`
}
