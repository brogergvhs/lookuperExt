(()=>{"use strict";class e{callbacks=[];constructor(e){this.name=e}getCallbacks(){return this.callbacks}registerCallback(e){this.callbacks.push(e)}}class t{_events={};constructor(e=[]){this.registerEvent(...e)}registerEvent(...t){for(const s of t){const t=new e(s);this._events[s]=t}}emitEvent=(e,t)=>{this._events[e]&&this._events[e].getCallbacks().forEach((e=>e(t)))};addEventListener(e,t){if(!this._events[e])throw new Error(`Event ${e} is not registered.`);this._events[e].registerCallback(t)}}console.log("background.js: init()"),new class extends t{#e=[];#t;#s;#i;constructor(e,t,s=!0){super(),this.#t=e,this.#s=t,this.#i=s}listen(){chrome.runtime.onMessage.addListener(((e,t)=>{t.url&&(new RegExp(`${this.origin}$`).test(t.url)||this.#n(e))}))}setIsAllowed(e){this.isAllowed=e,this.dispatch()}#r(){for(const e of this.queue)chrome.runtime.sendMessage({recipient:this.recipient,content:e});this.queue=[]}send(e){this.#c(e),this.isAllowed&&this.#r()}#c(e){Array.isArray(e)||(e=[e]);for(const t of e)this.queue.push(t)}#n(e){const t=Object.keys(e.content)[0];this.emitEvent(t,e.content[t])}},(new t).registerEvent(["test"])})();