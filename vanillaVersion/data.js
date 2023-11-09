import { fetchDataFunc } from './fetchData.js';
import { startColorSetter, setData } from './pageFuncs/settings.js'
import { cleanDOM } from './pageFuncs/basicFuncs.js';
import { setupListener, wordListener, settingsListener, 
         historyListener, favListener, affListener, 
         savedListener, saveListener, deleteHListener, 
         clearHListener, textSelectListener } from './pageFuncs/listeners.js';

const ls = localStorage;

var fetchData = async function (word)  {
    console.log("fetchData", word)
    fetchCounter();
    var data = fetchDataFunc();
    let loader;
    if (ls.getItem("loader")) { loader = ls.getItem("loader"); } else { loader = 'pac'; ls.setItem("loader", loader); }
    document.getElementById(loader + '-loader').classList.remove('d-none');
    const wordResponse = await fetch(data.urlWordApi + word, data.optionsWordApi);
    const freqResponse = await fetch(data.urlWordApi + word + "/frequency", data.optionsWordApi);
    const wordResult = await wordResponse.json();
    const freqResult = await freqResponse.json();
    return [wordResult, freqResult];
};

var fetchCounter = function () {
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
};

var controlsBuilder = function (searchWord, page) {
    cleanDOM();
    let apiKey = localStorage.getItem('apiKey');
    let host = localStorage.getItem('apiKey');

    if (apiKey && host) {
        controlsBuilderHelper(searchWord, page);
    } else { 
        let temp = document.querySelector("#welcome").innerHTML;
        let tempFunc = Handlebars.compile(temp);
        let tempObj = "";
        let tempFromObj = tempFunc(tempObj);
        document.querySelector("#welcomeArea").innerHTML = "";
        document.querySelector("#welcomeArea").innerHTML = tempFromObj; 

        setupListener();
    };
};

var controlsBuilderHelper = function (searchWord, page) {
    startColorSetter();
    let controls = document.querySelector("#controls").innerHTML;
    let controlsFunc = Handlebars.compile(controls);
    let fetchAmount = 0;
    if (ls.getItem("fetchAmount")) {
        fetchAmount = JSON.parse(ls.getItem("fetchAmount")).amount;
    };
    
    let controlsObj = {
        page: page,
        word: searchWord,
        fetchAmount: fetchAmount,
        wordAmount: fetchAmount / 2
    };
    let controlsFromObj = controlsFunc(controlsObj);
    document.querySelector("#controlsArea").innerHTML = "";
    document.querySelector("#controlsArea").innerHTML = controlsFromObj;

    wordListener();

    settingsListener();
    
    historyListener();
    
    favListener();
};

controlsBuilder();

var templateBuilder = function (tempName, data) {
    console.log(tempName, data)
    cleanDOM();

    if (tempName == "wordOutput") {
        console.log("here")
        if (inStorage(data.word, "favourites")) {
            data.status = "active";
        };
    };

    var settingsData = {}
    if (tempName == "settings") {
        settingsData = setData(settingsData);
    };

    let temp = document.getElementById(tempName).innerHTML;
    let tempFunc = Handlebars.compile(temp);
    let tempObj;
    if (tempName == "settings") { tempObj = { data: settingsData }; } else { tempObj = { data: data }; }
    let tempFromObj = tempFunc(tempObj);

    document.getElementById(tempName + "Area").innerHTML = "";
    document.getElementById(tempName + "Area").innerHTML = tempFromObj;

    let loader;
    if (ls.getItem("loader")) { loader = ls.getItem("loader"); } else { loader = 'pac'; ls.setItem("loader", loader); }
    document.getElementById(loader + "-loader").classList.add('d-none');

    affListener(tempName);

    savedListener(tempName);

    saveListener(data);

    if (tempName == 'history') { deleteHListener(); clearHListener(); }
};

var deleteFromStorage = function (wordToDelete, place, template, time) {
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
    
};

var inStorage = function (word, place) {
    let existingData = JSON.parse(ls.getItem(place));
    if (existingData) return existingData.some(o => o.word == word);
};

var saveToStorage = function (currentData, place, status) {
    let existingData = JSON.parse(ls.getItem(place));
    if (existingData == null) { existingData = [] };
    currentData.status = status;
    existingData.push(currentData);
    ls.setItem(place, JSON.stringify(existingData));
};

function dataSorter (data, storage) {
    data.forEach(function (item) {
        if (storage.hasOwnProperty(item.partOfSpeech)) {
            storage[item.partOfSpeech].definitions.push(item)
        } else {
            storage[item.partOfSpeech] = {}
            storage[item.partOfSpeech].name = item.partOfSpeech
            storage[item.partOfSpeech].definitions = [item]
        };
    });
};

var savedOrganizer = function (searchWord) {
    var historyItems;
    var favouriteItems;
    if (JSON.parse(ls.getItem("history"))) { historyItems = JSON.parse(ls.getItem("history")); } else { historyItems = []; };
    if (JSON.parse(ls.getItem("favourites"))) { favouriteItems = JSON.parse(ls.getItem("favourites")); } else { favouriteItems = []; };
    if (historyItems == [] && favouriteItems == []) { dataInterpreter(searchWord); };
    var allSavedData = merger(historyItems, favouriteItems, "word");
    allSavedData = allSavedData.filter((v,i,a)=>a.findIndex(v2=>(v2.word===v.word))===i);

    return allSavedData;
};

var dataInterpreter = async function (searchWord) {
    var fetch = await fetchData(searchWord).then();
    let sortedDef = {};
    if (fetch[0].success == false) {
        templateBuilder("error", fetch[0])
    } else {
        let finalData = {};
        finalData.word = fetch[0].word;
        finalData.timestamp = Date.now();

        if (inStorage(fetch[0].word, "favourites")) { finalData.isFavourite = true; };
        if (fetch[0].results) { 
            dataSorter(fetch[0].results, sortedDef);
            finalData.mainDef =  fetch[0].results[0].definition;
        } else { finalData.descr_message = " no further description for this :(" };

        if (fetch[0].pronunciation) { 
            if (fetch[0].pronunciation.all) {
                finalData.pronounciation = fetch[0].pronunciation.all 
            } else {
                finalData.pronounciation = fetch[0].pronunciation 
            }
        };

        if (fetch[1].frequency) {
            if (fetch[1].frequency.perMillion) {
                finalData.frequency = fetch[1].frequency.perMillion;
            };
        };
        
        finalData.definitions = sortedDef;
        saveToStorage(finalData, "history");
        templateBuilder("wordOutput", finalData);
    };
};

var merger = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);

export { fetchData, templateBuilder, inStorage, 
         saveToStorage, deleteFromStorage, dataInterpreter, 
         savedOrganizer, controlsBuilder };
