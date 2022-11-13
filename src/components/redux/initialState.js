import {clone} from '@core/utils';
import {defaultStyle} from '@/constans';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyle,
    titleApp: 'Table title',
    dateOpenedPage: new Date().toJSON()
}

const normalize = (state)=> ({
    ...state,
    currentText: '',
    currentStyles: defaultStyle
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
