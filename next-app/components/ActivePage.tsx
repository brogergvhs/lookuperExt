import React from "react";
import { useEffect, useContext, useState } from "react";
import CustomLoader from "./loaders/CustomLoader";
import WordNotFound from "./pageComponents/ErrorPage";
import HistoryFavourites from "./pageComponents/HistoryFavouritesPage";
import Settings from "./pageComponents/SettingsPage";
import Welcome from "./pageComponents/WelcomePage";
import WordOutput from "./pageComponents/WordOutputPage";
import { GeneralDataContext } from "./WordDataProvider";

import { Messenger } from "@/lib/messenger";
import { IWordData, TGenDataProvider } from "@/types/generalData";

export default function ActivePage () {
    const {activePage} = useContext(GeneralDataContext) as TGenDataProvider;

    const messenger = new Messenger("active-page", "background", true);
    messenger.registerEvent(["handshake", "get-stored-data"]);

    const [historyData, setHistoryData] = useState<IWordData[] | null>(null);
    const [favouritesData, setFavouritesData] = useState<IWordData[] | null>(null);

    useEffect(() => {
        console.log("PAGE:" , activePage)
        if (activePage !== "history" && activePage !== "favourites") return;
        if (typeof window !== 'undefined') {
            messenger.listen();
            messenger.addEventListener("get-stored-data", (message) => {
                if(!message.data) return;
                setHistoryData(message.data["history"]);
                setFavouritesData(message.data["favourites"]);
            });
            if (activePage == "history") messenger.send({"request-stored-data": "history"});
            if (activePage == "favourites") messenger.send({"request-stored-data": "favourites"});
        } else {
            console.log("window is undefined");
        }
    }, [activePage]);

    switch (activePage) {
        case "welcome":
            return (
                <Welcome></Welcome>
            );

        case "settings":
            return (
                <Settings></Settings>
            );

        case "history":
            return (
                <HistoryFavourites data={historyData} type="history"></HistoryFavourites>
            );

        case "favourites":
            return (
                <HistoryFavourites data={favouritesData} type="favourites"></HistoryFavourites>
            );

        case "wordOutput":
            return (
                <WordOutput></WordOutput>
            );

        case "error":
            return (
                <WordNotFound></WordNotFound>
            );

        case "loading":
            return (<>
                <CustomLoader type="cube"></CustomLoader>
            </>)
    }
}