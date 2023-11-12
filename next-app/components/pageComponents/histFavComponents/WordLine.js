import { deleteFromHistory, saveToFavourites } from "@/lib/handlers";

export default function WordLine ({ type, clickAction, word, pronounciation, mainDef, timestamp, status }) {
    
    return (<>
        <div id={timestamp} onClick={clickAction} className={`flex justify-between w-full b-b-acc acc p-2 historyItem mb-2 ${type === 'favourites' ? 'fav' : ''}`}>
            <div className="pe-2">
                <div className="items-center flex">
                    <span className={`${type === 'history' ? 'acc-color' : 'fav-color'} me-3 $`}>{word}</span>
                    {pronounciation ? (
                        <div className="text-xs leading-6 sec-color">{pronounciation}</div>
                    ) : (
                        <div className="text-xs leading-6 sec-color">unknown :(</div>
                    )}
                </div>
                {mainDef ? (
                    <div className="sec-color">{mainDef}</div>
                ) : (
                    <div className="sec-color text-xs leading-6 flex align-items-center">unknown :(</div>
                )}
            </div>
            <div className="flex mt-2 gap-3 ml-auto">
                <button data-id={`favBtn-${word}`} onClick={(ev) => saveToFavourites(ev, word)} className={`h-8 w-8 border border-solid btn-outline-${type == 'history' ? 'info' : 'warning'} rounded-md ${status == 'active' ? 'active' : ''}`}>
                    <i className="fa-sharp fa-solid fa-bookmark"></i>
                </button>
                {type === "history" && (
                    <button onClick={(ev) => deleteFromHistory(ev, timestamp)} className="h-8 w-8 border border-solid rounded-md">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                )}
            </div>
        </div>
    </>)
}