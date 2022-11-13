import {
    TABLE_RESIZE,
    TEXT_CHANGE,
    STYLES_CHANGE, APPLY_STYLES, TITLE_CHANGE, UPDATE_TIME
} from '@/components/redux/type';

export function tableResize(data) {
    return {type: TABLE_RESIZE, data}
}

export function textChange(data) {
    return {type: TEXT_CHANGE, data}
}

export function stylesChange(data) {
    return {type: STYLES_CHANGE, data}
}

export function applyStyle(data) {
    return {type: APPLY_STYLES, data}
}

export function titleChange(data) {
    return {type: TITLE_CHANGE, data}
}

export function updateDataPage() {
    return {type: UPDATE_TIME}
}
