import NumberCircle from "@/components/NumberCircle";

export default function WelcomePage() {

    return (<>
        <div>
            <div class="fs-3 mb-3 text-center">Oops, it looks like you dont't have an <span class="acc-color">API key</span> or <span class="acc-color">Host :(</span></div>
            <div class="mb-2 text-center">Let's <span class="acc-color">fix</span> it!</div>
            <div className="flex mb-3">
                <NumberCircle number={1} />
                <div className=" ps-2">If you don't have one yet, go <a href="https://rapidapi.com/dpventures/api/wordsapi/pricing">here</a> and press <span className="acc-color">Subscribe</span> on any plan you like.</div>
            </div>
            <div className="flex mb-3">
                <NumberCircle number={2} />
                <div className=" ps-2">Go to the <span className="acc-color">Endpoints</span> tab and copy a looong string from 'X-RapidAPI-Key'.</div>
            </div>
            <div className="flex mb-3">
                <NumberCircle number={3} />
                <div className=" ps-2">If you already have one or just got a brand new key from the step above, <span className="acc-color">fill</span> these in:</div>
            </div>
            <div className="flex mb-3">
                <NumberCircle number={4} />
                <div id="api-key-bd" className=" ps-2 w-100">
                    <div className="mb-1">API key <span className="sec-color">(X-RapidAPI-Key)</span>:</div>
                    <input id="api-key" type="text" placeholder="Your API key" className="form-control"/>      
                </div>
            </div>
            <div className="flex mb-5">
                <NumberCircle number={5} />
                <div id="host-key-bd" className=" ps-2 w-100">
                    <div className="mb-1">Host <span className="sec-color">(X-RapidAPI-Host)</span>:</div>
                    <input id="host-key" type="text" placeholder="Your host" value="wordsapiv1.p.rapidapi.com" className="form-control"/>
                </div>
            </div>
            <div className="flex justify-content-center">
                <button className="btn btn-outline-info btn-sm setupFinishBtn">Start lookuping</button>
            </div>
        </div>
    </>)
}