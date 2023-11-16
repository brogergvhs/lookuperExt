import { Callback, Events } from "@/types/event";

class Event {
  public callbacks: Callback[] = [];

  constructor(public name: string) {}

  getCallbacks(): Callback[] {
    return this.callbacks;
  }

  registerCallback(callback: Callback): void {
    this.callbacks.push(callback);
  }
}

export class EventEmitter {
  protected events: Events = {};

  constructor(names: string[] = []) {
    this.registerEvent(names);
  }

  public registerEvent(names: string[]): void {
    for (const name of names) {
      const event = new Event(name);
      this.events[name] = event;
    }
  }

  public emitEvent = (name: string, data): void => {
    if (this.events[name]) {
      this.events[name]
        .getCallbacks()
        .forEach((callback: Callback) => callback(data));
    }
  };

  public addEventListener(name: string, callback: Callback) {
    if (!this.events[name]) {
      throw new Error(`Event ${name} is not registered.`);
    }
    this.events[name].registerCallback(callback);
  }
}