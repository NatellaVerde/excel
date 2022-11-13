import {
    APPLY_STYLES,
    STYLES_CHANGE,
    TABLE_RESIZE,
    TEXT_CHANGE,
    TITLE_CHANGE, UPDATE_TIME
} from './type'

export function rootReducer(state, action) {
    let field
    let val
    // console.log('action', action)
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return state = {...state, [field]: value(state, field, action)}
        case TEXT_CHANGE: {
            field = 'dataState'
            return state = {
                ...state,
                currentText: action.data.value,
                dataState: value(state, field, action)
            }
        }
        case STYLES_CHANGE: {
            return state = {
                ...state, currentStyles: action.data
            }
        }
        case APPLY_STYLES: {
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach((id) => {
                val[id] = {...val[id], ...action.data.value}
            })
            return state = {
                ...state, [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        }
        case TITLE_CHANGE: {
            return state = {
                ...state, titleApp: action.data
            }
        }
        case UPDATE_TIME: {
            return state = {
                ...state, dateOpenedPage: new Date().toJSON()
            }
        }
        default:
            return state
    }
}

function value(state, field, action) {
    const prevState = state[field] || {}
    prevState[action.data.id] = action.data.value
    return prevState
}

