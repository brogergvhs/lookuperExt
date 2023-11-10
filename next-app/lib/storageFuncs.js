var merger = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

function inStorage (word, place) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ls = localStorage;
        
        let existingData = JSON.parse(ls.getItem(place));
        if (existingData) return existingData.some(o => o.word == word);
    }
};

function saveToStorage (currentData, place, status) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ls = localStorage;

        let existingData = JSON.parse(ls.getItem(place));
        if (existingData == null) { existingData = [] };
        currentData.status = status;
        existingData.push(currentData);
        ls.setItem(place, JSON.stringify(existingData));
    }
};

function deleteFromStorage (wordToDelete, place, template, time) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ls = localStorage;

        if (!template) { template = place };
        let existingData = JSON.parse(ls.getItem(place));
        if (time) { 
            for (var i = 0; i < existingData.length; i++) {
                console.log("qwdwerf")
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
            ls.removeItem(place);
            templateBuilder(template); 
        } else { 
            ls.setItem(place, JSON.stringify(existingData)); 
            templateBuilder(template, existingData.reverse());
        }
    }
};

function savedOrganizer (searchWord) {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ls = localStorage;

        var historyItems;
        var favouriteItems;
        if (JSON.parse(ls.getItem("history"))) { historyItems = JSON.parse(ls.getItem("history")); } else { historyItems = []; };
        if (JSON.parse(ls.getItem("favourites"))) { favouriteItems = JSON.parse(ls.getItem("favourites")); } else { favouriteItems = []; };
        if (historyItems == [] && favouriteItems == []) { dataInterpreter(searchWord); };
        var allSavedData = merger(historyItems, favouriteItems, "word");
        allSavedData = allSavedData.filter((v,i,a)=>a.findIndex(v2=>(v2.word===v.word))===i);

        return allSavedData;
    }
};

function fetchCounter () {
    if (typeof window !== 'undefined' && window.localStorage) {
        const ls = localStorage;

        console.log("fetch counter")
        let fetchAmount = JSON.parse(ls.getItem("fetchAmount"));
        if (fetchAmount == undefined || null) {
            let fetchAmount = {time: Date.now(), amount: 2};
            ls.setItem("fetchAmount", JSON.stringify(fetchAmount));
        } else if (Date.now() - fetchAmount.time > 86400000) {
            fetchAmount.amount = 0;
            fetchAmount.time = Date.now();
            ls.setItem("fetchAmount", JSON.stringify(fetchAmount));
        } else {
            fetchAmount.amount += 2;
            ls.setItem("fetchAmount", JSON.stringify(fetchAmount));
        }
    }
};

export { inStorage, saveToStorage, deleteFromStorage, savedOrganizer, fetchCounter }