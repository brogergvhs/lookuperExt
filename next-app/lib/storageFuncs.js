var merger = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

async function inStorage (word, place) {
    console.log("inStorage");
    if (typeof window !== 'undefined') {   
        let existingData = await chrome.storage.local.get(place);
        console.log("EXISTING DATA: ", existingData);
        if (Object.keys(existingData).length !== 0) {
            console.log("EXISTING DATA: ", Object.values(existingData)[0]);
            return Object.values(existingData)[0].some(o => o.word == word);
        }
        
    }
};

async function saveToStorage (currentData, place, status) {
    console.log("saveToStorage");
    if (typeof window !== 'undefined') {
        let existingData = await chrome.storage.local.get(place);
        console.log("EXISTING DATA: ", existingData)
        if (Object.keys(existingData).length == 0) { 
            existingData = []; 
        } else {
            existingData = existingData[place];
        };
        existingData.push(currentData);
        chrome.storage.local.set({[place]: existingData});
    }
};

async function deleteFromStorage (wordToDelete, place, template, time) {
    console.log("deleteFromStorage");
    if (typeof window !== 'undefined') {
        if (!template) { template = place };
        let existingData = await chrome.storage.local.get(place);
        if (time) { 
            for (var i = 0; i < existingData.length; i++) {
                if (existingData[i].timestamp == time) {
                    existingData.splice(i, 1);
                    i = existingData.length;
                };
            };
        } else {
            for (var i = 0; i < existingData.length; i++) {
                if (existingData[i].word == wordToDelete) {
                    existingData.splice(i, 1);
                    i = existingData.length;
                };
            };
        };

        if (template == 'history') { 
            existingData.forEach((word) => {
                if (inStorage(word.word, "favourites")) { word.status = "active"; };
            }); 
        };
        
        if (existingData.length == 0) { 
            chrome.storage.local.remove(place);
            // templateBuilder(template); 
        } else { 
            chrome.storage.local.set(existingData); 
            // templateBuilder(template, existingData.reverse());
        }
    }
};

async function savedOrganizer (searchWord) {
    console.log("savedOrganizer");
    if (typeof window !== 'undefined') {
        const storedHistoryItems = await chrome.storage.local.get("history");
        const storedFavouriteItems = await chrome.storage.local.get("favourites");
        var historyItems = Object.values(storedHistoryItems).length !== 0 ? storedHistoryItems["history"] : [];
        var favouriteItems =  Object.values(storedFavouriteItems).length !== 0 ? storedFavouriteItems["favourites"] : [];
        console.log(historyItems, favouriteItems);
        if (historyItems == [] && favouriteItems == []) { dataInterpreter(searchWord); };
        console.log("HISTORY ITEMS", historyItems, "FAVOURITE ITEMS", favouriteItems)
        var allSavedData = merger(historyItems, favouriteItems, "word");
        allSavedData = allSavedData.filter((v,i,a)=>a.findIndex(v2=>(v2.word===v.word))===i);
        return allSavedData;
    }
};

async function fetchCounter () {
    console.log("fetch counter");
    if (typeof window !== 'undefined') {
        let fetchAmount = await chrome.storage.local.get("fetchAmount");
        if (fetchAmount == undefined || null) {
            let fetchAmount = {time: Date.now(), amount: 2};
            chrome.storage.local.set(fetchAmount);
        } else if (Date.now() - fetchAmount.time > 86400000) {
            fetchAmount.amount = 0;
            fetchAmount.time = Date.now();
             chome.storage.local.set(fetchAmount);
        } else {
            fetchAmount.amount += 2;
            chrome.storage.local.set(fetchAmount);
        }
    }
};

async function getFromHistory (word) {
    console.log("getFromHistory");
    if (typeof window !== 'undefined') {
        let historyItems = await chrome.storage.local.get("history")
        console.log("HISTORY ITEMS: ", historyItems)
        if (Object.keys(historyItems).length == 0) { 
            return historyItems = []; 
        } else {
            return Object.values(historyItems)[0].find((item) => item.word == word);
        }
        
    } else {
        throw new Error("window is undefined in getFromHistory");
    }
};

export { inStorage, saveToStorage, deleteFromStorage, savedOrganizer, fetchCounter, getFromHistory }