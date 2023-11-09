import { controlsBuilder, templateBuilder } from "../data.js";
import { loaderModule, onColorPick } from './settings.js'
import { getData } from '../script.js';
import { inStorage, saveToStorage, savedOrganizer, deleteFromStorage } from "../data.js";

const ls = localStorage;

var setupListener = function () {
    $('.setupFinishBtn').click(function () {
        console.log("setupListener");
        $('#host-key-bd').removeClass('error-brdr'); 
        $('#api-key-bd').removeClass('error-brdr');

        let apiKey = $('#api-key').val();
        let hostKey = $('#host-key').val();

        if (apiKey && hostKey) {
            let keyPair = {'apiKey': apiKey, 'hostKey': hostKey, 'id': Date.now() };
            let keyPairs = [];
            keyPairs.push(keyPair);
            ls.setItem('keyPairs', JSON.stringify(keyPairs));
            ls.setItem('apiKey', apiKey);
            ls.setItem('hostKey', hostKey);
            controlsBuilder(); 
        } 
        else if (!apiKey && !hostKey) { $('#host-key-bd').addClass('error-brdr'); $('#api-key-bd').addClass('error-brdr'); }
        else if (!apiKey) { $('#api-key-bd').addClass('error-brdr'); }
        else if (!hostKey) { $('#host-key-bd').addClass('error-brdr'); }
    });
};

var wordListener = function () {
    $("#wordInput").keypress(function(e) {
        if(e.keyCode == 13) {
            console.log("wordListener");
            document.getElementById("wordOutputArea").innerHTML = "";
            let searchWord = $(this).val();

            getData(searchWord);
        };
    });
};

var textSelectListener = function () {
    function onSelect () {
        if (window.getSelection) {
            let txt = window.getSelection();
            return txt;
        } else if (window.document.getSelection) {
            let txt = window.document.getSelection();
            return txt;
        } else if (window.document.selection) {
            let txt = window.document.selection.createRange().text;
            return txt;
        };
    };


    $('#app').on("mouseup", function() {
        let txt = onSelect();
        let txtString = onSelect().toString()

        if (txt.toString()) { 
            console.log("test1", txt.toString())
            let getRange  = txt.getRangeAt(0),
                selectionRect = getRange.getBoundingClientRect();
            
            $('.toolbar').css({
                top: (selectionRect.top - 49) + 'px',
                left: (selectionRect.left - ($('.toolbar').width()/2) + (selectionRect.width/2))+ 'px'
            });

            $('.toolbar').removeClass('d-none');

            $('.toolbar').click(function () {
                $('.toolbar').addClass('d-none');
                getData(txtString.trim());
            });
        } else { $('.toolbar').addClass('d-none'); };
    });
};

textSelectListener();

var keyInputListener = function () {
    $('.keyInput').on("change", function () {
        let value = $(this).val();
        let key = $(this).data("key");
        let pairId = $(this).data("id"); 
        let activePairId = ls.getItem('activePair');
        let allPairs = JSON.parse(ls.getItem("keyPairs"));
        console.log("value:", value, ", key:", key, ", id:", pairId)
        if (value) {
            if (allPairs.find(pair => pair.id == pairId)) {
                allPairs.find(pair => pair.id == pairId)[key] = value;
                ls.setItem('keyPairs', JSON.stringify(allPairs));
                if (activePairId == pairId) { ls.setItem(key, value) };
            } else {
                let apiValue = document.querySelector('[data-new="' + pairId + '-api"]').value;
                let hostValue = document.querySelector('[data-new="' + pairId + '-host"]').value;
                let newPair = {
                    'apiKey': apiValue,
                    'hostKey': hostValue,
                    'id': pairId,
                };
                allPairs.push(newPair);
                ls.setItem('keyPairs', JSON.stringify(allPairs));
                if (apiValue && hostValue) { 
                    let newRadio = document.querySelector('[data-id="' + pairId + '"]');
                    newRadio.dataset.api = apiValue;
                    newRadio.dataset.host = hostValue;

                    $('#new-' + pairId).removeClass('vs-hidden'); 
                    keyPairSelectorListener();
                };
            }
        } else { 
            $(this).val(allPairs.find(pair => pair.id == pairId)[key]).trigger('change'); 
        };
    });
};

var keyPairSelectorListener = function () {
    $('.keyPairSelector').click(function () {
        let apiKey = $(this).data('api');
        let hostKey = $(this).data('host');
        let pairId = $(this).data("id");
        ls.setItem('apiKey', apiKey);
        ls.setItem('hostKey', hostKey);
        ls.setItem('activePair', pairId);

        $(this).prop("checked", true);

        let actives = document.getElementsByClassName('apiPairActive');
        for (let i=0;i < actives.length;i++) {
            actives[i].classList.add('vs-hidden');
        };
        let id = $(this).attr("id");
        $('#'+id+"-active").removeClass('vs-hidden');
    });
};

var pairDeleteListener = function () {
    $('.deleteKeyPair').click(function () {
        let pairId = $(this).attr("id");
        let allPairs = JSON.parse(ls.getItem("keyPairs"));
        if (allPairs.length == 1) {} else {
            for (let i=0;i < allPairs.length;i++) {
                if (allPairs[i].id == pairId) {
                    allPairs.splice(i, 1);
                    ls.setItem('keyPairs', JSON.stringify(allPairs));
                };
            };
            $("#" + pairId + "-holder").remove();
        };
    });
};

