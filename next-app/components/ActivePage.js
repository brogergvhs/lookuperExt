import { inStorage } from "@/lib/storageFuncs";
import { useEffect, useContext } from "react";
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            messenger.listen();
            messenger.addEventListener("get-stored-data", (message) => {
                if(!message.data) return;
                let historyData = message.data["history"];
                let favouritesData = message.data["favourites"];
            });
            } else {
                console.log("window is undefined");
            }
    }, []);

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
            let historyData;
            if (typeof window !== 'undefined') {
                messenger.send({"request-stored-data": "history"});
                if (historyData) {
                    historyData.forEach(async (word) => {
                        if (word.status) { word.status = ""; };
                        if (await inStorage(word.word, "favourites")) { word.status = "active"; };
                    });
                };
            };

            return (
                <HistoryFavourites data={historyData} type="history"></HistoryFavourites>
            );

        case "favourites":
            let favouritesData;
            if (typeof window !== 'undefined') {
                messenger.send({"request-stored-data": "history"});
            };
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