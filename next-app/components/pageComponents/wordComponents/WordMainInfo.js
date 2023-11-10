export default function WordMainInfo ({ word, frequency, pronounciation }) {
    return (<>
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <div className="d-flex flex-column">
                    <span className="fs-11 acc-color">Frequency per million: </span>
                    {frequency ? (
                        <div className="sec-color">{frequency}</div>
                    ) : (
                        <div className="sec-color">unknown :(</div>
                    )}
                </div>
                <div className="d-flex flex-column mt-2">
                    <span className="fs-11 acc-color">Pronunciation: </span>
                    {pronounciation ? (
                        <div className="sec-color">{pronounciation}</div>
                    ) : (
                        <div className="sec-color">unknown :(</div>
                    )}
                </div>
            </div>
            <button onClick={() => addWordToFavs(word)} className="btn btn-outline-warning btn-sm saveBtn {{data.status}}">
                <i className="fa-sharp fa-solid fa-bookmark"></i>
            </button>
        </div>
    </>)
}