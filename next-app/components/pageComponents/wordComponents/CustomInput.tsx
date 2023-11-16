import { GeneralDataContext } from "@/components/WordDataProvider";
import searchWord from "@/lib/searchWord";
import { TGenDataProvider } from "@/types/generalData";
import React, { useContext, useState } from "react";
import { HiSearch } from 'react-icons/hi';

export default function CustomInput () { 
    const {setActivePage, setWordData} = useContext(GeneralDataContext) as TGenDataProvider;
    const [wordToSearch, setWordToSearch] = useState<string>('');
    function searchClick (): void {
        searchWord(wordToSearch, setActivePage, setWordData);
        setWordToSearch('');
    }

    return (<>
        <input className="form-control" value={wordToSearch} onChange={(ev) => setWordToSearch(ev.target.value)} placeholder="Check some words"/>
        <button onClick={searchClick} className="flex items-center justify-center w-8 h-8 border border-solid rounded-md">
            <HiSearch />
        </button>
    </>)
}