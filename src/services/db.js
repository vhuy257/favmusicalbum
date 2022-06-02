const dbName = 'favalbum';

export const getDb = () => {
    return JSON.parse(localStorage.getItem(dbName)) || [];
}

export const setDb = (arr) => {
    return localStorage.setItem(dbName, JSON.stringify(arr));
}