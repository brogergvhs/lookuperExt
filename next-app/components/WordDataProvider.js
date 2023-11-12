import { createContext, useState } from "react";

export const GeneralDataContext = createContext();

const WordDataProvider = ({children}) => {
    const [wordData, setWordData] = useState({});
    const [activePage, setActivePage] = useState('wordOutput');

    return (
        <GeneralDataContext.Provider value={{ wordData, setWordData, activePage, setActivePage }}>
            { children }
        </GeneralDataContext.Provider>
    )
}

export default WordDataProvider;