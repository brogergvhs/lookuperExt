import { Messenger } from '../lib/messenger.js';
import { EventEmitter } from '../lib/eventEmitter.js';


function init() {

    const messenger = new Messenger();
    const eventEmitter = new EventEmitter();

    eventEmitter.registerEvent("test");

    console.log('background.js: init()');
    chrome.runtime.onMessage.addListener(onMessage);
}

init();