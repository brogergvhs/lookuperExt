var fetchDataFunc = async function () {
    let activePair = await chrome.storage.local.get('activePair');
    let apiKey = activePair["activePair"]["apiKey"];
    let host = activePair["activePair"]["hostKey"];
    
    console.log("api:", apiKey, "host:", host);

    var data = {
        urlWordApi: 'https://wordsapiv1.p.rapidapi.com/words/',
         optionsWordApi: {
             method: 'GET',
             headers: {
                 'X-RapidAPI-Key': apiKey,
                 'X-RapidAPI-Host': host
             }
         },
    };

    return data;
};

export { fetchDataFunc };