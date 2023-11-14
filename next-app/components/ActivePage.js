import { inStorage } from "@/lib/storageFuncs";
import { useEffect, useContext, useState } from "react";
import CustomLoader from "./loaders/CustomLoader";
import WordNotFound from "./pageComponents/ErrorPage";
import HistoryFavourites from "./pageComponents/HistoryFavouritesPage";
import Settings from "./pageComponents/SettingsPage";
import Welcome from "./pageComponents/WelcomePage";
import WordOutput from "./pageComponents/WordOutputPage";
import { GeneralDataContext } from "./WordDataProvider";

import { Messenger } from "@/lib/messenger";

export default function ActivePage ({page}) {
    const {activePage} = useContext(GeneralDataContext);


    const messenger = new Messenger("active-page", "background", true);
    messenger.registerEvent(["handshake", "get-stored-data"]);
    const [historyData, setHistoryData] = useState(null);
    const [favouritesData, setFavouritesData] = useState(null);

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