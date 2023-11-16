export interface IDefinitionData {
    definition: string,
    partOfSpeech: string,
    [key: string]: string | Array<string>,
}

export interface IWordData {
    word: string,
    pronounciation: string,
    descr_message?: string,
    mainDef?: string,
    favourite?: boolean,
    frequency: number,
    definitions: {
        [key: string]: IDefinitionData[]
    }
};

export type TGenDataProvider = {
    // [To-Do]: define wordData interface
    wordData: IWordData,
    setWordData: (wordData: IWordData) => void, 
    activePage: string,
    setActivePage: (activePage: string) => void
};
