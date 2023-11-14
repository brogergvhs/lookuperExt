const { inStorage, deleteFromStorage, saveToStorage, getFromHistory } = require("./storageFuncs");

async function saveToFavourites (ev, word) {
    ev.stopPropagation();
    let isInStorage = await inStorage(word, "favourites");
    if (!isInStorage) isInStorage = {};
    console.log("FAV word is in Storage: ", isInStorage)
    if (Object.keys(isInStorage).length !== 0) {
        deleteFromStorage(word, "favourites", "favs");
        let wordToChange = await getFromHistory(word);
        wordToChange.favourite = false;
        console.log("wordToChange: ", wordToChange);
        saveToStorage(wordToChange, "history", "");
        let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
        favButtons.forEach(btn => (
            btn.classList.remove("active")
        ));
    } else {
        const isInHistoryStorage = await inStorage(word, "history");
        if (isInHistoryStorage) {
            const wordFromHistory = await getFromHistory(word);
            console.log("wordFromHistory: ", wordFromHistory)
            let wordToSave = Object.values(wordFromHistory)[0];
            wordToSave.status = 'active';
            console.log("wordToSave: ", wordToSave);
            await saveToStorage(wordToSave, "favourites", "");
            let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
            favButtons.forEach(btn => (
                btn.classList.add("active")
            ));
        };
    };
};

async function deleteFromHistory (ev, removeTime) {
    ev.stopPropagation();
    await deleteFromStorage("", "history", '', removeTime);
    document.getElementById(removeTime).remove();
};

function clearHistory (data) {
    if (typeof window !== 'undefined') {
        chrome.storage.local.remove("history");
        return data = [];
    }
};

export { saveToFavourites, deleteFromHistory, clearHistory }