import searchWord from "@/lib/searchWord";

export default function WordCrumb ({word, setActivePage, setWordData}) {
    return (<>
        <div onClick={() => searchWord(word, setActivePage, setWordData)} 
            className="w-fit mt-0 mr-1.5 mb-1.5 ml-0 py-[0.0625] px-2 border border-solid border-mainText rounded-2xl text-sm opacity-[0.85] cursor-pointer wordCrumb"
        >
            <span>{word}</span>
        </div>
    </>)
}