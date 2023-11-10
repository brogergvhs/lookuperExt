import { fetchDataFunc } from "./headersConstruct";
import {inStorage, saveToStorage, fetchCounter, savedOrganizer} from "./storageFuncs";

export default async function searchWord (word, setActivePage, setWordData) {
    const englRegex = /^[a-z]+$/i;
    console.log("word to search:", word);
    if (englRegex.test(word)) {
        setActivePage("loading");
        getData(word, setActivePage, setWordData);
    } else {
        console.log("Regex failed or no word.");
    }
};

async function getData(searchWord, setActivePage, setWordData) {
    console.log("getData");
    let allSavedData = savedOrganizer(searchWord); 

    if (allSavedData.find(word => word.word == searchWord)) {
        let wordData = allSavedData.find(word => word.word == searchWord);
        setActivePage("wordOutput");
        setWordData(wordData);
        saveToStorage(wordData, "history");
    } else { 
        dataInterpreter(searchWord, setActivePage, setWordData);
    }
}

async function dataInterpreter (searchWord, setActivePage, setWordData) {
    console.log("dataInterpreter");
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
    console.log("fetchEnglishWord");

    fetchCounter();
    let data = fetchDataFunc();
    const wordResponse = await fetch(data.urlWordApi + searchWord, data.optionsWordApi);
    const freqResponse = await fetch(data.urlWordApi + searchWord + "/frequency", data.optionsWordApi);
    const wordResult = await wordResponse.json();
    const freqResult = await freqResponse.json();

    return [wordResult, freqResult];
};

function dataSorter (data, storage) {
    console.log("dataSorter");
    data.forEach(function (item) {
        if (storage.hasOwnProperty(item.partOfSpeech)) {
            storage[item.partOfSpeech].push(item)
        } else {
            storage[item.partOfSpeech] = {}
            storage[item.partOfSpeech] = [item]
        };
    });
};
