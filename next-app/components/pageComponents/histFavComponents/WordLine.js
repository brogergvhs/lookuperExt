import { deleteFromHistory, toggleFavourites } from "@/lib/handlers";
import { HiBookmark, HiTrash } from 'react-icons/hi';

export default function WordLine ({ type, clickAction, word, pronounciation, mainDef, timestamp, favourite }) {
    
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
                <button data-id={`favBtn-${word}`} onClick={(ev) => toggleFavourites(ev, word)} className={`flex items-center justify-center w-8 h-8 border border-solid rounded-md btn-outline-${type == 'history' ? 'info' : 'warning'} ${favourite ? 'active' : ''}`}>
                    <HiBookmark />
                </button>
                {type === "history" && (
                    <button onClick={(ev) => deleteFromHistory(ev, timestamp)} className="flex items-center justify-center w-8 h-8 border border-solid rounded-md">
                        <HiTrash />
                    </button>
                )}
            </div>
        </div>
    </>)
}