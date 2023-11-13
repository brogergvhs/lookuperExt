class Event {
  callbacks = [];

  constructor(name) {
    this.name = name;
  }

  getCallbacks() {
    return this.callbacks;
  }

  registerCallback(callback) {
    this.callbacks.push(callback);
  }
}

export class EventEmitter {
  _events = {};

  constructor(names=[]) {
    this.registerEvent(...names);
  }

  registerEvent(...names) {
    for (const name of names) {
      const event = new Event(name);
      this._events[name] = event;
    }
  }

  emitEvent = (name, data) => {
    if (this._events[name]) {
      this._events[name]
        .getCallbacks()
        .forEach((callback) => callback(data));
    }
  };

  addEventListener(name, callback) {
    if (!this._events[name]) {
      throw new Error(`Event ${name} is not registered.`);
    }
    this._events[name].registerCallback(callback);
  }
}
