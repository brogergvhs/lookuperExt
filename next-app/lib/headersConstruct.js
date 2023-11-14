var fetchDataFunc = async function () {
    let apiKey = await chrome.storage.local.get('apiKey');
    let host = await chrome.storage.local.get('hostKey');
    
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