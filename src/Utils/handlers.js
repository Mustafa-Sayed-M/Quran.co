export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to local storage", error);
    }
};
export const getFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error getting from local storage", error);
        return null;
    }
};
export const saveToSessionStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to session storage", error);
    }
};
export const getFromSessionStorage = (key) => {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error getting from session storage", error);
        return null;
    }
};
export const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
export const copyVerseText = (text) => {
    if (!text) return;

    navigator.clipboard.writeText(text)
        .then(() => { })
        .catch((err) => { });
};
