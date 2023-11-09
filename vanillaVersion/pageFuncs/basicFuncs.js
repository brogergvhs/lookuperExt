var cleanDOM = function () {
    document.querySelector("#wordOutputArea").innerHTML = "";
    document.querySelector("#historyArea").innerHTML = "";
    document.querySelector("#favsArea").innerHTML = "";
    document.querySelector("#settingsArea").innerHTML = "";
    document.querySelector("#welcomeArea").innerHTML = "";
    document.querySelector("#errorArea").innerHTML = "";
};

export { cleanDOM }