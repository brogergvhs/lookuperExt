import { fetchData, templateBuilder, saveToStorage, dataInterpreter, savedOrganizer, controlsBuilder } from './data.js';

async function getData(searchWord) {
    let allSavedData = savedOrganizer(searchWord); 

    if (allSavedData.find(word => word.word == searchWord)) {
        let wordData = allSavedData.find(word => word.word == searchWord);
        templateBuilder("wordOutput", wordData);
        saveToStorage(wordData, "history");
    } else { dataInterpreter(searchWord); controlsBuilder(searchWord); }
};

export {getData};

Handlebars.registerHelper("inc", function(index){
	index += 1;
    return index;
});