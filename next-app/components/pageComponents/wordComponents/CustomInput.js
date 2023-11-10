import searchWord from "@/lib/searchWord";

export default function CustomInput ({setActivePage, setWordData}) { 

    return (<>
        <input onChange={(ev) => searchWord(ev.target.value, setActivePage, setWordData)} placeholder="Check some words"/>
    </>)
}