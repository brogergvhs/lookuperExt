const { inStorage, deleteFromStorage, saveToStorage, getFromHistory } = require("./storageFuncs");

function saveToFavourites (ev, word) {
    ev.stopPropagation();
    let isInStorage = inStorage(word, "favourites");
    if (isInStorage) {
        deleteFromStorage(word, "favourites", "favs");
        let wordToChange = getFromHistory(word);
        wordToChange.favourite = false;
        saveToStorage(wordToChange, "history", "");
    } else {
        if (inStorage(word, "history")) {
            let wordToSave = getFromHistory(word);
            wordToSave.favourite = true;
            saveToStorage(wordToSave, "favourites", "");
        };
    };
}

function deleteFromHistory (ev, removeTime) {
    ev.stopPropagation();
    deleteFromStorage("", "history", '', removeTime);
}

function clearHistory (data) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem("history");
        return data = [];
    }
};

export { saveToFavourites, deleteFromHistory, clearHistory }