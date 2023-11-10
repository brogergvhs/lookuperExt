import {inStorage, saveToStorage, fetchCounter} from "./storageFuncs";

export default async function searchWord (word, setActivePage, setWordData) {
    const englRegex = /^[a-z]+$/i;

    if (englRegex.test(word)) {
        setActivePage("loading");
        dataInterpreter(word, setActivePage, setWordData);
        
    };

    setActivePage('wordOutput');
    return word;
};

async function dataInterpreter (searchWord, setActivePage, setWordData) {
    let fetch = await fetchEnglishWord(searchWord).then();
    let sortedDef = {};
    if (fetch[0].success == false) {
        setActivePage("error");
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
        setActivePage("wordOutput");
        console.log("final data:", finalData);
        setWordData(finalData);
    };
};

async function fetchEnglishWord (searchWord) {
    const urlWordApi = 'https://wordsapiv1.p.rapidapi.com/words/';
    const optionsWordApi = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ee641ba247msh00f2b77313afa28p1468e4jsnce0cfd55e608',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    fetchCounter();
    const wordResponse = await fetch(urlWordApi + searchWord, optionsWordApi);
    const freqResponse = await fetch(urlWordApi + searchWord + "/frequency", optionsWordApi);
    const wordResult = await wordResponse.json();
    const freqResult = await freqResponse.json();

    return [wordResult, freqResult];
};

function dataSorter (data, storage) {
    data.forEach(function (item) {
        if (storage.hasOwnProperty(item.partOfSpeech)) {
            storage[item.partOfSpeech].push(item)
        } else {
            storage[item.partOfSpeech] = {}
            storage[item.partOfSpeech] = [item]
        };
    });
};
