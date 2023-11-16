import { IWordData } from "./generalData"

export type TKeyPair = {
    apiKey: string,
    hostKey: string,
    id: number
};

export type THistFavProps = {
    type: string,
    data: IWordData[]
};

export type TWordLine = {
    type: string,
    word: string,
    pronounciation?: string, 
    mainDef?: string, 
    timestamp, 
    favourite?: boolean,
    clickAction: () => Promise<void>
};

export type TWordMainInfo = {
    word: string, 
    favourite?: boolean, 
    frequency?: number, 
    pronounciation?: string
};
