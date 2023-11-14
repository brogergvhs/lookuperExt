(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(8092)}])},9968:function(e,t,s){"use strict";s.r(t),s.d(t,{deleteFromStorage:function(){return deleteFromStorage},fetchCounter:function(){return fetchCounter},getFromHistory:function(){return getFromHistory},inStorage:function(){return inStorage},saveToStorage:function(){return saveToStorage},savedOrganizer:function(){return savedOrganizer}});var merger=(e,t,s)=>e.filter(e=>!t.find(t=>e[s]===t[s])).concat(t);async function inStorage(e,t){console.log("inStorage");{let s=await chrome.storage.local.get(t);if(0!==Object.keys(s).length)return Object.values(s)[0].some(t=>t.word==e)}}async function saveToStorage(e,t,s){console.log("saveToStorage");{let s=await chrome.storage.local.get(t);(s=0==Object.keys(s).length?[]:s[t]).push(e),chrome.storage.local.set({[t]:s})}}async function deleteFromStorage(e,t,s,a){console.log("deleteFromStorage");{s||(s=t);let i=Object.values(await chrome.storage.local.get(t))[0];if(a)for(var r=0;r<i.length;r++)i[r].timestamp==a&&(i.splice(r,1),r=i.length);else for(var r=0;r<i.length;r++)i[r].word==e&&(i.splice(r,1),r=i.length);"history"==s&&i.forEach(e=>{inStorage(e.word,"favourites")&&(e.status="active")}),0==i.length?chrome.storage.local.remove(t):chrome.storage.local.set({[t]:i})}}async function savedOrganizer(e){console.log("savedOrganizer");{let a=await chrome.storage.local.get("history"),r=await chrome.storage.local.get("favourites");var t=0!==Object.values(a).length?a.history:[],s=0!==Object.values(r).length?r.favourites:[];return console.log(t,s),t==[]&&s==[]&&dataInterpreter(e),merger(t,s,"word").filter((e,t,s)=>s.findIndex(t=>t.word===e.word)===t)}}async function fetchCounter(){console.log("fetch counter");{let e=await chrome.storage.local.get("fetchAmount");if(void 0==e){let e={time:Date.now(),amount:2};chrome.storage.local.set(e)}else Date.now()-e.time>864e5?(e.amount=0,e.time=Date.now(),chome.storage.local.set(e)):(e.amount+=2,chrome.storage.local.set(e))}}async function getFromHistory(e){console.log("getFromHistory");{let t=await chrome.storage.local.get("history");return(console.log("HISTORY ITEMS: ",t),0==Object.keys(t).length)?[]:Object.values(t)[0].find(t=>t.word==e)}}},8092:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return IndexPage}});var a=s(5893);function Layout(e){let{children:t}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"flex flex-col min-h-[600px] min-w-[430px] p-4",children:t})})}var r=s(9968),i=s(7294);function CustomLoader(e){let{type:t}=e;switch(t){case"packman":return(0,a.jsx)("div",{id:"pac-loader",className:"pac-man"});case"cube":return(0,a.jsx)("div",{id:"cube-loader",children:(0,a.jsx)("div",{className:"scene",children:(0,a.jsx)("div",{className:"cube-wrapper",children:(0,a.jsx)("div",{className:"cube",children:(0,a.jsxs)("div",{className:"cube-faces",children:[(0,a.jsx)("div",{className:"cube-face bottom"}),(0,a.jsx)("div",{className:"cube-face top"}),(0,a.jsx)("div",{className:"cube-face left"}),(0,a.jsx)("div",{className:"cube-face right"}),(0,a.jsx)("div",{className:"cube-face back"}),(0,a.jsx)("div",{className:"cube-face front"})]})})})})});case"lines":return(0,a.jsx)("div",{id:"lines-loader",children:(0,a.jsxs)("div",{className:"content",children:[(0,a.jsxs)("div",{className:"bars",children:[(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"})]}),(0,a.jsxs)("div",{className:"bars",children:[(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"}),(0,a.jsx)("div",{className:"bar"})]})]})});case"dots":return(0,a.jsx)("div",{id:"dots-loader",className:"justify-content-center mt-3",children:(0,a.jsxs)("div",{className:"loading",children:[(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{}),(0,a.jsx)("div",{})]})});case"spinner":return(0,a.jsx)("div",{id:"dot-spin-loader",children:(0,a.jsx)("div",{className:"circle me-auto ms-auto",children:(0,a.jsx)("div",{className:"inner"})})})}}function WordNotFound(e){let{message:t}=e;return(0,a.jsx)("div",{className:"d-flex flex-column justify-congtent-center align-items-center",children:(0,a.jsxs)("div",{className:"fs-3 mb-2 mt-3 text-center",children:[(0,a.jsx)("span",{className:"acc-color",children:"Oops,"})," it looks like ",t]})})}let{inStorage:n,deleteFromStorage:o,saveToStorage:c,getFromHistory:l}=s(9968);async function saveToFavourites(e,t){if(e.stopPropagation(),await n(t,"favourites"))o(t,"favourites","favs"),document.querySelectorAll("[data-id=favBtn-".concat(t,"]")).forEach(e=>e.classList.remove("active"));else{let e=await n(t,"history");if(e){let e=await l(t);e.status="active",console.log("wordToSave: ",e),c(e,"favourites",""),document.querySelectorAll("[data-id=favBtn-".concat(t,"]")).forEach(e=>e.classList.add("active"))}}}async function deleteFromHistory(e,t){e.stopPropagation(),await o("","history","",t),document.getElementById(t).remove()}var fetchDataFunc=async function(){let e=await chrome.storage.local.get("keyPairs");console.log("KEYPAIRS: ",e);let t=e.keyPairs[0].apiKey,s=e.keyPairs[0].hostKey;return console.log("api:",t,"host:",s),{urlWordApi:"https://wordsapiv1.p.rapidapi.com/words/",optionsWordApi:{method:"GET",headers:{"X-RapidAPI-Key":t,"X-RapidAPI-Host":s}}}};async function searchWord(e,t,s){console.log("word to search:",e),/^[a-z]+$/i.test(e)?(t("loading"),getData(e,t,s)):console.log("Regex failed or no word.")}async function getData(e,t,s){console.log("getData");let a=await (0,r.savedOrganizer)(e);if(a.find(t=>t.word==e)){let i=a.find(t=>t.word==e);await (0,r.inStorage)(e,"favourites")&&(i.favourite=!0),t("wordOutput"),s(i),(0,r.saveToStorage)(i,"history")}else dataInterpreter(e,t,s)}async function dataInterpreter(e,t,s){console.log("dataInterpreter");let a=await fetchEnglishWord(e).then(),i={};if(!1==a[0].success)t("error");else{var n;let e={};e.word=a[0].word,e.timestamp=Date.now(),await (0,r.inStorage)(a[0].word,"favourites")&&(e.isFavourite=!0),a[0].results?(n=a[0].results,console.log("dataSorter"),n.forEach(function(e){i.hasOwnProperty(e.partOfSpeech)?i[e.partOfSpeech].push(e):(i[e.partOfSpeech]={},i[e.partOfSpeech]=[e])}),e.mainDef=a[0].results[0].definition):e.descr_message=" no further description for this :(",a[0].pronunciation&&(a[0].pronunciation.all?e.pronounciation=a[0].pronunciation.all:e.pronounciation=a[0].pronunciation),a[1].frequency&&a[1].frequency.perMillion&&(e.frequency=a[1].frequency.perMillion),e.definitions=i,await (0,r.saveToStorage)(e,"history"),t("wordOutput"),console.log("final data:",e),s(e)}}async function fetchEnglishWord(e){console.log("fetchEnglishWord"),(0,r.fetchCounter)();let t=await fetchDataFunc(),s=await fetch(t.urlWordApi+e,t.optionsWordApi),a=await fetch(t.urlWordApi+e+"/frequency",t.optionsWordApi),i=await s.json(),n=await a.json();return[i,n]}var d=s(998),u=s(3854);function WordLine(e){let{type:t,clickAction:s,word:r,pronounciation:i,mainDef:n,timestamp:o,status:c}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{id:o,onClick:s,className:"flex justify-between w-full b-b-acc acc p-2 historyItem mb-2 ".concat("favourites"===t?"fav":""),children:[(0,a.jsxs)("div",{className:"pe-2",children:[(0,a.jsxs)("div",{className:"items-center flex",children:[(0,a.jsx)("span",{className:"".concat("history"===t?"acc-color":"fav-color"," me-3 $"),children:r}),i?(0,a.jsx)("div",{className:"text-xs leading-6 sec-color",children:i}):(0,a.jsx)("div",{className:"text-xs leading-6 sec-color",children:"unknown :("})]}),n?(0,a.jsx)("div",{className:"sec-color",children:n}):(0,a.jsx)("div",{className:"sec-color text-xs leading-6 flex align-items-center",children:"unknown :("})]}),(0,a.jsxs)("div",{className:"flex mt-2 gap-3 ml-auto",children:[(0,a.jsx)("button",{"data-id":"favBtn-".concat(r),onClick:e=>saveToFavourites(e,r),className:"flex items-center justify-center w-8 h-8 border border-solid rounded-md btn-outline-".concat("history"==t?"info":"warning"," ").concat("active"==c?"active":""),children:(0,a.jsx)(u.KHK,{})}),"history"===t&&(0,a.jsx)("button",{onClick:e=>deleteFromHistory(e,o),className:"flex items-center justify-center w-8 h-8 border border-solid rounded-md",children:(0,a.jsx)(u._YF,{})})]})]})})}function HistoryFavourites(e){let{type:t,data:s}=e,{setWordData:r,setActivePage:n}=(0,i.useContext)(d.c);return(0,a.jsx)(a.Fragment,{children:s?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"max-h-[calc(100vh-140px)] overflow-auto",children:s.toReversed().map((e,s)=>(0,a.jsx)(WordLine,{clickAction:()=>searchWord(e.word,n,r),type:t,word:e.word,pronounciation:e.pronounciation,mainDef:e.mainDef,timestamp:e.timestamp,status:e.status},"".concat(s)))}),"history"===t&&(0,a.jsx)("button",{onClick:()=>(chrome.storage.local.remove("history"),[]),className:"flex items-center gap-2 w-fit px-4 py-1 rounded-md mt-3 mx-auto border border-solid btn-outline-secondary",children:"Clear history"})]}):(0,a.jsxs)("div",{className:"w-full text-center text-xl",children:["It's ",(0,a.jsx)("span",{className:"history"===t?"acc-color":"fav-color",children:"sooooo "})," empty in here..."]})})}function Settings(){return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{children:"Settings"})})}function NumberCircle(e){let{number:t}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"flex m-2 mr-4",children:(0,a.jsx)("div",{className:"flex justify-center items-center w-[1.875rem] h-[1.875rem] rounded-full border border-solid border-accent",children:t})})})}function _class_extract_field_descriptor(e,t,s){if(!t.has(e))throw TypeError("attempted to "+s+" private field on non-instance");return t.get(e)}function _class_private_field_get(e,t){var s=_class_extract_field_descriptor(e,t,"get");return s.get?s.get.call(e):s.value}function _check_private_redeclaration(e,t){if(t.has(e))throw TypeError("Cannot initialize the same private elements twice on an object")}function _class_private_field_init(e,t,s){_check_private_redeclaration(e,t),t.set(e,s)}function _class_private_field_set(e,t,s){var a=_class_extract_field_descriptor(e,t,"set");return!function(e,t,s){if(t.set)t.set.call(e,s);else{if(!t.writable)throw TypeError("attempted to set read only private field");t.value=s}}(e,a,s),s}function _class_private_method_get(e,t,s){if(!t.has(e))throw TypeError("attempted to get private field on non-instance");return s}function _class_private_method_init(e,t){_check_private_redeclaration(e,t),t.add(e)}let Event=class Event{getCallbacks(){return this.callbacks}registerCallback(e){this.callbacks.push(e)}constructor(e){this.callbacks=[],this.name=e}};let EventEmitter=class EventEmitter{registerEvent(e){for(let t of(Array.isArray(e)||(e=[e]),e)){let e=new Event(t);this._events[t]=e}}addEventListener(e,t){if(!this._events[e])throw Error("Event ".concat(e," is not registered."));this._events[e].registerCallback(t)}constructor(e=[]){if(this._events={},this.emitEvent=(e,t)=>{this._events[e]&&this._events[e].getCallbacks().forEach(e=>e(t))},0==e.length)return;this.registerEvent(e)}};var m=new WeakMap,h=new WeakMap,f=new WeakMap,v=new WeakMap,x=new WeakSet,p=new WeakSet,g=new WeakSet;let Messenger=class Messenger extends EventEmitter{listen(){chrome.runtime.onMessage.addListener((e,t)=>{e.recipient===_class_private_field_get(this,h)&&_class_private_method_get(this,g,receive).call(this,e)})}setIsAllowed(e){_class_private_field_set(this,v,e),_class_private_method_get(this,x,dispatch).call(this)}send(e){_class_private_method_get(this,p,addToQueue).call(this,e),_class_private_field_get(this,v)&&_class_private_method_get(this,x,dispatch).call(this)}constructor(e,t,s=!0){super(),_class_private_method_init(this,x),_class_private_method_init(this,p),_class_private_method_init(this,g),_class_private_field_init(this,m,{writable:!0,value:void 0}),_class_private_field_init(this,h,{writable:!0,value:void 0}),_class_private_field_init(this,f,{writable:!0,value:void 0}),_class_private_field_init(this,v,{writable:!0,value:void 0}),_class_private_field_set(this,m,[]),_class_private_field_set(this,h,e),_class_private_field_set(this,f,t),_class_private_field_set(this,v,s)}};function dispatch(){for(let e of _class_private_field_get(this,m)){let t;e.recipient?(t=e.recipient,delete e.recipient):t=_class_private_field_get(this,f),chrome.runtime.sendMessage({origin:_class_private_field_get(this,h),recipient:t,content:e})}this.queue=[]}function addToQueue(e){for(let t of(Array.isArray(e)||(e=[e]),e))_class_private_field_get(this,m).push(t)}function receive(e){let t=Object.keys(e.content)[0];this.emitEvent(t,{origin:e.origin,data:e.content[t]})}function Welcome(){let{setActivePage:e}=(0,i.useContext)(d.c),[t,s]=(0,i.useState)(""),[r,n]=(0,i.useState)("wordsapiv1.p.rapidapi.com");return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"text-2xl mb-3 text-center",children:["Oops, it looks like you dont't have an ",(0,a.jsx)("span",{className:"acc-color",children:"API key"})," or ",(0,a.jsx)("span",{className:"acc-color",children:"Host "}),":("]}),(0,a.jsxs)("div",{className:"mb-2 text-center",children:["Let's ",(0,a.jsx)("span",{className:"acc-color",children:"fix"})," it!"]}),(0,a.jsxs)("div",{className:"flex mb-3",children:[(0,a.jsx)(NumberCircle,{number:1}),(0,a.jsx)("div",{className:"flex items-center ps-2 b-l-acc",children:(0,a.jsxs)("div",{children:["If you don't have one yet, go ",(0,a.jsx)("a",{href:"https://rapidapi.com/dpventures/api/wordsapi/pricing",children:"here"})," and press ",(0,a.jsx)("span",{className:"acc-color",children:"Subscribe"})," on any plan you like."]})})]}),(0,a.jsxs)("div",{className:"flex mb-3",children:[(0,a.jsx)(NumberCircle,{number:2}),(0,a.jsx)("div",{className:"flex items-center ps-2 b-l-acc",children:(0,a.jsxs)("div",{children:["If you already have one or just got a brand new key from the step above, ",(0,a.jsx)("span",{className:"acc-color",children:"fill"})," these in:"]})})]}),(0,a.jsxs)("div",{className:"flex mb-3",children:[(0,a.jsx)(NumberCircle,{number:3}),(0,a.jsxs)("div",{className:"ps-2 b-l-acc w-full ".concat(t?"":"ps-2 b-l-acc w-full error-brdr"),children:[(0,a.jsxs)("div",{className:"mb-1",children:["API key ",(0,a.jsx)("span",{className:"sec-color text-xs",children:"(X-RapidAPI-Key)"}),":"]}),(0,a.jsx)("input",{onChange:e=>s(e.target.value),type:"text",placeholder:"Your API key",value:t,className:"form-control"})]})]}),(0,a.jsxs)("div",{className:"flex mb-5",children:[(0,a.jsx)(NumberCircle,{number:4}),(0,a.jsxs)("div",{className:"ps-2 b-l-acc w-full ".concat(r?"":"ps-2 b-l-acc w-full error-brdr"),children:[(0,a.jsxs)("div",{className:"mb-1",children:["Host ",(0,a.jsx)("span",{className:"sec-color text-xs",children:"(X-RapidAPI-Host)"}),":"]}),(0,a.jsx)("input",{onChange:e=>n(e.target.value),type:"text",placeholder:"Your host",value:r,className:"form-control"})]})]}),(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)("button",{onClick:function(){if(t&&r){let s={apiKey:t,hostKey:r,id:Date.now()},a=[];a.push(s);let i=new Messenger("welcome","background");i.send({"store-data":{keyPairs:a}},{"store-data":{apiKey:t}},{"store-data":{hostKey:r}}),e("wordOutput")}},className:"".concat(r&&t?"":"opacity-[70%]"),children:"Start lookuping"})})]})})}function WordCrumb(e){let{word:t}=e,{setWordData:s,setActivePage:r}=(0,i.useContext)(d.c);return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{onClick:()=>searchWord(t,r,s),className:"w-fit mt-0 mr-1.5 mb-1.5 ml-0 py-[0.0625] px-2 border border-solid border-mainText rounded-2xl text-sm opacity-[0.85] cursor-pointer wordCrumb",children:(0,a.jsx)("span",{children:t})})})}function WordMainInfo(e){let{word:t,favourite:s,frequency:r,pronounciation:i}=e;return(0,a.jsx)(a.Fragment,{children:t?(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsxs)("div",{className:"mb-2",children:[(0,a.jsxs)("div",{className:"flex flex-col",children:[(0,a.jsx)("div",{className:"mb-2 text-xl capitalize",children:t}),(0,a.jsx)("span",{className:"text-xs acc-color",children:"Frequency per million: "}),r?(0,a.jsx)("div",{className:"sec-color",children:r}):(0,a.jsx)("div",{className:"sec-color",children:"unknown :("})]}),(0,a.jsxs)("div",{className:"flex flex-col mt-2",children:[(0,a.jsx)("span",{className:"text-xs acc-color",children:"Pronunciation: "}),i?(0,a.jsx)("div",{className:"sec-color",children:i}):(0,a.jsx)("div",{className:"sec-color",children:"unknown :("})]})]}),(0,a.jsx)("button",{"data-id":"favBtn-".concat(t),onClick:e=>saveToFavourites(e,t),className:"".concat(s?"active":""," btn-outline-info  flex items-center justify-center w-8 h-8 m-4 border border-solid rounded-md"),children:(0,a.jsx)(u.KHK,{})})]}):(0,a.jsxs)("div",{className:"text-xl text-center",children:["Try ",(0,a.jsx)("span",{className:"acc-color",children:"looking up"})," something using the ",(0,a.jsx)("span",{className:"acc-color",children:"input"})," above!"]})})}function WordOutput(){let e,{wordData:t}=(0,i.useContext)(d.c);return t.definitions&&console.log("word:",e=Object.values(t.definitions)),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(WordMainInfo,{word:t.word,favourite:t.favourite,frequency:t.frequency,pronounciation:t.pronounciation}),t.descr_message&&(0,a.jsxs)("div",{className:"mt-2",children:[(0,a.jsx)("span",{className:"acc-color",children:"Sorry,"}),t.descr_message]}),e&&e.map((e,t)=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"capitalize",children:e[0].partOfSpeech},"defTypeName-".concat(t)),(0,a.jsx)("div",{className:"flex flex-col h-full",children:e&&e.map((e,t)=>(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)(NumberCircle,{number:t+1}),(0,a.jsxs)("div",{className:"d-flex flex-column ps-2 mb-1 mt-1 b-l-acc",children:[(0,a.jsx)("div",{children:e.definition}),e.examples&&e.examples.map((e,t)=>(0,a.jsxs)("div",{children:[" - ",e]},"example-".concat(t))),e.synonyms&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"fs-11 sec-color",children:"Synonyms: "}),(0,a.jsx)("div",{className:"flex flex-wrap w-full mt-1",children:e.synonyms&&e.synonyms.map(e=>(0,a.jsx)(WordCrumb,{word:e},e))})]}),e.hasTypes&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"fs-11 sec-color",children:"Hyponyms: "}),(0,a.jsx)("div",{className:"flex flex-wrap w-full mt-1",children:e.hasTypes&&e.hasTypes.map(e=>(0,a.jsx)(WordCrumb,{word:e},e))})]}),e.typeOf&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"fs-11 sec-color",children:"Hypernyms: "}),(0,a.jsx)("div",{className:"flex flex-wrap w-full mt-1",children:e.typeOf&&e.typeOf.map(e=>(0,a.jsx)(WordCrumb,{word:e},e))})]})]})]},"def-".concat(t))}))},"defType-".concat(t))]}))]})}function ActivePage(e){let{page:t}=e,{activePage:s}=(0,i.useContext)(d.c),n=new Messenger("active-page","background",!0);n.registerEvent(["handshake","get-stored-data"]);let[o,c]=(0,i.useState)(null),[l,u]=(0,i.useState)(null);switch((0,i.useEffect)(()=>{console.log("PAGE:",s),("history"===s||"favourites"===s)&&(n.listen(),n.addEventListener("get-stored-data",e=>{e.data&&(c(e.data.history),u(e.data.favourites))}),"history"==s&&n.send({"request-stored-data":"history"}),"favourites"==s&&n.send({"request-stored-data":"favourites"}))},[s]),s){case"welcome":return(0,a.jsx)(Welcome,{});case"settings":return(0,a.jsx)(Settings,{});case"history":return o&&o.forEach(async e=>{e.status&&(e.status=""),await (0,r.inStorage)(e.word,"favourites")&&(e.status="active")}),(0,a.jsx)(HistoryFavourites,{data:o,type:"history"});case"favourites":return(0,a.jsx)(HistoryFavourites,{data:l,type:"favourites"});case"wordOutput":return(0,a.jsx)(WordOutput,{});case"error":return(0,a.jsx)(WordNotFound,{});case"loading":return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(CustomLoader,{type:"cube"})})}}function CustomInput(){let{setActivePage:e,setWordData:t}=(0,i.useContext)(d.c),[s,r]=(0,i.useState)("");return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{className:"form-control",value:s,onChange:e=>r(e.target.value),placeholder:"Check some words"}),(0,a.jsx)("button",{onClick:function(){searchWord(s,e,t),r("")},className:"flex items-center justify-center w-8 h-8 border border-solid rounded-md",children:(0,a.jsx)(u.G4C,{})})]})}function Nav(){let{setActivePage:e}=(0,i.useContext)(d.c);return(0,a.jsx)("div",{className:"mt-3 mb-4",children:(0,a.jsx)("div",{className:"flex items-center justify-center gap-3",children:[{trigger:"favourites",color:"warning"},{trigger:"history",color:"info"},{trigger:"input"}].map(t=>({..."input"==t.trigger?(0,a.jsx)(CustomInput,{},"customInput"):(0,a.jsx)("button",{onClick:()=>e(t.trigger),className:"flex items-center justify-center w-8 h-8 border border-solid rounded-md btn-outline-".concat(t.color),children:"favourites"==t.trigger?(0,a.jsx)(u.xiv,{}):(0,a.jsx)(u.QCV,{})},t.trigger)}))})})}function IndexPage(){let{activePage:e,setActivePage:t}=(0,i.useContext)(d.c);{let e=new Messenger("index","background");e.listen(),e.registerEvent(["get-stored-data"]),e.addEventListener("get-stored-data",e=>{if(console.log("index received stored data"),e.data.keyPairs){console.log("APIKEY: ",e.data.keyPairs[0]);let s=e.data.keyPairs[0].apiKey,a=e.data.keyPairs[0].hostKey;console.log("api:",s,"host:",a),(0==Object.keys(s).length||0==Object.keys(a).length)&&t("welcome")}else console.log("no keypairs"),t("welcome")})}return(0,i.useEffect)(()=>{console.log("sending handshake from index..."),new Messenger("index","background").send([{handshake:!0},{"request-stored-data":"keyPairs"}])},[]),(0,a.jsxs)(Layout,{children:["welcome"!=e&&(0,a.jsx)(Nav,{}),(0,a.jsx)(ActivePage,{})]})}},8357:function(e,t,s){"use strict";s.d(t,{w_:function(){return GenIcon}});var a=s(7294),r={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=a.createContext&&a.createContext(r),__assign=function(){return(__assign=Object.assign||function(e){for(var t,s=1,a=arguments.length;s<a;s++)for(var r in t=arguments[s])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},__rest=function(e,t){var s={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&0>t.indexOf(a)&&(s[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)0>t.indexOf(a[r])&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(s[a[r]]=e[a[r]]);return s};function GenIcon(e){return function(t){return a.createElement(IconBase,__assign({attr:__assign({},e.attr)},t),function Tree2Element(e){return e&&e.map(function(e,t){return a.createElement(e.tag,__assign({key:t},e.attr),Tree2Element(e.child))})}(e.child))}}function IconBase(e){var elem=function(t){var s,r=e.attr,i=e.size,n=e.title,o=__rest(e,["attr","size","title"]),c=i||t.size||"1em";return t.className&&(s=t.className),e.className&&(s=(s?s+" ":"")+e.className),a.createElement("svg",__assign({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,r,o,{className:s,style:__assign(__assign({color:e.color||t.color},t.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),n&&a.createElement("title",null,n),e.children)};return void 0!==i?a.createElement(i.Consumer,null,function(e){return elem(e)}):elem(r)}}},function(e){e.O(0,[556,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);