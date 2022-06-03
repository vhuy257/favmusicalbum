import { 
    CREATE_ALBUM,
    FETCH_LIST_ALBUM,
    REMOVE_LIST,
    MARK_LIST,
    SET_DISPLAY,
    SORT_LIST,
} from "./actions";

export const initialState = {
    listAlbum: [],
    display: 'grid',    
    sortBy: '',
}

const sortList = (arr, keysort) => {
    return arr.sort((a,b) => {
        if (a[keysort] < b[keysort]) {
            return -1;
        }
        if (a[keysort] > b[keysort]) {
            return 1;
        }
        return 0;
    })
}

function reducer(state, action) {
    switch (action.type) {
        case CREATE_ALBUM:
            let newListAlbum = [...state.listAlbum, action.payload];
            console.log([...state.listAlbum, action.payload]);
            const sortListAlbum = sortList(newListAlbum, state.sortBy);
            return {
                ...state,
                listAlbum: sortListAlbum
            };
        case FETCH_LIST_ALBUM:
            return {
                ...state,
                listAlbum: action.payload
            };
        case REMOVE_LIST:
            return {
                ...state,
                listAlbum: state.listAlbum.filter(item => item.id !== action.payload)
            };
        case MARK_LIST:
            const indexList = state.listAlbum.findIndex(item => item.id === action.payload);
            state.listAlbum[indexList].marked = !state.listAlbum[indexList].marked;
            return {
                ...state,
                listAlbum: state.listAlbum
            };
        case SET_DISPLAY:
            return {
                ...state,
                display: action.payload
            };
        case SORT_LIST:            
            return {
                ...state,
                sortBy: action.payload,
                listAlbum: sortList(state.listAlbum, action.payload)
            };
        default:
            return state;
    }
};

export default reducer;