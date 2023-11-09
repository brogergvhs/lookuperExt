export default function WordMainInfo ({ word, frequency, pronounciation }) {
    return (<>
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <div class="d-flex flex-column">
                    <span class="fs-11 acc-color">Frequency per million: </span>
                    {frequency ? (
                        <div class="sec-color">{frequency}</div>
                    ) : (
                        <div class="sec-color">unknown :(</div>
                    )}
                </div>
                <div class="d-flex flex-column mt-2">
                    <span class="fs-11 acc-color">Pronunciation: </span>
                    {pronounciation ? (
                        <div class="sec-color">{pronounciation}</div>
                    ) : (
                        <div class="sec-color">unknown :(</div>
                    )}
                </div>
            </div>
            <button onClick={() => addWordToFavs(word)} class="btn btn-outline-warning btn-sm saveBtn {{data.status}}">
                <i class="fa-sharp fa-solid fa-bookmark"></i>
            </button>
        </div>
    </>)
}