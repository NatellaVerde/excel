export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }
    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.focus().addClass(TableSelection.className)
    }
    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.map((el) => el.addClass(TableSelection.className))
    }
    applyStyle(style) {
        this.group.forEach(($el) => $el.css(style))
    }

    get selectedIds() {
        return this.group.map(($el) => $el.id())
    }
    clear() {
        this.group.map(($el) => $el.removeClass(TableSelection.className))
        this.group = []
    }
}
