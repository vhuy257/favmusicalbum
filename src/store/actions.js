export const CREATE_ALBUM = 'CREATE_ALBUM';

export const createAlbumAction = (album) => {
    return {
        type: CREATE_ALBUM,
        payload: album
    }
}