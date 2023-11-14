(()=>{"use strict";class e{callbacks=[];constructor(e){this.name=e}getCallbacks(){return this.callbacks}registerCallback(e){this.callbacks.push(e)}}class t{_events={};constructor(e=[]){0!=e.length&&this.registerEvent(e)}registerEvent(t){Array.isArray(t)||(t=[t]);for(const s of t){const t=new e(s);this._events[s]=t}}emitEvent=(e,t)=>{this._events[e]&&this._events[e].getCallbacks().forEach((e=>e(t)))};addEventListener(e,t){if(!this._events[e])throw new Error(`Event ${e} is not registered.`);this._events[e].registerCallback(t)}}class s extends t{#e=[];#t;#s;#i;constructor(e,t,s=!0){super(),this.#t=e,this.#s=t,this.#i=s}listen(){chrome.runtime.onMessage.addListener(((e,t)=>{e.recipient===this.#t&&this.#r(e)}))}setIsAllowed(e){this.#i=e,this.#n()}#n(){for(const e of this.#e){let t;e.recipient?(t=e.recipient,delete e.recipient):t=this.#s,chrome.runtime.sendMessage({origin:this.#t,recipient:t,content:e})}this.queue=[]}send(e){this.#a(e),this.#i&&this.#n()}#a(e){Array.isArray(e)||(e=[e]);for(const t of e)this.#e.push(t)}#r(e){const t=Object.keys(e.content)[0];this.emitEvent(t,{origin:e.origin,data:e.content[t]})}}!function(){const e=new s("background","active-page",!1);e.listen(),e.registerEvent(["handshake","request-stored-data","store-data","remove-stored-data"]),e.addEventListener("handshake",(t=>{console.log("background received handshake"),e.setIsAllowed(!0),e.send({handshake:!0})})),e.addEventListener("request-stored-data",(async t=>{const s=await chrome.storage.local.get(t.data);e.send({recipient:t.origin,"get-stored-data":s})})),e.addEventListener("store-data",(e=>{chrome.storage.local.set(e.data)})),e.addEventListener("remove-stored-data",(e=>{chrome.storage.local.remove(e.data)}))}()})();