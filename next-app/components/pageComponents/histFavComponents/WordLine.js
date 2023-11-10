import { deleteFromHistory, saveToFavourites } from "@/lib/handlers";

export default function WordLine ({ type, clickAction, word, pronounciation, mainDef, timestamp }) {
    
    return (<>
        <div onClick={clickAction} className="flex justify-content-between w-100 b-b-acc acc p-2 mb-2 historyItem searchSaved">
            <div className="pe-2">
                <div className="align-items-center flex">
                    <span className="acc-color me-3">{word}</span>
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
                <button onClick={(ev) => saveToFavourites(ev, word)} className="h-8 w-8 border border-solid rounded-md" value={word}>
                    <i className="fa-sharp fa-solid fa-bookmark"></i>
                </button>
                {type === "history" && (
                    <button onClick={(ev) => deleteFromHistory(ev, timestamp)} className="h-8 w-8 border border-solid rounded-md" value={timestamp}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                )}
            </div>
        </div>
    </>)
}