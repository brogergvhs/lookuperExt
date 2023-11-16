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

export type Message = {
  recipient?: string,
  // needs a proper type/interface here
  [content: string]: any
}
