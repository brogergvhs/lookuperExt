import { IWordData, TGenDataProvider } from "@/types/generalData";
import React, { createContext, useState } from "react";

export const GeneralDataContext = createContext<Partial<TGenDataProvider>>({});

export default function WordDataProvider ({children}) {
    const [wordData, setWordData] = useState<IWordData>();
    const [activePage, setActivePage] = useState<string>('wordOutput');

    return (
        <GeneralDataContext.Provider value={{ wordData, setWordData, activePage, setActivePage }}>
            { children }
        </GeneralDataContext.Provider>
    )
}