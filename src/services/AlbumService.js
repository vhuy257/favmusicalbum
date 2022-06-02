import { getDb, setDb} from "./db";

export const createAlbum = async(album) => {
    const dbLocal = [...getDb(), album];
    await setDb(dbLocal);
    return album;
}
