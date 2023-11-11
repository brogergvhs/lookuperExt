import { clearHistory } from "@/lib/handlers";
import searchWord from "@/lib/searchWord";
import WordLine from "./histFavComponents/WordLine";

export default function HistoryFavourites ({type, data, setActivePage, setWordData}) {

    return (<>
        {data ? (<>
            <div className="max-h-[calc(100vh-171px)] overflow-auto">
                {data.toReversed().map((h, index) => (
                    <WordLine clickAction={() => searchWord(h.word, setActivePage, setWordData)} type={type} key={`${index}`} word={h.word} pronounciation={h.pronounciation} mainDef={h.mainDef} timestamp={h.timestamp}></WordLine>
                ))}
            </div>
            <button onClick={() => clearHistory(data)} className="w-fit px-4 py-1 rounded-md mt-3 mx-auto border border-solid btn-outline-secondary">Clear history</button>
        </>) : (
            <div className="w-full text-center text-xl">It's <span className={type === 'history' ? 'acc-color' : 'fav-color'}>sooooo </span> empty in here...</div>
        )}
    </>);
}