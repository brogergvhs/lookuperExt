const ls = localStorage;

var loaderModule = function (loader) {
    $('.loaderPicker').click(function () {
        let loader = $(this).val();
        loaderModuleDOM(loader);
    });
    $('.presetColorPicker').click(function () {
        let colorType = $(this).data('colortype');
        let color = $(this).data('color');
        onColorPick(colorType, color);
    })
};

function loaderModuleDOM (loader) {
    $("#pac-loader-mock").addClass('d-none');
    $("#cube-loader-mock").addClass('d-none');
    $("#lines-loader-mock").addClass('d-none');
    $("#dots-loader-mock").addClass('d-none');
    $("#dot-spin-loader-mock").addClass('d-none');
    $('#dot-spin-mock-btn').removeClass('active');
    $('#dots-mock-btn').removeClass('active');
    $('#pac-mock-btn').removeClass('active');
    $('#cube-mock-btn').removeClass('active');
    $('#lines-mock-btn').removeClass('active');

    document.getElementById(loader + "-loader-mock").classList.toggle('d-none');
    $('#' + loader + '-mock-btn').toggleClass('active');
    localStorage.setItem("loader", loader);  
};

var startColorSetter = function () {
    let r = document.querySelector(':root');
    let ma = ls.getItem('--main-accent');
    let mt = ls.getItem('--main-text');
    let mb = ls.getItem('--main-bg');
    let fa = ls.getItem('--fav-accent');
    let st = ls.getItem('--sec-text');

    r.style.setProperty('--main-accent', ma);
    r.style.setProperty('--main-text', mt);
    r.style.setProperty('--main-bg', mb);
    r.style.setProperty('--fav-accent', fa);
    r.style.setProperty('--sec-text', st);
};

var onColorPick = function (colorType, color) {
    ls.setItem(colorType, color);
    let r = document.querySelector(':root');
    r.style.setProperty(colorType, color);
};

var setData = function (settingsData) {
    let r = document.querySelector(':root');
    let rs = getComputedStyle(r);

    let keyPairs = JSON.parse(ls.getItem('keyPairs'));
    let apiKey = ls.getItem("apiKey");
    let hostKey = ls.getItem("hostKey");
    keyPairs.find(pair => pair.apiKey == apiKey && pair.hostKey == hostKey)["active"] = true;
    
    let l;
    if (ls.getItem("loader")) { l = ls.getItem("loader"); } else { l = 'pac'; }

    let ma;
    if (ls.getItem('--main-accent')) { ma = ls.getItem('--main-accent'); } else { ma = rs.getPropertyValue('--main-accent'); };
    let mt;
    if (ls.getItem('--main-text')) { mt = ls.getItem('--main-text'); } else { mt = rs.getPropertyValue('--main-text'); };
    let mb;
    if (ls.getItem('--main-bg')) { mb = ls.getItem('--main-bg'); } else { mb = rs.getPropertyValue('--main-bg'); };
    let fa;
    if (ls.getItem('--fav-accent')) { fa = ls.getItem('--fav-accent'); } else { fa = rs.getPropertyValue('--fav-accent'); };
    let st;
    if (ls.getItem('--sec-text')) { st = ls.getItem('--sec-text'); } else { st = rs.getPropertyValue('--sec-text'); };

    let presetMa = [
        { "color": '#A2CE40' },
        { "color": '#ffc107' },
        { "color": '#202124' },
        { "color": '#BEC1C5' },
        { "color": '#8e9297' },
    ];

    settingsData[l] = true;
    settingsData["main_accent"] = ma;
    settingsData["fav_accent"] = fa;
    settingsData["main_bg"] = mb;
    settingsData["main_text"] = mt;
    settingsData["sec_text"] = st;
    settingsData["presetMa"] = presetMa;
    settingsData["keyPairs"] = keyPairs;

    return settingsData;
};

export { loaderModule, startColorSetter, onColorPick, setData }