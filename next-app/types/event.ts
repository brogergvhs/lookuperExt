export type Callback = (data: any) => void;

interface Event {
  name: string;
  callbacks: Callback[];
  getCallbacks(): Callback[];
  registerCallback(callback: Callback): void;
}

export interface Events {
  [key: string]: Event;
}

export interface Message {
  origin?: string,
  recipient?: string,
  [title: string]: object | string | boolean;
}
