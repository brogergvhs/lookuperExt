import { Messenger } from '../lib/messenger.js';
import { EventEmitter } from '../lib/eventEmitter.js';


function init() {
    console.log(typeof window);
    console.log('background.js: init()');

    const messenger = new Messenger("background", "popup", false);
    // const eventEmitter = new EventEmitter();

    messenger.listen();
    messenger.registerEvent(["handshake"]);
    messenger.addEventListener("handshake", (event) => {
        console.log("background received handshake");
        messenger.setIsAllowed(true);
        messenger.send({ "handshake": true });
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