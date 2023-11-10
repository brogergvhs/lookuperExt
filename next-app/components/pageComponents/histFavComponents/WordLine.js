export default function WordLine ({ word, pronounciation, mainDef, timestamp }) {
    return (<>
        <div data-value={word} data-place="history" className="flex justify-content-between w-100 b-b-acc acc p-2 mb-2 historyItem searchSaved">
            <div className="pe-2">
                <div className="align-items-center flex">
                    <span className="acc-color me-3">{word}</span>
                    {pronounciation ? (
                        <div className="fs-11 sec-color">{pronounciation}</div>
                    ) : (
                        <div className="fs-11 sec-color">unknown :(</div>
                    )}
                </div>
                {mainDef ? (
                    <div className="sec-color" style="min-height: 24px">{mainDef}</div>
                ) : (
                    <div className="sec-color fs-11 flex align-items-center" style="min-height: 24px">unknown :(</div>
                )}
            </div>
            <div className="flex mt-2">
                <button className="btn btn-outline-warning btn-sm saveBtn {status}" value={word}>
                    <i className="fa-sharp fa-solid fa-bookmark"></i>
                </button>
                <button className="btn btn-outline-secondary btn-sm ms-2 deleteFromHistory" value={timestamp}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    </>)
}