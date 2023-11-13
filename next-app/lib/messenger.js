import { EventEmitter } from "./eventEmitter.js";

export class Messenger extends EventEmitter {
  #queue = [];
  #origin;
  #recipient;
  #isAllowed;

  constructor(origin, recipient, isAllowed = true) {
    super();
    this.#origin = origin;
    this.#recipient = recipient;
    this.#isAllowed = isAllowed;
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
        chrome.runtime.sendMessage({
        recipient: this.#recipient,
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
    this.emitEvent(subject, message.content[subject]);
  }
}
