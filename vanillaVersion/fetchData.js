var fetchDataFunc = function () {
    let apiKey = localStorage.getItem('apiKey');
    let host = localStorage.getItem('hostKey');
    console.log("api:", apiKey, "host:", host);

    var data = {
        // check .env file for whats supposed to be here
    };

    return data;
};

export { fetchDataFunc };


// CALL JP 
// async function getShit() {
//     let req = JSON.stringify({
//         operationName: "analyseText",
//         query: "query analyseText($text: String) {analysis(text: $text) {tokens {entry {word {literal __typename} __typename} pronunciation text __typename} words {literal frequency entries {reading senses {translations __typename} __typename} __typename} kanjis {literal frequency meanings reading_stats {romaji __typename} __typename} __typename}}",
//         variables: {
//             text: "昨日すき焼きを食べました"
//         }
//     })
//     options.body = req;
//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);   
//     } catch (error) {
//         console.error(error);
//     }
// }