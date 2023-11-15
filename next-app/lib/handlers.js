const { inStorage, deleteFromStorage, saveToStorage, updateAllStorage, getFromHistory } = require("./storageFuncs");

async function toggleFavourites (ev, word) {
    console.log("TOGGLE FAVOURITE: ",word)
    ev.stopPropagation();
    let isInStorage = await inStorage(word, "favourites");
    if (isInStorage) {
        //delete from favourites
        deleteFromStorage(word, "favourites", "favs");
        let wordToChange = await getFromHistory(word);
        console.log("wordToChange: ", wordToChange);
        if (!wordToChange) return;
        wordToChange.status = "";
        wordToChange.favourite = false;
        updateAllStorage(wordToChange, "history", "");
        //saveToStorage(wordToChange, "history", "");
        let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
        favButtons.forEach(btn => (
            btn.classList.remove("active")
        ));
    } else {
        //add to favourites
        const isInHistoryStorage = await inStorage(word, "history");
        if (isInHistoryStorage) {
            const wordToSave = await getFromHistory(word);
            //let wordToSave = Object.values(wordFromHistory)[0];
            wordToSave.status = 'active';
            wordToSave.favourite = true;
            saveToStorage(wordToSave, "favourites", "");
            updateAllStorage(wordToSave, "history", "");
            let favButtons = document.querySelectorAll(`[data-id=favBtn-${word}]`);
            favButtons.forEach(btn => (
                btn.classList.add("active")
            ));
        } else {
            console.error("word not in history storage")
        }
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

export { toggleFavourites, deleteFromHistory, clearHistory }