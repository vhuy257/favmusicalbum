import { 
    CREATE_ALBUM
} from "./actions";

export const initialState = {
    listAlbum: []
}

function reducer(state, action) {
    switch (action.type) {
        case CREATE_ALBUM:
            return {
                ...state,
                listAlbum: [...state.listAlbum, action.payload]
            };
        default:
            return state;
    }
};

export default reducer;