import { GeneralDataContext } from "@/components/WordDataProvider";
import searchWord from "@/lib/searchWord";
import { useContext, useState } from "react";

export default function CustomInput () { 
    const {setActivePage, setWordData} = useContext(GeneralDataContext);
    const [wordToSearch, setWordToSearch] = useState('');
    function searchClick () {
        searchWord(wordToSearch, setActivePage, setWordData);
        setWordToSearch('');
    }

    return (<>
        <input className="form-control" value={wordToSearch} onChange={(ev) => setWordToSearch(ev.target.value)} placeholder="Check some words"/>
        <button onClick={searchClick} className="flex items-center justify-center w-8 h-8 border border-solid rounded-md"></button>
    </>)
}