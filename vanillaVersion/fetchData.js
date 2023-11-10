

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