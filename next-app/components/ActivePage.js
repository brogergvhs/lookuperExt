import { inStorage } from "@/lib/storageFuncs";
import { useContext } from "react";
import CustomLoader from "./loaders/CustomLoader";
import WordNotFound from "./pageComponents/ErrorPage";
import HistoryFavourites from "./pageComponents/HistoryFavouritesPage";
import Settings from "./pageComponents/SettingsPage";
import Welcome from "./pageComponents/WelcomePage";
import WordOutput from "./pageComponents/WordOutputPage";
import { GeneralDataContext } from "./WordDataProvider";

export default function ActivePage ({page}) {
    const {activePage} = useContext(GeneralDataContext);
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
            if (typeof window !== 'undefined' && window.localStorage) {
                historyData = JSON.parse(localStorage.getItem("history"));
                if (historyData) {
                    historyData.forEach((word) => {
                        if (word.status) { word.status = ""; };
                        if (inStorage(word.word, "favourites")) { word.status = "active"; };
                    });
                };
            };

            return (
                <HistoryFavourites data={historyData} type="history"></HistoryFavourites>
            );

        case "favourites":
            let favouritesData;
            if (typeof window !== 'undefined' && window.localStorage) {
                favouritesData = JSON.parse(localStorage.getItem("favourites"));
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