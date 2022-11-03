import {storage} from '@core/utils';
import {defaultStyle} from '@/constans';

const defaultState = {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyle,
    titleApp: ''
}

const normalize = (state)=> ({
    ...state,
    currentText: '',
    currentStyles: defaultStyle
})

export const initialState = storage('excel-store')
    ? normalize(storage('excel-store')) : defaultState
