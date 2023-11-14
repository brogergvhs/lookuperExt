import { GeneralDataContext } from "@/components/WordDataProvider";
import { saveToFavourites } from "@/lib/handlers";
import { useContext } from "react";
import { HiBookmark } from 'react-icons/hi';

export default function WordMainInfo ({ word, favourite, frequency, pronounciation }) {

    return (<>
    {word ? (
        <div className="flex justify-between items-center">
            <div className="mb-2">
                <div className="flex flex-col">
                    <div className="mb-2 text-xl capitalize">{word}</div>
                    <span className="text-xs acc-color">Frequency per million: </span>
                    {frequency ? (
                        <div className="sec-color">{frequency}</div>
                    ) : (
                        <div className="sec-color">unknown :(</div>
                    )}
                </div>
                <div className="flex flex-col mt-2">
                    <span className="text-xs acc-color">Pronunciation: </span>
                    {pronounciation ? (
                        <div className="sec-color">{pronounciation}</div>
                    ) : (
                        <div className="sec-color">unknown :(</div>
                    )}
                </div>
            </div>
            <button data-id={`favBtn-${word}`} 
                onClick={(ev) => saveToFavourites(ev, word)} 
                className={`${favourite ? 'active' : ''} btn-outline-info  flex items-center justify-center w-8 h-8 m-4 border border-solid rounded-md`}
            >
                <HiBookmark />
            </button>
        </div>
    ) : (
        <div className="text-xl text-center">Try <span className="acc-color">looking up</span> something using the <span className="acc-color">input</span> above!</div>
    )}
    </>)
}