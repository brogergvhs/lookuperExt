import React, { useContext, useState } from "react";
import NumberCircle from "../generalComponents/NumberCircle";
import { GeneralDataContext } from "../WordDataProvider";

import { Messenger } from "../../lib/messenger";
import { TGenDataProvider } from "@/types/generalData";
import { TKeyPair } from "@/types/pageTypes";

export default function Welcome () {
    const {setActivePage} = useContext(GeneralDataContext) as TGenDataProvider;
    const [apiKey, setApiKey] = useState<string>('');
    const [host, setHost] = useState<string>('wordsapiv1.p.rapidapi.com');

    function finishSetup() {
        if (apiKey && host) {
            let keyPair: TKeyPair = {'apiKey': apiKey, 'hostKey': host, 'id': Date.now() };
            let keyPairs: TKeyPair[] = [];
            keyPairs.push(keyPair);
   
            Messenger.directSend("welcome", "background",
                [{"store-data": {'keyPairs': [keyPair]}}, 
                {"store-data": {'activePair': keyPair}}]);
            setActivePage('wordOutput');
        };
    };

    return (<>
        <div>
            <div className="text-2xl mb-3 text-center">Oops, it looks like you dont&apos;t have an <span className="acc-color">API key</span> or <span className="acc-color">Host </span>:(</div>
            <div className="mb-2 text-center">Let&apos;s <span className="acc-color">fix</span> it!</div>
            <div className="flex mb-3">
                <NumberCircle number={1}></NumberCircle>
                <div className="flex items-center ps-2 b-l-acc">
                    <div>
                        If you don&apos;t have one yet, go <a href="https://rapidapi.com/dpventures/api/wordsapi/pricing">here</a> and press <span className="acc-color">Subscribe</span> on any plan you like.
                    </div>
                </div>
            </div>
            <div className="flex mb-3">
                <NumberCircle number={2}></NumberCircle>
                <div className="flex items-center ps-2 b-l-acc">
                    <div>
                        If you already have one or just got a brand new key from the step above, <span className="acc-color">fill</span> these in:
                    </div>
                </div>
            </div>
            <div className="flex mb-3">
                <NumberCircle number={3}></NumberCircle>
                <div className={`ps-2 b-l-acc w-full ${apiKey ? "" : "ps-2 b-l-acc w-full error-brdr"}`}>
                    <div className="mb-1">API key <span className="sec-color text-xs">(X-RapidAPI-Key)</span>:</div>
                    <input onChange={(ev) => setApiKey(ev.target.value)} type="text" placeholder="Your API key" value={apiKey} className="form-control" />      
                </div>
            </div>
            <div className="flex mb-5">
                <NumberCircle number={4}></NumberCircle>
                <div className={`ps-2 b-l-acc w-full ${host ? "" : "ps-2 b-l-acc w-full error-brdr"}`}>
                    <div className="mb-1">Host <span className="sec-color text-xs">(X-RapidAPI-Host)</span>:</div>
                    <input onChange={(ev) => setHost(ev.target.value)} type="text" placeholder="Your host" value={host} className="form-control" />
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={finishSetup} className={`${host && apiKey ? '' : 'opacity-[70%]'}`}>Start lookuping</button>
            </div>
        </div>
    </>)
}