import NumberCircle from "../generalComponents/NumberCircle"
import WordCrumb from "./wordComponents/WordCrumb"
import WordMainInfo from "./wordComponents/WordMainInfo"

export default function WordOutput ({wordData, setActivePage, setWordData}) {
    let transformedDefData;
    if (wordData.definitions) {
        transformedDefData = Object.values(wordData.definitions);
    }

    return (<>
        <WordMainInfo word={wordData.word} frequency={wordData.frequency} pronounciation={wordData.pronounciation}></WordMainInfo>
        {wordData.descr_message && (
            <div class="mt-2">
                <span class="acc-color">Sorry,</span>
                {wordData.descr_message}
            </div>
        )}
        {transformedDefData && transformedDefData.map((defSection, index) => (<>
            <div key={`defTypeName-${index}`} className="">testert</div>
            <div key={`defType-${index}`} className="flex flex-col h-full">
                {defSection && defSection.map((d, index) => (<>
                    <div key={`def-${index}`} className="flex">
                        <NumberCircle number={index+1}></NumberCircle>
                        <div class="d-flex flex-column ps-2 mb-1 mt-1 b-l-acc">
                            <div>{d.definition}</div>

                            {d.examples && d.examples.map((example, index) => (
                                <div key={`example-${index}`}> - {example}</div>
                            ))}

                            {d.synonyms && (<>
                                <span class="fs-11 sec-color">Synonyms: </span>
                                <div class="flex flex-wrap w-full mt-1">
                                    {d.synonyms && d.synonyms.map((synonyme) => (
                                        <WordCrumb key={synonyme} word={synonyme} setActivePage={setActivePage} setWordData={setWordData}></WordCrumb>
                                    ))}
                                </div>
                            </>)}

                            {d.hasTypes && (<>
                                <span class="fs-11 sec-color">Hyponyms: </span>
                                <div class="flex flex-wrap w-full mt-1">
                                    {d.hasTypes && d.hasTypes.map((type) => (
                                        <WordCrumb key={type} word={type} setActivePage={setActivePage} setWordData={setWordData}></WordCrumb>
                                    ))}
                                </div>
                            </>)}

                            {d.typeOf && (<>
                                <span class="fs-11 sec-color">Hypernyms: </span>
                                <div class="flex flex-wrap w-full mt-1">
                                    {d.typeOf && d.typeOf.map((typeOf) => (
                                        <WordCrumb key={typeOf} word={typeOf} setActivePage={setActivePage} setWordData={setWordData}></WordCrumb>
                                    ))}
                                </div>
                            </>)}
                        </div>
                    </div>
                </>))}
            </div>
        </>))}
    </>)
}
