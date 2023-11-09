export default function WordCrumb (word) {
    return (<>
        <div onClick={() => searchWord(word)} 
            class="w-fit mt-0 mr-1.5 mb-1.5 ml-0 px-[0.0625] py-2 border border-solid border-mainText rounded-2xl text-sm opacity-[0.85] cursor-pointer"
        >
            <span>{word}</span>
        </div>
    </>)
}