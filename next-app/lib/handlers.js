const { inStorage, deleteFromStorage, saveToStorage, getFromHistory } = require("./storageFuncs");

function saveToFavourites (ev, word) {
    ev.stopPropagation();
    let isInStorage = inStorage(word, "favourites");
    if (isInStorage) {
        deleteFromStorage(word, "favourites", "favs");
        let wordToChange = getFromHistory(word);
        wordToChange.favourite = false;
        saveToStorage(wordToChange, "history", "");
        let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
        favButtons.forEach(btn => (
            btn.classList.remove("active")
        ));
    } else {
        if (inStorage(word, "history")) {
            let wordToSave = getFromHistory(word);
            wordToSave.status = 'active';
            saveToStorage(wordToSave, "favourites", "");
            let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
            favButtons.forEach(btn => (
                btn.classList.add("active")
            ));
        };
    };
};

function deleteFromHistory (ev, removeTime) {
    ev.stopPropagation();
    deleteFromStorage("", "history", '', removeTime);
    document.getElementById(removeTime).remove();
};

function clearHistory (data) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem("history");
        return data = [];
    }
};

export { saveToFavourites, deleteFromHistory, clearHistory }