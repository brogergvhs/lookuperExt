import { Messenger } from '../lib/messenger.js';

function init() {
    const messenger = new Messenger("background", "active-page", false);
    messenger.listen();
    messenger.registerEvent(["handshake", "request-stored-data","store-data","remove-stored-data"]);
    messenger.addEventListener("handshake", (message) => {
        console.log("background received handshake");
        messenger.setIsAllowed(true);
        messenger.send({ "handshake": true });
    });
    messenger.addEventListener("request-stored-data", async (message) => {
        const returnData = await chrome.storage.local.get(message.data);
        //const returnData = Object.keys(requestedData).length == 0 ? null : requestedData;
        console.log(message);
        console.log(`sending ${message.data} to ${message.origin}`);
        console.log("requestedData:", returnData);
        messenger.send({recipient: message.origin, "get-stored-data": returnData})
    });
    messenger.addEventListener("store-data", (entry) => {
        chrome.storage.local.set(entry.data);
    });
    messenger.addEventListener("remove-stored-data", (entry) => {
        chrome.storage.local.remove(entry.data);
    });


    // eventEmitter.registerEvent(["get-historydata"]);

    // eventEmitter.addEventListener("get-historydata", (event) => {
    //     console.log("background.js: get-historydata");
    // });
    // chrome.runtime.onMessage.addListener((message, sender) => {
    //     console.log(message.greeting);
    //     chrome.runtime.sendMessage({recipient: "popup", greeting: "hi"});
    // });

    // chrome.runtime.onMessage.addListener((message, sender) => {
    //     console.log(message.greeting);
    //     chrome.runtime.sendMessage({recipient: "popup", greeting: "hi"});
    // });

    
}

init();