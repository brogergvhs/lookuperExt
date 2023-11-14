const { inStorage, deleteFromStorage, saveToStorage, getFromHistory } = require("./storageFuncs");

async function saveToFavourites (ev, word) {
    ev.stopPropagation();
    let isInStorage = await inStorage(word, "favourites");
    if (isInStorage) {
        await deleteFromStorage(word, "favourites", "favs");
        let wordToChange = await getFromHistory(word);
        wordToChange.favourite = false;
        await saveToStorage(wordToChange, "history", "");
        let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
        favButtons.forEach(btn => (
            btn.classList.remove("active")
        ));
    } else {
        if (await inStorage(word, "history")) {
            let wordToSave = await getFromHistory(word);
            wordToSave.status = 'active';
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