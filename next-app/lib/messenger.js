import { EventEmitter } from "./eventEmitter.js";

export class Messenger extends EventEmitter {
  #queue = [];
  #origin;
  #defaultRecipient;
  #isAllowed;

  constructor(origin, defaultRecipient, isAllowed = true) {
    super();
    this.#origin = origin;
    this.#defaultRecipient = defaultRecipient;
    this.#isAllowed = isAllowed;
  }

  static directSend(origin, recipient, message) {
    const messenger = new Messenger(origin, recipient);
    messenger.send(message);
  }

  listen() {
    chrome.runtime.onMessage.addListener((message, sender) => {
      if(message.recipient !== this.#origin) return;
      this.#receive(message);
    });
  }

  setIsAllowed(isAllowed) {
    this.#isAllowed = isAllowed;
    this.#dispatch();
  }

  #dispatch() {
    for (const message of this.#queue) {
      let recipient;
      if (message.recipient) {
        recipient = message.recipient;
        delete message.recipient;
      } else {
        recipient = this.#defaultRecipient;
      }
      /* console.log(`%cmessage recipient:`, "color: green;");
      console.log(recipient);
      console.log(`%cmessage:`, "color:green;")
      console.log(message); */
      chrome.runtime.sendMessage({
        origin: this.#origin,
        recipient: recipient,
        content: message,
      });
    }
    this.queue = [];
  }

  send(messages) {
    this.#addToQueue(messages);
    if (!this.#isAllowed) return;
    this.#dispatch();
  }

  #addToQueue(messages) {
    if (!Array.isArray(messages)) messages = [messages];
    for (const message of messages) {
      this.#queue.push(message);
    }
  }

  #receive(message) {
    const subject = Object.keys(message.content)[0];
    this.emitEvent(subject, {origin: message.origin, data: message.content[subject]});
  }
}
