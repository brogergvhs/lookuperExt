import searchWord from "@/lib/searchWord";
import WordLine from "./histFavComponents/WordLine";

export default function HistoryFavourites ({type, data, setActivePage, setWordData}) {
    function searchFromHF(word) {
        searchWord(word, setActivePage, setWordData);
    };

    return (<>
        {data ? (<>
            {data.map((h, index) => (
                <WordLine clickAction={() => searchFromHF(h.word)} type={type} key={`${index}`} word={h.word} pronounciation={h.pronounciation} mainDef={h.mainDef} timestamp={h.timestamp}></WordLine>
            ))}
        </>) : (
            <div>Ooops</div>
        )}
    </>);
}