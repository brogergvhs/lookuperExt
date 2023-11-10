const { inStorage, deleteFromStorage, saveToStorage, getFromHistory } = require("./storageFuncs");

function saveToFavourites (ev, word) {
    ev.stopPropagation();
    let isInStorage = inStorage(word, "favourites");
    if (isInStorage) {
        deleteFromStorage(word, "favourites", "favs");
    } else {
        if (inStorage(word, "history")) {
            let wordToSave = getFromHistory(word);
            saveToStorage(wordToSave, "favourites", "active");
        };
    };
}

function deleteFromHistory (ev, removeTime) {
    ev.stopPropagation();
    deleteFromStorage("", "history", '', removeTime);
}

var clearHistory = function () {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem("history");
    }
};

export { saveToFavourites, deleteFromHistory, clearHistory }