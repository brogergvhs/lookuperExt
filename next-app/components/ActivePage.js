import CustomLoader from "./loaders/CustomLoader";
import WordNotFound from "./pageComponents/ErrorPage";
import HistoryFavourites from "./pageComponents/HistoryFavouritesPage";
import Settings from "./pageComponents/SettingsPage";
import Welcome from "./pageComponents/WelcomePage";
import WordOutput from "./pageComponents/WordOutputPage";

export default function ActivePage ({page, wordData, setActivePage, setWordData}) {

    switch (page) {
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
                <HistoryFavourites type="history"></HistoryFavourites>
            );

        case "favourites":
            return (
                <HistoryFavourites type="favourites"></HistoryFavourites>
            );

        case "wordOutput":
            return (
                <WordOutput wordData={wordData} setActivePage={setActivePage} setWordData={setWordData}></WordOutput>
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