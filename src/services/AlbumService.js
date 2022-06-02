import { getDb, setDb} from "./db";

export const createAlbum = (album) => {
    const dbLocal = [...getDb(), album];
    return setDb(dbLocal);
}
