System.register([],function(b){"use strict";return{execute:function(){b("createJSONStorage",_);const j=b("redux",(d,l)=>(n,a,r)=>(r.dispatch=e=>(n(v=>d(v,e),!1,e),e),r.dispatchFromDevtools=!0,{dispatch:(...e)=>r.dispatch(...e),...l})),z=new Map,w=d=>{const l=z.get(d);return l?Object.fromEntries(Object.entries(l.stores).map(([n,a])=>[n,a.getState()])):{}},N=(d,l,n)=>{if(d===void 0)return{type:"untracked",connection:l.connect(n)};const a=z.get(n.name);if(a)return{type:"tracked",store:d,...a};const r={connection:l.connect(n),stores:{}};return z.set(n.name,r),{type:"tracked",store:d,...r}},P=b("devtools",(d,l={})=>(n,a,r)=>{const{enabled:e,anonymousActionType:v,store:u,...f}=l;let m;try{m=(e!=null?e:!1)&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!m)return d(n,a,r);const{connection:c,...y}=N(u,m,f);let h=!0;r.setState=(s,i,o)=>{const t=n(s,i);if(!h)return t;const p=o===void 0?{type:v||"anonymous"}:typeof o=="string"?{type:o}:o;return u===void 0?(c==null||c.send(p,a()),t):(c==null||c.send({...p,type:`${u}/${p.type}`},{...w(f.name),[u]:r.getState()}),t)};const g=(...s)=>{const i=h;h=!1,n(...s),h=i},S=d(r.setState,a,r);if(y.type==="untracked"?c==null||c.init(S):(y.stores[y.store]=r,c==null||c.init(Object.fromEntries(Object.entries(y.stores).map(([s,i])=>[s,s===y.store?S:i.getState()])))),r.dispatchFromDevtools&&typeof r.dispatch=="function"){const s=r.dispatch;r.dispatch=(...i)=>{s(...i)}}return c.subscribe(s=>{var i;switch(s.type){case"ACTION":if(typeof s.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return I(s.payload,o=>{if(o.type==="__setState"){if(u===void 0){g(o.state);return}Object.keys(o.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const t=o.state[u];if(t==null)return;JSON.stringify(r.getState())!==JSON.stringify(t)&&g(t);return}r.dispatchFromDevtools&&typeof r.dispatch=="function"&&r.dispatch(o)});case"DISPATCH":switch(s.payload.type){case"RESET":return g(S),u===void 0?c==null?void 0:c.init(r.getState()):c==null?void 0:c.init(w(f.name));case"COMMIT":if(u===void 0){c==null||c.init(r.getState());return}return c==null?void 0:c.init(w(f.name));case"ROLLBACK":return I(s.state,o=>{if(u===void 0){g(o),c==null||c.init(r.getState());return}g(o[u]),c==null||c.init(w(f.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return I(s.state,o=>{if(u===void 0){g(o);return}JSON.stringify(r.getState())!==JSON.stringify(o[u])&&g(o[u])});case"IMPORT_STATE":{const{nextLiftedState:o}=s.payload,t=(i=o.computedStates.slice(-1)[0])==null?void 0:i.state;if(!t)return;g(u===void 0?t:t[u]),c==null||c.send(null,o);return}case"PAUSE_RECORDING":return h=!h}return}}),S}),I=(d,l)=>{let n;try{n=JSON.parse(d)}catch(a){console.error("[zustand devtools middleware] Could not parse the received json",a)}n!==void 0&&l(n)},H=b("subscribeWithSelector",d=>(l,n,a)=>{const r=a.subscribe;return a.subscribe=(e,v,u)=>{let f=e;if(v){const m=(u==null?void 0:u.equalityFn)||Object.is;let c=e(a.getState());f=y=>{const h=e(y);if(!m(c,h)){const g=c;v(c=h,g)}},u!=null&&u.fireImmediately&&v(c,c)}return r(f)},d(l,n,a)}),R=b("combine",(d,l)=>(...n)=>Object.assign({},d,l(...n)));function _(d,l={serialize:n=>JSON.stringify(n),deserialize:n=>n===null?null:JSON.parse(n)}){let n;try{n=d()}catch{return}return{getItem:a=>{var r,e;const v=(r=n.getItem(a))!=null?r:null;return v instanceof Promise?v.then(u=>{var f;return(f=l.deserialize)==null?void 0:f.call(l,u)}):((e=l.deserialize)==null?void 0:e.call(l,v))||JSON.parse(v)},setItem:(a,r)=>{var e;return n.setItem(a,((e=l==null?void 0:l.serialize)==null?void 0:e.call(l,r))||JSON.stringify(r))},removeItem:a=>n.removeItem(a)}}const O=d=>l=>{try{const n=d(l);return n instanceof Promise?n:{then(a){return O(a)(n)},catch(a){return this}}}catch(n){return{then(a){return this},catch(a){return O(a)(n)}}}},E=(d,l)=>(n,a,r)=>{let e={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:i=>i,version:0,merge:(i,o)=>({...o,...i}),...l},v=!1;const u=new Set,f=new Set;let m;try{m=e.getStorage()}catch{}if(!m)return d((...i)=>{console.warn(`[zustand persist middleware] Unable to update item '${e.name}', the given storage is currently unavailable.`),n(...i)},a,r);const c=O(e.serialize),y=()=>{const i=e.partialize({...a()});let o;const t=c({state:i,version:e.version}).then(p=>m.setItem(e.name,p)).catch(p=>{o=p});if(o)throw o;return t},h=r.setState;r.setState=(i,o)=>{h(i,o),y()};const g=d((...i)=>{n(...i),y()},a,r);let S;const s=()=>{var i;if(!m)return;v=!1,u.forEach(t=>t(a()));const o=((i=e.onRehydrateStorage)==null?void 0:i.call(e,a()))||void 0;return O(m.getItem.bind(m))(e.name).then(t=>{if(t)return e.deserialize(t)}).then(t=>{if(t)if(typeof t.version=="number"&&t.version!==e.version){if(e.migrate)return e.migrate(t.state,t.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return t.state}).then(t=>{var p;return S=e.merge(t,(p=a())!=null?p:g),n(S,!0),y()}).then(()=>{o==null||o(S,void 0),v=!0,f.forEach(t=>t(S))}).catch(t=>{o==null||o(void 0,t)})};return r.persist={setOptions:i=>{e={...e,...i},i.getStorage&&(m=i.getStorage())},clearStorage:()=>{m==null||m.removeItem(e.name)},getOptions:()=>e,rehydrate:()=>s(),hasHydrated:()=>v,onHydrate:i=>(u.add(i),()=>{u.delete(i)}),onFinishHydration:i=>(f.add(i),()=>{f.delete(i)})},s(),S||g},T=(d,l)=>(n,a,r)=>{let e={storage:_(()=>localStorage),partialize:s=>s,version:0,merge:(s,i)=>({...i,...s}),...l},v=!1;const u=new Set,f=new Set;let m=e.storage;if(!m)return d((...s)=>{console.warn(`[zustand persist middleware] Unable to update item '${e.name}', the given storage is currently unavailable.`),n(...s)},a,r);const c=()=>{const s=e.partialize({...a()});return m.setItem(e.name,{state:s,version:e.version})},y=r.setState;r.setState=(s,i)=>{y(s,i),c()};const h=d((...s)=>{n(...s),c()},a,r);let g;const S=()=>{var s,i;if(!m)return;v=!1,u.forEach(t=>{var p;return t((p=a())!=null?p:h)});const o=((i=e.onRehydrateStorage)==null?void 0:i.call(e,(s=a())!=null?s:h))||void 0;return O(m.getItem.bind(m))(e.name).then(t=>{if(t)if(typeof t.version=="number"&&t.version!==e.version){if(e.migrate)return e.migrate(t.state,t.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return t.state}).then(t=>{var p;return g=e.merge(t,(p=a())!=null?p:h),n(g,!0),c()}).then(()=>{o==null||o(g,void 0),g=a(),v=!0,f.forEach(t=>t(g))}).catch(t=>{o==null||o(void 0,t)})};return r.persist={setOptions:s=>{e={...e,...s},s.storage&&(m=s.storage)},clearStorage:()=>{m==null||m.removeItem(e.name)},getOptions:()=>e,rehydrate:()=>S(),hasHydrated:()=>v,onHydrate:s=>(u.add(s),()=>{u.delete(s)}),onFinishHydration:s=>(f.add(s),()=>{f.delete(s)})},e.skipHydration||S(),g||h},C=b("persist",(d,l)=>"getStorage"in l||"serialize"in l||"deserialize"in l?E(d,l):T(d,l))}}});
