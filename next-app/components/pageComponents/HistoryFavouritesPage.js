import { clearHistory } from "@/lib/handlers";
import searchWord from "@/lib/searchWord";
import { useContext } from "react";
import { GeneralDataContext } from "../WordDataProvider";
import WordLine from "./histFavComponents/WordLine";

export default function HistoryFavourites ({ type, data }) {
    const {setWordData, setActivePage} = useContext(GeneralDataContext);

    return (<>
        {data ? (<>
            <div className="max-h-[calc(100vh-140px)] overflow-auto">
                {data.toReversed().map((h, index) => (
                    <WordLine clickAction={() => searchWord(h.word, setActivePage, setWordData)} type={type} key={`${index}`} 
                        word={h.word} pronounciation={h.pronounciation} mainDef={h.mainDef} timestamp={h.timestamp} status={h.status}
                    ></WordLine>
                ))}
            </div>
            {type === 'history' && (
                <button onClick={() => clearHistory(data)} className="flex items-center gap-2 w-fit px-4 py-1 rounded-md mt-3 mx-auto border border-solid btn-outline-secondary">
                    Clear history
                </button>
            )}
        </>) : (
            <div className="w-full text-center text-xl">It&apos;s <span className={type === 'history' ? 'acc-color' : 'fav-color'}>sooooo </span> empty in here...</div>
        )}
    </>);
}