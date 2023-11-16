import { Messenger } from '../lib/messenger';

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
        let returnData: object = await new Promise((resolve, reject) => {
            chrome.storage.local.get(message.data, (items: object) => {
              if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
              }
              resolve(items);
            });
          });
        messenger.send({recipient: message.origin, "get-stored-data": returnData})
    });
    messenger.addEventListener("store-data", (entry) => {
        chrome.storage.local.set(entry.data);
    });
    messenger.addEventListener("remove-stored-data", (entry) => {
        chrome.storage.local.remove(entry.data);
    });
}

init();