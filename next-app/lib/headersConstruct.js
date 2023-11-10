var fetchDataFunc = function () {
    let apiKey = localStorage.getItem('apiKey');
    let host = localStorage.getItem('hostKey');
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