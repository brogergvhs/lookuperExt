import { Message } from "@/types/event";
import { EventEmitter } from "./eventEmitter";

export class Messenger extends EventEmitter {
  private queue: Message[] = [];

  constructor(
    private origin: string,
    private defaultRecipient: string,
    private isAllowed: boolean = true,
  ) {
    super();
  }

  static directSend(origin: string, recipient: string, message: Message): void {
    const messenger = new Messenger(origin, recipient);
    messenger.send(message);
  }

  public listen(): void {
    chrome.runtime.onMessage.addListener((message, sender) => {
      console.log("message", message);
      if(message.recipient !== this.origin) return;
      this.receive(message);
    });
  }

  public setIsAllowed(isAllowed: boolean): void {
    this.isAllowed = isAllowed;
    this.dispatch();
  }

  private dispatch(): void {
    for (const message of this.queue) {
      let recipient;
      if (message.recipient) {
        recipient = message.recipient;
        delete message.recipient;
      } else {
        recipient = this.defaultRecipient;
      }
      chrome.runtime.sendMessage({
        origin: this.origin,
        recipient: recipient,
        content: message,
      });
    }
    this.queue = [];
  }

  public send(messages: Message | Message[]): void {
    this.addToQueue(messages);
    if (!this.isAllowed) return;
    this.dispatch();
  }

  private addToQueue(messages: Message | Message[]): void {
    if (Array.isArray(messages)) {
      for (const message of messages) {
        this.queue.push(message);
      }
    } else this.queue.push(messages);
  }

  private receive(message: Message): void {
    const subject = Object.keys(message.content)[0];
    this.emitEvent(subject, {origin: message.origin, data: message.content[subject]});
  }
}