var settingsListener = function () {
    document.getElementById("settingsBtn").onclick = async function () {
        console.log("settingsListener");
        controlsBuilder("", {settings: true});
        templateBuilder("settings");
        loaderModule();

        $('.coloris').click(function () {
            let colorType = $(this).data("colortype");
            Coloris({
                el: '#' + colorType,
                theme: 'large',
                swatches: [
                    '#A2CE40',
                    '#ffc107',
                    '#202124',
                    '#BEC1C5',
                    '#8e9297',
                ],
                onChange: (color) => onColorPick(colorType, color)
            });
        });

        var keyPairsAmount = JSON.parse(ls.getItem("keyPairs")).length;

        keyInputListener();

        keyPairSelectorListener();

        $('#addKeyPair').click(function () {
            keyPairsAmount += 1;
            let newId = Date.now();
            var newPairHtml = '<div id="' + newId +'-holder" class="d-flex mb-3"><div id="new-' + newId +'" class="p-2 pe-3 d-flex flex-column vs-hidden"><input type="radio" id="' + keyPairsAmount +'" name="key_pair" data-id="' + newId +'" data-api="" data-host="" class="keyPairSelector"><div id="' + keyPairsAmount +'-active" class="fs-11 mt-2 apiPairActive vs-hidden">Active</div></div><div class="b-l-acc ps-2 pb-2 pt-1 w-100"><div class="mb-3"><div class="mb-2 fs-11">API key <span class="sec-color">(X-RapidAPI-Key)</span>:</div><input type="text" placeholder="Your host" data-id="' + newId +'" data-new="' + newId +'-api" data-key="apiKey" value="" class="form-control keyInput"></div><div class=""><div class="mb-2 fs-11">Host <span class="sec-color">(X-RapidAPI-Host)</span>:</div><input type="text" placeholder="Your host" data-id="' + newId +'" data-new="' + newId +'-host" data-key="hostKey" value="wordsapiv1.p.rapidapi.com" class="form-control keyInput"></div></div><div class="align-items-center d-flex ps-2"><button id="' + newId +'" class="btn btn-outline-secondary deleteKeyPair btn-sm"><i class="fa-solid fa-trash"></i></button></div></div>';
            document.getElementById("newPairsHolder").innerHTML += newPairHtml;

            keyInputListener();
            pairDeleteListener();
        });

        pairDeleteListener();
    };
};

var historyListener = function () {
    document.getElementById("historyBtn").onclick = async function () {
        console.log("historyListener");
        controlsBuilder("", {history: true});
        let historyData = JSON.parse(ls.getItem("history"));
        historyData.forEach((word) => {
            if (word.status) { word.status = ""; };
            if (inStorage(word.word, "favourites")) { word.status = "active"; };
        });
        if (historyData) { 
            templateBuilder("history", historyData.reverse());
        } else { templateBuilder("history") }
    };
};

var favListener = function () {
    document.getElementById("favBtn").onclick = function () {
        console.log("favListener");
        controlsBuilder("", {fav: true});
        var favouritesData = JSON.parse(ls.getItem("favourites"));
        if (favouritesData) {
            templateBuilder("favs", favouritesData.reverse());
        } else { templateBuilder("favs") }
    };
};

var affListener = function (tempName) {
    $('.searchAffiliated').click(function () {
        console.log("affListener");
        document.getElementById(tempName + "Area").innerHTML = "";
        let searchWord = $(this).find("span").html();
        getData(searchWord);
        controlsBuilder(searchWord);
    });
};

var savedListener = function (tempName) {
    $('.searchSaved').click(function () {
        console.log("savedListener");
        document.querySelector("#" + tempName + "Area").innerHTML = "";
        let searchWord = $(this).data("value");
        let allSavedData = savedOrganizer();
        let wordData = allSavedData.find(word => word.word == searchWord);
        wordData.timestamp = Date.now();
        controlsBuilder(searchWord);
        templateBuilder("wordOutput", wordData);
        saveToStorage(wordData, "history");
    });
};

var saveListener = function (data) {
    $('.saveBtn').click(function (e) {
        console.log("saveListener");
        if (!e) e = window.event;
        e.stopPropagation();
        $(this).toggleClass("active");
        let word;
        if ($(this).val()) {
            word = $(this).val();
            let isInStorage = inStorage(word, "favourites");
            if (isInStorage) {
                deleteFromStorage(word, "favourites", "favs");
            } else {
                let wordToSave = data.find(wordData => wordData.word == word);
                saveToStorage(wordToSave, "favourites", "active");
            };
        } else {
            word = $(this).data("value");
            let isInStorage = inStorage(word, "favourites");
            if (isInStorage) {
                deleteFromStorage(word, "favourites", "favs");
            } else {
                saveToStorage(data, "favourites", "active");
            };
        }
    });
};

var deleteHListener = function () {
    $('.deleteFromHistory').click(function (e) {
        console.log("deleteHListener");
        if (!e) e = window.event;
        e.stopPropagation();
        let removeTime = $(this).val();
        console.log(removeTime)
        deleteFromStorage("", "history", '', removeTime);
    });
};

var clearHListener = function () {
    $('.clearHistory').click(function () {
        console.log("clearHListener");
        ls.removeItem("history");
        templateBuilder("history");
    });
};

export { setupListener, wordListener, settingsListener,
         historyListener, favListener, affListener, savedListener, 
         saveListener, deleteHListener, clearHListener,
         textSelectListener };