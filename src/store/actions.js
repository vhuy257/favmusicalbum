export const CREATE_ALBUM = 'CREATE_ALBUM';
export const FETCH_LIST_ALBUM = 'FETCH_LIST_ALBUM';
export const REMOVE_LIST = 'REMOVE_LIST';
export const MARK_LIST = 'MARK_LIST';
export const SET_DISPLAY = 'SET_DISPLAY';
export const SORT_LIST = 'SORT_LIST';

export const createAlbumAction = (album) => {
    return {
        type: CREATE_ALBUM,
        payload: album
    }
}

export const fetchListAlbumAction = (list) => {
    return {
        type: FETCH_LIST_ALBUM,
        payload: list
    }
}

export const removeItemFromListAction = (id) => {
    return {
        type: REMOVE_LIST,
        payload: id
    }
}

export const markAlbumAsBestAction = (id) => {
    return {
        type: MARK_LIST,
        payload: id
    }
}

export const setDisplayAction = (display) => {
    return {
        type: SET_DISPLAY,
        payload: display
    }
}

export const sortListAction = (field) => {
    return {
        type: SORT_LIST,
        payload: field
    }
}