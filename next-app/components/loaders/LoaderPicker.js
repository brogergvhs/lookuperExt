import { useState } from "react";
import CustomLoader from "./CustomLoader";

export default function LoaderPicker () {
    const [activeLoader, setActiveLoader] = useState('packman');

    const loadersList = [
        {type: "packman", name: "Pack man"},
        {type: "cube", name: "Cube"},
        {type: "lines", name: "Lines"},
        {type: "dots", name: "Dots"},
        {type: "spinner", name: "Spinner"},
    ];

    return (<>
        <div class="btn-group shadow-0" role="group" aria-label="Basic example">
            {loadersList.map((loader) => (
                <button key={loader.type} onClick={(ev) => setActiveLoader(ev.target.value)} 
                    value={loader.type} class="btn btn-sm btn-outline-secondary loaderPicker {{#if data.pac}}active{{/if}}"
                >
                    {loader.name}
                </button>
            ))}
        </div>
    
        <CustomLoader type={activeLoader}></CustomLoader>
    </>)
}