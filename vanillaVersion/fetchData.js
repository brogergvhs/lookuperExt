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

        urlJpApi: 'https://japanese-text-analysis.p.rapidapi.com/',
        optionsJpApi: {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'ee641ba247msh00f2b77313afa28p1468e4jsnce0cfd55e608',
                'x-rapidapi-host': 'japanese-text-analysis.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            // max kanji rank 13107
        }
    };

    return data;
};

export { fetchDataFunc };

const url = 'https://japanese-text-analysis.p.rapidapi.com/';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'ee641ba247msh00f2b77313afa28p1468e4jsnce0cfd55e608',
                'x-rapidapi-host': 'japanese-text-analysis.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
        };

        async function getShit() {
            let req = JSON.stringify({
                operationName: "analyseText",
                query: "query analyseText($text: String) {analysis(text: $text) {tokens {entry {word {literal __typename} __typename} pronunciation text __typename} words {literal frequency entries {reading senses {translations __typename} __typename} __typename} kanjis {literal frequency meanings reading_stats {romaji __typename} __typename} __typename}}",
                variables: {
                    text: "昨日すき焼きを食べました"
                }
            })
            options.body = req;
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);   
            } catch (error) {
                console.error(error);
            }
        }