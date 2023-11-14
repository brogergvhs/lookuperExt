var fetchDataFunc = async function () {
    let storedKeyPairs = await chrome.storage.local.get('keyPairs');
    let apiKey = storedKeyPairs["keyPairs"][0]["apiKey"];
    let host = storedKeyPairs["keyPairs"][0]["hostKey"];
    
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