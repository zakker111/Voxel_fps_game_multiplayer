(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();function Hv(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var qu={exports:{}},ja={},Ku={exports:{}},vt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cm;function Vv(){if(cm)return vt;cm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),_=Symbol.iterator;function v(L){return L===null||typeof L!="object"?null:(L=_&&L[_]||L["@@iterator"],typeof L=="function"?L:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,b={};function y(L,ae,ye){this.props=L,this.context=ae,this.refs=b,this.updater=ye||S}y.prototype.isReactComponent={},y.prototype.setState=function(L,ae){if(typeof L!="object"&&typeof L!="function"&&L!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,L,ae,"setState")},y.prototype.forceUpdate=function(L){this.updater.enqueueForceUpdate(this,L,"forceUpdate")};function x(){}x.prototype=y.prototype;function I(L,ae,ye){this.props=L,this.context=ae,this.refs=b,this.updater=ye||S}var O=I.prototype=new x;O.constructor=I,E(O,y.prototype),O.isPureReactComponent=!0;var C=Array.isArray,R=Object.prototype.hasOwnProperty,P={current:null},F={key:!0,ref:!0,__self:!0,__source:!0};function w(L,ae,ye){var Ve,ze={},Ge=null,le=null;if(ae!=null)for(Ve in ae.ref!==void 0&&(le=ae.ref),ae.key!==void 0&&(Ge=""+ae.key),ae)R.call(ae,Ve)&&!F.hasOwnProperty(Ve)&&(ze[Ve]=ae[Ve]);var de=arguments.length-2;if(de===1)ze.children=ye;else if(1<de){for(var Ee=Array(de),Qe=0;Qe<de;Qe++)Ee[Qe]=arguments[Qe+2];ze.children=Ee}if(L&&L.defaultProps)for(Ve in de=L.defaultProps,de)ze[Ve]===void 0&&(ze[Ve]=de[Ve]);return{$$typeof:s,type:L,key:Ge,ref:le,props:ze,_owner:P.current}}function D(L,ae){return{$$typeof:s,type:L.type,key:ae,ref:L.ref,props:L.props,_owner:L._owner}}function B(L){return typeof L=="object"&&L!==null&&L.$$typeof===s}function G(L){var ae={"=":"=0",":":"=2"};return"$"+L.replace(/[=:]/g,function(ye){return ae[ye]})}var K=/\/+/g;function ee(L,ae){return typeof L=="object"&&L!==null&&L.key!=null?G(""+L.key):ae.toString(36)}function V(L,ae,ye,Ve,ze){var Ge=typeof L;(Ge==="undefined"||Ge==="boolean")&&(L=null);var le=!1;if(L===null)le=!0;else switch(Ge){case"string":case"number":le=!0;break;case"object":switch(L.$$typeof){case s:case e:le=!0}}if(le)return le=L,ze=ze(le),L=Ve===""?"."+ee(le,0):Ve,C(ze)?(ye="",L!=null&&(ye=L.replace(K,"$&/")+"/"),V(ze,ae,ye,"",function(Qe){return Qe})):ze!=null&&(B(ze)&&(ze=D(ze,ye+(!ze.key||le&&le.key===ze.key?"":(""+ze.key).replace(K,"$&/")+"/")+L)),ae.push(ze)),1;if(le=0,Ve=Ve===""?".":Ve+":",C(L))for(var de=0;de<L.length;de++){Ge=L[de];var Ee=Ve+ee(Ge,de);le+=V(Ge,ae,ye,Ee,ze)}else if(Ee=v(L),typeof Ee=="function")for(L=Ee.call(L),de=0;!(Ge=L.next()).done;)Ge=Ge.value,Ee=Ve+ee(Ge,de++),le+=V(Ge,ae,ye,Ee,ze);else if(Ge==="object")throw ae=String(L),Error("Objects are not valid as a React child (found: "+(ae==="[object Object]"?"object with keys {"+Object.keys(L).join(", ")+"}":ae)+"). If you meant to render a collection of children, use an array instead.");return le}function J(L,ae,ye){if(L==null)return L;var Ve=[],ze=0;return V(L,Ve,"","",function(Ge){return ae.call(ye,Ge,ze++)}),Ve}function he(L){if(L._status===-1){var ae=L._result;ae=ae(),ae.then(function(ye){(L._status===0||L._status===-1)&&(L._status=1,L._result=ye)},function(ye){(L._status===0||L._status===-1)&&(L._status=2,L._result=ye)}),L._status===-1&&(L._status=0,L._result=ae)}if(L._status===1)return L._result.default;throw L._result}var te={current:null},Y={transition:null},$={ReactCurrentDispatcher:te,ReactCurrentBatchConfig:Y,ReactCurrentOwner:P};function Z(){throw Error("act(...) is not supported in production builds of React.")}return vt.Children={map:J,forEach:function(L,ae,ye){J(L,function(){ae.apply(this,arguments)},ye)},count:function(L){var ae=0;return J(L,function(){ae++}),ae},toArray:function(L){return J(L,function(ae){return ae})||[]},only:function(L){if(!B(L))throw Error("React.Children.only expected to receive a single React element child.");return L}},vt.Component=y,vt.Fragment=t,vt.Profiler=a,vt.PureComponent=I,vt.StrictMode=r,vt.Suspense=f,vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$,vt.act=Z,vt.cloneElement=function(L,ae,ye){if(L==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+L+".");var Ve=E({},L.props),ze=L.key,Ge=L.ref,le=L._owner;if(ae!=null){if(ae.ref!==void 0&&(Ge=ae.ref,le=P.current),ae.key!==void 0&&(ze=""+ae.key),L.type&&L.type.defaultProps)var de=L.type.defaultProps;for(Ee in ae)R.call(ae,Ee)&&!F.hasOwnProperty(Ee)&&(Ve[Ee]=ae[Ee]===void 0&&de!==void 0?de[Ee]:ae[Ee])}var Ee=arguments.length-2;if(Ee===1)Ve.children=ye;else if(1<Ee){de=Array(Ee);for(var Qe=0;Qe<Ee;Qe++)de[Qe]=arguments[Qe+2];Ve.children=de}return{$$typeof:s,type:L.type,key:ze,ref:Ge,props:Ve,_owner:le}},vt.createContext=function(L){return L={$$typeof:c,_currentValue:L,_currentValue2:L,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},L.Provider={$$typeof:l,_context:L},L.Consumer=L},vt.createElement=w,vt.createFactory=function(L){var ae=w.bind(null,L);return ae.type=L,ae},vt.createRef=function(){return{current:null}},vt.forwardRef=function(L){return{$$typeof:d,render:L}},vt.isValidElement=B,vt.lazy=function(L){return{$$typeof:g,_payload:{_status:-1,_result:L},_init:he}},vt.memo=function(L,ae){return{$$typeof:p,type:L,compare:ae===void 0?null:ae}},vt.startTransition=function(L){var ae=Y.transition;Y.transition={};try{L()}finally{Y.transition=ae}},vt.unstable_act=Z,vt.useCallback=function(L,ae){return te.current.useCallback(L,ae)},vt.useContext=function(L){return te.current.useContext(L)},vt.useDebugValue=function(){},vt.useDeferredValue=function(L){return te.current.useDeferredValue(L)},vt.useEffect=function(L,ae){return te.current.useEffect(L,ae)},vt.useId=function(){return te.current.useId()},vt.useImperativeHandle=function(L,ae,ye){return te.current.useImperativeHandle(L,ae,ye)},vt.useInsertionEffect=function(L,ae){return te.current.useInsertionEffect(L,ae)},vt.useLayoutEffect=function(L,ae){return te.current.useLayoutEffect(L,ae)},vt.useMemo=function(L,ae){return te.current.useMemo(L,ae)},vt.useReducer=function(L,ae,ye){return te.current.useReducer(L,ae,ye)},vt.useRef=function(L){return te.current.useRef(L)},vt.useState=function(L){return te.current.useState(L)},vt.useSyncExternalStore=function(L,ae,ye){return te.current.useSyncExternalStore(L,ae,ye)},vt.useTransition=function(){return te.current.useTransition()},vt.version="18.3.1",vt}var um;function Eh(){return um||(um=1,Ku.exports=Vv()),Ku.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dm;function Gv(){if(dm)return ja;dm=1;var s=Eh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(d,f,p){var g,_={},v=null,S=null;p!==void 0&&(v=""+p),f.key!==void 0&&(v=""+f.key),f.ref!==void 0&&(S=f.ref);for(g in f)r.call(f,g)&&!l.hasOwnProperty(g)&&(_[g]=f[g]);if(d&&d.defaultProps)for(g in f=d.defaultProps,f)_[g]===void 0&&(_[g]=f[g]);return{$$typeof:e,type:d,key:v,ref:S,props:_,_owner:a.current}}return ja.Fragment=t,ja.jsx=c,ja.jsxs=c,ja}var hm;function Wv(){return hm||(hm=1,qu.exports=Gv()),qu.exports}var re=Wv(),wl={},$u={exports:{}},Gn={},Zu={exports:{}},ju={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fm;function Xv(){return fm||(fm=1,(function(s){function e(Y,$){var Z=Y.length;Y.push($);e:for(;0<Z;){var L=Z-1>>>1,ae=Y[L];if(0<a(ae,$))Y[L]=$,Y[Z]=ae,Z=L;else break e}}function t(Y){return Y.length===0?null:Y[0]}function r(Y){if(Y.length===0)return null;var $=Y[0],Z=Y.pop();if(Z!==$){Y[0]=Z;e:for(var L=0,ae=Y.length,ye=ae>>>1;L<ye;){var Ve=2*(L+1)-1,ze=Y[Ve],Ge=Ve+1,le=Y[Ge];if(0>a(ze,Z))Ge<ae&&0>a(le,ze)?(Y[L]=le,Y[Ge]=Z,L=Ge):(Y[L]=ze,Y[Ve]=Z,L=Ve);else if(Ge<ae&&0>a(le,Z))Y[L]=le,Y[Ge]=Z,L=Ge;else break e}}return $}function a(Y,$){var Z=Y.sortIndex-$.sortIndex;return Z!==0?Z:Y.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var c=Date,d=c.now();s.unstable_now=function(){return c.now()-d}}var f=[],p=[],g=1,_=null,v=3,S=!1,E=!1,b=!1,y=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function O(Y){for(var $=t(p);$!==null;){if($.callback===null)r(p);else if($.startTime<=Y)r(p),$.sortIndex=$.expirationTime,e(f,$);else break;$=t(p)}}function C(Y){if(b=!1,O(Y),!E)if(t(f)!==null)E=!0,he(R);else{var $=t(p);$!==null&&te(C,$.startTime-Y)}}function R(Y,$){E=!1,b&&(b=!1,x(w),w=-1),S=!0;var Z=v;try{for(O($),_=t(f);_!==null&&(!(_.expirationTime>$)||Y&&!G());){var L=_.callback;if(typeof L=="function"){_.callback=null,v=_.priorityLevel;var ae=L(_.expirationTime<=$);$=s.unstable_now(),typeof ae=="function"?_.callback=ae:_===t(f)&&r(f),O($)}else r(f);_=t(f)}if(_!==null)var ye=!0;else{var Ve=t(p);Ve!==null&&te(C,Ve.startTime-$),ye=!1}return ye}finally{_=null,v=Z,S=!1}}var P=!1,F=null,w=-1,D=5,B=-1;function G(){return!(s.unstable_now()-B<D)}function K(){if(F!==null){var Y=s.unstable_now();B=Y;var $=!0;try{$=F(!0,Y)}finally{$?ee():(P=!1,F=null)}}else P=!1}var ee;if(typeof I=="function")ee=function(){I(K)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,J=V.port2;V.port1.onmessage=K,ee=function(){J.postMessage(null)}}else ee=function(){y(K,0)};function he(Y){F=Y,P||(P=!0,ee())}function te(Y,$){w=y(function(){Y(s.unstable_now())},$)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(Y){Y.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,he(R))},s.unstable_forceFrameRate=function(Y){0>Y||125<Y?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<Y?Math.floor(1e3/Y):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_getFirstCallbackNode=function(){return t(f)},s.unstable_next=function(Y){switch(v){case 1:case 2:case 3:var $=3;break;default:$=v}var Z=v;v=$;try{return Y()}finally{v=Z}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(Y,$){switch(Y){case 1:case 2:case 3:case 4:case 5:break;default:Y=3}var Z=v;v=Y;try{return $()}finally{v=Z}},s.unstable_scheduleCallback=function(Y,$,Z){var L=s.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?L+Z:L):Z=L,Y){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=Z+ae,Y={id:g++,callback:$,priorityLevel:Y,startTime:Z,expirationTime:ae,sortIndex:-1},Z>L?(Y.sortIndex=Z,e(p,Y),t(f)===null&&Y===t(p)&&(b?(x(w),w=-1):b=!0,te(C,Z-L))):(Y.sortIndex=ae,e(f,Y),E||S||(E=!0,he(R))),Y},s.unstable_shouldYield=G,s.unstable_wrapCallback=function(Y){var $=v;return function(){var Z=v;v=$;try{return Y.apply(this,arguments)}finally{v=Z}}}})(ju)),ju}var pm;function Yv(){return pm||(pm=1,Zu.exports=Xv()),Zu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mm;function qv(){if(mm)return Gn;mm=1;var s=Eh(),e=Yv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(n,i){c(n,i),c(n+"Capture",i)}function c(n,i){for(a[n]=i,n=0;n<i.length;n++)r.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},_={};function v(n){return f.call(_,n)?!0:f.call(g,n)?!1:p.test(n)?_[n]=!0:(g[n]=!0,!1)}function S(n,i,o,u){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,o,u){if(i===null||typeof i>"u"||S(n,i,o,u))return!0;if(u)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function b(n,i,o,u,h,m,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=h,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=T}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new b(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];y[i]=new b(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new b(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new b(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new b(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new b(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new b(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new b(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new b(n,5,!1,n.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function I(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(x,I);y[i]=new b(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(x,I);y[i]=new b(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(x,I);y[i]=new b(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new b(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new b("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new b(n,1,!1,n.toLowerCase(),null,!0,!0)});function O(n,i,o,u){var h=y.hasOwnProperty(i)?y[i]:null;(h!==null?h.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,o,h,u)&&(o=null),u||h===null?v(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):h.mustUseProperty?n[h.propertyName]=o===null?h.type===3?!1:"":o:(i=h.attributeName,u=h.attributeNamespace,o===null?n.removeAttribute(i):(h=h.type,o=h===3||h===4&&o===!0?"":""+o,u?n.setAttributeNS(u,i,o):n.setAttribute(i,o))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,R=Symbol.for("react.element"),P=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),w=Symbol.for("react.strict_mode"),D=Symbol.for("react.profiler"),B=Symbol.for("react.provider"),G=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),ee=Symbol.for("react.suspense"),V=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),he=Symbol.for("react.lazy"),te=Symbol.for("react.offscreen"),Y=Symbol.iterator;function $(n){return n===null||typeof n!="object"?null:(n=Y&&n[Y]||n["@@iterator"],typeof n=="function"?n:null)}var Z=Object.assign,L;function ae(n){if(L===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);L=i&&i[1]||""}return`
`+L+n}var ye=!1;function Ve(n,i){if(!n||ye)return"";ye=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(ue){var u=ue}Reflect.construct(n,[],i)}else{try{i.call()}catch(ue){u=ue}n.call(i.prototype)}else{try{throw Error()}catch(ue){u=ue}n()}}catch(ue){if(ue&&u&&typeof ue.stack=="string"){for(var h=ue.stack.split(`
`),m=u.stack.split(`
`),T=h.length-1,U=m.length-1;1<=T&&0<=U&&h[T]!==m[U];)U--;for(;1<=T&&0<=U;T--,U--)if(h[T]!==m[U]){if(T!==1||U!==1)do if(T--,U--,0>U||h[T]!==m[U]){var k=`
`+h[T].replace(" at new "," at ");return n.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",n.displayName)),k}while(1<=T&&0<=U);break}}}finally{ye=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?ae(n):""}function ze(n){switch(n.tag){case 5:return ae(n.type);case 16:return ae("Lazy");case 13:return ae("Suspense");case 19:return ae("SuspenseList");case 0:case 2:case 15:return n=Ve(n.type,!1),n;case 11:return n=Ve(n.type.render,!1),n;case 1:return n=Ve(n.type,!0),n;default:return""}}function Ge(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case F:return"Fragment";case P:return"Portal";case D:return"Profiler";case w:return"StrictMode";case ee:return"Suspense";case V:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case G:return(n.displayName||"Context")+".Consumer";case B:return(n._context.displayName||"Context")+".Provider";case K:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case J:return i=n.displayName||null,i!==null?i:Ge(n.type)||"Memo";case he:i=n._payload,n=n._init;try{return Ge(n(i))}catch{}}return null}function le(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ge(i);case 8:return i===w?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function de(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ee(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Qe(n){var i=Ee(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var h=o.get,m=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return h.call(this)},set:function(T){u=""+T,m.call(this,T)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return u},setValue:function(T){u=""+T},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Fe(n){n._valueTracker||(n._valueTracker=Qe(n))}function dt(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),u="";return n&&(u=Ee(n)?n.checked?"true":"false":n.value),n=u,n!==o?(i.setValue(n),!0):!1}function Vt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function ht(n,i){var o=i.checked;return Z({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function _t(n,i){var o=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;o=de(i.value!=null?i.value:o),n._wrapperState={initialChecked:u,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Dt(n,i){i=i.checked,i!=null&&O(n,"checked",i,!1)}function ft(n,i){Dt(n,i);var o=de(i.value),u=i.type;if(o!=null)u==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?jt(n,i.type,o):i.hasOwnProperty("defaultValue")&&jt(n,i.type,de(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Ft(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function jt(n,i,o){(i!=="number"||Vt(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var nn=Array.isArray;function Lt(n,i,o,u){if(n=n.options,i){i={};for(var h=0;h<o.length;h++)i["$"+o[h]]=!0;for(o=0;o<n.length;o++)h=i.hasOwnProperty("$"+n[o].value),n[o].selected!==h&&(n[o].selected=h),h&&u&&(n[o].defaultSelected=!0)}else{for(o=""+de(o),i=null,h=0;h<n.length;h++){if(n[h].value===o){n[h].selected=!0,u&&(n[h].defaultSelected=!0);return}i!==null||n[h].disabled||(i=n[h])}i!==null&&(i.selected=!0)}}function Gt(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return Z({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function W(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(nn(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:de(o)}}function an(n,i){var o=de(i.value),u=de(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),u!=null&&(n.defaultValue=""+u)}function At(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function N(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function M(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?N(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var j,oe=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,u,h){MSApp.execUnsafeLocalFunction(function(){return n(i,o,u,h)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(j=j||document.createElement("div"),j.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=j.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function fe(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var Me={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ae=["Webkit","ms","Moz","O"];Object.keys(Me).forEach(function(n){Ae.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Me[i]=Me[n]})});function pe(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Me.hasOwnProperty(n)&&Me[n]?(""+i).trim():i+"px"}function ge(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var u=o.indexOf("--")===0,h=pe(o,i[o],u);o==="float"&&(o="cssFloat"),u?n.setProperty(o,h):n[o]=h}}var Re=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ke(n,i){if(i){if(Re[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Pe(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Te=null;function $e(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var et=null,it=null,z=null;function Ce(n){if(n=Fa(n)){if(typeof et!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Bo(i),et(n.stateNode,n.type,i))}}function me(n){it?z?z.push(n):z=[n]:it=n}function be(){if(it){var n=it,i=z;if(z=it=null,Ce(n),i)for(n=0;n<i.length;n++)Ce(i[n])}}function Ue(n,i){return n(i)}function ve(){}var je=!1;function Ye(n,i,o){if(je)return n(i,o);je=!0;try{return Ue(n,i,o)}finally{je=!1,(it!==null||z!==null)&&(ve(),be())}}function Ct(n,i){var o=n.stateNode;if(o===null)return null;var u=Bo(o);if(u===null)return null;o=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var Et=!1;if(d)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){Et=!0}}),window.addEventListener("test",vn,vn),window.removeEventListener("test",vn,vn)}catch{Et=!1}function ei(n,i,o,u,h,m,T,U,k){var ue=Array.prototype.slice.call(arguments,3);try{i.apply(o,ue)}catch(xe){this.onError(xe)}}var zr=!1,xs=null,Hr=!1,Vr=null,gc={onError:function(n){zr=!0,xs=n}};function So(n,i,o,u,h,m,T,U,k){zr=!1,xs=null,ei.apply(gc,arguments)}function Mo(n,i,o,u,h,m,T,U,k){if(So.apply(this,arguments),zr){if(zr){var ue=xs;zr=!1,xs=null}else throw Error(t(198));Hr||(Hr=!0,Vr=ue)}}function Dn(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function ys(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function ma(n){if(Dn(n)!==n)throw Error(t(188))}function Eo(n){var i=n.alternate;if(!i){if(i=Dn(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,u=i;;){var h=o.return;if(h===null)break;var m=h.alternate;if(m===null){if(u=h.return,u!==null){o=u;continue}break}if(h.child===m.child){for(m=h.child;m;){if(m===o)return ma(h),n;if(m===u)return ma(h),i;m=m.sibling}throw Error(t(188))}if(o.return!==u.return)o=h,u=m;else{for(var T=!1,U=h.child;U;){if(U===o){T=!0,o=h,u=m;break}if(U===u){T=!0,u=h,o=m;break}U=U.sibling}if(!T){for(U=m.child;U;){if(U===o){T=!0,o=m,u=h;break}if(U===u){T=!0,u=m,o=h;break}U=U.sibling}if(!T)throw Error(t(189))}}if(o.alternate!==u)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function Gr(n){return n=Eo(n),n!==null?ga(n):null}function ga(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=ga(n);if(i!==null)return i;n=n.sibling}return null}var Wr=e.unstable_scheduleCallback,va=e.unstable_cancelCallback,wo=e.unstable_shouldYield,vc=e.unstable_requestPaint,qt=e.unstable_now,_c=e.unstable_getCurrentPriorityLevel,_a=e.unstable_ImmediatePriority,xa=e.unstable_UserBlockingPriority,A=e.unstable_NormalPriority,H=e.unstable_LowPriority,ce=e.unstable_IdlePriority,ne=null,Q=null;function Ne(n){if(Q&&typeof Q.onCommitFiberRoot=="function")try{Q.onCommitFiberRoot(ne,n,void 0,(n.current.flags&128)===128)}catch{}}var Le=Math.clz32?Math.clz32:Ze,De=Math.log,We=Math.LN2;function Ze(n){return n>>>=0,n===0?32:31-(De(n)/We|0)|0}var at=64,ut=4194304;function Be(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function xt(n,i){var o=n.pendingLanes;if(o===0)return 0;var u=0,h=n.suspendedLanes,m=n.pingedLanes,T=o&268435455;if(T!==0){var U=T&~h;U!==0?u=Be(U):(m&=T,m!==0&&(u=Be(m)))}else T=o&~h,T!==0?u=Be(T):m!==0&&(u=Be(m));if(u===0)return 0;if(i!==0&&i!==u&&(i&h)===0&&(h=u&-u,m=i&-i,h>=m||h===16&&(m&4194240)!==0))return i;if((u&4)!==0&&(u|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)o=31-Le(i),h=1<<o,u|=n[o],i&=~h;return u}function Jt(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ot(n,i){for(var o=n.suspendedLanes,u=n.pingedLanes,h=n.expirationTimes,m=n.pendingLanes;0<m;){var T=31-Le(m),U=1<<T,k=h[T];k===-1?((U&o)===0||(U&u)!==0)&&(h[T]=Jt(U,i)):k<=i&&(n.expiredLanes|=U),m&=~U}}function Pt(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function on(){var n=at;return at<<=1,(at&4194240)===0&&(at=64),n}function Oe(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function en(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Le(i),n[i]=o}function yt(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<o;){var h=31-Le(o),m=1<<h;i[h]=0,u[h]=-1,n[h]=-1,o&=~m}}function En(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var u=31-Le(o),h=1<<u;h&i|n[u]&i&&(n[u]|=i),o&=~h}}var pt=0;function fi(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Yi,bt,Wt,pi,Nt,ti=!1,mi=[],gi=null,pr=null,mr=null,ya=new Map,Sa=new Map,gr=[],c0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xh(n,i){switch(n){case"focusin":case"focusout":gi=null;break;case"dragenter":case"dragleave":pr=null;break;case"mouseover":case"mouseout":mr=null;break;case"pointerover":case"pointerout":ya.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Sa.delete(i.pointerId)}}function Ma(n,i,o,u,h,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:o,eventSystemFlags:u,nativeEvent:m,targetContainers:[h]},i!==null&&(i=Fa(i),i!==null&&bt(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),n)}function u0(n,i,o,u,h){switch(i){case"focusin":return gi=Ma(gi,n,i,o,u,h),!0;case"dragenter":return pr=Ma(pr,n,i,o,u,h),!0;case"mouseover":return mr=Ma(mr,n,i,o,u,h),!0;case"pointerover":var m=h.pointerId;return ya.set(m,Ma(ya.get(m)||null,n,i,o,u,h)),!0;case"gotpointercapture":return m=h.pointerId,Sa.set(m,Ma(Sa.get(m)||null,n,i,o,u,h)),!0}return!1}function Yh(n){var i=Xr(n.target);if(i!==null){var o=Dn(i);if(o!==null){if(i=o.tag,i===13){if(i=ys(o),i!==null){n.blockedOn=i,Nt(n.priority,function(){Wt(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function To(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=yc(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var u=new o.constructor(o.type,o);Te=u,o.target.dispatchEvent(u),Te=null}else return i=Fa(o),i!==null&&bt(i),n.blockedOn=o,!1;i.shift()}return!0}function qh(n,i,o){To(n)&&o.delete(i)}function d0(){ti=!1,gi!==null&&To(gi)&&(gi=null),pr!==null&&To(pr)&&(pr=null),mr!==null&&To(mr)&&(mr=null),ya.forEach(qh),Sa.forEach(qh)}function Ea(n,i){n.blockedOn===i&&(n.blockedOn=null,ti||(ti=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,d0)))}function wa(n){function i(h){return Ea(h,n)}if(0<mi.length){Ea(mi[0],n);for(var o=1;o<mi.length;o++){var u=mi[o];u.blockedOn===n&&(u.blockedOn=null)}}for(gi!==null&&Ea(gi,n),pr!==null&&Ea(pr,n),mr!==null&&Ea(mr,n),ya.forEach(i),Sa.forEach(i),o=0;o<gr.length;o++)u=gr[o],u.blockedOn===n&&(u.blockedOn=null);for(;0<gr.length&&(o=gr[0],o.blockedOn===null);)Yh(o),o.blockedOn===null&&gr.shift()}var Ss=C.ReactCurrentBatchConfig,Ao=!0;function h0(n,i,o,u){var h=pt,m=Ss.transition;Ss.transition=null;try{pt=1,xc(n,i,o,u)}finally{pt=h,Ss.transition=m}}function f0(n,i,o,u){var h=pt,m=Ss.transition;Ss.transition=null;try{pt=4,xc(n,i,o,u)}finally{pt=h,Ss.transition=m}}function xc(n,i,o,u){if(Ao){var h=yc(n,i,o,u);if(h===null)Oc(n,i,u,Co,o),Xh(n,u);else if(u0(h,n,i,o,u))u.stopPropagation();else if(Xh(n,u),i&4&&-1<c0.indexOf(n)){for(;h!==null;){var m=Fa(h);if(m!==null&&Yi(m),m=yc(n,i,o,u),m===null&&Oc(n,i,u,Co,o),m===h)break;h=m}h!==null&&u.stopPropagation()}else Oc(n,i,u,null,o)}}var Co=null;function yc(n,i,o,u){if(Co=null,n=$e(u),n=Xr(n),n!==null)if(i=Dn(n),i===null)n=null;else if(o=i.tag,o===13){if(n=ys(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return Co=n,null}function Kh(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_c()){case _a:return 1;case xa:return 4;case A:case H:return 16;case ce:return 536870912;default:return 16}default:return 16}}var vr=null,Sc=null,bo=null;function $h(){if(bo)return bo;var n,i=Sc,o=i.length,u,h="value"in vr?vr.value:vr.textContent,m=h.length;for(n=0;n<o&&i[n]===h[n];n++);var T=o-n;for(u=1;u<=T&&i[o-u]===h[m-u];u++);return bo=h.slice(n,1<u?1-u:void 0)}function Ro(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Po(){return!0}function Zh(){return!1}function Xn(n){function i(o,u,h,m,T){this._reactName=o,this._targetInst=h,this.type=u,this.nativeEvent=m,this.target=T,this.currentTarget=null;for(var U in n)n.hasOwnProperty(U)&&(o=n[U],this[U]=o?o(m):m[U]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Po:Zh,this.isPropagationStopped=Zh,this}return Z(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Po)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Po)},persist:function(){},isPersistent:Po}),i}var Ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Mc=Xn(Ms),Ta=Z({},Ms,{view:0,detail:0}),p0=Xn(Ta),Ec,wc,Aa,Lo=Z({},Ta,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ac,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Aa&&(Aa&&n.type==="mousemove"?(Ec=n.screenX-Aa.screenX,wc=n.screenY-Aa.screenY):wc=Ec=0,Aa=n),Ec)},movementY:function(n){return"movementY"in n?n.movementY:wc}}),jh=Xn(Lo),m0=Z({},Lo,{dataTransfer:0}),g0=Xn(m0),v0=Z({},Ta,{relatedTarget:0}),Tc=Xn(v0),_0=Z({},Ms,{animationName:0,elapsedTime:0,pseudoElement:0}),x0=Xn(_0),y0=Z({},Ms,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),S0=Xn(y0),M0=Z({},Ms,{data:0}),Jh=Xn(M0),E0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},w0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},T0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function A0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=T0[n])?!!i[n]:!1}function Ac(){return A0}var C0=Z({},Ta,{key:function(n){if(n.key){var i=E0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Ro(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?w0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ac,charCode:function(n){return n.type==="keypress"?Ro(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Ro(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),b0=Xn(C0),R0=Z({},Lo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qh=Xn(R0),P0=Z({},Ta,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ac}),L0=Xn(P0),D0=Z({},Ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),N0=Xn(D0),I0=Z({},Lo,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),U0=Xn(I0),F0=[9,13,27,32],Cc=d&&"CompositionEvent"in window,Ca=null;d&&"documentMode"in document&&(Ca=document.documentMode);var O0=d&&"TextEvent"in window&&!Ca,ef=d&&(!Cc||Ca&&8<Ca&&11>=Ca),tf=" ",nf=!1;function rf(n,i){switch(n){case"keyup":return F0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Es=!1;function k0(n,i){switch(n){case"compositionend":return sf(i);case"keypress":return i.which!==32?null:(nf=!0,tf);case"textInput":return n=i.data,n===tf&&nf?null:n;default:return null}}function B0(n,i){if(Es)return n==="compositionend"||!Cc&&rf(n,i)?(n=$h(),bo=Sc=vr=null,Es=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return ef&&i.locale!=="ko"?null:i.data;default:return null}}var z0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function af(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!z0[n.type]:i==="textarea"}function of(n,i,o,u){me(u),i=Fo(i,"onChange"),0<i.length&&(o=new Mc("onChange","change",null,o,u),n.push({event:o,listeners:i}))}var ba=null,Ra=null;function H0(n){Tf(n,0)}function Do(n){var i=bs(n);if(dt(i))return n}function V0(n,i){if(n==="change")return i}var lf=!1;if(d){var bc;if(d){var Rc="oninput"in document;if(!Rc){var cf=document.createElement("div");cf.setAttribute("oninput","return;"),Rc=typeof cf.oninput=="function"}bc=Rc}else bc=!1;lf=bc&&(!document.documentMode||9<document.documentMode)}function uf(){ba&&(ba.detachEvent("onpropertychange",df),Ra=ba=null)}function df(n){if(n.propertyName==="value"&&Do(Ra)){var i=[];of(i,Ra,n,$e(n)),Ye(H0,i)}}function G0(n,i,o){n==="focusin"?(uf(),ba=i,Ra=o,ba.attachEvent("onpropertychange",df)):n==="focusout"&&uf()}function W0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Do(Ra)}function X0(n,i){if(n==="click")return Do(i)}function Y0(n,i){if(n==="input"||n==="change")return Do(i)}function q0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var vi=typeof Object.is=="function"?Object.is:q0;function Pa(n,i){if(vi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),u=Object.keys(i);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var h=o[u];if(!f.call(i,h)||!vi(n[h],i[h]))return!1}return!0}function hf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function ff(n,i){var o=hf(n);n=0;for(var u;o;){if(o.nodeType===3){if(u=n+o.textContent.length,n<=i&&u>=i)return{node:o,offset:i-n};n=u}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=hf(o)}}function pf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?pf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function mf(){for(var n=window,i=Vt();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=Vt(n.document)}return i}function Pc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function K0(n){var i=mf(),o=n.focusedElem,u=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&pf(o.ownerDocument.documentElement,o)){if(u!==null&&Pc(o)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var h=o.textContent.length,m=Math.min(u.start,h);u=u.end===void 0?m:Math.min(u.end,h),!n.extend&&m>u&&(h=u,u=m,m=h),h=ff(o,m);var T=ff(o,u);h&&T&&(n.rangeCount!==1||n.anchorNode!==h.node||n.anchorOffset!==h.offset||n.focusNode!==T.node||n.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(h.node,h.offset),n.removeAllRanges(),m>u?(n.addRange(i),n.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var $0=d&&"documentMode"in document&&11>=document.documentMode,ws=null,Lc=null,La=null,Dc=!1;function gf(n,i,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Dc||ws==null||ws!==Vt(u)||(u=ws,"selectionStart"in u&&Pc(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),La&&Pa(La,u)||(La=u,u=Fo(Lc,"onSelect"),0<u.length&&(i=new Mc("onSelect","select",null,i,o),n.push({event:i,listeners:u}),i.target=ws)))}function No(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var Ts={animationend:No("Animation","AnimationEnd"),animationiteration:No("Animation","AnimationIteration"),animationstart:No("Animation","AnimationStart"),transitionend:No("Transition","TransitionEnd")},Nc={},vf={};d&&(vf=document.createElement("div").style,"AnimationEvent"in window||(delete Ts.animationend.animation,delete Ts.animationiteration.animation,delete Ts.animationstart.animation),"TransitionEvent"in window||delete Ts.transitionend.transition);function Io(n){if(Nc[n])return Nc[n];if(!Ts[n])return n;var i=Ts[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in vf)return Nc[n]=i[o];return n}var _f=Io("animationend"),xf=Io("animationiteration"),yf=Io("animationstart"),Sf=Io("transitionend"),Mf=new Map,Ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _r(n,i){Mf.set(n,i),l(i,[n])}for(var Ic=0;Ic<Ef.length;Ic++){var Uc=Ef[Ic],Z0=Uc.toLowerCase(),j0=Uc[0].toUpperCase()+Uc.slice(1);_r(Z0,"on"+j0)}_r(_f,"onAnimationEnd"),_r(xf,"onAnimationIteration"),_r(yf,"onAnimationStart"),_r("dblclick","onDoubleClick"),_r("focusin","onFocus"),_r("focusout","onBlur"),_r(Sf,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Da="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),J0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Da));function wf(n,i,o){var u=n.type||"unknown-event";n.currentTarget=o,Mo(u,i,void 0,n),n.currentTarget=null}function Tf(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var u=n[o],h=u.event;u=u.listeners;e:{var m=void 0;if(i)for(var T=u.length-1;0<=T;T--){var U=u[T],k=U.instance,ue=U.currentTarget;if(U=U.listener,k!==m&&h.isPropagationStopped())break e;wf(h,U,ue),m=k}else for(T=0;T<u.length;T++){if(U=u[T],k=U.instance,ue=U.currentTarget,U=U.listener,k!==m&&h.isPropagationStopped())break e;wf(h,U,ue),m=k}}}if(Hr)throw n=Vr,Hr=!1,Vr=null,n}function zt(n,i){var o=i[Gc];o===void 0&&(o=i[Gc]=new Set);var u=n+"__bubble";o.has(u)||(Af(i,n,2,!1),o.add(u))}function Fc(n,i,o){var u=0;i&&(u|=4),Af(o,n,u,i)}var Uo="_reactListening"+Math.random().toString(36).slice(2);function Na(n){if(!n[Uo]){n[Uo]=!0,r.forEach(function(o){o!=="selectionchange"&&(J0.has(o)||Fc(o,!1,n),Fc(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Uo]||(i[Uo]=!0,Fc("selectionchange",!1,i))}}function Af(n,i,o,u){switch(Kh(i)){case 1:var h=h0;break;case 4:h=f0;break;default:h=xc}o=h.bind(null,i,o,n),h=void 0,!Et||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),u?h!==void 0?n.addEventListener(i,o,{capture:!0,passive:h}):n.addEventListener(i,o,!0):h!==void 0?n.addEventListener(i,o,{passive:h}):n.addEventListener(i,o,!1)}function Oc(n,i,o,u,h){var m=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var T=u.tag;if(T===3||T===4){var U=u.stateNode.containerInfo;if(U===h||U.nodeType===8&&U.parentNode===h)break;if(T===4)for(T=u.return;T!==null;){var k=T.tag;if((k===3||k===4)&&(k=T.stateNode.containerInfo,k===h||k.nodeType===8&&k.parentNode===h))return;T=T.return}for(;U!==null;){if(T=Xr(U),T===null)return;if(k=T.tag,k===5||k===6){u=m=T;continue e}U=U.parentNode}}u=u.return}Ye(function(){var ue=m,xe=$e(o),Se=[];e:{var _e=Mf.get(n);if(_e!==void 0){var ke=Mc,Xe=n;switch(n){case"keypress":if(Ro(o)===0)break e;case"keydown":case"keyup":ke=b0;break;case"focusin":Xe="focus",ke=Tc;break;case"focusout":Xe="blur",ke=Tc;break;case"beforeblur":case"afterblur":ke=Tc;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ke=jh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ke=g0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ke=L0;break;case _f:case xf:case yf:ke=x0;break;case Sf:ke=N0;break;case"scroll":ke=p0;break;case"wheel":ke=U0;break;case"copy":case"cut":case"paste":ke=S0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ke=Qh}var qe=(i&4)!==0,tn=!qe&&n==="scroll",ie=qe?_e!==null?_e+"Capture":null:_e;qe=[];for(var X=ue,se;X!==null;){se=X;var we=se.stateNode;if(se.tag===5&&we!==null&&(se=we,ie!==null&&(we=Ct(X,ie),we!=null&&qe.push(Ia(X,we,se)))),tn)break;X=X.return}0<qe.length&&(_e=new ke(_e,Xe,null,o,xe),Se.push({event:_e,listeners:qe}))}}if((i&7)===0){e:{if(_e=n==="mouseover"||n==="pointerover",ke=n==="mouseout"||n==="pointerout",_e&&o!==Te&&(Xe=o.relatedTarget||o.fromElement)&&(Xr(Xe)||Xe[qi]))break e;if((ke||_e)&&(_e=xe.window===xe?xe:(_e=xe.ownerDocument)?_e.defaultView||_e.parentWindow:window,ke?(Xe=o.relatedTarget||o.toElement,ke=ue,Xe=Xe?Xr(Xe):null,Xe!==null&&(tn=Dn(Xe),Xe!==tn||Xe.tag!==5&&Xe.tag!==6)&&(Xe=null)):(ke=null,Xe=ue),ke!==Xe)){if(qe=jh,we="onMouseLeave",ie="onMouseEnter",X="mouse",(n==="pointerout"||n==="pointerover")&&(qe=Qh,we="onPointerLeave",ie="onPointerEnter",X="pointer"),tn=ke==null?_e:bs(ke),se=Xe==null?_e:bs(Xe),_e=new qe(we,X+"leave",ke,o,xe),_e.target=tn,_e.relatedTarget=se,we=null,Xr(xe)===ue&&(qe=new qe(ie,X+"enter",Xe,o,xe),qe.target=se,qe.relatedTarget=tn,we=qe),tn=we,ke&&Xe)t:{for(qe=ke,ie=Xe,X=0,se=qe;se;se=As(se))X++;for(se=0,we=ie;we;we=As(we))se++;for(;0<X-se;)qe=As(qe),X--;for(;0<se-X;)ie=As(ie),se--;for(;X--;){if(qe===ie||ie!==null&&qe===ie.alternate)break t;qe=As(qe),ie=As(ie)}qe=null}else qe=null;ke!==null&&Cf(Se,_e,ke,qe,!1),Xe!==null&&tn!==null&&Cf(Se,tn,Xe,qe,!0)}}e:{if(_e=ue?bs(ue):window,ke=_e.nodeName&&_e.nodeName.toLowerCase(),ke==="select"||ke==="input"&&_e.type==="file")var Je=V0;else if(af(_e))if(lf)Je=Y0;else{Je=W0;var tt=G0}else(ke=_e.nodeName)&&ke.toLowerCase()==="input"&&(_e.type==="checkbox"||_e.type==="radio")&&(Je=X0);if(Je&&(Je=Je(n,ue))){of(Se,Je,o,xe);break e}tt&&tt(n,_e,ue),n==="focusout"&&(tt=_e._wrapperState)&&tt.controlled&&_e.type==="number"&&jt(_e,"number",_e.value)}switch(tt=ue?bs(ue):window,n){case"focusin":(af(tt)||tt.contentEditable==="true")&&(ws=tt,Lc=ue,La=null);break;case"focusout":La=Lc=ws=null;break;case"mousedown":Dc=!0;break;case"contextmenu":case"mouseup":case"dragend":Dc=!1,gf(Se,o,xe);break;case"selectionchange":if($0)break;case"keydown":case"keyup":gf(Se,o,xe)}var nt;if(Cc)e:{switch(n){case"compositionstart":var rt="onCompositionStart";break e;case"compositionend":rt="onCompositionEnd";break e;case"compositionupdate":rt="onCompositionUpdate";break e}rt=void 0}else Es?rf(n,o)&&(rt="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(rt="onCompositionStart");rt&&(ef&&o.locale!=="ko"&&(Es||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&Es&&(nt=$h()):(vr=xe,Sc="value"in vr?vr.value:vr.textContent,Es=!0)),tt=Fo(ue,rt),0<tt.length&&(rt=new Jh(rt,n,null,o,xe),Se.push({event:rt,listeners:tt}),nt?rt.data=nt:(nt=sf(o),nt!==null&&(rt.data=nt)))),(nt=O0?k0(n,o):B0(n,o))&&(ue=Fo(ue,"onBeforeInput"),0<ue.length&&(xe=new Jh("onBeforeInput","beforeinput",null,o,xe),Se.push({event:xe,listeners:ue}),xe.data=nt))}Tf(Se,i)})}function Ia(n,i,o){return{instance:n,listener:i,currentTarget:o}}function Fo(n,i){for(var o=i+"Capture",u=[];n!==null;){var h=n,m=h.stateNode;h.tag===5&&m!==null&&(h=m,m=Ct(n,o),m!=null&&u.unshift(Ia(n,m,h)),m=Ct(n,i),m!=null&&u.push(Ia(n,m,h))),n=n.return}return u}function As(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Cf(n,i,o,u,h){for(var m=i._reactName,T=[];o!==null&&o!==u;){var U=o,k=U.alternate,ue=U.stateNode;if(k!==null&&k===u)break;U.tag===5&&ue!==null&&(U=ue,h?(k=Ct(o,m),k!=null&&T.unshift(Ia(o,k,U))):h||(k=Ct(o,m),k!=null&&T.push(Ia(o,k,U)))),o=o.return}T.length!==0&&n.push({event:i,listeners:T})}var Q0=/\r\n?/g,ev=/\u0000|\uFFFD/g;function bf(n){return(typeof n=="string"?n:""+n).replace(Q0,`
`).replace(ev,"")}function Oo(n,i,o){if(i=bf(i),bf(n)!==i&&o)throw Error(t(425))}function ko(){}var kc=null,Bc=null;function zc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Hc=typeof setTimeout=="function"?setTimeout:void 0,tv=typeof clearTimeout=="function"?clearTimeout:void 0,Rf=typeof Promise=="function"?Promise:void 0,nv=typeof queueMicrotask=="function"?queueMicrotask:typeof Rf<"u"?function(n){return Rf.resolve(null).then(n).catch(iv)}:Hc;function iv(n){setTimeout(function(){throw n})}function Vc(n,i){var o=i,u=0;do{var h=o.nextSibling;if(n.removeChild(o),h&&h.nodeType===8)if(o=h.data,o==="/$"){if(u===0){n.removeChild(h),wa(i);return}u--}else o!=="$"&&o!=="$?"&&o!=="$!"||u++;o=h}while(o);wa(i)}function xr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Pf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var Cs=Math.random().toString(36).slice(2),Li="__reactFiber$"+Cs,Ua="__reactProps$"+Cs,qi="__reactContainer$"+Cs,Gc="__reactEvents$"+Cs,rv="__reactListeners$"+Cs,sv="__reactHandles$"+Cs;function Xr(n){var i=n[Li];if(i)return i;for(var o=n.parentNode;o;){if(i=o[qi]||o[Li]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=Pf(n);n!==null;){if(o=n[Li])return o;n=Pf(n)}return i}n=o,o=n.parentNode}return null}function Fa(n){return n=n[Li]||n[qi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function bs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Bo(n){return n[Ua]||null}var Wc=[],Rs=-1;function yr(n){return{current:n}}function Ht(n){0>Rs||(n.current=Wc[Rs],Wc[Rs]=null,Rs--)}function Bt(n,i){Rs++,Wc[Rs]=n.current,n.current=i}var Sr={},wn=yr(Sr),kn=yr(!1),Yr=Sr;function Ps(n,i){var o=n.type.contextTypes;if(!o)return Sr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var h={},m;for(m in o)h[m]=i[m];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=h),h}function Bn(n){return n=n.childContextTypes,n!=null}function zo(){Ht(kn),Ht(wn)}function Lf(n,i,o){if(wn.current!==Sr)throw Error(t(168));Bt(wn,i),Bt(kn,o)}function Df(n,i,o){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return o;u=u.getChildContext();for(var h in u)if(!(h in i))throw Error(t(108,le(n)||"Unknown",h));return Z({},o,u)}function Ho(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Sr,Yr=wn.current,Bt(wn,n),Bt(kn,kn.current),!0}function Nf(n,i,o){var u=n.stateNode;if(!u)throw Error(t(169));o?(n=Df(n,i,Yr),u.__reactInternalMemoizedMergedChildContext=n,Ht(kn),Ht(wn),Bt(wn,n)):Ht(kn),Bt(kn,o)}var Ki=null,Vo=!1,Xc=!1;function If(n){Ki===null?Ki=[n]:Ki.push(n)}function av(n){Vo=!0,If(n)}function Mr(){if(!Xc&&Ki!==null){Xc=!0;var n=0,i=pt;try{var o=Ki;for(pt=1;n<o.length;n++){var u=o[n];do u=u(!0);while(u!==null)}Ki=null,Vo=!1}catch(h){throw Ki!==null&&(Ki=Ki.slice(n+1)),Wr(_a,Mr),h}finally{pt=i,Xc=!1}}return null}var Ls=[],Ds=0,Go=null,Wo=0,ni=[],ii=0,qr=null,$i=1,Zi="";function Kr(n,i){Ls[Ds++]=Wo,Ls[Ds++]=Go,Go=n,Wo=i}function Uf(n,i,o){ni[ii++]=$i,ni[ii++]=Zi,ni[ii++]=qr,qr=n;var u=$i;n=Zi;var h=32-Le(u)-1;u&=~(1<<h),o+=1;var m=32-Le(i)+h;if(30<m){var T=h-h%5;m=(u&(1<<T)-1).toString(32),u>>=T,h-=T,$i=1<<32-Le(i)+h|o<<h|u,Zi=m+n}else $i=1<<m|o<<h|u,Zi=n}function Yc(n){n.return!==null&&(Kr(n,1),Uf(n,1,0))}function qc(n){for(;n===Go;)Go=Ls[--Ds],Ls[Ds]=null,Wo=Ls[--Ds],Ls[Ds]=null;for(;n===qr;)qr=ni[--ii],ni[ii]=null,Zi=ni[--ii],ni[ii]=null,$i=ni[--ii],ni[ii]=null}var Yn=null,qn=null,Xt=!1,_i=null;function Ff(n,i){var o=oi(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function Of(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Yn=n,qn=xr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Yn=n,qn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=qr!==null?{id:$i,overflow:Zi}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=oi(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,Yn=n,qn=null,!0):!1;default:return!1}}function Kc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function $c(n){if(Xt){var i=qn;if(i){var o=i;if(!Of(n,i)){if(Kc(n))throw Error(t(418));i=xr(o.nextSibling);var u=Yn;i&&Of(n,i)?Ff(u,o):(n.flags=n.flags&-4097|2,Xt=!1,Yn=n)}}else{if(Kc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Xt=!1,Yn=n}}}function kf(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Yn=n}function Xo(n){if(n!==Yn)return!1;if(!Xt)return kf(n),Xt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!zc(n.type,n.memoizedProps)),i&&(i=qn)){if(Kc(n))throw Bf(),Error(t(418));for(;i;)Ff(n,i),i=xr(i.nextSibling)}if(kf(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){qn=xr(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}qn=null}}else qn=Yn?xr(n.stateNode.nextSibling):null;return!0}function Bf(){for(var n=qn;n;)n=xr(n.nextSibling)}function Ns(){qn=Yn=null,Xt=!1}function Zc(n){_i===null?_i=[n]:_i.push(n)}var ov=C.ReactCurrentBatchConfig;function Oa(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var u=o.stateNode}if(!u)throw Error(t(147,n));var h=u,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(T){var U=h.refs;T===null?delete U[m]:U[m]=T},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function Yo(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function zf(n){var i=n._init;return i(n._payload)}function Hf(n){function i(ie,X){if(n){var se=ie.deletions;se===null?(ie.deletions=[X],ie.flags|=16):se.push(X)}}function o(ie,X){if(!n)return null;for(;X!==null;)i(ie,X),X=X.sibling;return null}function u(ie,X){for(ie=new Map;X!==null;)X.key!==null?ie.set(X.key,X):ie.set(X.index,X),X=X.sibling;return ie}function h(ie,X){return ie=Pr(ie,X),ie.index=0,ie.sibling=null,ie}function m(ie,X,se){return ie.index=se,n?(se=ie.alternate,se!==null?(se=se.index,se<X?(ie.flags|=2,X):se):(ie.flags|=2,X)):(ie.flags|=1048576,X)}function T(ie){return n&&ie.alternate===null&&(ie.flags|=2),ie}function U(ie,X,se,we){return X===null||X.tag!==6?(X=Hu(se,ie.mode,we),X.return=ie,X):(X=h(X,se),X.return=ie,X)}function k(ie,X,se,we){var Je=se.type;return Je===F?xe(ie,X,se.props.children,we,se.key):X!==null&&(X.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===he&&zf(Je)===X.type)?(we=h(X,se.props),we.ref=Oa(ie,X,se),we.return=ie,we):(we=gl(se.type,se.key,se.props,null,ie.mode,we),we.ref=Oa(ie,X,se),we.return=ie,we)}function ue(ie,X,se,we){return X===null||X.tag!==4||X.stateNode.containerInfo!==se.containerInfo||X.stateNode.implementation!==se.implementation?(X=Vu(se,ie.mode,we),X.return=ie,X):(X=h(X,se.children||[]),X.return=ie,X)}function xe(ie,X,se,we,Je){return X===null||X.tag!==7?(X=ns(se,ie.mode,we,Je),X.return=ie,X):(X=h(X,se),X.return=ie,X)}function Se(ie,X,se){if(typeof X=="string"&&X!==""||typeof X=="number")return X=Hu(""+X,ie.mode,se),X.return=ie,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case R:return se=gl(X.type,X.key,X.props,null,ie.mode,se),se.ref=Oa(ie,null,X),se.return=ie,se;case P:return X=Vu(X,ie.mode,se),X.return=ie,X;case he:var we=X._init;return Se(ie,we(X._payload),se)}if(nn(X)||$(X))return X=ns(X,ie.mode,se,null),X.return=ie,X;Yo(ie,X)}return null}function _e(ie,X,se,we){var Je=X!==null?X.key:null;if(typeof se=="string"&&se!==""||typeof se=="number")return Je!==null?null:U(ie,X,""+se,we);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case R:return se.key===Je?k(ie,X,se,we):null;case P:return se.key===Je?ue(ie,X,se,we):null;case he:return Je=se._init,_e(ie,X,Je(se._payload),we)}if(nn(se)||$(se))return Je!==null?null:xe(ie,X,se,we,null);Yo(ie,se)}return null}function ke(ie,X,se,we,Je){if(typeof we=="string"&&we!==""||typeof we=="number")return ie=ie.get(se)||null,U(X,ie,""+we,Je);if(typeof we=="object"&&we!==null){switch(we.$$typeof){case R:return ie=ie.get(we.key===null?se:we.key)||null,k(X,ie,we,Je);case P:return ie=ie.get(we.key===null?se:we.key)||null,ue(X,ie,we,Je);case he:var tt=we._init;return ke(ie,X,se,tt(we._payload),Je)}if(nn(we)||$(we))return ie=ie.get(se)||null,xe(X,ie,we,Je,null);Yo(X,we)}return null}function Xe(ie,X,se,we){for(var Je=null,tt=null,nt=X,rt=X=0,pn=null;nt!==null&&rt<se.length;rt++){nt.index>rt?(pn=nt,nt=null):pn=nt.sibling;var Rt=_e(ie,nt,se[rt],we);if(Rt===null){nt===null&&(nt=pn);break}n&&nt&&Rt.alternate===null&&i(ie,nt),X=m(Rt,X,rt),tt===null?Je=Rt:tt.sibling=Rt,tt=Rt,nt=pn}if(rt===se.length)return o(ie,nt),Xt&&Kr(ie,rt),Je;if(nt===null){for(;rt<se.length;rt++)nt=Se(ie,se[rt],we),nt!==null&&(X=m(nt,X,rt),tt===null?Je=nt:tt.sibling=nt,tt=nt);return Xt&&Kr(ie,rt),Je}for(nt=u(ie,nt);rt<se.length;rt++)pn=ke(nt,ie,rt,se[rt],we),pn!==null&&(n&&pn.alternate!==null&&nt.delete(pn.key===null?rt:pn.key),X=m(pn,X,rt),tt===null?Je=pn:tt.sibling=pn,tt=pn);return n&&nt.forEach(function(Lr){return i(ie,Lr)}),Xt&&Kr(ie,rt),Je}function qe(ie,X,se,we){var Je=$(se);if(typeof Je!="function")throw Error(t(150));if(se=Je.call(se),se==null)throw Error(t(151));for(var tt=Je=null,nt=X,rt=X=0,pn=null,Rt=se.next();nt!==null&&!Rt.done;rt++,Rt=se.next()){nt.index>rt?(pn=nt,nt=null):pn=nt.sibling;var Lr=_e(ie,nt,Rt.value,we);if(Lr===null){nt===null&&(nt=pn);break}n&&nt&&Lr.alternate===null&&i(ie,nt),X=m(Lr,X,rt),tt===null?Je=Lr:tt.sibling=Lr,tt=Lr,nt=pn}if(Rt.done)return o(ie,nt),Xt&&Kr(ie,rt),Je;if(nt===null){for(;!Rt.done;rt++,Rt=se.next())Rt=Se(ie,Rt.value,we),Rt!==null&&(X=m(Rt,X,rt),tt===null?Je=Rt:tt.sibling=Rt,tt=Rt);return Xt&&Kr(ie,rt),Je}for(nt=u(ie,nt);!Rt.done;rt++,Rt=se.next())Rt=ke(nt,ie,rt,Rt.value,we),Rt!==null&&(n&&Rt.alternate!==null&&nt.delete(Rt.key===null?rt:Rt.key),X=m(Rt,X,rt),tt===null?Je=Rt:tt.sibling=Rt,tt=Rt);return n&&nt.forEach(function(zv){return i(ie,zv)}),Xt&&Kr(ie,rt),Je}function tn(ie,X,se,we){if(typeof se=="object"&&se!==null&&se.type===F&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case R:e:{for(var Je=se.key,tt=X;tt!==null;){if(tt.key===Je){if(Je=se.type,Je===F){if(tt.tag===7){o(ie,tt.sibling),X=h(tt,se.props.children),X.return=ie,ie=X;break e}}else if(tt.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===he&&zf(Je)===tt.type){o(ie,tt.sibling),X=h(tt,se.props),X.ref=Oa(ie,tt,se),X.return=ie,ie=X;break e}o(ie,tt);break}else i(ie,tt);tt=tt.sibling}se.type===F?(X=ns(se.props.children,ie.mode,we,se.key),X.return=ie,ie=X):(we=gl(se.type,se.key,se.props,null,ie.mode,we),we.ref=Oa(ie,X,se),we.return=ie,ie=we)}return T(ie);case P:e:{for(tt=se.key;X!==null;){if(X.key===tt)if(X.tag===4&&X.stateNode.containerInfo===se.containerInfo&&X.stateNode.implementation===se.implementation){o(ie,X.sibling),X=h(X,se.children||[]),X.return=ie,ie=X;break e}else{o(ie,X);break}else i(ie,X);X=X.sibling}X=Vu(se,ie.mode,we),X.return=ie,ie=X}return T(ie);case he:return tt=se._init,tn(ie,X,tt(se._payload),we)}if(nn(se))return Xe(ie,X,se,we);if($(se))return qe(ie,X,se,we);Yo(ie,se)}return typeof se=="string"&&se!==""||typeof se=="number"?(se=""+se,X!==null&&X.tag===6?(o(ie,X.sibling),X=h(X,se),X.return=ie,ie=X):(o(ie,X),X=Hu(se,ie.mode,we),X.return=ie,ie=X),T(ie)):o(ie,X)}return tn}var Is=Hf(!0),Vf=Hf(!1),qo=yr(null),Ko=null,Us=null,jc=null;function Jc(){jc=Us=Ko=null}function Qc(n){var i=qo.current;Ht(qo),n._currentValue=i}function eu(n,i,o){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===o)break;n=n.return}}function Fs(n,i){Ko=n,jc=Us=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(zn=!0),n.firstContext=null)}function ri(n){var i=n._currentValue;if(jc!==n)if(n={context:n,memoizedValue:i,next:null},Us===null){if(Ko===null)throw Error(t(308));Us=n,Ko.dependencies={lanes:0,firstContext:n}}else Us=Us.next=n;return i}var $r=null;function tu(n){$r===null?$r=[n]:$r.push(n)}function Gf(n,i,o,u){var h=i.interleaved;return h===null?(o.next=o,tu(i)):(o.next=h.next,h.next=o),i.interleaved=o,ji(n,u)}function ji(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var Er=!1;function nu(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ji(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function wr(n,i,o){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(wt&2)!==0){var h=u.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),u.pending=i,ji(n,o)}return h=u.interleaved,h===null?(i.next=i,tu(u)):(i.next=h.next,h.next=i),u.interleaved=i,ji(n,o)}function $o(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,En(n,o)}}function Xf(n,i){var o=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var h=null,m=null;if(o=o.firstBaseUpdate,o!==null){do{var T={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};m===null?h=m=T:m=m.next=T,o=o.next}while(o!==null);m===null?h=m=i:m=m.next=i}else h=m=i;o={baseState:u.baseState,firstBaseUpdate:h,lastBaseUpdate:m,shared:u.shared,effects:u.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function Zo(n,i,o,u){var h=n.updateQueue;Er=!1;var m=h.firstBaseUpdate,T=h.lastBaseUpdate,U=h.shared.pending;if(U!==null){h.shared.pending=null;var k=U,ue=k.next;k.next=null,T===null?m=ue:T.next=ue,T=k;var xe=n.alternate;xe!==null&&(xe=xe.updateQueue,U=xe.lastBaseUpdate,U!==T&&(U===null?xe.firstBaseUpdate=ue:U.next=ue,xe.lastBaseUpdate=k))}if(m!==null){var Se=h.baseState;T=0,xe=ue=k=null,U=m;do{var _e=U.lane,ke=U.eventTime;if((u&_e)===_e){xe!==null&&(xe=xe.next={eventTime:ke,lane:0,tag:U.tag,payload:U.payload,callback:U.callback,next:null});e:{var Xe=n,qe=U;switch(_e=i,ke=o,qe.tag){case 1:if(Xe=qe.payload,typeof Xe=="function"){Se=Xe.call(ke,Se,_e);break e}Se=Xe;break e;case 3:Xe.flags=Xe.flags&-65537|128;case 0:if(Xe=qe.payload,_e=typeof Xe=="function"?Xe.call(ke,Se,_e):Xe,_e==null)break e;Se=Z({},Se,_e);break e;case 2:Er=!0}}U.callback!==null&&U.lane!==0&&(n.flags|=64,_e=h.effects,_e===null?h.effects=[U]:_e.push(U))}else ke={eventTime:ke,lane:_e,tag:U.tag,payload:U.payload,callback:U.callback,next:null},xe===null?(ue=xe=ke,k=Se):xe=xe.next=ke,T|=_e;if(U=U.next,U===null){if(U=h.shared.pending,U===null)break;_e=U,U=_e.next,_e.next=null,h.lastBaseUpdate=_e,h.shared.pending=null}}while(!0);if(xe===null&&(k=Se),h.baseState=k,h.firstBaseUpdate=ue,h.lastBaseUpdate=xe,i=h.shared.interleaved,i!==null){h=i;do T|=h.lane,h=h.next;while(h!==i)}else m===null&&(h.shared.lanes=0);Jr|=T,n.lanes=T,n.memoizedState=Se}}function Yf(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],h=u.callback;if(h!==null){if(u.callback=null,u=o,typeof h!="function")throw Error(t(191,h));h.call(u)}}}var ka={},Di=yr(ka),Ba=yr(ka),za=yr(ka);function Zr(n){if(n===ka)throw Error(t(174));return n}function iu(n,i){switch(Bt(za,i),Bt(Ba,n),Bt(Di,ka),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:M(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=M(i,n)}Ht(Di),Bt(Di,i)}function Os(){Ht(Di),Ht(Ba),Ht(za)}function qf(n){Zr(za.current);var i=Zr(Di.current),o=M(i,n.type);i!==o&&(Bt(Ba,n),Bt(Di,o))}function ru(n){Ba.current===n&&(Ht(Di),Ht(Ba))}var Kt=yr(0);function jo(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var su=[];function au(){for(var n=0;n<su.length;n++)su[n]._workInProgressVersionPrimary=null;su.length=0}var Jo=C.ReactCurrentDispatcher,ou=C.ReactCurrentBatchConfig,jr=0,$t=null,ln=null,hn=null,Qo=!1,Ha=!1,Va=0,lv=0;function Tn(){throw Error(t(321))}function lu(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!vi(n[o],i[o]))return!1;return!0}function cu(n,i,o,u,h,m){if(jr=m,$t=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Jo.current=n===null||n.memoizedState===null?hv:fv,n=o(u,h),Ha){m=0;do{if(Ha=!1,Va=0,25<=m)throw Error(t(301));m+=1,hn=ln=null,i.updateQueue=null,Jo.current=pv,n=o(u,h)}while(Ha)}if(Jo.current=nl,i=ln!==null&&ln.next!==null,jr=0,hn=ln=$t=null,Qo=!1,i)throw Error(t(300));return n}function uu(){var n=Va!==0;return Va=0,n}function Ni(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?$t.memoizedState=hn=n:hn=hn.next=n,hn}function si(){if(ln===null){var n=$t.alternate;n=n!==null?n.memoizedState:null}else n=ln.next;var i=hn===null?$t.memoizedState:hn.next;if(i!==null)hn=i,ln=n;else{if(n===null)throw Error(t(310));ln=n,n={memoizedState:ln.memoizedState,baseState:ln.baseState,baseQueue:ln.baseQueue,queue:ln.queue,next:null},hn===null?$t.memoizedState=hn=n:hn=hn.next=n}return hn}function Ga(n,i){return typeof i=="function"?i(n):i}function du(n){var i=si(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=ln,h=u.baseQueue,m=o.pending;if(m!==null){if(h!==null){var T=h.next;h.next=m.next,m.next=T}u.baseQueue=h=m,o.pending=null}if(h!==null){m=h.next,u=u.baseState;var U=T=null,k=null,ue=m;do{var xe=ue.lane;if((jr&xe)===xe)k!==null&&(k=k.next={lane:0,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null}),u=ue.hasEagerState?ue.eagerState:n(u,ue.action);else{var Se={lane:xe,action:ue.action,hasEagerState:ue.hasEagerState,eagerState:ue.eagerState,next:null};k===null?(U=k=Se,T=u):k=k.next=Se,$t.lanes|=xe,Jr|=xe}ue=ue.next}while(ue!==null&&ue!==m);k===null?T=u:k.next=U,vi(u,i.memoizedState)||(zn=!0),i.memoizedState=u,i.baseState=T,i.baseQueue=k,o.lastRenderedState=u}if(n=o.interleaved,n!==null){h=n;do m=h.lane,$t.lanes|=m,Jr|=m,h=h.next;while(h!==n)}else h===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function hu(n){var i=si(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=o.dispatch,h=o.pending,m=i.memoizedState;if(h!==null){o.pending=null;var T=h=h.next;do m=n(m,T.action),T=T.next;while(T!==h);vi(m,i.memoizedState)||(zn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),o.lastRenderedState=m}return[m,u]}function Kf(){}function $f(n,i){var o=$t,u=si(),h=i(),m=!vi(u.memoizedState,h);if(m&&(u.memoizedState=h,zn=!0),u=u.queue,fu(Jf.bind(null,o,u,n),[n]),u.getSnapshot!==i||m||hn!==null&&hn.memoizedState.tag&1){if(o.flags|=2048,Wa(9,jf.bind(null,o,u,h,i),void 0,null),fn===null)throw Error(t(349));(jr&30)!==0||Zf(o,i,h)}return h}function Zf(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=$t.updateQueue,i===null?(i={lastEffect:null,stores:null},$t.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function jf(n,i,o,u){i.value=o,i.getSnapshot=u,Qf(i)&&ep(n)}function Jf(n,i,o){return o(function(){Qf(i)&&ep(n)})}function Qf(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!vi(n,o)}catch{return!0}}function ep(n){var i=ji(n,1);i!==null&&Mi(i,n,1,-1)}function tp(n){var i=Ni();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ga,lastRenderedState:n},i.queue=n,n=n.dispatch=dv.bind(null,$t,n),[i.memoizedState,n]}function Wa(n,i,o,u){return n={tag:n,create:i,destroy:o,deps:u,next:null},i=$t.updateQueue,i===null?(i={lastEffect:null,stores:null},$t.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(u=o.next,o.next=n,n.next=u,i.lastEffect=n)),n}function np(){return si().memoizedState}function el(n,i,o,u){var h=Ni();$t.flags|=n,h.memoizedState=Wa(1|i,o,void 0,u===void 0?null:u)}function tl(n,i,o,u){var h=si();u=u===void 0?null:u;var m=void 0;if(ln!==null){var T=ln.memoizedState;if(m=T.destroy,u!==null&&lu(u,T.deps)){h.memoizedState=Wa(i,o,m,u);return}}$t.flags|=n,h.memoizedState=Wa(1|i,o,m,u)}function ip(n,i){return el(8390656,8,n,i)}function fu(n,i){return tl(2048,8,n,i)}function rp(n,i){return tl(4,2,n,i)}function sp(n,i){return tl(4,4,n,i)}function ap(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function op(n,i,o){return o=o!=null?o.concat([n]):null,tl(4,4,ap.bind(null,i,n),o)}function pu(){}function lp(n,i){var o=si();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&lu(i,u[1])?u[0]:(o.memoizedState=[n,i],n)}function cp(n,i){var o=si();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&lu(i,u[1])?u[0]:(n=n(),o.memoizedState=[n,i],n)}function up(n,i,o){return(jr&21)===0?(n.baseState&&(n.baseState=!1,zn=!0),n.memoizedState=o):(vi(o,i)||(o=on(),$t.lanes|=o,Jr|=o,n.baseState=!0),i)}function cv(n,i){var o=pt;pt=o!==0&&4>o?o:4,n(!0);var u=ou.transition;ou.transition={};try{n(!1),i()}finally{pt=o,ou.transition=u}}function dp(){return si().memoizedState}function uv(n,i,o){var u=br(n);if(o={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null},hp(n))fp(i,o);else if(o=Gf(n,i,o,u),o!==null){var h=In();Mi(o,n,u,h),pp(o,i,u)}}function dv(n,i,o){var u=br(n),h={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null};if(hp(n))fp(i,h);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var T=i.lastRenderedState,U=m(T,o);if(h.hasEagerState=!0,h.eagerState=U,vi(U,T)){var k=i.interleaved;k===null?(h.next=h,tu(i)):(h.next=k.next,k.next=h),i.interleaved=h;return}}catch{}finally{}o=Gf(n,i,h,u),o!==null&&(h=In(),Mi(o,n,u,h),pp(o,i,u))}}function hp(n){var i=n.alternate;return n===$t||i!==null&&i===$t}function fp(n,i){Ha=Qo=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function pp(n,i,o){if((o&4194240)!==0){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,En(n,o)}}var nl={readContext:ri,useCallback:Tn,useContext:Tn,useEffect:Tn,useImperativeHandle:Tn,useInsertionEffect:Tn,useLayoutEffect:Tn,useMemo:Tn,useReducer:Tn,useRef:Tn,useState:Tn,useDebugValue:Tn,useDeferredValue:Tn,useTransition:Tn,useMutableSource:Tn,useSyncExternalStore:Tn,useId:Tn,unstable_isNewReconciler:!1},hv={readContext:ri,useCallback:function(n,i){return Ni().memoizedState=[n,i===void 0?null:i],n},useContext:ri,useEffect:ip,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,el(4194308,4,ap.bind(null,i,n),o)},useLayoutEffect:function(n,i){return el(4194308,4,n,i)},useInsertionEffect:function(n,i){return el(4,2,n,i)},useMemo:function(n,i){var o=Ni();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var u=Ni();return i=o!==void 0?o(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=uv.bind(null,$t,n),[u.memoizedState,n]},useRef:function(n){var i=Ni();return n={current:n},i.memoizedState=n},useState:tp,useDebugValue:pu,useDeferredValue:function(n){return Ni().memoizedState=n},useTransition:function(){var n=tp(!1),i=n[0];return n=cv.bind(null,n[1]),Ni().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var u=$t,h=Ni();if(Xt){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),fn===null)throw Error(t(349));(jr&30)!==0||Zf(u,i,o)}h.memoizedState=o;var m={value:o,getSnapshot:i};return h.queue=m,ip(Jf.bind(null,u,m,n),[n]),u.flags|=2048,Wa(9,jf.bind(null,u,m,o,i),void 0,null),o},useId:function(){var n=Ni(),i=fn.identifierPrefix;if(Xt){var o=Zi,u=$i;o=(u&~(1<<32-Le(u)-1)).toString(32)+o,i=":"+i+"R"+o,o=Va++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=lv++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},fv={readContext:ri,useCallback:lp,useContext:ri,useEffect:fu,useImperativeHandle:op,useInsertionEffect:rp,useLayoutEffect:sp,useMemo:cp,useReducer:du,useRef:np,useState:function(){return du(Ga)},useDebugValue:pu,useDeferredValue:function(n){var i=si();return up(i,ln.memoizedState,n)},useTransition:function(){var n=du(Ga)[0],i=si().memoizedState;return[n,i]},useMutableSource:Kf,useSyncExternalStore:$f,useId:dp,unstable_isNewReconciler:!1},pv={readContext:ri,useCallback:lp,useContext:ri,useEffect:fu,useImperativeHandle:op,useInsertionEffect:rp,useLayoutEffect:sp,useMemo:cp,useReducer:hu,useRef:np,useState:function(){return hu(Ga)},useDebugValue:pu,useDeferredValue:function(n){var i=si();return ln===null?i.memoizedState=n:up(i,ln.memoizedState,n)},useTransition:function(){var n=hu(Ga)[0],i=si().memoizedState;return[n,i]},useMutableSource:Kf,useSyncExternalStore:$f,useId:dp,unstable_isNewReconciler:!1};function xi(n,i){if(n&&n.defaultProps){i=Z({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function mu(n,i,o,u){i=n.memoizedState,o=o(u,i),o=o==null?i:Z({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var il={isMounted:function(n){return(n=n._reactInternals)?Dn(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var u=In(),h=br(n),m=Ji(u,h);m.payload=i,o!=null&&(m.callback=o),i=wr(n,m,h),i!==null&&(Mi(i,n,h,u),$o(i,n,h))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var u=In(),h=br(n),m=Ji(u,h);m.tag=1,m.payload=i,o!=null&&(m.callback=o),i=wr(n,m,h),i!==null&&(Mi(i,n,h,u),$o(i,n,h))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=In(),u=br(n),h=Ji(o,u);h.tag=2,i!=null&&(h.callback=i),i=wr(n,h,u),i!==null&&(Mi(i,n,u,o),$o(i,n,u))}};function mp(n,i,o,u,h,m,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,m,T):i.prototype&&i.prototype.isPureReactComponent?!Pa(o,u)||!Pa(h,m):!0}function gp(n,i,o){var u=!1,h=Sr,m=i.contextType;return typeof m=="object"&&m!==null?m=ri(m):(h=Bn(i)?Yr:wn.current,u=i.contextTypes,m=(u=u!=null)?Ps(n,h):Sr),i=new i(o,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=il,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=h,n.__reactInternalMemoizedMaskedChildContext=m),i}function vp(n,i,o,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,u),i.state!==n&&il.enqueueReplaceState(i,i.state,null)}function gu(n,i,o,u){var h=n.stateNode;h.props=o,h.state=n.memoizedState,h.refs={},nu(n);var m=i.contextType;typeof m=="object"&&m!==null?h.context=ri(m):(m=Bn(i)?Yr:wn.current,h.context=Ps(n,m)),h.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(mu(n,i,m,o),h.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(i=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),i!==h.state&&il.enqueueReplaceState(h,h.state,null),Zo(n,o,h,u),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308)}function ks(n,i){try{var o="",u=i;do o+=ze(u),u=u.return;while(u);var h=o}catch(m){h=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:h,digest:null}}function vu(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function _u(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var mv=typeof WeakMap=="function"?WeakMap:Map;function _p(n,i,o){o=Ji(-1,o),o.tag=3,o.payload={element:null};var u=i.value;return o.callback=function(){ul||(ul=!0,Nu=u),_u(n,i)},o}function xp(n,i,o){o=Ji(-1,o),o.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var h=i.value;o.payload=function(){return u(h)},o.callback=function(){_u(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(o.callback=function(){_u(n,i),typeof u!="function"&&(Ar===null?Ar=new Set([this]):Ar.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),o}function yp(n,i,o){var u=n.pingCache;if(u===null){u=n.pingCache=new mv;var h=new Set;u.set(i,h)}else h=u.get(i),h===void 0&&(h=new Set,u.set(i,h));h.has(o)||(h.add(o),n=Rv.bind(null,n,i,o),i.then(n,n))}function Sp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Mp(n,i,o,u,h){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Ji(-1,1),i.tag=2,wr(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=h,n)}var gv=C.ReactCurrentOwner,zn=!1;function Nn(n,i,o,u){i.child=n===null?Vf(i,null,o,u):Is(i,n.child,o,u)}function Ep(n,i,o,u,h){o=o.render;var m=i.ref;return Fs(i,h),u=cu(n,i,o,u,m,h),o=uu(),n!==null&&!zn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Qi(n,i,h)):(Xt&&o&&Yc(i),i.flags|=1,Nn(n,i,u,h),i.child)}function wp(n,i,o,u,h){if(n===null){var m=o.type;return typeof m=="function"&&!zu(m)&&m.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=m,Tp(n,i,m,u,h)):(n=gl(o.type,null,u,i,i.mode,h),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&h)===0){var T=m.memoizedProps;if(o=o.compare,o=o!==null?o:Pa,o(T,u)&&n.ref===i.ref)return Qi(n,i,h)}return i.flags|=1,n=Pr(m,u),n.ref=i.ref,n.return=i,i.child=n}function Tp(n,i,o,u,h){if(n!==null){var m=n.memoizedProps;if(Pa(m,u)&&n.ref===i.ref)if(zn=!1,i.pendingProps=u=m,(n.lanes&h)!==0)(n.flags&131072)!==0&&(zn=!0);else return i.lanes=n.lanes,Qi(n,i,h)}return xu(n,i,o,u,h)}function Ap(n,i,o){var u=i.pendingProps,h=u.children,m=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Bt(zs,Kn),Kn|=o;else{if((o&1073741824)===0)return n=m!==null?m.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Bt(zs,Kn),Kn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=m!==null?m.baseLanes:o,Bt(zs,Kn),Kn|=u}else m!==null?(u=m.baseLanes|o,i.memoizedState=null):u=o,Bt(zs,Kn),Kn|=u;return Nn(n,i,h,o),i.child}function Cp(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function xu(n,i,o,u,h){var m=Bn(o)?Yr:wn.current;return m=Ps(i,m),Fs(i,h),o=cu(n,i,o,u,m,h),u=uu(),n!==null&&!zn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Qi(n,i,h)):(Xt&&u&&Yc(i),i.flags|=1,Nn(n,i,o,h),i.child)}function bp(n,i,o,u,h){if(Bn(o)){var m=!0;Ho(i)}else m=!1;if(Fs(i,h),i.stateNode===null)sl(n,i),gp(i,o,u),gu(i,o,u,h),u=!0;else if(n===null){var T=i.stateNode,U=i.memoizedProps;T.props=U;var k=T.context,ue=o.contextType;typeof ue=="object"&&ue!==null?ue=ri(ue):(ue=Bn(o)?Yr:wn.current,ue=Ps(i,ue));var xe=o.getDerivedStateFromProps,Se=typeof xe=="function"||typeof T.getSnapshotBeforeUpdate=="function";Se||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(U!==u||k!==ue)&&vp(i,T,u,ue),Er=!1;var _e=i.memoizedState;T.state=_e,Zo(i,u,T,h),k=i.memoizedState,U!==u||_e!==k||kn.current||Er?(typeof xe=="function"&&(mu(i,o,xe,u),k=i.memoizedState),(U=Er||mp(i,o,U,u,_e,k,ue))?(Se||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=k),T.props=u,T.state=k,T.context=ue,u=U):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{T=i.stateNode,Wf(n,i),U=i.memoizedProps,ue=i.type===i.elementType?U:xi(i.type,U),T.props=ue,Se=i.pendingProps,_e=T.context,k=o.contextType,typeof k=="object"&&k!==null?k=ri(k):(k=Bn(o)?Yr:wn.current,k=Ps(i,k));var ke=o.getDerivedStateFromProps;(xe=typeof ke=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(U!==Se||_e!==k)&&vp(i,T,u,k),Er=!1,_e=i.memoizedState,T.state=_e,Zo(i,u,T,h);var Xe=i.memoizedState;U!==Se||_e!==Xe||kn.current||Er?(typeof ke=="function"&&(mu(i,o,ke,u),Xe=i.memoizedState),(ue=Er||mp(i,o,ue,u,_e,Xe,k)||!1)?(xe||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(u,Xe,k),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(u,Xe,k)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||U===n.memoizedProps&&_e===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&_e===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=Xe),T.props=u,T.state=Xe,T.context=k,u=ue):(typeof T.componentDidUpdate!="function"||U===n.memoizedProps&&_e===n.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||U===n.memoizedProps&&_e===n.memoizedState||(i.flags|=1024),u=!1)}return yu(n,i,o,u,m,h)}function yu(n,i,o,u,h,m){Cp(n,i);var T=(i.flags&128)!==0;if(!u&&!T)return h&&Nf(i,o,!1),Qi(n,i,m);u=i.stateNode,gv.current=i;var U=T&&typeof o.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&T?(i.child=Is(i,n.child,null,m),i.child=Is(i,null,U,m)):Nn(n,i,U,m),i.memoizedState=u.state,h&&Nf(i,o,!0),i.child}function Rp(n){var i=n.stateNode;i.pendingContext?Lf(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Lf(n,i.context,!1),iu(n,i.containerInfo)}function Pp(n,i,o,u,h){return Ns(),Zc(h),i.flags|=256,Nn(n,i,o,u),i.child}var Su={dehydrated:null,treeContext:null,retryLane:0};function Mu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Lp(n,i,o){var u=i.pendingProps,h=Kt.current,m=!1,T=(i.flags&128)!==0,U;if((U=T)||(U=n!==null&&n.memoizedState===null?!1:(h&2)!==0),U?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(h|=1),Bt(Kt,h&1),n===null)return $c(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=u.children,n=u.fallback,m?(u=i.mode,m=i.child,T={mode:"hidden",children:T},(u&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=T):m=vl(T,u,0,null),n=ns(n,u,o,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=Mu(o),i.memoizedState=Su,n):Eu(i,T));if(h=n.memoizedState,h!==null&&(U=h.dehydrated,U!==null))return vv(n,i,T,u,U,h,o);if(m){m=u.fallback,T=i.mode,h=n.child,U=h.sibling;var k={mode:"hidden",children:u.children};return(T&1)===0&&i.child!==h?(u=i.child,u.childLanes=0,u.pendingProps=k,i.deletions=null):(u=Pr(h,k),u.subtreeFlags=h.subtreeFlags&14680064),U!==null?m=Pr(U,m):(m=ns(m,T,o,null),m.flags|=2),m.return=i,u.return=i,u.sibling=m,i.child=u,u=m,m=i.child,T=n.child.memoizedState,T=T===null?Mu(o):{baseLanes:T.baseLanes|o,cachePool:null,transitions:T.transitions},m.memoizedState=T,m.childLanes=n.childLanes&~o,i.memoizedState=Su,u}return m=n.child,n=m.sibling,u=Pr(m,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=o),u.return=i,u.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=u,i.memoizedState=null,u}function Eu(n,i){return i=vl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function rl(n,i,o,u){return u!==null&&Zc(u),Is(i,n.child,null,o),n=Eu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function vv(n,i,o,u,h,m,T){if(o)return i.flags&256?(i.flags&=-257,u=vu(Error(t(422))),rl(n,i,T,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=u.fallback,h=i.mode,u=vl({mode:"visible",children:u.children},h,0,null),m=ns(m,h,T,null),m.flags|=2,u.return=i,m.return=i,u.sibling=m,i.child=u,(i.mode&1)!==0&&Is(i,n.child,null,T),i.child.memoizedState=Mu(T),i.memoizedState=Su,m);if((i.mode&1)===0)return rl(n,i,T,null);if(h.data==="$!"){if(u=h.nextSibling&&h.nextSibling.dataset,u)var U=u.dgst;return u=U,m=Error(t(419)),u=vu(m,u,void 0),rl(n,i,T,u)}if(U=(T&n.childLanes)!==0,zn||U){if(u=fn,u!==null){switch(T&-T){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(u.suspendedLanes|T))!==0?0:h,h!==0&&h!==m.retryLane&&(m.retryLane=h,ji(n,h),Mi(u,n,h,-1))}return Bu(),u=vu(Error(t(421))),rl(n,i,T,u)}return h.data==="$?"?(i.flags|=128,i.child=n.child,i=Pv.bind(null,n),h._reactRetry=i,null):(n=m.treeContext,qn=xr(h.nextSibling),Yn=i,Xt=!0,_i=null,n!==null&&(ni[ii++]=$i,ni[ii++]=Zi,ni[ii++]=qr,$i=n.id,Zi=n.overflow,qr=i),i=Eu(i,u.children),i.flags|=4096,i)}function Dp(n,i,o){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),eu(n.return,i,o)}function wu(n,i,o,u,h){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:h}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=u,m.tail=o,m.tailMode=h)}function Np(n,i,o){var u=i.pendingProps,h=u.revealOrder,m=u.tail;if(Nn(n,i,u.children,o),u=Kt.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Dp(n,o,i);else if(n.tag===19)Dp(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Bt(Kt,u),(i.mode&1)===0)i.memoizedState=null;else switch(h){case"forwards":for(o=i.child,h=null;o!==null;)n=o.alternate,n!==null&&jo(n)===null&&(h=o),o=o.sibling;o=h,o===null?(h=i.child,i.child=null):(h=o.sibling,o.sibling=null),wu(i,!1,h,o,m);break;case"backwards":for(o=null,h=i.child,i.child=null;h!==null;){if(n=h.alternate,n!==null&&jo(n)===null){i.child=h;break}n=h.sibling,h.sibling=o,o=h,h=n}wu(i,!0,o,null,m);break;case"together":wu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function sl(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Qi(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),Jr|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=Pr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=Pr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function _v(n,i,o){switch(i.tag){case 3:Rp(i),Ns();break;case 5:qf(i);break;case 1:Bn(i.type)&&Ho(i);break;case 4:iu(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,h=i.memoizedProps.value;Bt(qo,u._currentValue),u._currentValue=h;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(Bt(Kt,Kt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Lp(n,i,o):(Bt(Kt,Kt.current&1),n=Qi(n,i,o),n!==null?n.sibling:null);Bt(Kt,Kt.current&1);break;case 19:if(u=(o&i.childLanes)!==0,(n.flags&128)!==0){if(u)return Np(n,i,o);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),Bt(Kt,Kt.current),u)break;return null;case 22:case 23:return i.lanes=0,Ap(n,i,o)}return Qi(n,i,o)}var Ip,Tu,Up,Fp;Ip=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Tu=function(){},Up=function(n,i,o,u){var h=n.memoizedProps;if(h!==u){n=i.stateNode,Zr(Di.current);var m=null;switch(o){case"input":h=ht(n,h),u=ht(n,u),m=[];break;case"select":h=Z({},h,{value:void 0}),u=Z({},u,{value:void 0}),m=[];break;case"textarea":h=Gt(n,h),u=Gt(n,u),m=[];break;default:typeof h.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=ko)}Ke(o,u);var T;o=null;for(ue in h)if(!u.hasOwnProperty(ue)&&h.hasOwnProperty(ue)&&h[ue]!=null)if(ue==="style"){var U=h[ue];for(T in U)U.hasOwnProperty(T)&&(o||(o={}),o[T]="")}else ue!=="dangerouslySetInnerHTML"&&ue!=="children"&&ue!=="suppressContentEditableWarning"&&ue!=="suppressHydrationWarning"&&ue!=="autoFocus"&&(a.hasOwnProperty(ue)?m||(m=[]):(m=m||[]).push(ue,null));for(ue in u){var k=u[ue];if(U=h!=null?h[ue]:void 0,u.hasOwnProperty(ue)&&k!==U&&(k!=null||U!=null))if(ue==="style")if(U){for(T in U)!U.hasOwnProperty(T)||k&&k.hasOwnProperty(T)||(o||(o={}),o[T]="");for(T in k)k.hasOwnProperty(T)&&U[T]!==k[T]&&(o||(o={}),o[T]=k[T])}else o||(m||(m=[]),m.push(ue,o)),o=k;else ue==="dangerouslySetInnerHTML"?(k=k?k.__html:void 0,U=U?U.__html:void 0,k!=null&&U!==k&&(m=m||[]).push(ue,k)):ue==="children"?typeof k!="string"&&typeof k!="number"||(m=m||[]).push(ue,""+k):ue!=="suppressContentEditableWarning"&&ue!=="suppressHydrationWarning"&&(a.hasOwnProperty(ue)?(k!=null&&ue==="onScroll"&&zt("scroll",n),m||U===k||(m=[])):(m=m||[]).push(ue,k))}o&&(m=m||[]).push("style",o);var ue=m;(i.updateQueue=ue)&&(i.flags|=4)}},Fp=function(n,i,o,u){o!==u&&(i.flags|=4)};function Xa(n,i){if(!Xt)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function An(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,u=0;if(i)for(var h=n.child;h!==null;)o|=h.lanes|h.childLanes,u|=h.subtreeFlags&14680064,u|=h.flags&14680064,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)o|=h.lanes|h.childLanes,u|=h.subtreeFlags,u|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=u,n.childLanes=o,i}function xv(n,i,o){var u=i.pendingProps;switch(qc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return An(i),null;case 1:return Bn(i.type)&&zo(),An(i),null;case 3:return u=i.stateNode,Os(),Ht(kn),Ht(wn),au(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(Xo(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,_i!==null&&(Fu(_i),_i=null))),Tu(n,i),An(i),null;case 5:ru(i);var h=Zr(za.current);if(o=i.type,n!==null&&i.stateNode!=null)Up(n,i,o,u,h),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return An(i),null}if(n=Zr(Di.current),Xo(i)){u=i.stateNode,o=i.type;var m=i.memoizedProps;switch(u[Li]=i,u[Ua]=m,n=(i.mode&1)!==0,o){case"dialog":zt("cancel",u),zt("close",u);break;case"iframe":case"object":case"embed":zt("load",u);break;case"video":case"audio":for(h=0;h<Da.length;h++)zt(Da[h],u);break;case"source":zt("error",u);break;case"img":case"image":case"link":zt("error",u),zt("load",u);break;case"details":zt("toggle",u);break;case"input":_t(u,m),zt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!m.multiple},zt("invalid",u);break;case"textarea":W(u,m),zt("invalid",u)}Ke(o,m),h=null;for(var T in m)if(m.hasOwnProperty(T)){var U=m[T];T==="children"?typeof U=="string"?u.textContent!==U&&(m.suppressHydrationWarning!==!0&&Oo(u.textContent,U,n),h=["children",U]):typeof U=="number"&&u.textContent!==""+U&&(m.suppressHydrationWarning!==!0&&Oo(u.textContent,U,n),h=["children",""+U]):a.hasOwnProperty(T)&&U!=null&&T==="onScroll"&&zt("scroll",u)}switch(o){case"input":Fe(u),Ft(u,m,!0);break;case"textarea":Fe(u),At(u);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(u.onclick=ko)}u=h,i.updateQueue=u,u!==null&&(i.flags|=4)}else{T=h.nodeType===9?h:h.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=N(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=T.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=T.createElement(o,{is:u.is}):(n=T.createElement(o),o==="select"&&(T=n,u.multiple?T.multiple=!0:u.size&&(T.size=u.size))):n=T.createElementNS(n,o),n[Li]=i,n[Ua]=u,Ip(n,i,!1,!1),i.stateNode=n;e:{switch(T=Pe(o,u),o){case"dialog":zt("cancel",n),zt("close",n),h=u;break;case"iframe":case"object":case"embed":zt("load",n),h=u;break;case"video":case"audio":for(h=0;h<Da.length;h++)zt(Da[h],n);h=u;break;case"source":zt("error",n),h=u;break;case"img":case"image":case"link":zt("error",n),zt("load",n),h=u;break;case"details":zt("toggle",n),h=u;break;case"input":_t(n,u),h=ht(n,u),zt("invalid",n);break;case"option":h=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},h=Z({},u,{value:void 0}),zt("invalid",n);break;case"textarea":W(n,u),h=Gt(n,u),zt("invalid",n);break;default:h=u}Ke(o,h),U=h;for(m in U)if(U.hasOwnProperty(m)){var k=U[m];m==="style"?ge(n,k):m==="dangerouslySetInnerHTML"?(k=k?k.__html:void 0,k!=null&&oe(n,k)):m==="children"?typeof k=="string"?(o!=="textarea"||k!=="")&&fe(n,k):typeof k=="number"&&fe(n,""+k):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(a.hasOwnProperty(m)?k!=null&&m==="onScroll"&&zt("scroll",n):k!=null&&O(n,m,k,T))}switch(o){case"input":Fe(n),Ft(n,u,!1);break;case"textarea":Fe(n),At(n);break;case"option":u.value!=null&&n.setAttribute("value",""+de(u.value));break;case"select":n.multiple=!!u.multiple,m=u.value,m!=null?Lt(n,!!u.multiple,m,!1):u.defaultValue!=null&&Lt(n,!!u.multiple,u.defaultValue,!0);break;default:typeof h.onClick=="function"&&(n.onclick=ko)}switch(o){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return An(i),null;case 6:if(n&&i.stateNode!=null)Fp(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(o=Zr(za.current),Zr(Di.current),Xo(i)){if(u=i.stateNode,o=i.memoizedProps,u[Li]=i,(m=u.nodeValue!==o)&&(n=Yn,n!==null))switch(n.tag){case 3:Oo(u.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Oo(u.nodeValue,o,(n.mode&1)!==0)}m&&(i.flags|=4)}else u=(o.nodeType===9?o:o.ownerDocument).createTextNode(u),u[Li]=i,i.stateNode=u}return An(i),null;case 13:if(Ht(Kt),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Xt&&qn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Bf(),Ns(),i.flags|=98560,m=!1;else if(m=Xo(i),u!==null&&u.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[Li]=i}else Ns(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;An(i),m=!1}else _i!==null&&(Fu(_i),_i=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Kt.current&1)!==0?cn===0&&(cn=3):Bu())),i.updateQueue!==null&&(i.flags|=4),An(i),null);case 4:return Os(),Tu(n,i),n===null&&Na(i.stateNode.containerInfo),An(i),null;case 10:return Qc(i.type._context),An(i),null;case 17:return Bn(i.type)&&zo(),An(i),null;case 19:if(Ht(Kt),m=i.memoizedState,m===null)return An(i),null;if(u=(i.flags&128)!==0,T=m.rendering,T===null)if(u)Xa(m,!1);else{if(cn!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(T=jo(n),T!==null){for(i.flags|=128,Xa(m,!1),u=T.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=o,o=i.child;o!==null;)m=o,n=u,m.flags&=14680066,T=m.alternate,T===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=T.childLanes,m.lanes=T.lanes,m.child=T.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=T.memoizedProps,m.memoizedState=T.memoizedState,m.updateQueue=T.updateQueue,m.type=T.type,n=T.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return Bt(Kt,Kt.current&1|2),i.child}n=n.sibling}m.tail!==null&&qt()>Hs&&(i.flags|=128,u=!0,Xa(m,!1),i.lanes=4194304)}else{if(!u)if(n=jo(T),n!==null){if(i.flags|=128,u=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Xa(m,!0),m.tail===null&&m.tailMode==="hidden"&&!T.alternate&&!Xt)return An(i),null}else 2*qt()-m.renderingStartTime>Hs&&o!==1073741824&&(i.flags|=128,u=!0,Xa(m,!1),i.lanes=4194304);m.isBackwards?(T.sibling=i.child,i.child=T):(o=m.last,o!==null?o.sibling=T:i.child=T,m.last=T)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=qt(),i.sibling=null,o=Kt.current,Bt(Kt,u?o&1|2:o&1),i):(An(i),null);case 22:case 23:return ku(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(Kn&1073741824)!==0&&(An(i),i.subtreeFlags&6&&(i.flags|=8192)):An(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function yv(n,i){switch(qc(i),i.tag){case 1:return Bn(i.type)&&zo(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Os(),Ht(kn),Ht(wn),au(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return ru(i),null;case 13:if(Ht(Kt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ns()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Ht(Kt),null;case 4:return Os(),null;case 10:return Qc(i.type._context),null;case 22:case 23:return ku(),null;case 24:return null;default:return null}}var al=!1,Cn=!1,Sv=typeof WeakSet=="function"?WeakSet:Set,He=null;function Bs(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(u){Qt(n,i,u)}else o.current=null}function Au(n,i,o){try{o()}catch(u){Qt(n,i,u)}}var Op=!1;function Mv(n,i){if(kc=Ao,n=mf(),Pc(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var h=u.anchorOffset,m=u.focusNode;u=u.focusOffset;try{o.nodeType,m.nodeType}catch{o=null;break e}var T=0,U=-1,k=-1,ue=0,xe=0,Se=n,_e=null;t:for(;;){for(var ke;Se!==o||h!==0&&Se.nodeType!==3||(U=T+h),Se!==m||u!==0&&Se.nodeType!==3||(k=T+u),Se.nodeType===3&&(T+=Se.nodeValue.length),(ke=Se.firstChild)!==null;)_e=Se,Se=ke;for(;;){if(Se===n)break t;if(_e===o&&++ue===h&&(U=T),_e===m&&++xe===u&&(k=T),(ke=Se.nextSibling)!==null)break;Se=_e,_e=Se.parentNode}Se=ke}o=U===-1||k===-1?null:{start:U,end:k}}else o=null}o=o||{start:0,end:0}}else o=null;for(Bc={focusedElem:n,selectionRange:o},Ao=!1,He=i;He!==null;)if(i=He,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,He=n;else for(;He!==null;){i=He;try{var Xe=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Xe!==null){var qe=Xe.memoizedProps,tn=Xe.memoizedState,ie=i.stateNode,X=ie.getSnapshotBeforeUpdate(i.elementType===i.type?qe:xi(i.type,qe),tn);ie.__reactInternalSnapshotBeforeUpdate=X}break;case 3:var se=i.stateNode.containerInfo;se.nodeType===1?se.textContent="":se.nodeType===9&&se.documentElement&&se.removeChild(se.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(we){Qt(i,i.return,we)}if(n=i.sibling,n!==null){n.return=i.return,He=n;break}He=i.return}return Xe=Op,Op=!1,Xe}function Ya(n,i,o){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var h=u=u.next;do{if((h.tag&n)===n){var m=h.destroy;h.destroy=void 0,m!==void 0&&Au(i,o,m)}h=h.next}while(h!==u)}}function ol(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var u=o.create;o.destroy=u()}o=o.next}while(o!==i)}}function Cu(n){var i=n.ref;if(i!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof i=="function"?i(n):i.current=n}}function kp(n){var i=n.alternate;i!==null&&(n.alternate=null,kp(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[Li],delete i[Ua],delete i[Gc],delete i[rv],delete i[sv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Bp(n){return n.tag===5||n.tag===3||n.tag===4}function zp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Bp(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function bu(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ko));else if(u!==4&&(n=n.child,n!==null))for(bu(n,i,o),n=n.sibling;n!==null;)bu(n,i,o),n=n.sibling}function Ru(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(Ru(n,i,o),n=n.sibling;n!==null;)Ru(n,i,o),n=n.sibling}var _n=null,yi=!1;function Tr(n,i,o){for(o=o.child;o!==null;)Hp(n,i,o),o=o.sibling}function Hp(n,i,o){if(Q&&typeof Q.onCommitFiberUnmount=="function")try{Q.onCommitFiberUnmount(ne,o)}catch{}switch(o.tag){case 5:Cn||Bs(o,i);case 6:var u=_n,h=yi;_n=null,Tr(n,i,o),_n=u,yi=h,_n!==null&&(yi?(n=_n,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):_n.removeChild(o.stateNode));break;case 18:_n!==null&&(yi?(n=_n,o=o.stateNode,n.nodeType===8?Vc(n.parentNode,o):n.nodeType===1&&Vc(n,o),wa(n)):Vc(_n,o.stateNode));break;case 4:u=_n,h=yi,_n=o.stateNode.containerInfo,yi=!0,Tr(n,i,o),_n=u,yi=h;break;case 0:case 11:case 14:case 15:if(!Cn&&(u=o.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){h=u=u.next;do{var m=h,T=m.destroy;m=m.tag,T!==void 0&&((m&2)!==0||(m&4)!==0)&&Au(o,i,T),h=h.next}while(h!==u)}Tr(n,i,o);break;case 1:if(!Cn&&(Bs(o,i),u=o.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=o.memoizedProps,u.state=o.memoizedState,u.componentWillUnmount()}catch(U){Qt(o,i,U)}Tr(n,i,o);break;case 21:Tr(n,i,o);break;case 22:o.mode&1?(Cn=(u=Cn)||o.memoizedState!==null,Tr(n,i,o),Cn=u):Tr(n,i,o);break;default:Tr(n,i,o)}}function Vp(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new Sv),i.forEach(function(u){var h=Lv.bind(null,n,u);o.has(u)||(o.add(u),u.then(h,h))})}}function Si(n,i){var o=i.deletions;if(o!==null)for(var u=0;u<o.length;u++){var h=o[u];try{var m=n,T=i,U=T;e:for(;U!==null;){switch(U.tag){case 5:_n=U.stateNode,yi=!1;break e;case 3:_n=U.stateNode.containerInfo,yi=!0;break e;case 4:_n=U.stateNode.containerInfo,yi=!0;break e}U=U.return}if(_n===null)throw Error(t(160));Hp(m,T,h),_n=null,yi=!1;var k=h.alternate;k!==null&&(k.return=null),h.return=null}catch(ue){Qt(h,i,ue)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Gp(i,n),i=i.sibling}function Gp(n,i){var o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Si(i,n),Ii(n),u&4){try{Ya(3,n,n.return),ol(3,n)}catch(qe){Qt(n,n.return,qe)}try{Ya(5,n,n.return)}catch(qe){Qt(n,n.return,qe)}}break;case 1:Si(i,n),Ii(n),u&512&&o!==null&&Bs(o,o.return);break;case 5:if(Si(i,n),Ii(n),u&512&&o!==null&&Bs(o,o.return),n.flags&32){var h=n.stateNode;try{fe(h,"")}catch(qe){Qt(n,n.return,qe)}}if(u&4&&(h=n.stateNode,h!=null)){var m=n.memoizedProps,T=o!==null?o.memoizedProps:m,U=n.type,k=n.updateQueue;if(n.updateQueue=null,k!==null)try{U==="input"&&m.type==="radio"&&m.name!=null&&Dt(h,m),Pe(U,T);var ue=Pe(U,m);for(T=0;T<k.length;T+=2){var xe=k[T],Se=k[T+1];xe==="style"?ge(h,Se):xe==="dangerouslySetInnerHTML"?oe(h,Se):xe==="children"?fe(h,Se):O(h,xe,Se,ue)}switch(U){case"input":ft(h,m);break;case"textarea":an(h,m);break;case"select":var _e=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!m.multiple;var ke=m.value;ke!=null?Lt(h,!!m.multiple,ke,!1):_e!==!!m.multiple&&(m.defaultValue!=null?Lt(h,!!m.multiple,m.defaultValue,!0):Lt(h,!!m.multiple,m.multiple?[]:"",!1))}h[Ua]=m}catch(qe){Qt(n,n.return,qe)}}break;case 6:if(Si(i,n),Ii(n),u&4){if(n.stateNode===null)throw Error(t(162));h=n.stateNode,m=n.memoizedProps;try{h.nodeValue=m}catch(qe){Qt(n,n.return,qe)}}break;case 3:if(Si(i,n),Ii(n),u&4&&o!==null&&o.memoizedState.isDehydrated)try{wa(i.containerInfo)}catch(qe){Qt(n,n.return,qe)}break;case 4:Si(i,n),Ii(n);break;case 13:Si(i,n),Ii(n),h=n.child,h.flags&8192&&(m=h.memoizedState!==null,h.stateNode.isHidden=m,!m||h.alternate!==null&&h.alternate.memoizedState!==null||(Du=qt())),u&4&&Vp(n);break;case 22:if(xe=o!==null&&o.memoizedState!==null,n.mode&1?(Cn=(ue=Cn)||xe,Si(i,n),Cn=ue):Si(i,n),Ii(n),u&8192){if(ue=n.memoizedState!==null,(n.stateNode.isHidden=ue)&&!xe&&(n.mode&1)!==0)for(He=n,xe=n.child;xe!==null;){for(Se=He=xe;He!==null;){switch(_e=He,ke=_e.child,_e.tag){case 0:case 11:case 14:case 15:Ya(4,_e,_e.return);break;case 1:Bs(_e,_e.return);var Xe=_e.stateNode;if(typeof Xe.componentWillUnmount=="function"){u=_e,o=_e.return;try{i=u,Xe.props=i.memoizedProps,Xe.state=i.memoizedState,Xe.componentWillUnmount()}catch(qe){Qt(u,o,qe)}}break;case 5:Bs(_e,_e.return);break;case 22:if(_e.memoizedState!==null){Yp(Se);continue}}ke!==null?(ke.return=_e,He=ke):Yp(Se)}xe=xe.sibling}e:for(xe=null,Se=n;;){if(Se.tag===5){if(xe===null){xe=Se;try{h=Se.stateNode,ue?(m=h.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(U=Se.stateNode,k=Se.memoizedProps.style,T=k!=null&&k.hasOwnProperty("display")?k.display:null,U.style.display=pe("display",T))}catch(qe){Qt(n,n.return,qe)}}}else if(Se.tag===6){if(xe===null)try{Se.stateNode.nodeValue=ue?"":Se.memoizedProps}catch(qe){Qt(n,n.return,qe)}}else if((Se.tag!==22&&Se.tag!==23||Se.memoizedState===null||Se===n)&&Se.child!==null){Se.child.return=Se,Se=Se.child;continue}if(Se===n)break e;for(;Se.sibling===null;){if(Se.return===null||Se.return===n)break e;xe===Se&&(xe=null),Se=Se.return}xe===Se&&(xe=null),Se.sibling.return=Se.return,Se=Se.sibling}}break;case 19:Si(i,n),Ii(n),u&4&&Vp(n);break;case 21:break;default:Si(i,n),Ii(n)}}function Ii(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(Bp(o)){var u=o;break e}o=o.return}throw Error(t(160))}switch(u.tag){case 5:var h=u.stateNode;u.flags&32&&(fe(h,""),u.flags&=-33);var m=zp(n);Ru(n,m,h);break;case 3:case 4:var T=u.stateNode.containerInfo,U=zp(n);bu(n,U,T);break;default:throw Error(t(161))}}catch(k){Qt(n,n.return,k)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function Ev(n,i,o){He=n,Wp(n)}function Wp(n,i,o){for(var u=(n.mode&1)!==0;He!==null;){var h=He,m=h.child;if(h.tag===22&&u){var T=h.memoizedState!==null||al;if(!T){var U=h.alternate,k=U!==null&&U.memoizedState!==null||Cn;U=al;var ue=Cn;if(al=T,(Cn=k)&&!ue)for(He=h;He!==null;)T=He,k=T.child,T.tag===22&&T.memoizedState!==null?qp(h):k!==null?(k.return=T,He=k):qp(h);for(;m!==null;)He=m,Wp(m),m=m.sibling;He=h,al=U,Cn=ue}Xp(n)}else(h.subtreeFlags&8772)!==0&&m!==null?(m.return=h,He=m):Xp(n)}}function Xp(n){for(;He!==null;){var i=He;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:Cn||ol(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!Cn)if(o===null)u.componentDidMount();else{var h=i.elementType===i.type?o.memoizedProps:xi(i.type,o.memoizedProps);u.componentDidUpdate(h,o.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&Yf(i,m,u);break;case 3:var T=i.updateQueue;if(T!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}Yf(i,T,o)}break;case 5:var U=i.stateNode;if(o===null&&i.flags&4){o=U;var k=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":k.autoFocus&&o.focus();break;case"img":k.src&&(o.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var ue=i.alternate;if(ue!==null){var xe=ue.memoizedState;if(xe!==null){var Se=xe.dehydrated;Se!==null&&wa(Se)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Cn||i.flags&512&&Cu(i)}catch(_e){Qt(i,i.return,_e)}}if(i===n){He=null;break}if(o=i.sibling,o!==null){o.return=i.return,He=o;break}He=i.return}}function Yp(n){for(;He!==null;){var i=He;if(i===n){He=null;break}var o=i.sibling;if(o!==null){o.return=i.return,He=o;break}He=i.return}}function qp(n){for(;He!==null;){var i=He;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{ol(4,i)}catch(k){Qt(i,o,k)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var h=i.return;try{u.componentDidMount()}catch(k){Qt(i,h,k)}}var m=i.return;try{Cu(i)}catch(k){Qt(i,m,k)}break;case 5:var T=i.return;try{Cu(i)}catch(k){Qt(i,T,k)}}}catch(k){Qt(i,i.return,k)}if(i===n){He=null;break}var U=i.sibling;if(U!==null){U.return=i.return,He=U;break}He=i.return}}var wv=Math.ceil,ll=C.ReactCurrentDispatcher,Pu=C.ReactCurrentOwner,ai=C.ReactCurrentBatchConfig,wt=0,fn=null,rn=null,xn=0,Kn=0,zs=yr(0),cn=0,qa=null,Jr=0,cl=0,Lu=0,Ka=null,Hn=null,Du=0,Hs=1/0,er=null,ul=!1,Nu=null,Ar=null,dl=!1,Cr=null,hl=0,$a=0,Iu=null,fl=-1,pl=0;function In(){return(wt&6)!==0?qt():fl!==-1?fl:fl=qt()}function br(n){return(n.mode&1)===0?1:(wt&2)!==0&&xn!==0?xn&-xn:ov.transition!==null?(pl===0&&(pl=on()),pl):(n=pt,n!==0||(n=window.event,n=n===void 0?16:Kh(n.type)),n)}function Mi(n,i,o,u){if(50<$a)throw $a=0,Iu=null,Error(t(185));en(n,o,u),((wt&2)===0||n!==fn)&&(n===fn&&((wt&2)===0&&(cl|=o),cn===4&&Rr(n,xn)),Vn(n,u),o===1&&wt===0&&(i.mode&1)===0&&(Hs=qt()+500,Vo&&Mr()))}function Vn(n,i){var o=n.callbackNode;Ot(n,i);var u=xt(n,n===fn?xn:0);if(u===0)o!==null&&va(o),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(o!=null&&va(o),i===1)n.tag===0?av($p.bind(null,n)):If($p.bind(null,n)),nv(function(){(wt&6)===0&&Mr()}),o=null;else{switch(fi(u)){case 1:o=_a;break;case 4:o=xa;break;case 16:o=A;break;case 536870912:o=ce;break;default:o=A}o=im(o,Kp.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function Kp(n,i){if(fl=-1,pl=0,(wt&6)!==0)throw Error(t(327));var o=n.callbackNode;if(Vs()&&n.callbackNode!==o)return null;var u=xt(n,n===fn?xn:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||i)i=ml(n,u);else{i=u;var h=wt;wt|=2;var m=jp();(fn!==n||xn!==i)&&(er=null,Hs=qt()+500,es(n,i));do try{Cv();break}catch(U){Zp(n,U)}while(!0);Jc(),ll.current=m,wt=h,rn!==null?i=0:(fn=null,xn=0,i=cn)}if(i!==0){if(i===2&&(h=Pt(n),h!==0&&(u=h,i=Uu(n,h))),i===1)throw o=qa,es(n,0),Rr(n,u),Vn(n,qt()),o;if(i===6)Rr(n,u);else{if(h=n.current.alternate,(u&30)===0&&!Tv(h)&&(i=ml(n,u),i===2&&(m=Pt(n),m!==0&&(u=m,i=Uu(n,m))),i===1))throw o=qa,es(n,0),Rr(n,u),Vn(n,qt()),o;switch(n.finishedWork=h,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:ts(n,Hn,er);break;case 3:if(Rr(n,u),(u&130023424)===u&&(i=Du+500-qt(),10<i)){if(xt(n,0)!==0)break;if(h=n.suspendedLanes,(h&u)!==u){In(),n.pingedLanes|=n.suspendedLanes&h;break}n.timeoutHandle=Hc(ts.bind(null,n,Hn,er),i);break}ts(n,Hn,er);break;case 4:if(Rr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,h=-1;0<u;){var T=31-Le(u);m=1<<T,T=i[T],T>h&&(h=T),u&=~m}if(u=h,u=qt()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*wv(u/1960))-u,10<u){n.timeoutHandle=Hc(ts.bind(null,n,Hn,er),u);break}ts(n,Hn,er);break;case 5:ts(n,Hn,er);break;default:throw Error(t(329))}}}return Vn(n,qt()),n.callbackNode===o?Kp.bind(null,n):null}function Uu(n,i){var o=Ka;return n.current.memoizedState.isDehydrated&&(es(n,i).flags|=256),n=ml(n,i),n!==2&&(i=Hn,Hn=o,i!==null&&Fu(i)),n}function Fu(n){Hn===null?Hn=n:Hn.push.apply(Hn,n)}function Tv(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var u=0;u<o.length;u++){var h=o[u],m=h.getSnapshot;h=h.value;try{if(!vi(m(),h))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Rr(n,i){for(i&=~Lu,i&=~cl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-Le(i),u=1<<o;n[o]=-1,i&=~u}}function $p(n){if((wt&6)!==0)throw Error(t(327));Vs();var i=xt(n,0);if((i&1)===0)return Vn(n,qt()),null;var o=ml(n,i);if(n.tag!==0&&o===2){var u=Pt(n);u!==0&&(i=u,o=Uu(n,u))}if(o===1)throw o=qa,es(n,0),Rr(n,i),Vn(n,qt()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,ts(n,Hn,er),Vn(n,qt()),null}function Ou(n,i){var o=wt;wt|=1;try{return n(i)}finally{wt=o,wt===0&&(Hs=qt()+500,Vo&&Mr())}}function Qr(n){Cr!==null&&Cr.tag===0&&(wt&6)===0&&Vs();var i=wt;wt|=1;var o=ai.transition,u=pt;try{if(ai.transition=null,pt=1,n)return n()}finally{pt=u,ai.transition=o,wt=i,(wt&6)===0&&Mr()}}function ku(){Kn=zs.current,Ht(zs)}function es(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,tv(o)),rn!==null)for(o=rn.return;o!==null;){var u=o;switch(qc(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&zo();break;case 3:Os(),Ht(kn),Ht(wn),au();break;case 5:ru(u);break;case 4:Os();break;case 13:Ht(Kt);break;case 19:Ht(Kt);break;case 10:Qc(u.type._context);break;case 22:case 23:ku()}o=o.return}if(fn=n,rn=n=Pr(n.current,null),xn=Kn=i,cn=0,qa=null,Lu=cl=Jr=0,Hn=Ka=null,$r!==null){for(i=0;i<$r.length;i++)if(o=$r[i],u=o.interleaved,u!==null){o.interleaved=null;var h=u.next,m=o.pending;if(m!==null){var T=m.next;m.next=h,u.next=T}o.pending=u}$r=null}return n}function Zp(n,i){do{var o=rn;try{if(Jc(),Jo.current=nl,Qo){for(var u=$t.memoizedState;u!==null;){var h=u.queue;h!==null&&(h.pending=null),u=u.next}Qo=!1}if(jr=0,hn=ln=$t=null,Ha=!1,Va=0,Pu.current=null,o===null||o.return===null){cn=1,qa=i,rn=null;break}e:{var m=n,T=o.return,U=o,k=i;if(i=xn,U.flags|=32768,k!==null&&typeof k=="object"&&typeof k.then=="function"){var ue=k,xe=U,Se=xe.tag;if((xe.mode&1)===0&&(Se===0||Se===11||Se===15)){var _e=xe.alternate;_e?(xe.updateQueue=_e.updateQueue,xe.memoizedState=_e.memoizedState,xe.lanes=_e.lanes):(xe.updateQueue=null,xe.memoizedState=null)}var ke=Sp(T);if(ke!==null){ke.flags&=-257,Mp(ke,T,U,m,i),ke.mode&1&&yp(m,ue,i),i=ke,k=ue;var Xe=i.updateQueue;if(Xe===null){var qe=new Set;qe.add(k),i.updateQueue=qe}else Xe.add(k);break e}else{if((i&1)===0){yp(m,ue,i),Bu();break e}k=Error(t(426))}}else if(Xt&&U.mode&1){var tn=Sp(T);if(tn!==null){(tn.flags&65536)===0&&(tn.flags|=256),Mp(tn,T,U,m,i),Zc(ks(k,U));break e}}m=k=ks(k,U),cn!==4&&(cn=2),Ka===null?Ka=[m]:Ka.push(m),m=T;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var ie=_p(m,k,i);Xf(m,ie);break e;case 1:U=k;var X=m.type,se=m.stateNode;if((m.flags&128)===0&&(typeof X.getDerivedStateFromError=="function"||se!==null&&typeof se.componentDidCatch=="function"&&(Ar===null||!Ar.has(se)))){m.flags|=65536,i&=-i,m.lanes|=i;var we=xp(m,U,i);Xf(m,we);break e}}m=m.return}while(m!==null)}Qp(o)}catch(Je){i=Je,rn===o&&o!==null&&(rn=o=o.return);continue}break}while(!0)}function jp(){var n=ll.current;return ll.current=nl,n===null?nl:n}function Bu(){(cn===0||cn===3||cn===2)&&(cn=4),fn===null||(Jr&268435455)===0&&(cl&268435455)===0||Rr(fn,xn)}function ml(n,i){var o=wt;wt|=2;var u=jp();(fn!==n||xn!==i)&&(er=null,es(n,i));do try{Av();break}catch(h){Zp(n,h)}while(!0);if(Jc(),wt=o,ll.current=u,rn!==null)throw Error(t(261));return fn=null,xn=0,cn}function Av(){for(;rn!==null;)Jp(rn)}function Cv(){for(;rn!==null&&!wo();)Jp(rn)}function Jp(n){var i=nm(n.alternate,n,Kn);n.memoizedProps=n.pendingProps,i===null?Qp(n):rn=i,Pu.current=null}function Qp(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=xv(o,i,Kn),o!==null){rn=o;return}}else{if(o=yv(o,i),o!==null){o.flags&=32767,rn=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{cn=6,rn=null;return}}if(i=i.sibling,i!==null){rn=i;return}rn=i=n}while(i!==null);cn===0&&(cn=5)}function ts(n,i,o){var u=pt,h=ai.transition;try{ai.transition=null,pt=1,bv(n,i,o,u)}finally{ai.transition=h,pt=u}return null}function bv(n,i,o,u){do Vs();while(Cr!==null);if((wt&6)!==0)throw Error(t(327));o=n.finishedWork;var h=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=o.lanes|o.childLanes;if(yt(n,m),n===fn&&(rn=fn=null,xn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||dl||(dl=!0,im(A,function(){return Vs(),null})),m=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||m){m=ai.transition,ai.transition=null;var T=pt;pt=1;var U=wt;wt|=4,Pu.current=null,Mv(n,o),Gp(o,n),K0(Bc),Ao=!!kc,Bc=kc=null,n.current=o,Ev(o),vc(),wt=U,pt=T,ai.transition=m}else n.current=o;if(dl&&(dl=!1,Cr=n,hl=h),m=n.pendingLanes,m===0&&(Ar=null),Ne(o.stateNode),Vn(n,qt()),i!==null)for(u=n.onRecoverableError,o=0;o<i.length;o++)h=i[o],u(h.value,{componentStack:h.stack,digest:h.digest});if(ul)throw ul=!1,n=Nu,Nu=null,n;return(hl&1)!==0&&n.tag!==0&&Vs(),m=n.pendingLanes,(m&1)!==0?n===Iu?$a++:($a=0,Iu=n):$a=0,Mr(),null}function Vs(){if(Cr!==null){var n=fi(hl),i=ai.transition,o=pt;try{if(ai.transition=null,pt=16>n?16:n,Cr===null)var u=!1;else{if(n=Cr,Cr=null,hl=0,(wt&6)!==0)throw Error(t(331));var h=wt;for(wt|=4,He=n.current;He!==null;){var m=He,T=m.child;if((He.flags&16)!==0){var U=m.deletions;if(U!==null){for(var k=0;k<U.length;k++){var ue=U[k];for(He=ue;He!==null;){var xe=He;switch(xe.tag){case 0:case 11:case 15:Ya(8,xe,m)}var Se=xe.child;if(Se!==null)Se.return=xe,He=Se;else for(;He!==null;){xe=He;var _e=xe.sibling,ke=xe.return;if(kp(xe),xe===ue){He=null;break}if(_e!==null){_e.return=ke,He=_e;break}He=ke}}}var Xe=m.alternate;if(Xe!==null){var qe=Xe.child;if(qe!==null){Xe.child=null;do{var tn=qe.sibling;qe.sibling=null,qe=tn}while(qe!==null)}}He=m}}if((m.subtreeFlags&2064)!==0&&T!==null)T.return=m,He=T;else e:for(;He!==null;){if(m=He,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:Ya(9,m,m.return)}var ie=m.sibling;if(ie!==null){ie.return=m.return,He=ie;break e}He=m.return}}var X=n.current;for(He=X;He!==null;){T=He;var se=T.child;if((T.subtreeFlags&2064)!==0&&se!==null)se.return=T,He=se;else e:for(T=X;He!==null;){if(U=He,(U.flags&2048)!==0)try{switch(U.tag){case 0:case 11:case 15:ol(9,U)}}catch(Je){Qt(U,U.return,Je)}if(U===T){He=null;break e}var we=U.sibling;if(we!==null){we.return=U.return,He=we;break e}He=U.return}}if(wt=h,Mr(),Q&&typeof Q.onPostCommitFiberRoot=="function")try{Q.onPostCommitFiberRoot(ne,n)}catch{}u=!0}return u}finally{pt=o,ai.transition=i}}return!1}function em(n,i,o){i=ks(o,i),i=_p(n,i,1),n=wr(n,i,1),i=In(),n!==null&&(en(n,1,i),Vn(n,i))}function Qt(n,i,o){if(n.tag===3)em(n,n,o);else for(;i!==null;){if(i.tag===3){em(i,n,o);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(Ar===null||!Ar.has(u))){n=ks(o,n),n=xp(i,n,1),i=wr(i,n,1),n=In(),i!==null&&(en(i,1,n),Vn(i,n));break}}i=i.return}}function Rv(n,i,o){var u=n.pingCache;u!==null&&u.delete(i),i=In(),n.pingedLanes|=n.suspendedLanes&o,fn===n&&(xn&o)===o&&(cn===4||cn===3&&(xn&130023424)===xn&&500>qt()-Du?es(n,0):Lu|=o),Vn(n,i)}function tm(n,i){i===0&&((n.mode&1)===0?i=1:(i=ut,ut<<=1,(ut&130023424)===0&&(ut=4194304)));var o=In();n=ji(n,i),n!==null&&(en(n,i,o),Vn(n,o))}function Pv(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),tm(n,o)}function Lv(n,i){var o=0;switch(n.tag){case 13:var u=n.stateNode,h=n.memoizedState;h!==null&&(o=h.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),tm(n,o)}var nm;nm=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||kn.current)zn=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return zn=!1,_v(n,i,o);zn=(n.flags&131072)!==0}else zn=!1,Xt&&(i.flags&1048576)!==0&&Uf(i,Wo,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;sl(n,i),n=i.pendingProps;var h=Ps(i,wn.current);Fs(i,o),h=cu(null,i,u,n,h,o);var m=uu();return i.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Bn(u)?(m=!0,Ho(i)):m=!1,i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,nu(i),h.updater=il,i.stateNode=h,h._reactInternals=i,gu(i,u,n,o),i=yu(null,i,u,!0,m,o)):(i.tag=0,Xt&&m&&Yc(i),Nn(null,i,h,o),i=i.child),i;case 16:u=i.elementType;e:{switch(sl(n,i),n=i.pendingProps,h=u._init,u=h(u._payload),i.type=u,h=i.tag=Nv(u),n=xi(u,n),h){case 0:i=xu(null,i,u,n,o);break e;case 1:i=bp(null,i,u,n,o);break e;case 11:i=Ep(null,i,u,n,o);break e;case 14:i=wp(null,i,u,xi(u.type,n),o);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:xi(u,h),xu(n,i,u,h,o);case 1:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:xi(u,h),bp(n,i,u,h,o);case 3:e:{if(Rp(i),n===null)throw Error(t(387));u=i.pendingProps,m=i.memoizedState,h=m.element,Wf(n,i),Zo(i,u,null,o);var T=i.memoizedState;if(u=T.element,m.isDehydrated)if(m={element:u,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){h=ks(Error(t(423)),i),i=Pp(n,i,u,o,h);break e}else if(u!==h){h=ks(Error(t(424)),i),i=Pp(n,i,u,o,h);break e}else for(qn=xr(i.stateNode.containerInfo.firstChild),Yn=i,Xt=!0,_i=null,o=Vf(i,null,u,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Ns(),u===h){i=Qi(n,i,o);break e}Nn(n,i,u,o)}i=i.child}return i;case 5:return qf(i),n===null&&$c(i),u=i.type,h=i.pendingProps,m=n!==null?n.memoizedProps:null,T=h.children,zc(u,h)?T=null:m!==null&&zc(u,m)&&(i.flags|=32),Cp(n,i),Nn(n,i,T,o),i.child;case 6:return n===null&&$c(i),null;case 13:return Lp(n,i,o);case 4:return iu(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=Is(i,null,u,o):Nn(n,i,u,o),i.child;case 11:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:xi(u,h),Ep(n,i,u,h,o);case 7:return Nn(n,i,i.pendingProps,o),i.child;case 8:return Nn(n,i,i.pendingProps.children,o),i.child;case 12:return Nn(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(u=i.type._context,h=i.pendingProps,m=i.memoizedProps,T=h.value,Bt(qo,u._currentValue),u._currentValue=T,m!==null)if(vi(m.value,T)){if(m.children===h.children&&!kn.current){i=Qi(n,i,o);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var U=m.dependencies;if(U!==null){T=m.child;for(var k=U.firstContext;k!==null;){if(k.context===u){if(m.tag===1){k=Ji(-1,o&-o),k.tag=2;var ue=m.updateQueue;if(ue!==null){ue=ue.shared;var xe=ue.pending;xe===null?k.next=k:(k.next=xe.next,xe.next=k),ue.pending=k}}m.lanes|=o,k=m.alternate,k!==null&&(k.lanes|=o),eu(m.return,o,i),U.lanes|=o;break}k=k.next}}else if(m.tag===10)T=m.type===i.type?null:m.child;else if(m.tag===18){if(T=m.return,T===null)throw Error(t(341));T.lanes|=o,U=T.alternate,U!==null&&(U.lanes|=o),eu(T,o,i),T=m.sibling}else T=m.child;if(T!==null)T.return=m;else for(T=m;T!==null;){if(T===i){T=null;break}if(m=T.sibling,m!==null){m.return=T.return,T=m;break}T=T.return}m=T}Nn(n,i,h.children,o),i=i.child}return i;case 9:return h=i.type,u=i.pendingProps.children,Fs(i,o),h=ri(h),u=u(h),i.flags|=1,Nn(n,i,u,o),i.child;case 14:return u=i.type,h=xi(u,i.pendingProps),h=xi(u.type,h),wp(n,i,u,h,o);case 15:return Tp(n,i,i.type,i.pendingProps,o);case 17:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:xi(u,h),sl(n,i),i.tag=1,Bn(u)?(n=!0,Ho(i)):n=!1,Fs(i,o),gp(i,u,h),gu(i,u,h,o),yu(null,i,u,!0,n,o);case 19:return Np(n,i,o);case 22:return Ap(n,i,o)}throw Error(t(156,i.tag))};function im(n,i){return Wr(n,i)}function Dv(n,i,o,u){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oi(n,i,o,u){return new Dv(n,i,o,u)}function zu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Nv(n){if(typeof n=="function")return zu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===K)return 11;if(n===J)return 14}return 2}function Pr(n,i){var o=n.alternate;return o===null?(o=oi(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function gl(n,i,o,u,h,m){var T=2;if(u=n,typeof n=="function")zu(n)&&(T=1);else if(typeof n=="string")T=5;else e:switch(n){case F:return ns(o.children,h,m,i);case w:T=8,h|=8;break;case D:return n=oi(12,o,i,h|2),n.elementType=D,n.lanes=m,n;case ee:return n=oi(13,o,i,h),n.elementType=ee,n.lanes=m,n;case V:return n=oi(19,o,i,h),n.elementType=V,n.lanes=m,n;case te:return vl(o,h,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case B:T=10;break e;case G:T=9;break e;case K:T=11;break e;case J:T=14;break e;case he:T=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=oi(T,o,i,h),i.elementType=n,i.type=u,i.lanes=m,i}function ns(n,i,o,u){return n=oi(7,n,u,i),n.lanes=o,n}function vl(n,i,o,u){return n=oi(22,n,u,i),n.elementType=te,n.lanes=o,n.stateNode={isHidden:!1},n}function Hu(n,i,o){return n=oi(6,n,null,i),n.lanes=o,n}function Vu(n,i,o){return i=oi(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Iv(n,i,o,u,h){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oe(0),this.expirationTimes=Oe(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oe(0),this.identifierPrefix=u,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function Gu(n,i,o,u,h,m,T,U,k){return n=new Iv(n,i,o,U,k),i===1?(i=1,m===!0&&(i|=8)):i=0,m=oi(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:u,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},nu(m),n}function Uv(n,i,o){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:P,key:u==null?null:""+u,children:n,containerInfo:i,implementation:o}}function rm(n){if(!n)return Sr;n=n._reactInternals;e:{if(Dn(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Bn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Bn(o))return Df(n,o,i)}return i}function sm(n,i,o,u,h,m,T,U,k){return n=Gu(o,u,!0,n,h,m,T,U,k),n.context=rm(null),o=n.current,u=In(),h=br(o),m=Ji(u,h),m.callback=i??null,wr(o,m,h),n.current.lanes=h,en(n,h,u),Vn(n,u),n}function _l(n,i,o,u){var h=i.current,m=In(),T=br(h);return o=rm(o),i.context===null?i.context=o:i.pendingContext=o,i=Ji(m,T),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=wr(h,i,T),n!==null&&(Mi(n,h,T,m),$o(n,h,T)),T}function xl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function am(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function Wu(n,i){am(n,i),(n=n.alternate)&&am(n,i)}function Fv(){return null}var om=typeof reportError=="function"?reportError:function(n){console.error(n)};function Xu(n){this._internalRoot=n}yl.prototype.render=Xu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));_l(n,i,null,null)},yl.prototype.unmount=Xu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Qr(function(){_l(null,n,null,null)}),i[qi]=null}};function yl(n){this._internalRoot=n}yl.prototype.unstable_scheduleHydration=function(n){if(n){var i=pi();n={blockedOn:null,target:n,priority:i};for(var o=0;o<gr.length&&i!==0&&i<gr[o].priority;o++);gr.splice(o,0,n),o===0&&Yh(n)}};function Yu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Sl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function lm(){}function Ov(n,i,o,u,h){if(h){if(typeof u=="function"){var m=u;u=function(){var ue=xl(T);m.call(ue)}}var T=sm(i,u,n,0,null,!1,!1,"",lm);return n._reactRootContainer=T,n[qi]=T.current,Na(n.nodeType===8?n.parentNode:n),Qr(),T}for(;h=n.lastChild;)n.removeChild(h);if(typeof u=="function"){var U=u;u=function(){var ue=xl(k);U.call(ue)}}var k=Gu(n,0,!1,null,null,!1,!1,"",lm);return n._reactRootContainer=k,n[qi]=k.current,Na(n.nodeType===8?n.parentNode:n),Qr(function(){_l(i,k,o,u)}),k}function Ml(n,i,o,u,h){var m=o._reactRootContainer;if(m){var T=m;if(typeof h=="function"){var U=h;h=function(){var k=xl(T);U.call(k)}}_l(i,T,n,h)}else T=Ov(o,i,n,h,u);return xl(T)}Yi=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=Be(i.pendingLanes);o!==0&&(En(i,o|1),Vn(i,qt()),(wt&6)===0&&(Hs=qt()+500,Mr()))}break;case 13:Qr(function(){var u=ji(n,1);if(u!==null){var h=In();Mi(u,n,1,h)}}),Wu(n,1)}},bt=function(n){if(n.tag===13){var i=ji(n,134217728);if(i!==null){var o=In();Mi(i,n,134217728,o)}Wu(n,134217728)}},Wt=function(n){if(n.tag===13){var i=br(n),o=ji(n,i);if(o!==null){var u=In();Mi(o,n,i,u)}Wu(n,i)}},pi=function(){return pt},Nt=function(n,i){var o=pt;try{return pt=n,i()}finally{pt=o}},et=function(n,i,o){switch(i){case"input":if(ft(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var u=o[i];if(u!==n&&u.form===n.form){var h=Bo(u);if(!h)throw Error(t(90));dt(u),ft(u,h)}}}break;case"textarea":an(n,o);break;case"select":i=o.value,i!=null&&Lt(n,!!o.multiple,i,!1)}},Ue=Ou,ve=Qr;var kv={usingClientEntryPoint:!1,Events:[Fa,bs,Bo,me,be,Ou]},Za={findFiberByHostInstance:Xr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Bv={bundleType:Za.bundleType,version:Za.version,rendererPackageName:Za.rendererPackageName,rendererConfig:Za.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Gr(n),n===null?null:n.stateNode},findFiberByHostInstance:Za.findFiberByHostInstance||Fv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var El=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!El.isDisabled&&El.supportsFiber)try{ne=El.inject(Bv),Q=El}catch{}}return Gn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kv,Gn.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Yu(i))throw Error(t(200));return Uv(n,i,null,o)},Gn.createRoot=function(n,i){if(!Yu(n))throw Error(t(299));var o=!1,u="",h=om;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(h=i.onRecoverableError)),i=Gu(n,1,!1,null,null,o,!1,u,h),n[qi]=i.current,Na(n.nodeType===8?n.parentNode:n),new Xu(i)},Gn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=Gr(i),n=n===null?null:n.stateNode,n},Gn.flushSync=function(n){return Qr(n)},Gn.hydrate=function(n,i,o){if(!Sl(i))throw Error(t(200));return Ml(null,n,i,!0,o)},Gn.hydrateRoot=function(n,i,o){if(!Yu(n))throw Error(t(405));var u=o!=null&&o.hydratedSources||null,h=!1,m="",T=om;if(o!=null&&(o.unstable_strictMode===!0&&(h=!0),o.identifierPrefix!==void 0&&(m=o.identifierPrefix),o.onRecoverableError!==void 0&&(T=o.onRecoverableError)),i=sm(i,null,n,1,o??null,h,!1,m,T),n[qi]=i.current,Na(n),u)for(n=0;n<u.length;n++)o=u[n],h=o._getVersion,h=h(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,h]:i.mutableSourceEagerHydrationData.push(o,h);return new yl(i)},Gn.render=function(n,i,o){if(!Sl(i))throw Error(t(200));return Ml(null,n,i,!1,o)},Gn.unmountComponentAtNode=function(n){if(!Sl(n))throw Error(t(40));return n._reactRootContainer?(Qr(function(){Ml(null,null,n,!1,function(){n._reactRootContainer=null,n[qi]=null})}),!0):!1},Gn.unstable_batchedUpdates=Ou,Gn.unstable_renderSubtreeIntoContainer=function(n,i,o,u){if(!Sl(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return Ml(n,i,o,!1,u)},Gn.version="18.3.1-next-f1338f8080-20240426",Gn}var gm;function Kv(){if(gm)return $u.exports;gm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),$u.exports=qv(),$u.exports}var vm;function $v(){if(vm)return wl;vm=1;var s=Kv();return wl.createRoot=s.createRoot,wl.hydrateRoot=s.hydrateRoot,wl}var Zv=$v();const jv=Hv(Zv);var tr=Eh();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="186",Jv=0,_m=1,Qv=2,jl=1,Mg=2,ho=3,fs=0,Wn=1,ui=2,dr=0,po=1,xm=2,ym=3,Sm=4,e_=5,oa=100,t_=101,n_=102,i_=103,r_=104,s_=200,a_=201,o_=202,l_=203,Eg=204,wg=205,c_=206,u_=207,d_=208,h_=209,f_=210,p_=211,m_=212,g_=213,v_=214,Nd=0,Id=1,Ud=2,mo=3,Fd=4,Od=5,kd=6,Bd=7,Th=0,__=1,x_=2,Hi=0,Tg=1,Ag=2,Cg=3,bg=4,Rg=5,Pg=6,Lg=7,Dg=300,ps=301,da=302,Ju=303,Qu=304,fc=306,zd=1e3,ur=1001,Hd=1002,Sn=1003,y_=1004,Tl=1005,Pn=1006,ed=1007,us=1008,Qn=1009,Ng=1010,Ig=1011,go=1012,Ah=1013,Vi=1014,Ci=1015,Gi=1016,Ch=1017,bh=1018,vo=1020,Ug=35902,Fg=35899,Og=1021,kg=1022,bi=1023,fr=1026,ds=1027,Rh=1028,Ph=1029,ms=1030,Lh=1031,Dh=1033,Jl=33776,Ql=33777,ec=33778,tc=33779,Vd=35840,Gd=35841,Wd=35842,Xd=35843,Yd=36196,qd=37492,Kd=37496,$d=37488,Zd=37489,ic=37490,jd=37491,Jd=37808,Qd=37809,eh=37810,th=37811,nh=37812,ih=37813,rh=37814,sh=37815,ah=37816,oh=37817,lh=37818,ch=37819,uh=37820,dh=37821,hh=36492,fh=36494,ph=36495,mh=36283,gh=36284,rc=36285,vh=36286,S_=3200,sc=0,M_=1,kr="",ci="srgb",ac="srgb-linear",oc="linear",It="srgb",td=7680,E_=519,w_=512,T_=513,A_=514,Nh=515,C_=516,b_=517,Ih=518,R_=519,Bg=35044,Mm="300 es",zi=2e3,_o=2001;function P_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function lc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function L_(){const s=lc("canvas");return s.style.display="block",s}const Em={};function cc(...s){const e="THREE."+s.shift();console.log(e,...s)}function zg(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function st(...s){s=zg(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Tt(...s){s=zg(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ca(...s){const e=s.join(" ");e in Em||(Em[e]=!0,st(...s))}function D_(s,e,t){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}const N_={[Nd]:Id,[Ud]:kd,[Fd]:Bd,[mo]:Od,[Id]:Nd,[kd]:Ud,[Bd]:Fd,[Od]:mo};class gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,c=a.length;l<c;l++)a[l].call(this,e);e.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],nd=Math.PI/180,_h=180/Math.PI;function Br(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(bn[s&255]+bn[s>>8&255]+bn[s>>16&255]+bn[s>>24&255]+"-"+bn[e&255]+bn[e>>8&255]+"-"+bn[e>>16&15|64]+bn[e>>24&255]+"-"+bn[t&63|128]+bn[t>>8&255]+"-"+bn[t>>16&255]+bn[t>>24&255]+bn[r&255]+bn[r>>8&255]+bn[r>>16&255]+bn[r>>24&255]).toLowerCase()}function Mt(s,e,t){return Math.max(e,Math.min(t,s))}function I_(s,e){return(s%e+e)%e}function id(s,e,t){return(1-t)*s+t*e}function Bi(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ut(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const zh=class zh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Mt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),l=this.x-e.x,c=this.y-e.y;return this.x=l*r-c*a+e.x,this.y=l*a+c*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zh.prototype.isVector2=!0;let ct=zh;class fa{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,l,c,d){let f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3],v=l[c+0],S=l[c+1],E=l[c+2],b=l[c+3];if(_!==b||f!==v||p!==S||g!==E){let y=f*v+p*S+g*E+_*b;y<0&&(v=-v,S=-S,E=-E,b=-b,y=-y);let x=1-d;if(y<.9995){const I=Math.acos(y),O=Math.sin(I);x=Math.sin(x*I)/O,d=Math.sin(d*I)/O,f=f*x+v*d,p=p*x+S*d,g=g*x+E*d,_=_*x+b*d}else{f=f*x+v*d,p=p*x+S*d,g=g*x+E*d,_=_*x+b*d;const I=1/Math.sqrt(f*f+p*p+g*g+_*_);f*=I,p*=I,g*=I,_*=I}}e[t]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,a,l,c){const d=r[a],f=r[a+1],p=r[a+2],g=r[a+3],_=l[c],v=l[c+1],S=l[c+2],E=l[c+3];return e[t]=d*E+g*_+f*S-p*v,e[t+1]=f*E+g*v+p*_-d*S,e[t+2]=p*E+g*S+d*v-f*_,e[t+3]=g*E-d*_-f*v-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,l=e._z,c=e._order,d=Math.cos,f=Math.sin,p=d(r/2),g=d(a/2),_=d(l/2),v=f(r/2),S=f(a/2),E=f(l/2);switch(c){case"XYZ":this._x=v*g*_+p*S*E,this._y=p*S*_-v*g*E,this._z=p*g*E+v*S*_,this._w=p*g*_-v*S*E;break;case"YXZ":this._x=v*g*_+p*S*E,this._y=p*S*_-v*g*E,this._z=p*g*E-v*S*_,this._w=p*g*_+v*S*E;break;case"ZXY":this._x=v*g*_-p*S*E,this._y=p*S*_+v*g*E,this._z=p*g*E+v*S*_,this._w=p*g*_-v*S*E;break;case"ZYX":this._x=v*g*_-p*S*E,this._y=p*S*_+v*g*E,this._z=p*g*E-v*S*_,this._w=p*g*_+v*S*E;break;case"YZX":this._x=v*g*_+p*S*E,this._y=p*S*_+v*g*E,this._z=p*g*E-v*S*_,this._w=p*g*_-v*S*E;break;case"XZY":this._x=v*g*_-p*S*E,this._y=p*S*_-v*g*E,this._z=p*g*E+v*S*_,this._w=p*g*_+v*S*E;break;default:st("Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],l=t[8],c=t[1],d=t[5],f=t[9],p=t[2],g=t[6],_=t[10],v=r+d+_;if(v>0){const S=.5/Math.sqrt(v+1);this._w=.25/S,this._x=(g-f)*S,this._y=(l-p)*S,this._z=(c-a)*S}else if(r>d&&r>_){const S=2*Math.sqrt(1+r-d-_);this._w=(g-f)/S,this._x=.25*S,this._y=(a+c)/S,this._z=(l+p)/S}else if(d>_){const S=2*Math.sqrt(1+d-r-_);this._w=(l-p)/S,this._x=(a+c)/S,this._y=.25*S,this._z=(f+g)/S}else{const S=2*Math.sqrt(1+_-r-d);this._w=(c-a)/S,this._x=(l+p)/S,this._y=(f+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,l=e._z,c=e._w,d=t._x,f=t._y,p=t._z,g=t._w;return this._x=r*g+c*d+a*p-l*f,this._y=a*g+c*f+l*d-r*p,this._z=l*g+c*p+r*f-a*d,this._w=c*g-r*d-a*f-l*p,this._onChangeCallback(),this}slerp(e,t){let r=e._x,a=e._y,l=e._z,c=e._w,d=this.dot(e);d<0&&(r=-r,a=-a,l=-l,c=-c,d=-d);let f=1-t;if(d<.9995){const p=Math.acos(d),g=Math.sin(p);f=Math.sin(f*p)/g,t=Math.sin(t*p)/g,this._x=this._x*f+r*t,this._y=this._y*f+a*t,this._z=this._z*f+l*t,this._w=this._w*f+c*t,this._onChangeCallback()}else this._x=this._x*f+r*t,this._y=this._y*f+a*t,this._z=this._z*f+l*t,this._w=this._w*f+c*t,this.normalize();return this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Hh=class Hh{constructor(e=0,t=0,r=0){this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*a,this.y=l[1]*t+l[4]*r+l[7]*a,this.z=l[2]*t+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=e.elements,c=1/(l[3]*t+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*a+l[12])*c,this.y=(l[1]*t+l[5]*r+l[9]*a+l[13])*c,this.z=(l[2]*t+l[6]*r+l[10]*a+l[14])*c,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,l=e.x,c=e.y,d=e.z,f=e.w,p=2*(c*a-d*r),g=2*(d*t-l*a),_=2*(l*r-c*t);return this.x=t+f*p+c*_-d*g,this.y=r+f*g+d*p-l*_,this.z=a+f*_+l*g-c*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*a,this.y=l[1]*t+l[5]*r+l[9]*a,this.z=l[2]*t+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,l=e.z,c=t.x,d=t.y,f=t.z;return this.x=a*f-l*d,this.y=l*c-r*f,this.z=r*d-a*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return rd.copy(this).projectOnVector(e),this.sub(rd)}reflect(e){return this.sub(rd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Mt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Hh.prototype.isVector3=!0;let q=Hh;const rd=new q,wm=new fa,Vh=class Vh{constructor(e,t,r,a,l,c,d,f,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,c,d,f,p)}set(e,t,r,a,l,c,d,f,p){const g=this.elements;return g[0]=e,g[1]=a,g[2]=d,g[3]=t,g[4]=l,g[5]=f,g[6]=r,g[7]=c,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,c=r[0],d=r[3],f=r[6],p=r[1],g=r[4],_=r[7],v=r[2],S=r[5],E=r[8],b=a[0],y=a[3],x=a[6],I=a[1],O=a[4],C=a[7],R=a[2],P=a[5],F=a[8];return l[0]=c*b+d*I+f*R,l[3]=c*y+d*O+f*P,l[6]=c*x+d*C+f*F,l[1]=p*b+g*I+_*R,l[4]=p*y+g*O+_*P,l[7]=p*x+g*C+_*F,l[2]=v*b+S*I+E*R,l[5]=v*y+S*O+E*P,l[8]=v*x+S*C+E*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],c=e[4],d=e[5],f=e[6],p=e[7],g=e[8];return t*c*g-t*d*p-r*l*g+r*d*f+a*l*p-a*c*f}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],c=e[4],d=e[5],f=e[6],p=e[7],g=e[8],_=g*c-d*p,v=d*f-g*l,S=p*l-c*f,E=t*_+r*v+a*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/E;return e[0]=_*b,e[1]=(a*p-g*r)*b,e[2]=(d*r-a*c)*b,e[3]=v*b,e[4]=(g*t-a*f)*b,e[5]=(a*l-d*t)*b,e[6]=S*b,e[7]=(r*f-p*t)*b,e[8]=(c*t-r*l)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,l,c,d){const f=Math.cos(l),p=Math.sin(l);return this.set(r*f,r*p,-r*(f*c+p*d)+c+e,-a*p,a*f,-a*(-p*c+f*d)+d+t,0,0,1),this}scale(e,t){return ca("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(sd.makeScale(e,t)),this}rotate(e){return ca("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(sd.makeRotation(-e)),this}translate(e,t){return ca("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(sd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Vh.prototype.isMatrix3=!0;let ot=Vh;const sd=new ot,Tm=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Am=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function U_(){const s={enabled:!0,workingColorSpace:ac,spaces:{},convert:function(a,l,c){return this.enabled===!1||l===c||!l||!c||(this.spaces[l].transfer===It&&(a.r=hr(a.r),a.g=hr(a.g),a.b=hr(a.b)),this.spaces[l].primaries!==this.spaces[c].primaries&&(a.applyMatrix3(this.spaces[l].toXYZ),a.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===It&&(a.r=ua(a.r),a.g=ua(a.g),a.b=ua(a.b))),a},workingToColorSpace:function(a,l){return this.convert(a,this.workingColorSpace,l)},colorSpaceToWorking:function(a,l){return this.convert(a,l,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===kr?oc:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,l=this.workingColorSpace){return a.fromArray(this.spaces[l].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,l,c){return a.copy(this.spaces[l].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,l){return ca("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(a,l)},toWorkingColorSpace:function(a,l){return ca("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(a,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[ac]:{primaries:e,whitePoint:r,transfer:oc,toXYZ:Tm,fromXYZ:Am,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ci},outputColorSpaceConfig:{drawingBufferColorSpace:ci}},[ci]:{primaries:e,whitePoint:r,transfer:It,toXYZ:Tm,fromXYZ:Am,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ci}}}),s}const St=U_();function hr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ua(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Gs;class F_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Gs===void 0&&(Gs=lc("canvas")),Gs.width=e.width,Gs.height=e.height;const a=Gs.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),r=Gs}return r.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let c=0;c<l.length;c++)l[c]=hr(l[c]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(hr(t[r]/255)*255):t[r]=hr(t[r]);return{data:t,width:e.width,height:e.height}}else return st("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let O_=0;class Uh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let c=0,d=a.length;c<d;c++)a[c].isDataTexture?l.push(ad(a[c].image)):l.push(ad(a[c]))}else l=ad(a);r.url=l}return t||(e.images[this.uuid]=r),r}}function ad(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?F_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(st("Texture: Unable to serialize Texture."),{})}let k_=0;const od=new q;class Ln extends gs{constructor(e=Ln.DEFAULT_IMAGE,t=Ln.DEFAULT_MAPPING,r=ur,a=ur,l=Pn,c=us,d=bi,f=Qn,p=Ln.DEFAULT_ANISOTROPY,g=kr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Br(),this.name="",this.source=new Uh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=c,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(od).x}get height(){return this.source.getSize(od).y}get depth(){return this.source.getSize(od).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const r=e[t];if(r===void 0){st(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){st(`Texture.setValues(): property '${t}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case zd:e.x=e.x-Math.floor(e.x);break;case ur:e.x=e.x<0?0:1;break;case Hd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case zd:e.y=e.y-Math.floor(e.y);break;case ur:e.y=e.y<0?0:1;break;case Hd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=Dg;Ln.DEFAULT_ANISOTROPY=1;const Gh=class Gh{constructor(e=0,t=0,r=0,a=1){this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=this.w,c=e.elements;return this.x=c[0]*t+c[4]*r+c[8]*a+c[12]*l,this.y=c[1]*t+c[5]*r+c[9]*a+c[13]*l,this.z=c[2]*t+c[6]*r+c[10]*a+c[14]*l,this.w=c[3]*t+c[7]*r+c[11]*a+c[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,l;const f=e.elements,p=f[0],g=f[4],_=f[8],v=f[1],S=f[5],E=f[9],b=f[2],y=f[6],x=f[10];if(Math.abs(g-v)<.01&&Math.abs(_-b)<.01&&Math.abs(E-y)<.01){if(Math.abs(g+v)<.1&&Math.abs(_+b)<.1&&Math.abs(E+y)<.1&&Math.abs(p+S+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const O=(p+1)/2,C=(S+1)/2,R=(x+1)/2,P=(g+v)/4,F=(_+b)/4,w=(E+y)/4;return O>C&&O>R?O<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(O),a=P/r,l=F/r):C>R?C<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(C),r=P/a,l=w/a):R<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(R),r=F/l,a=w/l),this.set(r,a,l,t),this}let I=Math.sqrt((y-E)*(y-E)+(_-b)*(_-b)+(v-g)*(v-g));return Math.abs(I)<.001&&(I=1),this.x=(y-E)/I,this.y=(_-b)/I,this.z=(v-g)/I,this.w=Math.acos((p+S+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Mt(this.x,e.x,t.x),this.y=Mt(this.y,e.y,t.y),this.z=Mt(this.z,e.z,t.z),this.w=Mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Mt(this.x,e,t),this.y=Mt(this.y,e,t),this.z=Mt(this.z,e,t),this.w=Mt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Gh.prototype.isVector4=!0;let Zt=Gh;class B_ extends gs{constructor(e=1,t=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=r.depth,this.scissor=new Zt(0,0,e,t),this.scissorTest=!1,this.viewport=new Zt(0,0,e,t),this.textures=[];const a={width:e,height:t,depth:r.depth},l=new Ln(a),c=r.count;for(let d=0;d<c;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveColorBuffer=r.resolveColorBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.storeMultisampledColorBuffer=r.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=r.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=r.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new Uh(a)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends B_{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Hg extends Ln{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class z_ extends Ln{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=Sn,this.minFilter=Sn,this.wrapR=ur,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const hc=class hc{constructor(e,t,r,a,l,c,d,f,p,g,_,v,S,E,b,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,c,d,f,p,g,_,v,S,E,b,y)}set(e,t,r,a,l,c,d,f,p,g,_,v,S,E,b,y){const x=this.elements;return x[0]=e,x[4]=t,x[8]=r,x[12]=a,x[1]=l,x[5]=c,x[9]=d,x[13]=f,x[2]=p,x[6]=g,x[10]=_,x[14]=v,x[3]=S,x[7]=E,x[11]=b,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hc().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,r=e.elements,a=1/Ws.setFromMatrixColumn(e,0).length(),l=1/Ws.setFromMatrixColumn(e,1).length(),c=1/Ws.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*c,t[9]=r[9]*c,t[10]=r[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,l=e.z,c=Math.cos(r),d=Math.sin(r),f=Math.cos(a),p=Math.sin(a),g=Math.cos(l),_=Math.sin(l);if(e.order==="XYZ"){const v=c*g,S=c*_,E=d*g,b=d*_;t[0]=f*g,t[4]=-f*_,t[8]=p,t[1]=S+E*p,t[5]=v-b*p,t[9]=-d*f,t[2]=b-v*p,t[6]=E+S*p,t[10]=c*f}else if(e.order==="YXZ"){const v=f*g,S=f*_,E=p*g,b=p*_;t[0]=v+b*d,t[4]=E*d-S,t[8]=c*p,t[1]=c*_,t[5]=c*g,t[9]=-d,t[2]=S*d-E,t[6]=b+v*d,t[10]=c*f}else if(e.order==="ZXY"){const v=f*g,S=f*_,E=p*g,b=p*_;t[0]=v-b*d,t[4]=-c*_,t[8]=E+S*d,t[1]=S+E*d,t[5]=c*g,t[9]=b-v*d,t[2]=-c*p,t[6]=d,t[10]=c*f}else if(e.order==="ZYX"){const v=c*g,S=c*_,E=d*g,b=d*_;t[0]=f*g,t[4]=E*p-S,t[8]=v*p+b,t[1]=f*_,t[5]=b*p+v,t[9]=S*p-E,t[2]=-p,t[6]=d*f,t[10]=c*f}else if(e.order==="YZX"){const v=c*f,S=c*p,E=d*f,b=d*p;t[0]=f*g,t[4]=b-v*_,t[8]=E*_+S,t[1]=_,t[5]=c*g,t[9]=-d*g,t[2]=-p*g,t[6]=S*_+E,t[10]=v-b*_}else if(e.order==="XZY"){const v=c*f,S=c*p,E=d*f,b=d*p;t[0]=f*g,t[4]=-_,t[8]=p*g,t[1]=v*_+b,t[5]=c*g,t[9]=S*_-E,t[2]=E*_-S,t[6]=d*g,t[10]=b*_+v}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(H_,e,V_)}lookAt(e,t,r){const a=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Dr.crossVectors(r,$n),Dr.lengthSq()===0&&(Math.abs(r.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Dr.crossVectors(r,$n)),Dr.normalize(),Al.crossVectors($n,Dr),a[0]=Dr.x,a[4]=Al.x,a[8]=$n.x,a[1]=Dr.y,a[5]=Al.y,a[9]=$n.y,a[2]=Dr.z,a[6]=Al.z,a[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,c=r[0],d=r[4],f=r[8],p=r[12],g=r[1],_=r[5],v=r[9],S=r[13],E=r[2],b=r[6],y=r[10],x=r[14],I=r[3],O=r[7],C=r[11],R=r[15],P=a[0],F=a[4],w=a[8],D=a[12],B=a[1],G=a[5],K=a[9],ee=a[13],V=a[2],J=a[6],he=a[10],te=a[14],Y=a[3],$=a[7],Z=a[11],L=a[15];return l[0]=c*P+d*B+f*V+p*Y,l[4]=c*F+d*G+f*J+p*$,l[8]=c*w+d*K+f*he+p*Z,l[12]=c*D+d*ee+f*te+p*L,l[1]=g*P+_*B+v*V+S*Y,l[5]=g*F+_*G+v*J+S*$,l[9]=g*w+_*K+v*he+S*Z,l[13]=g*D+_*ee+v*te+S*L,l[2]=E*P+b*B+y*V+x*Y,l[6]=E*F+b*G+y*J+x*$,l[10]=E*w+b*K+y*he+x*Z,l[14]=E*D+b*ee+y*te+x*L,l[3]=I*P+O*B+C*V+R*Y,l[7]=I*F+O*G+C*J+R*$,l[11]=I*w+O*K+C*he+R*Z,l[15]=I*D+O*ee+C*te+R*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[12],c=e[1],d=e[5],f=e[9],p=e[13],g=e[2],_=e[6],v=e[10],S=e[14],E=e[3],b=e[7],y=e[11],x=e[15],I=f*S-p*v,O=d*S-p*_,C=d*v-f*_,R=c*S-p*g,P=c*v-f*g,F=c*_-d*g;return t*(b*I-y*O+x*C)-r*(E*I-y*R+x*P)+a*(E*O-b*R+x*F)-l*(E*C-b*P+y*F)}determinantAffine(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[1],c=e[5],d=e[9],f=e[2],p=e[6],g=e[10];return t*(c*g-d*p)-r*(l*g-d*f)+a*(l*p-c*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],c=e[4],d=e[5],f=e[6],p=e[7],g=e[8],_=e[9],v=e[10],S=e[11],E=e[12],b=e[13],y=e[14],x=e[15],I=t*d-r*c,O=t*f-a*c,C=t*p-l*c,R=r*f-a*d,P=r*p-l*d,F=a*p-l*f,w=g*b-_*E,D=g*y-v*E,B=g*x-S*E,G=_*y-v*b,K=_*x-S*b,ee=v*x-S*y,V=I*ee-O*K+C*G+R*B-P*D+F*w;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const J=1/V;return e[0]=(d*ee-f*K+p*G)*J,e[1]=(a*K-r*ee-l*G)*J,e[2]=(b*F-y*P+x*R)*J,e[3]=(v*P-_*F-S*R)*J,e[4]=(f*B-c*ee-p*D)*J,e[5]=(t*ee-a*B+l*D)*J,e[6]=(y*C-E*F-x*O)*J,e[7]=(g*F-v*C+S*O)*J,e[8]=(c*K-d*B+p*w)*J,e[9]=(r*B-t*K-l*w)*J,e[10]=(E*P-b*C+x*I)*J,e[11]=(_*C-g*P-S*I)*J,e[12]=(d*D-c*G-f*w)*J,e[13]=(t*G-r*D+a*w)*J,e[14]=(b*O-E*R-y*I)*J,e[15]=(g*R-_*O+v*I)*J,this}scale(e){const t=this.elements,r=e.x,a=e.y,l=e.z;return t[0]*=r,t[4]*=a,t[8]*=l,t[1]*=r,t[5]*=a,t[9]*=l,t[2]*=r,t[6]*=a,t[10]*=l,t[3]*=r,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),l=1-r,c=e.x,d=e.y,f=e.z,p=l*c,g=l*d;return this.set(p*c+r,p*d-a*f,p*f+a*d,0,p*d+a*f,g*d+r,g*f-a*c,0,p*f-a*d,g*f+a*c,l*f*f+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,l,c){return this.set(1,r,l,0,e,1,c,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,l=t._x,c=t._y,d=t._z,f=t._w,p=l+l,g=c+c,_=d+d,v=l*p,S=l*g,E=l*_,b=c*g,y=c*_,x=d*_,I=f*p,O=f*g,C=f*_,R=r.x,P=r.y,F=r.z;return a[0]=(1-(b+x))*R,a[1]=(S+C)*R,a[2]=(E-O)*R,a[3]=0,a[4]=(S-C)*P,a[5]=(1-(v+x))*P,a[6]=(y+I)*P,a[7]=0,a[8]=(E+O)*F,a[9]=(y-I)*F,a[10]=(1-(v+b))*F,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const l=this.determinantAffine();if(l===0)return r.set(1,1,1),t.identity(),this;let c=Ws.set(a[0],a[1],a[2]).length();const d=Ws.set(a[4],a[5],a[6]).length(),f=Ws.set(a[8],a[9],a[10]).length();l<0&&(c=-c),Ei.copy(this);const p=1/c,g=1/d,_=1/f;return Ei.elements[0]*=p,Ei.elements[1]*=p,Ei.elements[2]*=p,Ei.elements[4]*=g,Ei.elements[5]*=g,Ei.elements[6]*=g,Ei.elements[8]*=_,Ei.elements[9]*=_,Ei.elements[10]*=_,t.setFromRotationMatrix(Ei),r.x=c,r.y=d,r.z=f,this}makePerspective(e,t,r,a,l,c,d=zi,f=!1){const p=this.elements,g=2*l/(t-e),_=2*l/(r-a),v=(t+e)/(t-e),S=(r+a)/(r-a);let E,b;if(f)E=l/(c-l),b=c*l/(c-l);else if(d===zi)E=-(c+l)/(c-l),b=-2*c*l/(c-l);else if(d===_o)E=-c/(c-l),b=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=_,p[9]=S,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=b,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,t,r,a,l,c,d=zi,f=!1){const p=this.elements,g=2/(t-e),_=2/(r-a),v=-(t+e)/(t-e),S=-(r+a)/(r-a);let E,b;if(f)E=1/(c-l),b=c/(c-l);else if(d===zi)E=-2/(c-l),b=-(c+l)/(c-l);else if(d===_o)E=-1/(c-l),b=-l/(c-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=g,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=_,p[9]=0,p[13]=S,p[2]=0,p[6]=0,p[10]=E,p[14]=b,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}};hc.prototype.isMatrix4=!0;let kt=hc;const Ws=new q,Ei=new kt,H_=new q(0,0,0),V_=new q(1,1,1),Dr=new q,Al=new q,$n=new q,Cm=new kt,bm=new fa;class Wi{constructor(e=0,t=0,r=0,a=Wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,l=a[0],c=a[4],d=a[8],f=a[1],p=a[5],g=a[9],_=a[2],v=a[6],S=a[10];switch(t){case"XYZ":this._y=Math.asin(Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(f,p)):(this._y=Math.atan2(-_,l),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-_,S),this._z=Math.atan2(-c,p)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-Mt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(v,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-c,p));break;case"YZX":this._z=Math.asin(Mt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:st("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Cm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bm.setFromEuler(this),this.setFromQuaternion(bm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wi.DEFAULT_ORDER="XYZ";class Vg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let G_=0;const Rm=new q,Xs=new fa,nr=new kt,Cl=new q,Ja=new q,W_=new q,X_=new fa,Pm=new q(1,0,0),Lm=new q(0,1,0),Dm=new q(0,0,1),Nm={type:"added"},Y_={type:"removed"},Ys={type:"childadded",child:null},ld={type:"childremoved",child:null};class Mn extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:G_++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mn.DEFAULT_UP.clone();const e=new q,t=new Wi,r=new fa,a=new q(1,1,1);function l(){r.setFromEuler(t,!1)}function c(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new kt},normalMatrix:{value:new ot}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=Mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.premultiply(Xs),this}rotateX(e){return this.rotateOnAxis(Pm,e)}rotateY(e){return this.rotateOnAxis(Lm,e)}rotateZ(e){return this.rotateOnAxis(Dm,e)}translateOnAxis(e,t){return Rm.copy(e).applyQuaternion(this.quaternion),this.position.add(Rm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pm,e)}translateY(e){return this.translateOnAxis(Lm,e)}translateZ(e){return this.translateOnAxis(Dm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(nr.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Cl.copy(e):Cl.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Ja.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?nr.lookAt(Ja,Cl,this.up):nr.lookAt(Cl,Ja,this.up),this.quaternion.setFromRotationMatrix(nr),a&&(nr.extractRotation(a.matrixWorld),Xs.setFromRotationMatrix(nr),this.quaternion.premultiply(Xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Tt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nm),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null):Tt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Y_),ld.child=e,this.dispatchEvent(ld),ld.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),nr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),nr.multiply(e.parent.matrixWorld)),e.applyMatrix4(nr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nm),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const c=this.children[r].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let l=0,c=a.length;l<c;l++)a[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ja,e,W_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ja,X_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,r=e.y,a=e.z,l=this.matrix.elements;l[12]+=t-l[0]*t-l[4]*r-l[8]*a,l[13]+=r-l[1]*t-l[5]*r-l[9]*a,l[14]+=a-l[2]*t-l[6]*r-l[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t,r=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),t===!0){const l=this.children;for(let c=0,d=l.length;c<d;c++)l[c].updateWorldMatrix(!1,!0,r)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,a.name=this.name,a.castShadow=this.castShadow,a.receiveShadow=this.receiveShadow,a.visible=this.visible,a.frustumCulled=this.frustumCulled,a.renderOrder=this.renderOrder,a.static=this.static,a.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(d=>({...d})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function l(d,f){return d[f.uuid]===void 0&&(d[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const f=d.shapes;if(Array.isArray(f))for(let p=0,g=f.length;p<g;p++){const _=f[p];l(e.shapes,_)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let f=0,p=this.material.length;f<p;f++)d.push(l(e.materials,this.material[f]));a.material=d}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const f=this.animations[d];a.animations.push(l(e.animations,f))}}if(t){const d=c(e.geometries),f=c(e.materials),p=c(e.textures),g=c(e.images),_=c(e.shapes),v=c(e.skeletons),S=c(e.animations),E=c(e.nodes);d.length>0&&(r.geometries=d),f.length>0&&(r.materials=f),p.length>0&&(r.textures=p),g.length>0&&(r.images=g),_.length>0&&(r.shapes=_),v.length>0&&(r.skeletons=v),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=a,r;function c(d){const f=[];for(const p in d){const g=d[p];delete g.metadata,f.push(g)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Mn.DEFAULT_UP=new q(0,1,0);Mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class jn extends Mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const q_={type:"move"};class cd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,l=null,c=null;const d=this._targetRay,f=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){c=!0;for(const b of e.hand.values()){const y=t.getJointPose(b,r),x=this._getHandJoint(p,b);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],v=g.position.distanceTo(_.position),S=.02,E=.005;p.inputState.pinching&&v>S+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&v<=S-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1,f.eventsEnabled&&f.dispatchEvent({type:"gripUpdated",data:e,target:this})));d!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(q_)))}return d!==null&&(d.visible=a!==null),f!==null&&(f.visible=l!==null),p!==null&&(p.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new jn;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const Gg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nr={h:0,s:0,l:0},bl={h:0,s:0,l:0};function ud(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class gt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ci){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,St.colorSpaceToWorking(this,t),this}setRGB(e,t,r,a=St.workingColorSpace){return this.r=e,this.g=t,this.b=r,St.colorSpaceToWorking(this,a),this}setHSL(e,t,r,a=St.workingColorSpace){if(e=I_(e,1),t=Mt(t,0,1),r=Mt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,c=2*r-l;this.r=ud(c,l,e+1/3),this.g=ud(c,l,e),this.b=ud(c,l,e-1/3)}return St.colorSpaceToWorking(this,a),this}setStyle(e,t=ci){function r(l){l!==void 0&&parseFloat(l)<1&&st("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const c=a[1],d=a[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:st("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(l,16),t);st("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ci){const r=Gg[e.toLowerCase()];return r!==void 0?this.setHex(r,t):st("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}copyLinearToSRGB(e){return this.r=ua(e.r),this.g=ua(e.g),this.b=ua(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ci){return St.workingToColorSpace(Rn.copy(this),e),Math.round(Mt(Rn.r*255,0,255))*65536+Math.round(Mt(Rn.g*255,0,255))*256+Math.round(Mt(Rn.b*255,0,255))}getHexString(e=ci){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=St.workingColorSpace){St.workingToColorSpace(Rn.copy(this),t);const r=Rn.r,a=Rn.g,l=Rn.b,c=Math.max(r,a,l),d=Math.min(r,a,l);let f,p;const g=(d+c)/2;if(d===c)f=0,p=0;else{const _=c-d;switch(p=g<=.5?_/(c+d):_/(2-c-d),c){case r:f=(a-l)/_+(a<l?6:0);break;case a:f=(l-r)/_+2;break;case l:f=(r-a)/_+4;break}f/=6}return e.h=f,e.s=p,e.l=g,e}getRGB(e,t=St.workingColorSpace){return St.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=ci){St.workingToColorSpace(Rn.copy(this),e);const t=Rn.r,r=Rn.g,a=Rn.b;return e!==ci?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(Nr),this.setHSL(Nr.h+e,Nr.s+t,Nr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Nr),e.getHSL(bl);const r=id(Nr.h,bl.h,t),a=id(Nr.s,bl.s,t),l=id(Nr.l,bl.l,t);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*a,this.g=l[1]*t+l[4]*r+l[7]*a,this.b=l[2]*t+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rn=new gt;gt.NAMES=Gg;class Fh{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new gt(e),this.near=t,this.far=r}clone(){return new Fh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class K_ extends Mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wi,this.environmentIntensity=1,this.environmentRotation=new Wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const wi=new q,ir=new q,dd=new q,rr=new q,qs=new q,Ks=new q,Im=new q,hd=new q,fd=new q,pd=new q,md=new Zt,gd=new Zt,vd=new Zt;class di{constructor(e=new q,t=new q,r=new q){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),wi.subVectors(e,t),a.cross(wi);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,r,a,l){wi.subVectors(a,t),ir.subVectors(r,t),dd.subVectors(e,t);const c=wi.dot(wi),d=wi.dot(ir),f=wi.dot(dd),p=ir.dot(ir),g=ir.dot(dd),_=c*p-d*d;if(_===0)return l.set(0,0,0),null;const v=1/_,S=(p*f-d*g)*v,E=(c*g-d*f)*v;return l.set(1-S-E,E,S)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,rr)===null?!1:rr.x>=0&&rr.y>=0&&rr.x+rr.y<=1}static getInterpolation(e,t,r,a,l,c,d,f){return this.getBarycoord(e,t,r,a,rr)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,rr.x),f.addScaledVector(c,rr.y),f.addScaledVector(d,rr.z),f)}static getInterpolatedAttribute(e,t,r,a,l,c){return md.setScalar(0),gd.setScalar(0),vd.setScalar(0),md.fromBufferAttribute(e,t),gd.fromBufferAttribute(e,r),vd.fromBufferAttribute(e,a),c.setScalar(0),c.addScaledVector(md,l.x),c.addScaledVector(gd,l.y),c.addScaledVector(vd,l.z),c}static isFrontFacing(e,t,r,a){return wi.subVectors(r,t),ir.subVectors(e,t),wi.cross(ir).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wi.subVectors(this.c,this.b),ir.subVectors(this.a,this.b),wi.cross(ir).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,l){return di.getInterpolation(e,this.a,this.b,this.c,t,r,a,l)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,l=this.c;let c,d;qs.subVectors(a,r),Ks.subVectors(l,r),hd.subVectors(e,r);const f=qs.dot(hd),p=Ks.dot(hd);if(f<=0&&p<=0)return t.copy(r);fd.subVectors(e,a);const g=qs.dot(fd),_=Ks.dot(fd);if(g>=0&&_<=g)return t.copy(a);const v=f*_-g*p;if(v<=0&&f>=0&&g<=0)return c=f/(f-g),t.copy(r).addScaledVector(qs,c);pd.subVectors(e,l);const S=qs.dot(pd),E=Ks.dot(pd);if(E>=0&&S<=E)return t.copy(l);const b=S*p-f*E;if(b<=0&&p>=0&&E<=0)return d=p/(p-E),t.copy(r).addScaledVector(Ks,d);const y=g*E-S*_;if(y<=0&&_-g>=0&&S-E>=0)return Im.subVectors(l,a),d=(_-g)/(_-g+(S-E)),t.copy(a).addScaledVector(Im,d);const x=1/(y+b+v);return c=b*x,d=v*x,t.copy(r).addScaledVector(qs,c).addScaledVector(Ks,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class vs{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(Ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(Ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=Ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let c=0,d=l.count;c<d;c++)e.isMesh===!0?e.getVertexPosition(c,Ti):Ti.fromBufferAttribute(l,c),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Rl.copy(r.boundingBox)),Rl.applyMatrix4(e.matrixWorld),this.union(Rl)}const a=e.children;for(let l=0,c=a.length;l<c;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qa),Pl.subVectors(this.max,Qa),$s.subVectors(e.a,Qa),Zs.subVectors(e.b,Qa),js.subVectors(e.c,Qa),Ir.subVectors(Zs,$s),Ur.subVectors(js,Zs),is.subVectors($s,js);let t=[0,-Ir.z,Ir.y,0,-Ur.z,Ur.y,0,-is.z,is.y,Ir.z,0,-Ir.x,Ur.z,0,-Ur.x,is.z,0,-is.x,-Ir.y,Ir.x,0,-Ur.y,Ur.x,0,-is.y,is.x,0];return!_d(t,$s,Zs,js,Pl)||(t=[1,0,0,0,1,0,0,0,1],!_d(t,$s,Zs,js,Pl))?!1:(Ll.crossVectors(Ir,Ur),t=[Ll.x,Ll.y,Ll.z],_d(t,$s,Zs,js,Pl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(sr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const sr=[new q,new q,new q,new q,new q,new q,new q,new q],Ti=new q,Rl=new vs,$s=new q,Zs=new q,js=new q,Ir=new q,Ur=new q,is=new q,Qa=new q,Pl=new q,Ll=new q,rs=new q;function _d(s,e,t,r,a){for(let l=0,c=s.length-3;l<=c;l+=3){rs.fromArray(s,l);const d=a.x*Math.abs(rs.x)+a.y*Math.abs(rs.y)+a.z*Math.abs(rs.z),f=e.dot(rs),p=t.dot(rs),g=r.dot(rs);if(Math.max(-Math.max(f,p,g),Math.min(f,p,g))>d)return!1}return!0}const sn=new q,Dl=new ct;let $_=0;class Pi extends gs{constructor(e,t,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Bg,this.updateRanges=[],this.gpuType=Ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Dl.fromBufferAttribute(this,t),Dl.applyMatrix3(e),this.setXY(t,Dl.x,Dl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix3(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Bi(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Ut(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),r=Ut(r,this.array),a=Ut(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),r=Ut(r,this.array),a=Ut(a,this.array),l=Ut(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Wg extends Pi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Xg extends Pi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class On extends Pi{constructor(e,t,r){super(new Float32Array(e),t,r)}}const Z_=new vs,eo=new q,xd=new q;class yo{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Z_.setFromPoints(e).getCenter(r);let a=0;for(let l=0,c=e.length;l<c;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;eo.subVectors(e,this.center);const t=eo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(eo,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(eo.copy(e.center).add(xd)),this.expandByPoint(eo.copy(e.center).sub(xd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let j_=0;const li=new kt,yd=new Mn,Js=new q,Zn=new vs,to=new vs,mn=new q;class hi extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(P_(e)?Xg:Wg)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ot().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return li.makeRotationFromQuaternion(e),this.applyMatrix4(li),this}rotateX(e){return li.makeRotationX(e),this.applyMatrix4(li),this}rotateY(e){return li.makeRotationY(e),this.applyMatrix4(li),this}rotateZ(e){return li.makeRotationZ(e),this.applyMatrix4(li),this}translate(e,t,r){return li.makeTranslation(e,t,r),this.applyMatrix4(li),this}scale(e,t,r){return li.makeScale(e,t,r),this.applyMatrix4(li),this}lookAt(e){return yd.lookAt(e),yd.updateMatrix(),this.applyMatrix4(yd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];r.push(c.x,c.y,c.z||0)}this.setAttribute("position",new On(r,3))}else{const r=Math.min(e.length,t.count);for(let a=0;a<r;a++){const l=e[a];t.setXYZ(a,l.x,l.y,l.z||0)}e.length>t.count&&st("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Zn.setFromBufferAttribute(l),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const r=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let l=0,c=t.length;l<c;l++){const d=t[l];to.setFromBufferAttribute(d),this.morphTargetsRelative?(mn.addVectors(Zn.min,to.min),Zn.expandByPoint(mn),mn.addVectors(Zn.max,to.max),Zn.expandByPoint(mn)):(Zn.expandByPoint(to.min),Zn.expandByPoint(to.max))}Zn.getCenter(r);let a=0;for(let l=0,c=e.count;l<c;l++)mn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(mn));if(t)for(let l=0,c=t.length;l<c;l++){const d=t[l],f=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)mn.fromBufferAttribute(d,p),f&&(Js.fromBufferAttribute(e,p),mn.add(Js)),a=Math.max(a,r.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,l=t.uv;let c=this.getAttribute("tangent");(c===void 0||c.count!==r.count)&&(c=new Pi(new Float32Array(4*r.count),4),this.setAttribute("tangent",c));const d=[],f=[];for(let w=0;w<r.count;w++)d[w]=new q,f[w]=new q;const p=new q,g=new q,_=new q,v=new ct,S=new ct,E=new ct,b=new q,y=new q;function x(w,D,B){p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,D),_.fromBufferAttribute(r,B),v.fromBufferAttribute(l,w),S.fromBufferAttribute(l,D),E.fromBufferAttribute(l,B),g.sub(p),_.sub(p),S.sub(v),E.sub(v);const G=1/(S.x*E.y-E.x*S.y);isFinite(G)&&(b.copy(g).multiplyScalar(E.y).addScaledVector(_,-S.y).multiplyScalar(G),y.copy(_).multiplyScalar(S.x).addScaledVector(g,-E.x).multiplyScalar(G),d[w].add(b),d[D].add(b),d[B].add(b),f[w].add(y),f[D].add(y),f[B].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let w=0,D=I.length;w<D;++w){const B=I[w],G=B.start,K=B.count;for(let ee=G,V=G+K;ee<V;ee+=3)x(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}const O=new q,C=new q,R=new q,P=new q;function F(w){R.fromBufferAttribute(a,w),P.copy(R);const D=d[w];O.copy(D),O.sub(R.multiplyScalar(R.dot(D))).normalize(),C.crossVectors(P,D);const G=C.dot(f[w])<0?-1:1;c.setXYZW(w,O.x,O.y,O.z,G)}for(let w=0,D=I.length;w<D;++w){const B=I[w],G=B.start,K=B.count;for(let ee=G,V=G+K;ee<V;ee+=3)F(e.getX(ee+0)),F(e.getX(ee+1)),F(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==t.count)r=new Pi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let v=0,S=r.count;v<S;v++)r.setXYZ(v,0,0,0);const a=new q,l=new q,c=new q,d=new q,f=new q,p=new q,g=new q,_=new q;if(e)for(let v=0,S=e.count;v<S;v+=3){const E=e.getX(v+0),b=e.getX(v+1),y=e.getX(v+2);a.fromBufferAttribute(t,E),l.fromBufferAttribute(t,b),c.fromBufferAttribute(t,y),g.subVectors(c,l),_.subVectors(a,l),g.cross(_),d.fromBufferAttribute(r,E),f.fromBufferAttribute(r,b),p.fromBufferAttribute(r,y),d.add(g),f.add(g),p.add(g),r.setXYZ(E,d.x,d.y,d.z),r.setXYZ(b,f.x,f.y,f.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let v=0,S=t.count;v<S;v+=3)a.fromBufferAttribute(t,v+0),l.fromBufferAttribute(t,v+1),c.fromBufferAttribute(t,v+2),g.subVectors(c,l),_.subVectors(a,l),g.cross(_),r.setXYZ(v+0,g.x,g.y,g.z),r.setXYZ(v+1,g.x,g.y,g.z),r.setXYZ(v+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)mn.fromBufferAttribute(e,t),mn.normalize(),e.setXYZ(t,mn.x,mn.y,mn.z)}toNonIndexed(){function e(d,f){const p=d.array,g=d.itemSize,_=d.normalized,v=new p.constructor(f.length*g);let S=0,E=0;for(let b=0,y=f.length;b<y;b++){d.isInterleavedBufferAttribute?S=f[b]*d.data.stride+d.offset:S=f[b]*g;for(let x=0;x<g;x++)v[E++]=p[S++]}return new Pi(v,g,_)}if(this.index===null)return st("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new hi,r=this.index.array,a=this.attributes;for(const d in a){const f=a[d],p=e(f,r);t.setAttribute(d,p)}const l=this.morphAttributes;for(const d in l){const f=[],p=l[d];for(let g=0,_=p.length;g<_;g++){const v=p[g],S=e(v,r);f.push(S)}t.morphAttributes[d]=f}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let d=0,f=c.length;d<f;d++){const p=c[d];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const f=this.parameters;for(const p in f)f[p]!==void 0&&(e[p]=f[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const f in r){const p=r[f];e.data.attributes[f]=p.toJSON(e.data)}const a={};let l=!1;for(const f in this.morphAttributes){const p=this.morphAttributes[f],g=[];for(let _=0,v=p.length;_<v;_++){const S=p[_];g.push(S.toJSON(e.data))}g.length>0&&(a[f]=g,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere=d.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const a=e.attributes;for(const p in a){const g=a[p];this.setAttribute(p,g.clone(t))}const l=e.morphAttributes;for(const p in l){const g=[],_=l[p];for(let v=0,S=_.length;v<S;v++)g.push(_[v].clone(t));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let p=0,g=c.length;p<g;p++){const _=c[p];this.addGroup(_.start,_.count,_.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class J_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bg,this.updateRanges=[],this.version=0,this.uuid=Br()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let a=0,l=this.stride;a<l;a++)this.array[e+a]=t.array[r+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Br()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Br()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Un=new q;class uc{constructor(e,t,r,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)Un.fromBufferAttribute(this,t),Un.applyMatrix4(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Un.fromBufferAttribute(this,t),Un.applyNormalMatrix(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Un.fromBufferAttribute(this,t),Un.transformDirection(e),this.setXYZ(t,Un.x,Un.y,Un.z);return this}getComponent(e,t){let r=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(r=Bi(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Ut(r,this.array)),this.data.array[e*this.data.stride+this.offset+t]=r,this}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Bi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Bi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Bi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Bi(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),r=Ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),r=Ut(r,this.array),a=Ut(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),r=Ut(r,this.array),a=Ut(a,this.array),l=Ut(l,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=a,this.data.array[e+3]=l,this}clone(e){if(e===void 0){cc("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const a=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[a+l])}return new Pi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new uc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){cc("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const a=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[a+l])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Sd=new q,Q_=new q,ex=new ot;class Or{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=Sd.subVectors(r,t).cross(Q_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,r=!0){const a=e.delta(Sd),l=this.normal.dot(a);if(l===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return r===!0&&(c<0||c>1)?null:t.copy(e.start).addScaledVector(a,c)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||ex.getNormalMatrix(e),a=this.coplanarPoint(Sd).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let tx=0;class _s extends gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=Br(),this.name="",this.type="Material",this.blending=po,this.side=fs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eg,this.blendDst=wg,this.blendEquation=oa,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=E_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=td,this.stencilZFail=td,this.stencilZPass=td,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){st(`Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){st(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector2&&r&&r.isVector2||a&&a.isEuler&&r&&r.isEuler||a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,r.blending=this.blending,r.side=this.side,r.shadowSide=this.shadowSide,r.vertexColors=this.vertexColors,r.opacity=this.opacity,r.transparent=this.transparent,r.blendSrc=this.blendSrc,r.blendDst=this.blendDst,r.blendEquation=this.blendEquation,r.blendSrcAlpha=this.blendSrcAlpha,r.blendDstAlpha=this.blendDstAlpha,r.blendEquationAlpha=this.blendEquationAlpha,r.blendColor=this.blendColor.getHex(),r.blendAlpha=this.blendAlpha,r.depthFunc=this.depthFunc,r.depthTest=this.depthTest,r.depthWrite=this.depthWrite,r.colorWrite=this.colorWrite,r.clipIntersection=this.clipIntersection,r.clipShadows=this.clipShadows,r.stencilWriteMask=this.stencilWriteMask,r.stencilFunc=this.stencilFunc,r.stencilRef=this.stencilRef,r.stencilFuncMask=this.stencilFuncMask,r.stencilFail=this.stencilFail,r.stencilZFail=this.stencilZFail,r.stencilZPass=this.stencilZPass,r.stencilWrite=this.stencilWrite,r.polygonOffset=this.polygonOffset,r.polygonOffsetFactor=this.polygonOffsetFactor,r.polygonOffsetUnits=this.polygonOffsetUnits,r.dithering=this.dithering,r.alphaTest=this.alphaTest,r.alphaHash=this.alphaHash,r.alphaToCoverage=this.alphaToCoverage,r.premultipliedAlpha=this.premultipliedAlpha,r.forceSinglePass=this.forceSinglePass,r.allowOverride=this.allowOverride,r.visible=this.visible,r.toneMapped=this.toneMapped,r.name=this.name,this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(r.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(r.clippingPlanes=this.clippingPlanes.map(l=>l.toJSON())),this.rotation!==void 0&&(r.rotation=this.rotation),this.depthPacking!==void 0&&(r.depthPacking=this.depthPacking),this.linewidth!==void 0&&(r.linewidth=this.linewidth),this.linecap!==void 0&&(r.linecap=this.linecap),this.linejoin!==void 0&&(r.linejoin=this.linejoin),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.wireframe!==void 0&&(r.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(r.flatShading=this.flatShading),this.fog!==void 0&&(r.fog=this.fog),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const c=[];for(const d in l){const f=l[d];delete f.metadata,c.push(f)}return c}if(t){const l=a(e.textures),c=a(e.images);l.length>0&&(r.textures=l),c.length>0&&(r.images=c)}return r}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new gt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(r=>new Or().fromJSON(r))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new ct().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ct().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Yg extends _s{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Qs;const no=new q,ea=new q,ta=new q,na=new ct,io=new ct,qg=new kt,Nl=new q,ro=new q,Il=new q,Um=new ct,Md=new ct,Fm=new ct;class nx extends Mn{constructor(e=new Yg){if(super(),this.isSprite=!0,this.type="Sprite",Qs===void 0){Qs=new hi;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),r=new J_(t,5);Qs.setIndex([0,1,2,0,2,3]),Qs.setAttribute("position",new uc(r,3,0,!1)),Qs.setAttribute("uv",new uc(r,2,3,!1))}this.geometry=Qs,this.material=e,this.center=new ct(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Tt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ea.setFromMatrixScale(this.matrixWorld),qg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ta.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ea.multiplyScalar(-ta.z);const r=this.material.rotation;let a,l;r!==0&&(l=Math.cos(r),a=Math.sin(r));const c=this.center;Ul(Nl.set(-.5,-.5,0),ta,c,ea,a,l),Ul(ro.set(.5,-.5,0),ta,c,ea,a,l),Ul(Il.set(.5,.5,0),ta,c,ea,a,l),Um.set(0,0),Md.set(1,0),Fm.set(1,1);let d=e.ray.intersectTriangle(Nl,ro,Il,!1,no);if(d===null&&(Ul(ro.set(-.5,.5,0),ta,c,ea,a,l),Md.set(0,1),d=e.ray.intersectTriangle(Nl,Il,ro,!1,no),d===null))return;const f=e.ray.origin.distanceTo(no);f<e.near||f>e.far||t.push({distance:f,point:no.clone(),uv:di.getInterpolation(no,Nl,ro,Il,Um,Md,Fm,new ct),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ul(s,e,t,r,a,l){na.subVectors(s,t).addScalar(.5).multiply(r),a!==void 0?(io.x=l*na.x-a*na.y,io.y=a*na.x+l*na.y):io.copy(na),s.copy(e),s.x+=io.x,s.y+=io.y,s.applyMatrix4(qg)}const ar=new q,Ed=new q,Fl=new q,Ol=new q;class ix{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ar)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ar.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ar.copy(this.origin).addScaledVector(this.direction,t),ar.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){Ed.copy(e).add(t).multiplyScalar(.5),Fl.copy(t).sub(e).normalize(),Ol.copy(this.origin).sub(Ed);const l=e.distanceTo(t)*.5,c=-this.direction.dot(Fl),d=Ol.dot(this.direction),f=-Ol.dot(Fl),p=Ol.lengthSq(),g=Math.abs(1-c*c);let _,v,S,E;if(g>0)if(_=c*f-d,v=c*d-f,E=l*g,_>=0)if(v>=-E)if(v<=E){const b=1/g;_*=b,v*=b,S=_*(_+c*v+2*d)+v*(c*_+v+2*f)+p}else v=l,_=Math.max(0,-(c*v+d)),S=-_*_+v*(v+2*f)+p;else v=-l,_=Math.max(0,-(c*v+d)),S=-_*_+v*(v+2*f)+p;else v<=-E?(_=Math.max(0,-(-c*l+d)),v=_>0?-l:Math.min(Math.max(-l,-f),l),S=-_*_+v*(v+2*f)+p):v<=E?(_=0,v=Math.min(Math.max(-l,-f),l),S=v*(v+2*f)+p):(_=Math.max(0,-(c*l+d)),v=_>0?l:Math.min(Math.max(-l,-f),l),S=-_*_+v*(v+2*f)+p);else v=c>0?-l:l,_=Math.max(0,-(c*v+d)),S=-_*_+v*(v+2*f)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,_),a&&a.copy(Ed).addScaledVector(Fl,v),S}intersectSphere(e,t){if(e.radius<0)return null;ar.subVectors(e.center,this.origin);const r=ar.dot(this.direction),a=ar.dot(ar)-r*r,l=e.radius*e.radius;if(a>l)return null;const c=Math.sqrt(l-a),d=r-c,f=r+c;return f<0?null:d<0?this.at(f,t):this.at(d,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,l,c,d,f;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,v=this.origin;return p>=0?(r=(e.min.x-v.x)*p,a=(e.max.x-v.x)*p):(r=(e.max.x-v.x)*p,a=(e.min.x-v.x)*p),g>=0?(l=(e.min.y-v.y)*g,c=(e.max.y-v.y)*g):(l=(e.max.y-v.y)*g,c=(e.min.y-v.y)*g),r>c||l>a||((l>r||isNaN(r))&&(r=l),(c<a||isNaN(a))&&(a=c),_>=0?(d=(e.min.z-v.z)*_,f=(e.max.z-v.z)*_):(d=(e.max.z-v.z)*_,f=(e.min.z-v.z)*_),r>f||d>a)||((d>r||r!==r)&&(r=d),(f<a||a!==a)&&(a=f),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,ar)!==null}intersectTriangle(e,t,r,a,l){const c=this.origin,d=this.direction,f=d.x,p=d.y,g=d.z,_=e.x-c.x,v=e.y-c.y,S=e.z-c.z,E=t.x-c.x,b=t.y-c.y,y=t.z-c.z,x=r.x-c.x,I=r.y-c.y,O=r.z-c.z,C=Math.abs(f),R=Math.abs(p),P=Math.abs(g);let F,w,D,B,G,K,ee,V,J,he,te,Y;if(C>=R&&C>=P?(D=f,K=_,J=E,Y=x,f>=0?(F=p,w=g,B=v,G=S,ee=b,V=y,he=I,te=O):(F=g,w=p,B=S,G=v,ee=y,V=b,he=O,te=I)):R>=P?(D=p,K=v,J=b,Y=I,p>=0?(F=g,w=f,B=S,G=_,ee=y,V=E,he=O,te=x):(F=f,w=g,B=_,G=S,ee=E,V=y,he=x,te=O)):(D=g,K=S,J=y,Y=O,g>=0?(F=f,w=p,B=_,G=v,ee=E,V=b,he=x,te=I):(F=p,w=f,B=v,G=_,ee=b,V=E,he=I,te=x)),D===0)return null;const $=F/D,Z=w/D,L=1/D,ae=B-$*K,ye=G-Z*K,Ve=ee-$*J,ze=V-Z*J,Ge=he-$*Y,le=te-Z*Y,de=Ge*ze-le*Ve,Ee=ae*le-ye*Ge,Qe=Ve*ye-ze*ae;if(a){if(de<0||Ee<0||Qe<0)return null}else if((de<0||Ee<0||Qe<0)&&(de>0||Ee>0||Qe>0))return null;const Fe=de+Ee+Qe;if(Fe===0)return null;const dt=L*(de*K+Ee*J+Qe*Y);return(Fe>0?dt<0:dt>0)?null:this.at(dt/Fe,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lr extends _s{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.combine=Th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Om=new kt,ss=new ix,kl=new yo,km=new q,Bl=new q,zl=new q,Hl=new q,wd=new q,Vl=new q,Bm=new q,Gl=new q;class lt extends Mn{constructor(e=new hi,t=new lr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=a.length;l<c;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,c=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(l&&d){Vl.set(0,0,0);for(let f=0,p=l.length;f<p;f++){const g=d[f],_=l[f];g!==0&&(wd.fromBufferAttribute(_,e),c?Vl.addScaledVector(wd,g):Vl.addScaledVector(wd.sub(t),g))}t.add(Vl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),kl.copy(r.boundingSphere),kl.applyMatrix4(l),ss.copy(e.ray).recast(e.near),!(kl.containsPoint(ss.origin)===!1&&(ss.intersectSphere(kl,km)===null||ss.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(Om.copy(l).invert(),ss.copy(e.ray).applyMatrix4(Om),!(r.boundingBox!==null&&ss.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,r){let a;const l=this.geometry,c=this.material,d=l.index,f=l.attributes.position,p=l.attributes.uv,g=l.attributes.uv1,_=l.attributes.normal,v=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(c))for(let E=0,b=v.length;E<b;E++){const y=v[E],x=c[y.materialIndex],I=Math.max(y.start,S.start),O=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let C=I,R=O;C<R;C+=3){const P=d.getX(C),F=d.getX(C+1),w=d.getX(C+2);a=Wl(this,x,e,r,p,g,_,P,F,w),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const E=Math.max(0,S.start),b=Math.min(d.count,S.start+S.count);for(let y=E,x=b;y<x;y+=3){const I=d.getX(y),O=d.getX(y+1),C=d.getX(y+2);a=Wl(this,c,e,r,p,g,_,I,O,C),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}else if(f!==void 0)if(Array.isArray(c))for(let E=0,b=v.length;E<b;E++){const y=v[E],x=c[y.materialIndex],I=Math.max(y.start,S.start),O=Math.min(f.count,Math.min(y.start+y.count,S.start+S.count));for(let C=I,R=O;C<R;C+=3){const P=C,F=C+1,w=C+2;a=Wl(this,x,e,r,p,g,_,P,F,w),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const E=Math.max(0,S.start),b=Math.min(f.count,S.start+S.count);for(let y=E,x=b;y<x;y+=3){const I=y,O=y+1,C=y+2;a=Wl(this,c,e,r,p,g,_,I,O,C),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}}}function rx(s,e,t,r,a,l,c,d){let f;if(e.side===Wn?f=r.intersectTriangle(c,l,a,!0,d):f=r.intersectTriangle(a,l,c,e.side===fs,d),f===null)return null;Gl.copy(d),Gl.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(Gl);return p<t.near||p>t.far?null:{distance:p,point:Gl.clone(),object:s}}function Wl(s,e,t,r,a,l,c,d,f,p){s.getVertexPosition(d,Bl),s.getVertexPosition(f,zl),s.getVertexPosition(p,Hl);const g=rx(s,e,t,r,Bl,zl,Hl,Bm);if(g){const _=new q;di.getBarycoord(Bm,Bl,zl,Hl,_),a&&(g.uv=di.getInterpolatedAttribute(a,d,f,p,_,new ct)),l&&(g.uv1=di.getInterpolatedAttribute(l,d,f,p,_,new ct)),c&&(g.normal=di.getInterpolatedAttribute(c,d,f,p,_,new q),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const v={a:d,b:f,c:p,normal:new q,materialIndex:0};di.getNormal(Bl,zl,Hl,v.normal),g.face=v,g.barycoord=_}return g}class Kg extends Ln{constructor(e=null,t=1,r=1,a,l,c,d,f,p=Sn,g=Sn,_,v){super(null,c,d,f,p,g,a,l,_,v),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xh extends Pi{constructor(e,t,r,a=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ia=new kt,zm=new kt,Xl=[],Hm=new vs,sx=new kt,so=new lt,ao=new yo;class ax extends lt{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xh(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<r;a++)this.setMatrixAt(a,sx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,ia),Hm.copy(e.boundingBox).applyMatrix4(ia),this.boundingBox.union(Hm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,ia),ao.copy(e.boundingSphere).applyMatrix4(ia),this.boundingSphere.union(ao)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const r=t.morphTargetInfluences,a=this.morphTexture.source.data.data,l=r.length+1,c=e*l+1;for(let d=0;d<r.length;d++)r[d]=a[c+d]}raycast(e,t){const r=this.matrixWorld,a=this.count;if(so.geometry=this.geometry,so.material=this.material,so.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ao.copy(this.boundingSphere),ao.applyMatrix4(r),e.ray.intersectsSphere(ao)!==!1))for(let l=0;l<a;l++){this.getMatrixAt(l,ia),zm.multiplyMatrices(r,ia),so.matrixWorld=zm,so.raycast(e,Xl);for(let c=0,d=Xl.length;c<d;c++){const f=Xl[c];f.instanceId=l,f.object=this,t.push(f)}Xl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new xh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const r=t.morphTargetInfluences,a=r.length+1;this.morphTexture===null&&(this.morphTexture=new Kg(new Float32Array(a*this.count),a,this.count,Rh,Ci));const l=this.morphTexture.source.data.data;let c=0;for(let p=0;p<r.length;p++)c+=r[p];const d=this.geometry.morphTargetsRelative?1:1-c,f=a*e;return l[f]=d,l.set(r,f+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const as=new yo,ox=new ct(.5,.5),Yl=new q;class Oh{constructor(e=new Or,t=new Or,r=new Or,a=new Or,l=new Or,c=new Or){this.planes=[e,t,r,a,l,c]}set(e,t,r,a,l,c){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(r),d[3].copy(a),d[4].copy(l),d[5].copy(c),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=zi,r=!1){const a=this.planes,l=e.elements,c=l[0],d=l[1],f=l[2],p=l[3],g=l[4],_=l[5],v=l[6],S=l[7],E=l[8],b=l[9],y=l[10],x=l[11],I=l[12],O=l[13],C=l[14],R=l[15];if(a[0].setComponents(p-c,S-g,x-E,R-I).normalize(),a[1].setComponents(p+c,S+g,x+E,R+I).normalize(),a[2].setComponents(p+d,S+_,x+b,R+O).normalize(),a[3].setComponents(p-d,S-_,x-b,R-O).normalize(),r)a[4].setComponents(f,v,y,C).normalize(),a[5].setComponents(p-f,S-v,x-y,R-C).normalize();else if(a[4].setComponents(p-f,S-v,x-y,R-C).normalize(),t===zi)a[5].setComponents(p+f,S+v,x+y,R+C).normalize();else if(t===_o)a[5].setComponents(f,v,y,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){as.center.set(0,0,0);const t=ox.distanceTo(e.center);return as.radius=.7071067811865476+t,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(Yl.x=a.normal.x>0?e.max.x:e.min.x,Yl.y=a.normal.y>0?e.max.y:e.min.y,Yl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Yl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $g extends Ln{constructor(e=[],t=ps,r,a,l,c,d,f,p,g){super(e,t,r,a,l,c,d,f,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lx extends Ln{constructor(e,t,r,a,l,c,d,f,p){super(e,t,r,a,l,c,d,f,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xo extends Ln{constructor(e,t,r=Vi,a,l,c,d=Sn,f=Sn,p,g=fr,_=1){if(g!==fr&&g!==ds)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:t,depth:_};super(v,a,l,c,d,f,g,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class cx extends xo{constructor(e,t=Vi,r=ps,a,l,c=Sn,d=Sn,f,p=fr){const g={width:e,height:e,depth:1},_=[g,g,g,g,g,g];super(e,e,t,r,a,l,c,d,f,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zg extends Ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Yt extends hi{constructor(e=1,t=1,r=1,a=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:l,depthSegments:c};const d=this;a=Math.floor(a),l=Math.floor(l),c=Math.floor(c);const f=[],p=[],g=[],_=[];let v=0,S=0;E("z","y","x",-1,-1,r,t,e,c,l,0),E("z","y","x",1,-1,r,t,-e,c,l,1),E("x","z","y",1,1,e,r,t,a,c,2),E("x","z","y",1,-1,e,r,-t,a,c,3),E("x","y","z",1,-1,e,t,r,a,l,4),E("x","y","z",-1,-1,e,t,-r,a,l,5),this.setIndex(f),this.setAttribute("position",new On(p,3)),this.setAttribute("normal",new On(g,3)),this.setAttribute("uv",new On(_,2));function E(b,y,x,I,O,C,R,P,F,w,D){const B=C/F,G=R/w,K=C/2,ee=R/2,V=P/2,J=F+1,he=w+1;let te=0,Y=0;const $=new q;for(let Z=0;Z<he;Z++){const L=Z*G-ee;for(let ae=0;ae<J;ae++){const ye=ae*B-K;$[b]=ye*I,$[y]=L*O,$[x]=V,p.push($.x,$.y,$.z),$[b]=0,$[y]=0,$[x]=P>0?1:-1,g.push($.x,$.y,$.z),_.push(ae/F),_.push(1-Z/w),te+=1}}for(let Z=0;Z<w;Z++)for(let L=0;L<F;L++){const ae=v+L+J*Z,ye=v+L+J*(Z+1),Ve=v+(L+1)+J*(Z+1),ze=v+(L+1)+J*Z;f.push(ae,ye,ze),f.push(ye,Ve,ze),Y+=6}d.addGroup(S,Y,D),S+=Y,v+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ai extends hi{constructor(e=1,t=1,r=1,a=32,l=1,c=!1,d=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:a,heightSegments:l,openEnded:c,thetaStart:d,thetaLength:f};const p=this;a=Math.floor(a),l=Math.floor(l);const g=[],_=[],v=[],S=[];let E=0;const b=[],y=r/2;let x=0;I(),c===!1&&(e>0&&O(!0),t>0&&O(!1)),this.setIndex(g),this.setAttribute("position",new On(_,3)),this.setAttribute("normal",new On(v,3)),this.setAttribute("uv",new On(S,2));function I(){const C=new q,R=new q;let P=0;const F=(t-e)/r;for(let w=0;w<=l;w++){const D=[],B=w/l,G=B*(t-e)+e;for(let K=0;K<=a;K++){const ee=K/a,V=ee*f+d,J=Math.sin(V),he=Math.cos(V);R.x=G*J,R.y=-B*r+y,R.z=G*he,_.push(R.x,R.y,R.z),C.set(J,F,he).normalize(),v.push(C.x,C.y,C.z),S.push(ee,1-B),D.push(E++)}b.push(D)}for(let w=0;w<a;w++)for(let D=0;D<l;D++){const B=b[D][w],G=b[D+1][w],K=b[D+1][w+1],ee=b[D][w+1];(e>0||D!==0)&&(g.push(B,G,ee),P+=3),(t>0||D!==l-1)&&(g.push(G,K,ee),P+=3)}p.addGroup(x,P,0),x+=P}function O(C){const R=E,P=new ct,F=new q;let w=0;const D=C===!0?e:t,B=C===!0?1:-1;for(let K=1;K<=a;K++)_.push(0,y*B,0),v.push(0,B,0),S.push(.5,.5),E++;const G=E;for(let K=0;K<=a;K++){const V=K/a*f+d,J=Math.cos(V),he=Math.sin(V);F.x=D*he,F.y=y*B,F.z=D*J,_.push(F.x,F.y,F.z),v.push(0,B,0),P.x=J*.5+.5,P.y=he*.5*B+.5,S.push(P.x,P.y),E++}for(let K=0;K<a;K++){const ee=R+K,V=G+K;C===!0?g.push(V,V+1,ee):g.push(V+1,V,ee),w+=3}p.addGroup(x,w,C===!0?1:2),x+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ai(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hs extends hi{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const l=e/2,c=t/2,d=Math.floor(r),f=Math.floor(a),p=d+1,g=f+1,_=e/d,v=t/f,S=[],E=[],b=[],y=[];for(let x=0;x<g;x++){const I=x*v-c;for(let O=0;O<p;O++){const C=O*_-l;E.push(C,-I,0),b.push(0,0,1),y.push(O/d),y.push(1-x/f)}}for(let x=0;x<f;x++)for(let I=0;I<d;I++){const O=I+p*x,C=I+p*(x+1),R=I+1+p*(x+1),P=I+1+p*x;S.push(O,C,P),S.push(C,R,P)}this.setIndex(S),this.setAttribute("position",new On(E,3)),this.setAttribute("normal",new On(b,3)),this.setAttribute("uv",new On(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hs(e.width,e.height,e.widthSegments,e.heightSegments)}}class dc extends hi{constructor(e=1,t=32,r=16,a=0,l=Math.PI*2,c=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:a,phiLength:l,thetaStart:c,thetaLength:d},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const f=Math.min(c+d,Math.PI);let p=0;const g=[],_=new q,v=new q,S=[],E=[],b=[],y=[];for(let x=0;x<=r;x++){const I=[],O=x/r,C=c+O*d,R=e*Math.cos(C),P=Math.sqrt(e*e-R*R);let F=0;x===0&&c===0?F=.5/t:x===r&&f===Math.PI&&(F=-.5/t);for(let w=0;w<=t;w++){const D=w/t,B=a+D*l;_.x=-P*Math.cos(B),_.y=R,_.z=P*Math.sin(B),E.push(_.x,_.y,_.z),v.copy(_).normalize(),b.push(v.x,v.y,v.z),y.push(D+F,1-O),I.push(p++)}g.push(I)}for(let x=0;x<r;x++)for(let I=0;I<t;I++){const O=g[x][I+1],C=g[x][I],R=g[x+1][I],P=g[x+1][I+1];(x!==0||c>0)&&S.push(O,C,P),(x!==r-1||f<Math.PI)&&S.push(C,R,P)}this.setIndex(S),this.setAttribute("position",new On(E,3)),this.setAttribute("normal",new On(b,3)),this.setAttribute("uv",new On(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function ha(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const a=s[t][r];if(Vm(a))a.isRenderTargetTexture?(st("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone();else if(Array.isArray(a))if(Vm(a[0])){const l=[];for(let c=0,d=a.length;c<d;c++)l[c]=a[c].clone();e[t][r]=l}else e[t][r]=a.slice();else e[t][r]=a}}return e}function Fn(s){const e={};for(let t=0;t<s.length;t++){const r=ha(s[t]);for(const a in r)e[a]=r[a]}return e}function Vm(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function ux(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function jg(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:St.workingColorSpace}const dx={clone:ha,merge:Fn};var hx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xi extends _s{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hx,this.fragmentShader=fx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ha(e.uniforms),this.uniformsGroups=ux(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const c=this.uniforms[a].value;c&&c.isTexture?t.uniforms[a]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[a]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[a]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[a]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[a]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[a]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[a]={type:"m4",value:c.toArray()}:t.uniforms[a]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const r in e.uniforms){const a=e.uniforms[r];switch(this.uniforms[r]={},a.type){case"t":this.uniforms[r].value=t[a.value]||null;break;case"c":this.uniforms[r].value=new gt().setHex(a.value);break;case"v2":this.uniforms[r].value=new ct().fromArray(a.value);break;case"v3":this.uniforms[r].value=new q().fromArray(a.value);break;case"v4":this.uniforms[r].value=new Zt().fromArray(a.value);break;case"m3":this.uniforms[r].value=new ot().fromArray(a.value);break;case"m4":this.uniforms[r].value=new kt().fromArray(a.value);break;default:this.uniforms[r].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class px extends Xi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class or extends _s{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yn extends _s{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wi,this.combine=Th,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mx extends _s{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=S_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gx extends _s{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class kh extends Mn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Td=new kt,Gm=new q,Wm=new q;class Jg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=Qn,this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Oh,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Gm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gm),Wm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,r,a){Td.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),r.setFromProjectionMatrix(Td,e.coordinateSystem,e.reversedDepth);const l=this._frameExtents,c=a?a.z/l.x:1,d=a?a.w/l.y:1,f=a?a.x/l.x:0,p=a?a.y/l.y:0;e.coordinateSystem===_o||e.reversedDepth?t.set(.5*c,0,0,.5*c+f,0,.5*d,0,.5*d+p,0,0,1,0,0,0,0,1):t.set(.5*c,0,0,.5*c+f,0,.5*d,0,.5*d+p,0,0,.5,.5,0,0,0,1),t.multiply(Td)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ql=new q,Kl=new fa,Ui=new q;class Qg extends Mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ql,Kl,Ui),Ui.x===1&&Ui.y===1&&Ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ql,Kl,Ui.set(1,1,1)).invert()}updateWorldMatrix(e,t,r=!1){super.updateWorldMatrix(e,t,r),this.matrixWorld.decompose(ql,Kl,Ui),Ui.x===1&&Ui.y===1&&Ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ql,Kl,Ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Fr=new q,Xm=new ct,Ym=new ct;class Jn extends Qg{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_h*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(nd*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _h*2*Math.atan(Math.tan(nd*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fr.x,Fr.y).multiplyScalar(-e/Fr.z),Fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Fr.x,Fr.y).multiplyScalar(-e/Fr.z)}getViewSize(e,t){return this.getViewBounds(e,Xm,Ym),t.subVectors(Ym,Xm)}setViewOffset(e,t,r,a,l,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(nd*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,l=-.5*a;const c=this.view;if(this.view!==null&&this.view.enabled){const f=c.fullWidth,p=c.fullHeight;l+=c.offsetX*a/f,t-=c.offsetY*r/p,a*=c.width/f,r*=c.height/p}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class vx extends Jg{constructor(){super(new Jn(90,1,.5,500)),this.isPointLightShadow=!0}}class Ad extends kh{constructor(e,t,r=0,a=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=a,this.shadow=new vx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Bh extends Qg{constructor(e=-1,t=1,r=1,a=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,c=r+e,d=a+t,f=a-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,c=l+p*this.view.width,d-=g*this.view.offsetY,f=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,c,d,f,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class _x extends Jg{constructor(){super(new Bh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xx extends kh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mn.DEFAULT_UP),this.updateMatrix(),this.target=new Mn,this.shadow=new _x}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class yx extends kh{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ra=-90,sa=1;class Sx extends Mn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Jn(ra,sa,e,t);a.layers=this.layers,this.add(a);const l=new Jn(ra,sa,e,t);l.layers=this.layers,this.add(l);const c=new Jn(ra,sa,e,t);c.layers=this.layers,this.add(c);const d=new Jn(ra,sa,e,t);d.layers=this.layers,this.add(d);const f=new Jn(ra,sa,e,t);f.layers=this.layers,this.add(f);const p=new Jn(ra,sa,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,l,c,d,f]=t;for(const p of t)this.remove(p);if(e===zi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===_o)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,c,d,f,p,g]=this.children,_=e.getRenderTarget(),v=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const b=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(r,0,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(r,1,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(r,2,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(r,3,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(r,4,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),r.texture.generateMipmaps=b,e.setRenderTarget(r,5,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,g),e.setRenderTarget(_,v,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Mx extends Jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ex{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,st("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Wh=class Wh{constructor(e,t,r,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,r,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let r=0;r<4;r++)this.elements[r]=e[r+t];return this}set(e,t,r,a){const l=this.elements;return l[0]=e,l[2]=t,l[1]=r,l[3]=a,this}};Wh.prototype.isMatrix2=!0;let qm=Wh;function Km(s,e,t,r){const a=wx(r);switch(t){case Og:return s*e;case Rh:return s*e/a.components*a.byteLength;case Ph:return s*e/a.components*a.byteLength;case ms:return s*e*2/a.components*a.byteLength;case Lh:return s*e*2/a.components*a.byteLength;case kg:return s*e*3/a.components*a.byteLength;case bi:return s*e*4/a.components*a.byteLength;case Dh:return s*e*4/a.components*a.byteLength;case Jl:case Ql:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ec:case tc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Gd:case Xd:return Math.max(s,16)*Math.max(e,8)/4;case Vd:case Wd:return Math.max(s,8)*Math.max(e,8)/2;case Yd:case qd:case $d:case Zd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Kd:case ic:case jd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Jd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case eh:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case th:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case nh:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ih:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case rh:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case sh:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ah:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case oh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case lh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case ch:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case uh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case dh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case hh:case fh:case ph:return Math.ceil(s/4)*Math.ceil(e/4)*16;case mh:case gh:return Math.ceil(s/4)*Math.ceil(e/4)*8;case rc:case vh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wx(s){switch(s){case Qn:case Ng:return{byteLength:1,components:1};case go:case Ig:case Gi:return{byteLength:2,components:1};case Ch:case bh:return{byteLength:2,components:4};case Vi:case Ah:case Ci:return{byteLength:4,components:1};case Ug:case Fg:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?st("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function e0(){let s=null,e=!1,t=null,r=null;function a(l,c){r=s.requestAnimationFrame(a),t(l,c)}return{start:function(){e!==!0&&t!==null&&s!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function Tx(s){const e=new WeakMap;function t(d,f){const p=d.array,g=d.usage,_=p.byteLength,v=s.createBuffer();s.bindBuffer(f,v),s.bufferData(f,p,g),d.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)S=s.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:_}}function r(d,f,p){const g=f.array,_=f.updateRanges;if(s.bindBuffer(p,d),_.length===0)s.bufferSubData(p,0,g);else{_.sort((S,E)=>S.start-E.start);let v=0;for(let S=1;S<_.length;S++){const E=_[v],b=_[S];b.start<=E.start+E.count+1?E.count=Math.max(E.count,b.start+b.count-E.start):(++v,_[v]=b)}_.length=v+1;for(let S=0,E=_.length;S<E;S++){const b=_[S];s.bufferSubData(p,b.start*g.BYTES_PER_ELEMENT,g,b.start,b.count)}f.clearUpdateRanges()}f.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const f=e.get(d);f&&(s.deleteBuffer(f.buffer),e.delete(d))}function c(d,f){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,t(d,f));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,f),p.version=d.version}}return{get:a,remove:l,update:c}}var Ax=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Px=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ix=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ux=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ox=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,qx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,$x=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Jx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ey=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ty=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ny="gl_FragColor = linearToOutputTexel( gl_FragColor );",iy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ry=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,sy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ay=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ly=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,py=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,my=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,_y=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,xy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,My=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ey=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wy=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ty=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ay=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,by=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ry=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Py=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ly=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ny=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Iy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Oy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ky=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,By=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ky=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$y=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,eS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,nS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,aS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,cS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,uS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_S=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,SS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,MS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ES=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,TS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const AS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,CS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,LS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,NS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,IS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,US=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,FS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,OS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,HS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,XS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,KS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$S=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mt={alphahash_fragment:Ax,alphahash_pars_fragment:Cx,alphamap_fragment:bx,alphamap_pars_fragment:Rx,alphatest_fragment:Px,alphatest_pars_fragment:Lx,aomap_fragment:Dx,aomap_pars_fragment:Nx,batching_pars_vertex:Ix,batching_vertex:Ux,begin_vertex:Fx,beginnormal_vertex:Ox,bsdfs:kx,iridescence_fragment:Bx,bumpmap_pars_fragment:zx,clipping_planes_fragment:Hx,clipping_planes_pars_fragment:Vx,clipping_planes_pars_vertex:Gx,clipping_planes_vertex:Wx,color_fragment:Xx,color_pars_fragment:Yx,color_pars_vertex:qx,color_vertex:Kx,common:$x,cube_uv_reflection_fragment:Zx,defaultnormal_vertex:jx,displacementmap_pars_vertex:Jx,displacementmap_vertex:Qx,emissivemap_fragment:ey,emissivemap_pars_fragment:ty,colorspace_fragment:ny,colorspace_pars_fragment:iy,envmap_fragment:ry,envmap_common_pars_fragment:sy,envmap_pars_fragment:ay,envmap_pars_vertex:oy,envmap_physical_pars_fragment:_y,envmap_vertex:ly,fog_vertex:cy,fog_pars_vertex:uy,fog_fragment:dy,fog_pars_fragment:hy,gradientmap_pars_fragment:fy,lightmap_pars_fragment:py,lights_lambert_fragment:my,lights_lambert_pars_fragment:gy,lights_pars_begin:vy,lights_toon_fragment:xy,lights_toon_pars_fragment:yy,lights_phong_fragment:Sy,lights_phong_pars_fragment:My,lights_physical_fragment:Ey,lights_physical_pars_fragment:wy,lights_fragment_begin:Ty,lights_fragment_maps:Ay,lights_fragment_end:Cy,lightprobes_pars_fragment:by,logdepthbuf_fragment:Ry,logdepthbuf_pars_fragment:Py,logdepthbuf_pars_vertex:Ly,logdepthbuf_vertex:Dy,map_fragment:Ny,map_pars_fragment:Iy,map_particle_fragment:Uy,map_particle_pars_fragment:Fy,metalnessmap_fragment:Oy,metalnessmap_pars_fragment:ky,morphinstance_vertex:By,morphcolor_vertex:zy,morphnormal_vertex:Hy,morphtarget_pars_vertex:Vy,morphtarget_vertex:Gy,normal_fragment_begin:Wy,normal_fragment_maps:Xy,normal_pars_fragment:Yy,normal_pars_vertex:qy,normal_vertex:Ky,normalmap_pars_fragment:$y,clearcoat_normal_fragment_begin:Zy,clearcoat_normal_fragment_maps:jy,clearcoat_pars_fragment:Jy,iridescence_pars_fragment:Qy,opaque_fragment:eS,packing:tS,premultiplied_alpha_fragment:nS,project_vertex:iS,dithering_fragment:rS,dithering_pars_fragment:sS,roughnessmap_fragment:aS,roughnessmap_pars_fragment:oS,shadowmap_pars_fragment:lS,shadowmap_pars_vertex:cS,shadowmap_vertex:uS,shadowmask_pars_fragment:dS,skinbase_vertex:hS,skinning_pars_vertex:fS,skinning_vertex:pS,skinnormal_vertex:mS,specularmap_fragment:gS,specularmap_pars_fragment:vS,tonemapping_fragment:_S,tonemapping_pars_fragment:xS,transmission_fragment:yS,transmission_pars_fragment:SS,uv_pars_fragment:MS,uv_pars_vertex:ES,uv_vertex:wS,worldpos_vertex:TS,background_vert:AS,background_frag:CS,backgroundCube_vert:bS,backgroundCube_frag:RS,cube_vert:PS,cube_frag:LS,depth_vert:DS,depth_frag:NS,distance_vert:IS,distance_frag:US,equirect_vert:FS,equirect_frag:OS,linedashed_vert:kS,linedashed_frag:BS,meshbasic_vert:zS,meshbasic_frag:HS,meshlambert_vert:VS,meshlambert_frag:GS,meshmatcap_vert:WS,meshmatcap_frag:XS,meshnormal_vert:YS,meshnormal_frag:qS,meshphong_vert:KS,meshphong_frag:$S,meshphysical_vert:ZS,meshphysical_frag:jS,meshtoon_vert:JS,meshtoon_frag:QS,points_vert:eM,points_frag:tM,shadow_vert:nM,shadow_frag:iM,sprite_vert:rM,sprite_frag:sM},Ie={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},ki={basic:{uniforms:Fn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:Fn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new gt(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:Fn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:Fn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:Fn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new gt(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:Fn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:Fn([Ie.points,Ie.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:Fn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:Fn([Ie.common,Ie.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:Fn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:Fn([Ie.sprite,Ie.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:Fn([Ie.common,Ie.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:Fn([Ie.lights,Ie.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};ki.physical={uniforms:Fn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const $l={r:0,b:0,g:0},aM=new kt,t0=new ot;t0.set(-1,0,0,0,1,0,0,0,1);function oM(s,e,t,r,a,l){const c=new gt(0);let d=a===!0?0:1,f,p,g=null,_=0,v=null;function S(I){let O=I.isScene===!0?I.background:null;if(O&&O.isTexture){const C=I.backgroundBlurriness>0;O=e.get(O,C)}return O}function E(I){let O=!1;const C=S(I);C===null?y(c,d):C&&C.isColor&&(y(C,1),O=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,l):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,l),(s.autoClear||O)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function b(I,O){const C=S(O);C&&(C.isCubeTexture||C.mapping===fc)?(p===void 0&&(p=new lt(new Yt(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:ha(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(R,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),p.material.uniforms.envMap.value=C,p.material.uniforms.backgroundBlurriness.value=O.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(aM.makeRotationFromEuler(O.backgroundRotation)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(t0),p.material.toneMapped=St.getTransfer(C.colorSpace)!==It,(g!==C||_!==C.version||v!==s.toneMapping)&&(p.material.needsUpdate=!0,g=C,_=C.version,v=s.toneMapping),p.layers.enableAll(),I.unshift(p,p.geometry,p.material,0,0,null)):C&&C.isTexture&&(f===void 0&&(f=new lt(new hs(2,2),new Xi({name:"BackgroundMaterial",uniforms:ha(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:fs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=C,f.material.uniforms.backgroundIntensity.value=O.backgroundIntensity,f.material.toneMapped=St.getTransfer(C.colorSpace)!==It,C.matrixAutoUpdate===!0&&C.updateMatrix(),f.material.uniforms.uvTransform.value.copy(C.matrix),(g!==C||_!==C.version||v!==s.toneMapping)&&(f.material.needsUpdate=!0,g=C,_=C.version,v=s.toneMapping),f.layers.enableAll(),I.unshift(f,f.geometry,f.material,0,0,null))}function y(I,O){I.getRGB($l,jg(s)),t.buffers.color.setClear($l.r,$l.g,$l.b,O,l)}function x(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0)}return{getClearColor:function(){return c},setClearColor:function(I,O=1){c.set(I),d=O,y(c,d)},getClearAlpha:function(){return d},setClearAlpha:function(I){d=I,y(c,d)},render:E,addToRenderList:b,dispose:x}}function lM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=v(null);let l=a,c=!1;function d(G,K,ee,V,J){let he=!1;const te=_(G,V,ee,K);l!==te&&(l=te,p(l.object)),he=S(G,V,ee,J),he&&E(G,V,ee,J),J!==null&&e.update(J,s.ELEMENT_ARRAY_BUFFER),(he||c)&&(c=!1,C(G,K,ee,V),J!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function f(){return s.createVertexArray()}function p(G){return s.bindVertexArray(G)}function g(G){return s.deleteVertexArray(G)}function _(G,K,ee,V){const J=V.wireframe===!0;let he=r[K.id];he===void 0&&(he={},r[K.id]=he);const te=G.isInstancedMesh===!0?G.id:0;let Y=he[te];Y===void 0&&(Y={},he[te]=Y);let $=Y[ee.id];$===void 0&&($={},Y[ee.id]=$);let Z=$[J];return Z===void 0&&(Z=v(f()),$[J]=Z),Z}function v(G){const K=[],ee=[],V=[];for(let J=0;J<t;J++)K[J]=0,ee[J]=0,V[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:ee,attributeDivisors:V,object:G,attributes:{},index:null}}function S(G,K,ee,V){const J=l.attributes,he=K.attributes;let te=0;const Y=ee.getAttributes();for(const $ in Y)if(Y[$].location>=0){const L=J[$];let ae=he[$];if(ae===void 0&&($==="instanceMatrix"&&G.instanceMatrix&&(ae=G.instanceMatrix),$==="instanceColor"&&G.instanceColor&&(ae=G.instanceColor)),L===void 0||L.attribute!==ae||ae&&L.data!==ae.data)return!0;te++}return l.attributesNum!==te||l.index!==V}function E(G,K,ee,V){const J={},he=K.attributes;let te=0;const Y=ee.getAttributes();for(const $ in Y)if(Y[$].location>=0){let L=he[$];L===void 0&&($==="instanceMatrix"&&G.instanceMatrix&&(L=G.instanceMatrix),$==="instanceColor"&&G.instanceColor&&(L=G.instanceColor));const ae={};ae.attribute=L,L&&L.data&&(ae.data=L.data),J[$]=ae,te++}l.attributes=J,l.attributesNum=te,l.index=V}function b(){const G=l.newAttributes;for(let K=0,ee=G.length;K<ee;K++)G[K]=0}function y(G){x(G,0)}function x(G,K){const ee=l.newAttributes,V=l.enabledAttributes,J=l.attributeDivisors;ee[G]=1,V[G]===0&&(s.enableVertexAttribArray(G),V[G]=1),J[G]!==K&&(s.vertexAttribDivisor(G,K),J[G]=K)}function I(){const G=l.newAttributes,K=l.enabledAttributes;for(let ee=0,V=K.length;ee<V;ee++)K[ee]!==G[ee]&&(s.disableVertexAttribArray(ee),K[ee]=0)}function O(G,K,ee,V,J,he,te){te===!0?s.vertexAttribIPointer(G,K,ee,J,he):s.vertexAttribPointer(G,K,ee,V,J,he)}function C(G,K,ee,V){b();const J=V.attributes,he=ee.getAttributes(),te=K.defaultAttributeValues;for(const Y in he){const $=he[Y];if($.location>=0){let Z=J[Y];if(Z===void 0&&(Y==="instanceMatrix"&&G.instanceMatrix&&(Z=G.instanceMatrix),Y==="instanceColor"&&G.instanceColor&&(Z=G.instanceColor)),Z!==void 0){const L=Z.normalized,ae=Z.itemSize,ye=e.get(Z);if(ye===void 0)continue;const Ve=ye.buffer,ze=ye.type,Ge=ye.bytesPerElement,le=ze===s.INT||ze===s.UNSIGNED_INT||Z.gpuType===Ah;if(Z.isInterleavedBufferAttribute){const de=Z.data,Ee=de.stride,Qe=Z.offset;if(de.isInstancedInterleavedBuffer){for(let Fe=0;Fe<$.locationSize;Fe++)x($.location+Fe,de.meshPerAttribute);G.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Fe=0;Fe<$.locationSize;Fe++)y($.location+Fe);s.bindBuffer(s.ARRAY_BUFFER,Ve);for(let Fe=0;Fe<$.locationSize;Fe++)O($.location+Fe,ae/$.locationSize,ze,L,Ee*Ge,(Qe+ae/$.locationSize*Fe)*Ge,le)}else{if(Z.isInstancedBufferAttribute){for(let de=0;de<$.locationSize;de++)x($.location+de,Z.meshPerAttribute);G.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let de=0;de<$.locationSize;de++)y($.location+de);s.bindBuffer(s.ARRAY_BUFFER,Ve);for(let de=0;de<$.locationSize;de++)O($.location+de,ae/$.locationSize,ze,L,ae*Ge,ae/$.locationSize*de*Ge,le)}}else if(te!==void 0){const L=te[Y];if(L!==void 0)switch(L.length){case 2:s.vertexAttrib2fv($.location,L);break;case 3:s.vertexAttrib3fv($.location,L);break;case 4:s.vertexAttrib4fv($.location,L);break;default:s.vertexAttrib1fv($.location,L)}}}}I()}function R(){D();for(const G in r){const K=r[G];for(const ee in K){const V=K[ee];for(const J in V){const he=V[J];for(const te in he)g(he[te].object),delete he[te];delete V[J]}}delete r[G]}}function P(G){if(r[G.id]===void 0)return;const K=r[G.id];for(const ee in K){const V=K[ee];for(const J in V){const he=V[J];for(const te in he)g(he[te].object),delete he[te];delete V[J]}}delete r[G.id]}function F(G){for(const K in r){const ee=r[K];for(const V in ee){const J=ee[V];if(J[G.id]===void 0)continue;const he=J[G.id];for(const te in he)g(he[te].object),delete he[te];delete J[G.id]}}}function w(G){for(const K in r){const ee=r[K],V=G.isInstancedMesh===!0?G.id:0,J=ee[V];if(J!==void 0){for(const he in J){const te=J[he];for(const Y in te)g(te[Y].object),delete te[Y];delete J[he]}delete ee[V],Object.keys(ee).length===0&&delete r[K]}}}function D(){B(),c=!0,l!==a&&(l=a,p(l.object))}function B(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:D,resetDefaultState:B,dispose:R,releaseStatesOfGeometry:P,releaseStatesOfObject:w,releaseStatesOfProgram:F,initAttributes:b,enableAttribute:y,disableUnusedAttributes:I}}function cM(s,e,t){let r;function a(f){r=f}function l(f,p){s.drawArrays(r,f,p),t.update(p,r,1)}function c(f,p,g){g!==0&&(s.drawArraysInstanced(r,f,p,g),t.update(p,r,g))}function d(f,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,f,0,p,0,g);let v=0;for(let S=0;S<g;S++)v+=p[S];t.update(v,r,1)}this.setMode=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function uM(s,e,t,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function c(F){return!(F!==bi&&r.convert(F)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(F){const w=F===Gi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==Qn&&F!==Ci&&!w&&r.convert(F)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function f(F){if(F==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const g=f(p);g!==p&&(st("WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=t.logarithmicDepthBuffer===!0,v=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&v===!1&&st("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),O=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),R=s.getParameter(s.MAX_SAMPLES),P=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:f,textureFormatReadable:c,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:v,maxTextures:S,maxVertexTextures:E,maxTextureSize:b,maxCubemapSize:y,maxAttributes:x,maxVertexUniforms:I,maxVaryings:O,maxFragmentUniforms:C,maxSamples:R,samples:P}}function dM(s){const e=this;let t=null,r=0,a=!1,l=!1;const c=new Or,d=new ot,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(_,v){const S=_.length!==0||v||r!==0||a;return a=v,r=_.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(_,v){t=g(_,v,0)},this.setState=function(_,v,S){const E=_.clippingPlanes,b=_.clipIntersection,y=_.clipShadows,x=s.get(_);if(!a||E===null||E.length===0||l&&!y)l?g(null):p();else{const I=l?0:r,O=I*4;let C=x.clippingState||null;f.value=C,C=g(E,v,O,S);for(let R=0;R!==O;++R)C[R]=t[R];x.clippingState=C,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=I}};function p(){f.value!==t&&(f.value=t,f.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(_,v,S,E){const b=_!==null?_.length:0;let y=null;if(b!==0){if(y=f.value,E!==!0||y===null){const x=S+b*4,I=v.matrixWorldInverse;d.getNormalMatrix(I),(y===null||y.length<x)&&(y=new Float32Array(x));for(let O=0,C=S;O!==b;++O,C+=4)c.copy(_[O]).applyMatrix4(I,d),c.normal.toArray(y,C),y[C+3]=c.constant}f.value=y,f.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,y}}const la=4,hM=6,fM=20,pM=256,oo=new Bh,$m=new gt;let Cd=null,bd=0,Rd=0,Pd=!1;const mM=new q,os=new q;class Zm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,r=.1,a=100,l={}){const{size:c=256,position:d=mM}=l;Cd=this._renderer.getRenderTarget(),bd=this._renderer.getActiveCubeFace(),Rd=this._renderer.getActiveMipmapLevel(),Pd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const f=this._allocateTargets();return f.depthBuffer=!0,this._sceneToCubeUV(e,r,a,f,d),t>0&&this._blur(f,0,0,t),this._applyPMREM(f),this._cleanup(f),f}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Cd,bd,Rd),this._renderer.xr.enabled=Pd,e.scissorTest=!1,aa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ps||e.mapping===da?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cd=this._renderer.getRenderTarget(),bd=this._renderer.getActiveCubeFace(),Rd=this._renderer.getActiveMipmapLevel(),Pd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:Gi,format:bi,colorSpace:ac,depthBuffer:!1},a=jm(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jm(e,t,r);const{_lodMax:l}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=gM(l)),this._blurMaterial=_M(l,e,t),this._ggxMaterial=vM(l,e,t)}return a}_compileMaterial(e){const t=new lt(new hi,e);this._renderer.compile(t,oo)}_sceneToCubeUV(e,t,r,a,l){const f=new Jn(90,1,t,r),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,v=_.autoClear,S=_.toneMapping;_.getClearColor($m),_.toneMapping=Hi,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(a),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new lt(new Yt,new lr({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,y=b.material;let x=!1;const I=e.background;I?I.isColor&&(y.color.copy(I),e.background=null,x=!0):(y.color.copy($m),x=!0);for(let O=0;O<6;O++){const C=O%3;C===0?(f.up.set(0,p[O],0),f.position.set(l.x,l.y,l.z),f.lookAt(l.x+g[O],l.y,l.z)):C===1?(f.up.set(0,0,p[O]),f.position.set(l.x,l.y,l.z),f.lookAt(l.x,l.y+g[O],l.z)):(f.up.set(0,p[O],0),f.position.set(l.x,l.y,l.z),f.lookAt(l.x,l.y,l.z+g[O]));const R=this._cubeSize;aa(a,C*R,O>2?R:0,R,R),_.setRenderTarget(a),x&&_.render(b,f),_.render(e,f)}_.toneMapping=S,_.autoClear=v,e.background=I}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===ps||e.mapping===da;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jm());const l=a?this._cubemapMaterial:this._equirectMaterial,c=this._lodMeshes[0];c.material=l;const d=l.uniforms;d.envMap.value=e;const f=this._cubeSize;aa(t,0,0,3*f,2*f),r.setRenderTarget(t),r.render(c,oo)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodMeshes.length;for(let l=1;l<a;l++)this._applyGGXFilter(e,l-1,l);t.autoClear=r}_applyGGXFilter(e,t,r){const a=this._renderer,l=this._pingPongRenderTarget,c=this._ggxMaterial,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,p=r/(this._lodMeshes.length-1),g=t/(this._lodMeshes.length-1),_=Math.sqrt(p*p-g*g),v=p*1.25,S=_*v,{_lodMax:E}=this,b=this._sizeLods[r],y=3*b*(r>E-la?r-E+la:0),x=4*(this._cubeSize-b);f.envMap.value=e.texture,f.roughness.value=S,f.mipInt.value=E-t,aa(l,y,x,3*b,2*b),a.setRenderTarget(l),a.render(d,oo),f.envMap.value=l.texture,f.roughness.value=0,f.mipInt.value=E-r,aa(e,y,x,3*b,2*b),a.setRenderTarget(e),a.render(d,oo)}_blur(e,t,r,a){const l=this._pingPongRenderTarget,c=Math.min(a,Math.PI)/Math.SQRT2;this._blurPass(e,l,t,r,c),this._blurPass(l,e,r,r,c)}_blurPass(e,t,r,a,l){const c=this._renderer,d=this._blurMaterial,f=this._lodMeshes[a];f.material=d;const p=d.uniforms;p.envMap.value=e.texture,p.sigma.value=l,p.mipInt.value=this._lodMax-r;const g=this._sizeLods[a],_=3*g*(a>this._lodMax-la?a-this._lodMax+la:0),v=4*(this._cubeSize-g);aa(t,_,v,3*g,2*g),c.setRenderTarget(t),c.render(f,oo)}}function gM(s){const e=[],t=[];let r=s;const a=s-la+1+hM;for(let l=0;l<a;l++){const c=Math.pow(2,r);e.push(c);const d=1/(c-2),f=-d,p=1+d,g=[f,f,p,f,p,p,f,f,p,p,f,p],_=6,v=6,S=3,E=new Float32Array(S*v*_),b=new Float32Array(S*v*_);for(let x=0;x<_;x++){const I=x%3*2/3-1,O=x>2?0:-1,C=[I,O,0,I+2/3,O,0,I+2/3,O+1,0,I,O,0,I+2/3,O+1,0,I,O+1,0];E.set(C,S*v*x);for(let R=0;R<v;R++){const P=g[R*2]*2-1,F=g[R*2+1]*2-1;x===0?os.set(1,F,P):x===1?os.set(-P,1,-F):x===2?os.set(-P,F,1):x===3?os.set(-1,F,-P):x===4?os.set(-P,-1,F):os.set(P,F,-1),os.toArray(b,(x*v+R)*S)}}const y=new hi;y.setAttribute("position",new Pi(E,S)),y.setAttribute("outputDirection",new Pi(b,S)),t.push(new lt(y,null)),r>la&&r--}return{lodMeshes:t,sizeLods:e}}function jm(s,e,t){const r=new Ri(s,e,t);return r.texture.mapping=fc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function aa(s,e,t,r,a){s.viewport.set(e,t,r,a),s.scissor.set(e,t,r,a)}function vM(s,e,t){return new Xi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function _M(s,e,t){return new Xi({name:"SphericalGaussianBlur",defines:{SAMPLES:fM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:pc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Jm(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function Qm(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:dr,depthTest:!1,depthWrite:!1})}function pc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class n0 extends Ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new $g(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Yt(5,5,5),l=new Xi({name:"CubemapFromEquirect",uniforms:ha(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Wn,blending:dr});l.uniforms.tEquirect.value=t;const c=new lt(a,l),d=t.minFilter;return t.minFilter===us&&(t.minFilter=Pn),new Sx(1,10,this).update(e,c),t.minFilter=d,c.geometry.dispose(),c.material.dispose(),this}clear(e,t=!0,r=!0,a=!0){const l=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,r,a);e.setRenderTarget(l)}}function xM(s){let e=new WeakMap,t=new WeakMap,r=null;function a(v,S=!1){return v==null?null:S?c(v):l(v)}function l(v){if(v&&v.isTexture){const S=v.mapping;if(S===Ju||S===Qu)if(e.has(v)){const E=e.get(v).texture;return d(E,v.mapping)}else{const E=v.image;if(E&&E.height>0){const b=new n0(E.height);return b.fromEquirectangularTexture(s,v),e.set(v,b),v.addEventListener("dispose",p),d(b.texture,v.mapping)}else return null}}return v}function c(v){if(v&&v.isTexture){const S=v.mapping,E=S===Ju||S===Qu,b=S===ps||S===da;if(E||b){let y=t.get(v);const x=y!==void 0?y.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==x)return r===null&&(r=new Zm(s)),y=E?r.fromEquirectangular(v,y):r.fromCubemap(v,y),y.texture.pmremVersion=v.pmremVersion,t.set(v,y),y.texture;if(y!==void 0)return y.texture;{const I=v.image;return E&&I&&I.height>0||b&&I&&f(I)?(r===null&&(r=new Zm(s)),y=E?r.fromEquirectangular(v):r.fromCubemap(v),y.texture.pmremVersion=v.pmremVersion,t.set(v,y),v.addEventListener("dispose",g),y.texture):null}}}return v}function d(v,S){return S===Ju?v.mapping=ps:S===Qu&&(v.mapping=da),v}function f(v){let S=0;const E=6;for(let b=0;b<E;b++)v[b]!==void 0&&S++;return S===E}function p(v){const S=v.target;S.removeEventListener("dispose",p);const E=e.get(S);E!==void 0&&(e.delete(S),E.dispose())}function g(v){const S=v.target;S.removeEventListener("dispose",g);const E=t.get(S);E!==void 0&&(t.delete(S),E.dispose())}function _(){e=new WeakMap,t=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:_}}function yM(s){const e={};function t(r){if(e[r]!==void 0)return e[r];const a=s.getExtension(r);return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&ca("WebGLRenderer: "+r+" extension not supported."),a}}}function SM(s,e,t,r){const a={},l=new WeakMap;function c(_){const v=_.target;v.index!==null&&e.remove(v.index);for(const E in v.attributes)e.remove(v.attributes[E]);v.removeEventListener("dispose",c),delete a[v.id];const S=l.get(v);S&&(e.remove(S),l.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function d(_,v){return a[v.id]===!0||(v.addEventListener("dispose",c),a[v.id]=!0,t.memory.geometries++),v}function f(_){const v=_.attributes;for(const S in v)e.update(v[S],s.ARRAY_BUFFER)}function p(_){const v=[],S=_.index,E=_.attributes.position;let b=0;if(E===void 0)return;if(S!==null){const I=S.array;b=S.version;for(let O=0,C=I.length;O<C;O+=3){const R=I[O+0],P=I[O+1],F=I[O+2];v.push(R,P,P,F,F,R)}}else{const I=E.array;b=E.version;for(let O=0,C=I.length/3-1;O<C;O+=3){const R=O+0,P=O+1,F=O+2;v.push(R,P,P,F,F,R)}}const y=new(E.count>=65535?Xg:Wg)(v,1);y.version=b;const x=l.get(_);x&&e.remove(x),l.set(_,y)}function g(_){const v=l.get(_);if(v){const S=_.index;S!==null&&v.version<S.version&&p(_)}else p(_);return l.get(_)}return{get:d,update:f,getWireframeAttribute:g}}function MM(s,e,t){let r;function a(_){r=_}let l,c;function d(_){l=_.type,c=_.bytesPerElement}function f(_,v){s.drawElements(r,v,l,_*c),t.update(v,r,1)}function p(_,v,S){S!==0&&(s.drawElementsInstanced(r,v,l,_*c,S),t.update(v,r,S))}function g(_,v,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,v,0,l,_,0,S);let b=0;for(let y=0;y<S;y++)b+=v[y];t.update(b,r,1)}this.setMode=a,this.setIndex=d,this.render=f,this.renderInstances=p,this.renderMultiDraw=g}function EM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,c,d){switch(t.calls++,c){case s.TRIANGLES:t.triangles+=d*(l/3);break;case s.LINES:t.lines+=d*(l/2);break;case s.LINE_STRIP:t.lines+=d*(l-1);break;case s.LINE_LOOP:t.lines+=d*l;break;case s.POINTS:t.points+=d*l;break;default:Tt("WebGLInfo: Unknown draw mode:",c);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function wM(s,e,t){const r=new WeakMap,a=new Zt;function l(c,d,f){const p=c.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,_=g!==void 0?g.length:0;let v=r.get(d);if(v===void 0||v.count!==_){let B=function(){w.dispose(),r.delete(d),d.removeEventListener("dispose",B)};var S=B;v!==void 0&&v.texture.dispose();const E=d.morphAttributes.position!==void 0,b=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,x=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],O=d.morphAttributes.color||[];let C=0;E===!0&&(C=1),b===!0&&(C=2),y===!0&&(C=3);let R=d.attributes.position.count*C,P=1;R>e.maxTextureSize&&(P=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const F=new Float32Array(R*P*4*_),w=new Hg(F,R,P,_);w.type=Ci,w.needsUpdate=!0;const D=C*4;for(let G=0;G<_;G++){const K=x[G],ee=I[G],V=O[G],J=R*P*4*G;for(let he=0;he<K.count;he++){const te=he*D;E===!0&&(a.fromBufferAttribute(K,he),F[J+te+0]=a.x,F[J+te+1]=a.y,F[J+te+2]=a.z,F[J+te+3]=0),b===!0&&(a.fromBufferAttribute(ee,he),F[J+te+4]=a.x,F[J+te+5]=a.y,F[J+te+6]=a.z,F[J+te+7]=0),y===!0&&(a.fromBufferAttribute(V,he),F[J+te+8]=a.x,F[J+te+9]=a.y,F[J+te+10]=a.z,F[J+te+11]=V.itemSize===4?a.w:1)}}v={count:_,texture:w,size:new ct(R,P)},r.set(d,v),d.addEventListener("dispose",B)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)f.getUniforms().setValue(s,"morphTexture",c.morphTexture,t);else{let E=0;for(let y=0;y<p.length;y++)E+=p[y];const b=d.morphTargetsRelative?1:1-E;f.getUniforms().setValue(s,"morphTargetBaseInfluence",b),f.getUniforms().setValue(s,"morphTargetInfluences",p)}f.getUniforms().setValue(s,"morphTargetsTexture",v.texture,t),f.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}return{update:l}}function TM(s,e,t,r,a){let l=new WeakMap;function c(p){const g=a.render.frame,_=p.geometry,v=e.get(p,_);if(l.get(v)!==g&&(e.update(v),l.set(v,g)),p.isInstancedMesh&&(p.hasEventListener("dispose",f)===!1&&p.addEventListener("dispose",f),l.get(p)!==g&&(t.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&t.update(p.instanceColor,s.ARRAY_BUFFER),l.set(p,g))),p.isSkinnedMesh){const S=p.skeleton;l.get(S)!==g&&(S.update(),l.set(S,g))}return v}function d(){l=new WeakMap}function f(p){const g=p.target;g.removeEventListener("dispose",f),r.releaseStatesOfObject(g),t.remove(g.instanceMatrix),g.instanceColor!==null&&t.remove(g.instanceColor)}return{update:c,dispose:d}}const AM={[Tg]:"LINEAR_TONE_MAPPING",[Ag]:"REINHARD_TONE_MAPPING",[Cg]:"CINEON_TONE_MAPPING",[bg]:"ACES_FILMIC_TONE_MAPPING",[Pg]:"AGX_TONE_MAPPING",[Lg]:"NEUTRAL_TONE_MAPPING",[Rg]:"CUSTOM_TONE_MAPPING"};function CM(s,e,t,r,a,l){const c=new Ri(e,t,{type:s,depthBuffer:a,stencilBuffer:l,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let d=null,f=null;const p=new hi;p.setAttribute("position",new On([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new On([0,2,0,0,2,0],2));const g=new px({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new lt(p,g),v=new Bh(-1,1,1,-1,0,1);let S=null,E=null,b=!1,y,x=null,I=[],O=!1;this.setSize=function(C,R){c.setSize(C,R),d!==null&&d.setSize(C,R),f!==null&&f.setSize(C,R);for(let P=0;P<I.length;P++){const F=I[P];F.setSize&&F.setSize(C,R)}},this.setEffects=function(C){I=C,O=I.length>0&&I[0].isRenderPass===!0;const R=c.width,P=c.height;I.length>0&&d===null&&(d=new Ri(R,P,{type:Gi,depthBuffer:!1,stencilBuffer:!1}),f=new Ri(R,P,{type:Gi,depthBuffer:!1,stencilBuffer:!1}));for(let F=0;F<I.length;F++){const w=I[F];w.setSize&&w.setSize(R,P)}},this.begin=function(C,R){if(b||C.toneMapping===Hi&&I.length===0)return!1;if(x=R,R!==null){const P=R.width,F=R.height;(c.width!==P||c.height!==F)&&this.setSize(P,F)}return O===!1&&C.setRenderTarget(c),y=C.toneMapping,C.toneMapping=Hi,!0},this.hasRenderPass=function(){return O},this.end=function(C,R){C.toneMapping=y,b=!0;let P=c,F=d;for(let w=0;w<I.length;w++){const D=I[w];D.enabled!==!1&&(D.render(C,F,P,R),D.needsSwap!==!1&&(P=F,F=F===d?f:d))}if(S!==C.outputColorSpace||E!==C.toneMapping){S=C.outputColorSpace,E=C.toneMapping,g.defines={},St.getTransfer(S)===It&&(g.defines.SRGB_TRANSFER="");const w=AM[E];w&&(g.defines[w]=""),g.needsUpdate=!0}g.uniforms.tDiffuse.value=P.texture,C.setRenderTarget(x),C.render(_,v),x=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){c.dispose(),d!==null&&d.dispose(),f!==null&&f.dispose(),p.dispose(),g.dispose()}}const i0=new Ln,yh=new xo(1,1),r0=new Hg,s0=new z_,a0=new $g,eg=[],tg=[],ng=new Float32Array(16),ig=new Float32Array(9),rg=new Float32Array(4);function pa(s,e,t){const r=s[0];if(r<=0||r>0)return s;const a=e*t;let l=eg[a];if(l===void 0&&(l=new Float32Array(a),eg[a]=l),e!==0){r.toArray(l,0);for(let c=1,d=0;c!==e;++c)d+=t,s[c].toArray(l,d)}return l}function un(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function dn(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function mc(s,e){let t=tg[e];t===void 0&&(t=new Int32Array(e),tg[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function bM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function RM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;s.uniform2fv(this.addr,e),dn(t,e)}}function PM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(un(t,e))return;s.uniform3fv(this.addr,e),dn(t,e)}}function LM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;s.uniform4fv(this.addr,e),dn(t,e)}}function DM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(un(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),dn(t,e)}else{if(un(t,r))return;rg.set(r),s.uniformMatrix2fv(this.addr,!1,rg),dn(t,r)}}function NM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(un(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),dn(t,e)}else{if(un(t,r))return;ig.set(r),s.uniformMatrix3fv(this.addr,!1,ig),dn(t,r)}}function IM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(un(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),dn(t,e)}else{if(un(t,r))return;ng.set(r),s.uniformMatrix4fv(this.addr,!1,ng),dn(t,r)}}function UM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function FM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;s.uniform2iv(this.addr,e),dn(t,e)}}function OM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;s.uniform3iv(this.addr,e),dn(t,e)}}function kM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;s.uniform4iv(this.addr,e),dn(t,e)}}function BM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function zM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;s.uniform2uiv(this.addr,e),dn(t,e)}}function HM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;s.uniform3uiv(this.addr,e),dn(t,e)}}function VM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;s.uniform4uiv(this.addr,e),dn(t,e)}}function GM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(yh.compareFunction=t.isReversedDepthBuffer()?Ih:Nh,l=yh):l=i0,t.setTexture2D(e||l,a)}function WM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||s0,a)}function XM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||a0,a)}function YM(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||r0,a)}function qM(s){switch(s){case 5126:return bM;case 35664:return RM;case 35665:return PM;case 35666:return LM;case 35674:return DM;case 35675:return NM;case 35676:return IM;case 5124:case 35670:return UM;case 35667:case 35671:return FM;case 35668:case 35672:return OM;case 35669:case 35673:return kM;case 5125:return BM;case 36294:return zM;case 36295:return HM;case 36296:return VM;case 35678:case 36198:case 36298:case 36306:case 35682:return GM;case 35679:case 36299:case 36307:return WM;case 35680:case 36300:case 36308:case 36293:return XM;case 36289:case 36303:case 36311:case 36292:return YM}}function KM(s,e){s.uniform1fv(this.addr,e)}function $M(s,e){const t=pa(e,this.size,2);s.uniform2fv(this.addr,t)}function ZM(s,e){const t=pa(e,this.size,3);s.uniform3fv(this.addr,t)}function jM(s,e){const t=pa(e,this.size,4);s.uniform4fv(this.addr,t)}function JM(s,e){const t=pa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function QM(s,e){const t=pa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function eE(s,e){const t=pa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function tE(s,e){s.uniform1iv(this.addr,e)}function nE(s,e){s.uniform2iv(this.addr,e)}function iE(s,e){s.uniform3iv(this.addr,e)}function rE(s,e){s.uniform4iv(this.addr,e)}function sE(s,e){s.uniform1uiv(this.addr,e)}function aE(s,e){s.uniform2uiv(this.addr,e)}function oE(s,e){s.uniform3uiv(this.addr,e)}function lE(s,e){s.uniform4uiv(this.addr,e)}function cE(s,e,t){const r=this.cache,a=e.length,l=mc(t,a);un(r,l)||(s.uniform1iv(this.addr,l),dn(r,l));let c;this.type===s.SAMPLER_2D_SHADOW?c=yh:c=i0;for(let d=0;d!==a;++d)t.setTexture2D(e[d]||c,l[d])}function uE(s,e,t){const r=this.cache,a=e.length,l=mc(t,a);un(r,l)||(s.uniform1iv(this.addr,l),dn(r,l));for(let c=0;c!==a;++c)t.setTexture3D(e[c]||s0,l[c])}function dE(s,e,t){const r=this.cache,a=e.length,l=mc(t,a);un(r,l)||(s.uniform1iv(this.addr,l),dn(r,l));for(let c=0;c!==a;++c)t.setTextureCube(e[c]||a0,l[c])}function hE(s,e,t){const r=this.cache,a=e.length,l=mc(t,a);un(r,l)||(s.uniform1iv(this.addr,l),dn(r,l));for(let c=0;c!==a;++c)t.setTexture2DArray(e[c]||r0,l[c])}function fE(s){switch(s){case 5126:return KM;case 35664:return $M;case 35665:return ZM;case 35666:return jM;case 35674:return JM;case 35675:return QM;case 35676:return eE;case 5124:case 35670:return tE;case 35667:case 35671:return nE;case 35668:case 35672:return iE;case 35669:case 35673:return rE;case 5125:return sE;case 36294:return aE;case 36295:return oE;case 36296:return lE;case 35678:case 36198:case 36298:case 36306:case 35682:return cE;case 35679:case 36299:case 36307:return uE;case 35680:case 36300:case 36308:case 36293:return dE;case 36289:case 36303:case 36311:case 36292:return hE}}class pE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=qM(t.type)}}class mE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fE(t.type)}}class gE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let l=0,c=a.length;l!==c;++l){const d=a[l];d.setValue(e,t[d.id],r)}}}const Ld=/(\w+)(\])?(\[|\.)?/g;function sg(s,e){s.seq.push(e),s.map[e.id]=e}function vE(s,e,t){const r=s.name,a=r.length;for(Ld.lastIndex=0;;){const l=Ld.exec(r),c=Ld.lastIndex;let d=l[1];const f=l[2]==="]",p=l[3];if(f&&(d=d|0),p===void 0||p==="["&&c+2===a){sg(t,p===void 0?new pE(d,s,e):new mE(d,s,e));break}else{let _=t.map[d];_===void 0&&(_=new gE(d),sg(t,_)),t=_}}}class nc{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let c=0;c<r;++c){const d=e.getActiveUniform(t,c),f=e.getUniformLocation(t,d.name);vE(d,f,this)}const a=[],l=[];for(const c of this.seq)c.type===e.SAMPLER_2D_SHADOW||c.type===e.SAMPLER_CUBE_SHADOW||c.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(c):l.push(c);a.length>0&&(this.seq=a.concat(l))}setValue(e,t,r,a){const l=this.map[t];l!==void 0&&l.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let l=0,c=t.length;l!==c;++l){const d=t[l],f=r[d.id];f.needsUpdate!==!1&&d.setValue(e,f.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,l=e.length;a!==l;++a){const c=e[a];c.id in t&&r.push(c)}return r}}function ag(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const _E=37297;let xE=0;function yE(s,e){const t=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let c=a;c<l;c++){const d=c+1;r.push(`${d===e?">":" "} ${d}: ${t[c]}`)}return r.join(`
`)}const og=new ot;function SE(s){St._getMatrix(og,St.workingColorSpace,s);const e=`mat3( ${og.elements.map(t=>t.toFixed(4))} )`;switch(St.getTransfer(s)){case oc:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return st("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function lg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),l=(s.getShaderInfoLog(e)||"").trim();if(r&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const d=parseInt(c[1]);return t.toUpperCase()+`

`+l+`

`+yE(s.getShaderSource(e),d)}else return l}function ME(s,e){const t=SE(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const EE={[Tg]:"Linear",[Ag]:"Reinhard",[Cg]:"Cineon",[bg]:"ACESFilmic",[Pg]:"AgX",[Lg]:"Neutral",[Rg]:"Custom"};function wE(s,e){const t=EE[e];return t===void 0?(st("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Zl=new q;function TE(){St.getLuminanceCoefficients(Zl);const s=Zl.x.toFixed(4),e=Zl.y.toFixed(4),t=Zl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fo).join(`
`)}function CE(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function bE(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),c=l.name;let d=1;l.type===s.FLOAT_MAT2&&(d=2),l.type===s.FLOAT_MAT3&&(d=3),l.type===s.FLOAT_MAT4&&(d=4),t[c]={type:l.type,location:s.getAttribLocation(e,c),locationSize:d}}return t}function fo(s){return s!==""}function cg(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ug(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const RE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sh(s){return s.replace(RE,LE)}const PE=new Map;function LE(s,e){let t=mt[e];if(t===void 0){const r=PE.get(e);if(r!==void 0)t=mt[r],st('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Sh(t)}const DE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dg(s){return s.replace(DE,NE)}function NE(s,e,t,r){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function hg(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const IE={[jl]:"SHADOWMAP_TYPE_PCF",[ho]:"SHADOWMAP_TYPE_VSM"};function UE(s){return IE[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const FE={[ps]:"ENVMAP_TYPE_CUBE",[da]:"ENVMAP_TYPE_CUBE",[fc]:"ENVMAP_TYPE_CUBE_UV"};function OE(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":FE[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const kE={[da]:"ENVMAP_MODE_REFRACTION"};function BE(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":kE[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const zE={[Th]:"ENVMAP_BLENDING_MULTIPLY",[__]:"ENVMAP_BLENDING_MIX",[x_]:"ENVMAP_BLENDING_ADD"};function HE(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":zE[s.combine]||"ENVMAP_BLENDING_NONE"}function VE(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function GE(s,e,t,r){const a=s.getContext(),l=t.defines;let c=t.vertexShader,d=t.fragmentShader;const f=UE(t),p=OE(t),g=BE(t),_=HE(t),v=VE(t),S=AE(t),E=CE(l),b=a.createProgram();let y,x,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(fo).join(`
`),y.length>0&&(y+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(fo).join(`
`),x.length>0&&(x+=`
`)):(y=[hg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fo).join(`
`),x=[hg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",t.envMap?"#define "+_:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?mt.tonemapping_pars_fragment:"",t.toneMapping!==Hi?wE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,ME("linearToOutputTexel",t.outputColorSpace),TE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fo).join(`
`)),c=Sh(c),c=cg(c,t),c=ug(c,t),d=Sh(d),d=cg(d,t),d=ug(d,t),c=dg(c),d=dg(d),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,x=["#define varying in",t.glslVersion===Mm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const O=I+y+c,C=I+x+d,R=ag(a,a.VERTEX_SHADER,O),P=ag(a,a.FRAGMENT_SHADER,C);a.attachShader(b,R),a.attachShader(b,P),t.index0AttributeName!==void 0?a.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function F(G){if(s.debug.checkShaderErrors){const K=a.getProgramInfoLog(b)||"",ee=a.getShaderInfoLog(R)||"",V=a.getShaderInfoLog(P)||"",J=K.trim(),he=ee.trim(),te=V.trim();let Y=!0,$=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,b,R,P);else{const Z=lg(a,R,"vertex"),L=lg(a,P,"fragment");Tt("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+J+`
`+Z+`
`+L)}else J!==""?st("WebGLProgram: Program Info Log:",J):(he===""||te==="")&&($=!1);$&&(G.diagnostics={runnable:Y,programLog:J,vertexShader:{log:he,prefix:y},fragmentShader:{log:te,prefix:x}})}a.deleteShader(R),a.deleteShader(P),w=new nc(a,b),D=bE(a,b)}let w;this.getUniforms=function(){return w===void 0&&F(this),w};let D;this.getAttributes=function(){return D===void 0&&F(this),D};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=a.getProgramParameter(b,_E)),B},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xE++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=R,this.fragmentShader=P,this}let WE=0;class XE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,r){const a=this._getShaderCacheForMaterial(e);return a.has(t)===!1&&(a.add(t),t.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new YE(e),t.set(e,r)),r}}class YE{constructor(e){this.id=WE++,this.code=e,this.usedTimes=0}}function qE(s){return s===ms||s===ic||s===rc}function KE(s,e,t,r,a,l){const c=new Vg,d=new XE,f=new Set,p=[],g=new Map,_=r.logarithmicDepthBuffer;let v=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(w){return f.add(w),w===0?"uv":`uv${w}`}function b(w,D,B,G,K,ee){const V=G.fog,J=K.geometry,he=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?G.environment:null,te=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap,Y=e.get(w.envMap||he,te),$=Y&&Y.mapping===fc?Y.image.height:null,Z=S[w.type];w.precision!==null&&(v=r.getMaxPrecision(w.precision),v!==w.precision&&st("WebGLProgram.getParameters:",w.precision,"not supported, using",v,"instead."));const L=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ae=L!==void 0?L.length:0;let ye=0;J.morphAttributes.position!==void 0&&(ye=1),J.morphAttributes.normal!==void 0&&(ye=2),J.morphAttributes.color!==void 0&&(ye=3);let Ve,ze,Ge,le;if(Z){const Ct=ki[Z];Ve=Ct.vertexShader,ze=Ct.fragmentShader}else{Ve=w.vertexShader,ze=w.fragmentShader;const Ct=d.getVertexShaderStage(w),Et=d.getFragmentShaderStage(w);d.update(w,Ct,Et),Ge=Ct.id,le=Et.id}const de=s.getRenderTarget(),Ee=s.state.buffers.depth.getReversed(),Qe=K.isInstancedMesh===!0,Fe=K.isBatchedMesh===!0,dt=!!w.map,Vt=!!w.matcap,ht=!!Y,_t=!!w.aoMap,Dt=!!w.lightMap,ft=!!w.bumpMap&&w.wireframe===!1,Ft=!!w.normalMap,jt=!!w.displacementMap,nn=!!w.emissiveMap,Lt=!!w.metalnessMap,Gt=!!w.roughnessMap,W=w.anisotropy>0,an=w.clearcoat>0,At=w.dispersion>0,N=w.retroreflectivity>0,M=w.iridescence>0,j=w.sheen>0,oe=w.transmission>0,fe=W&&!!w.anisotropyMap,Me=an&&!!w.clearcoatMap,Ae=an&&!!w.clearcoatNormalMap,pe=an&&!!w.clearcoatRoughnessMap,ge=M&&!!w.iridescenceMap,Re=M&&!!w.iridescenceThicknessMap,Ke=j&&!!w.sheenColorMap,Pe=j&&!!w.sheenRoughnessMap,Te=!!w.specularMap,$e=!!w.specularColorMap,et=!!w.specularIntensityMap,it=oe&&!!w.transmissionMap,z=oe&&!!w.thicknessMap,Ce=!!w.gradientMap,me=!!w.alphaMap,be=w.alphaTest>0,Ue=!!w.alphaHash,ve=!!w.extensions;let je=Hi;w.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(je=s.toneMapping);const Ye={shaderID:Z,shaderType:w.type,shaderName:w.name,vertexShader:Ve,fragmentShader:ze,defines:w.defines,customVertexShaderID:Ge,customFragmentShaderID:le,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:v,batching:Fe,batchingColor:Fe&&K._colorsTexture!==null,instancing:Qe,instancingColor:Qe&&K.instanceColor!==null,instancingMorph:Qe&&K.morphTexture!==null,outputColorSpace:de===null?s.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:St.workingColorSpace,alphaToCoverage:!!w.alphaToCoverage,map:dt,matcap:Vt,envMap:ht,envMapMode:ht&&Y.mapping,envMapCubeUVHeight:$,aoMap:_t,lightMap:Dt,bumpMap:ft,normalMap:Ft,displacementMap:jt,emissiveMap:nn,normalMapObjectSpace:Ft&&w.normalMapType===M_,normalMapTangentSpace:Ft&&w.normalMapType===sc,packedNormalMap:Ft&&w.normalMapType===sc&&qE(w.normalMap.format),metalnessMap:Lt,roughnessMap:Gt,anisotropy:W,anisotropyMap:fe,clearcoat:an,clearcoatMap:Me,clearcoatNormalMap:Ae,clearcoatRoughnessMap:pe,dispersion:At,retroreflection:N,iridescence:M,iridescenceMap:ge,iridescenceThicknessMap:Re,sheen:j,sheenColorMap:Ke,sheenRoughnessMap:Pe,specularMap:Te,specularColorMap:$e,specularIntensityMap:et,transmission:oe,transmissionMap:it,thicknessMap:z,gradientMap:Ce,opaque:w.transparent===!1&&w.blending===po&&w.alphaToCoverage===!1,alphaMap:me,alphaTest:be,alphaHash:Ue,combine:w.combine,mapUv:dt&&E(w.map.channel),aoMapUv:_t&&E(w.aoMap.channel),lightMapUv:Dt&&E(w.lightMap.channel),bumpMapUv:ft&&E(w.bumpMap.channel),normalMapUv:Ft&&E(w.normalMap.channel),displacementMapUv:jt&&E(w.displacementMap.channel),emissiveMapUv:nn&&E(w.emissiveMap.channel),metalnessMapUv:Lt&&E(w.metalnessMap.channel),roughnessMapUv:Gt&&E(w.roughnessMap.channel),anisotropyMapUv:fe&&E(w.anisotropyMap.channel),clearcoatMapUv:Me&&E(w.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&E(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&E(w.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&E(w.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&E(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&E(w.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&E(w.sheenRoughnessMap.channel),specularMapUv:Te&&E(w.specularMap.channel),specularColorMapUv:$e&&E(w.specularColorMap.channel),specularIntensityMapUv:et&&E(w.specularIntensityMap.channel),transmissionMapUv:it&&E(w.transmissionMap.channel),thicknessMapUv:z&&E(w.thicknessMap.channel),alphaMapUv:me&&E(w.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Ft||W),vertexNormals:!!J.attributes.normal,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!J.attributes.uv&&(dt||me),fog:!!V,useFog:w.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:w.wireframe===!1&&(w.flatShading===!0||J.attributes.normal===void 0&&Ft===!1&&(w.isMeshLambertMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isMeshPhysicalMaterial)),sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:Ee,skinning:K.isSkinnedMesh===!0,hasPositionAttribute:J.attributes.position!==void 0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ye,numSunLights:D.sun.length,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numSunLightShadows:D.sunShadowMap.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&B.length>0,shadowMapType:s.shadowMap.type,toneMapping:je,decodeVideoTexture:dt&&w.map.isVideoTexture===!0&&St.getTransfer(w.map.colorSpace)===It,decodeVideoTextureEmissive:nn&&w.emissiveMap.isVideoTexture===!0&&St.getTransfer(w.emissiveMap.colorSpace)===It,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===ui,flipSided:w.side===Wn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ve&&w.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&w.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ye.vertexUv1s=f.has(1),Ye.vertexUv2s=f.has(2),Ye.vertexUv3s=f.has(3),f.clear(),Ye}function y(w){const D=[];if(w.shaderID?D.push(w.shaderID):(D.push(w.customVertexShaderID),D.push(w.customFragmentShaderID)),w.defines!==void 0)for(const B in w.defines)D.push(B),D.push(w.defines[B]);return w.isRawShaderMaterial===!1&&(x(D,w),I(D,w),D.push(s.outputColorSpace)),D.push(w.customProgramCacheKey),D.join()}function x(w,D){w.push(D.precision),w.push(D.outputColorSpace),w.push(D.envMapMode),w.push(D.envMapCubeUVHeight),w.push(D.mapUv),w.push(D.alphaMapUv),w.push(D.lightMapUv),w.push(D.aoMapUv),w.push(D.bumpMapUv),w.push(D.normalMapUv),w.push(D.displacementMapUv),w.push(D.emissiveMapUv),w.push(D.metalnessMapUv),w.push(D.roughnessMapUv),w.push(D.anisotropyMapUv),w.push(D.clearcoatMapUv),w.push(D.clearcoatNormalMapUv),w.push(D.clearcoatRoughnessMapUv),w.push(D.iridescenceMapUv),w.push(D.iridescenceThicknessMapUv),w.push(D.sheenColorMapUv),w.push(D.sheenRoughnessMapUv),w.push(D.specularMapUv),w.push(D.specularColorMapUv),w.push(D.specularIntensityMapUv),w.push(D.transmissionMapUv),w.push(D.thicknessMapUv),w.push(D.combine),w.push(D.fogExp2),w.push(D.sizeAttenuation),w.push(D.morphTargetsCount),w.push(D.morphAttributeCount),w.push(D.numSunLights),w.push(D.numDirLights),w.push(D.numPointLights),w.push(D.numSpotLights),w.push(D.numSpotLightMaps),w.push(D.numHemiLights),w.push(D.numRectAreaLights),w.push(D.numSunLightShadows),w.push(D.numDirLightShadows),w.push(D.numPointLightShadows),w.push(D.numSpotLightShadows),w.push(D.numSpotLightShadowsWithMaps),w.push(D.numLightProbes),w.push(D.shadowMapType),w.push(D.toneMapping),w.push(D.numClippingPlanes),w.push(D.numClipIntersection),w.push(D.depthPacking)}function I(w,D){c.disableAll(),D.instancing&&c.enable(0),D.instancingColor&&c.enable(1),D.instancingMorph&&c.enable(2),D.matcap&&c.enable(3),D.envMap&&c.enable(4),D.normalMapObjectSpace&&c.enable(5),D.normalMapTangentSpace&&c.enable(6),D.clearcoat&&c.enable(7),D.iridescence&&c.enable(8),D.alphaTest&&c.enable(9),D.vertexColors&&c.enable(10),D.vertexAlphas&&c.enable(11),D.vertexUv1s&&c.enable(12),D.vertexUv2s&&c.enable(13),D.vertexUv3s&&c.enable(14),D.vertexTangents&&c.enable(15),D.anisotropy&&c.enable(16),D.alphaHash&&c.enable(17),D.batching&&c.enable(18),D.dispersion&&c.enable(19),D.retroreflection&&c.enable(24),D.batchingColor&&c.enable(20),D.gradientMap&&c.enable(21),D.packedNormalMap&&c.enable(22),D.vertexNormals&&c.enable(23),w.push(c.mask),c.disableAll(),D.fog&&c.enable(0),D.useFog&&c.enable(1),D.flatShading&&c.enable(2),D.logarithmicDepthBuffer&&c.enable(3),D.reversedDepthBuffer&&c.enable(4),D.skinning&&c.enable(5),D.morphTargets&&c.enable(6),D.morphNormals&&c.enable(7),D.morphColors&&c.enable(8),D.premultipliedAlpha&&c.enable(9),D.shadowMapEnabled&&c.enable(10),D.doubleSided&&c.enable(11),D.flipSided&&c.enable(12),D.useDepthPacking&&c.enable(13),D.dithering&&c.enable(14),D.transmission&&c.enable(15),D.sheen&&c.enable(16),D.opaque&&c.enable(17),D.pointsUvs&&c.enable(18),D.decodeVideoTexture&&c.enable(19),D.decodeVideoTextureEmissive&&c.enable(20),D.alphaToCoverage&&c.enable(21),D.numLightProbeGrids>0&&c.enable(22),D.hasPositionAttribute&&c.enable(23),w.push(c.mask)}function O(w){const D=S[w.type];let B;if(D){const G=ki[D];B=dx.clone(G.uniforms)}else B=w.uniforms;return B}function C(w,D){let B=g.get(D);return B!==void 0?++B.usedTimes:(B=new GE(s,D,w,a),p.push(B),g.set(D,B)),B}function R(w){if(--w.usedTimes===0){const D=p.indexOf(w);p[D]=p[p.length-1],p.pop(),g.delete(w.cacheKey),w.destroy()}}function P(w){d.remove(w)}function F(){d.dispose()}return{getParameters:b,getProgramCacheKey:y,getUniforms:O,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:p,dispose:F}}function $E(){let s=new WeakMap;function e(c){return s.has(c)}function t(c){let d=s.get(c);return d===void 0&&(d={},s.set(c,d)),d}function r(c){s.delete(c)}function a(c,d,f){s.get(c)[d]=f}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:l}}function ZE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function fg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function pg(){const s=[];let e=0;const t=[],r=[],a=[];function l(){e=0,t.length=0,r.length=0,a.length=0}function c(v){let S=0;return v.isInstancedMesh&&(S+=2),v.isSkinnedMesh&&(S+=1),S}function d(v,S,E,b,y,x){let I=s[e];return I===void 0?(I={id:v.id,object:v,geometry:S,material:E,materialVariant:c(v),groupOrder:b,renderOrder:v.renderOrder,z:y,group:x},s[e]=I):(I.id=v.id,I.object=v,I.geometry=S,I.material=E,I.materialVariant=c(v),I.groupOrder=b,I.renderOrder=v.renderOrder,I.z=y,I.group=x),e++,I}function f(v,S,E,b,y,x,I){I.reversedDepth===!0&&(y=-y);const O=d(v,S,E,b,y,x);E.transmission>0?r.push(O):E.transparent===!0?a.push(O):t.push(O)}function p(v,S,E,b,y,x){const I=d(v,S,E,b,y,x);E.transmission>0?r.unshift(I):E.transparent===!0?a.unshift(I):t.unshift(I)}function g(v,S){t.length>1&&t.sort(v||ZE),r.length>1&&r.sort(S||fg),a.length>1&&a.sort(S||fg)}function _(){for(let v=e,S=s.length;v<S;v++){const E=s[v];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:t,transmissive:r,transparent:a,init:l,push:f,unshift:p,finish:_,sort:g}}function jE(){let s=new WeakMap;function e(r,a){const l=s.get(r);let c;return l===void 0?(c=new pg,s.set(r,[c])):a>=l.length?(c=new pg,l.push(c)):c=l[a],c}function t(){s=new WeakMap}return{get:e,dispose:t}}function JE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new q,color:new gt};break;case"SpotLight":t={position:new q,direction:new q,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new gt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":t={color:new gt,position:new q,halfWidth:new q,halfHeight:new q};break}return s[e.id]=t,t}}}function QE(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let ew=0;function tw(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function nw(s){const e=new JE,t=QE(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new q);const a=new q,l=new kt,c=new kt;function d(p){let g=0,_=0,v=0;for(let K=0;K<9;K++)r.probe[K].set(0,0,0);let S=0,E=0,b=0,y=0,x=0,I=0,O=0,C=0,R=0,P=0,F=0,w=0,D=0,B=0;p.sort(tw);for(let K=0,ee=p.length;K<ee;K++){const V=p[K],J=V.color,he=V.intensity,te=V.distance;let Y=null;if(V.shadow&&V.shadow.map&&(V.shadow.map.texture.format===ms?Y=V.shadow.map.texture:Y=V.shadow.map.depthTexture||V.shadow.map.texture),V.isAmbientLight)g+=J.r*he,_+=J.g*he,v+=J.b*he;else if(V.isLightProbe){for(let $=0;$<9;$++)r.probe[$].addScaledVector(V.sh.coefficients[$],he);B++}else if(V.isSunLight){const $=e.get(V);if($.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const Z=V.shadow,L=t.get(V);L.shadowIntensity=Z.intensity,L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),r.sunShadow[E]=L,r.sunShadowMap[E]=Y;const ae=Z.getViewportCount();for(let ye=0;ye<ae;ye++)r.sunShadowMatrix[b+ye]=Z.getMatrix(ye),r.sunShadowCascade[b+ye]=Z._cascadeData[ye];b+=ae,E++}r.sun[S]=$,S++}else if(V.isDirectionalLight){const $=e.get(V);if($.color.copy(V.color).multiplyScalar(V.intensity),V.castShadow){const Z=V.shadow,L=t.get(V);L.shadowIntensity=Z.intensity,L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize=Z.mapSize,r.directionalShadow[y]=L,r.directionalShadowMap[y]=Y,r.directionalShadowMatrix[y]=V.shadow.matrix,R++}r.directional[y]=$,y++}else if(V.isSpotLight){const $=e.get(V);$.position.setFromMatrixPosition(V.matrixWorld),$.color.copy(J).multiplyScalar(he),$.distance=te,$.coneCos=Math.cos(V.angle),$.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),$.decay=V.decay,r.spot[I]=$;const Z=V.shadow;if(V.map&&(r.spotLightMap[w]=V.map,w++,Z.updateMatrices(V),V.castShadow&&D++),r.spotLightMatrix[I]=Z.matrix,V.castShadow){const L=t.get(V);L.shadowIntensity=Z.intensity,L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize=Z.mapSize,r.spotShadow[I]=L,r.spotShadowMap[I]=Y,F++}I++}else if(V.isRectAreaLight){const $=e.get(V);$.color.copy(J).multiplyScalar(he),$.halfWidth.set(V.width*.5,0,0),$.halfHeight.set(0,V.height*.5,0),r.rectArea[O]=$,O++}else if(V.isPointLight){const $=e.get(V);if($.color.copy(V.color).multiplyScalar(V.intensity),$.distance=V.distance,$.decay=V.decay,V.castShadow){const Z=V.shadow,L=t.get(V);L.shadowIntensity=Z.intensity,L.shadowBias=Z.bias,L.shadowNormalBias=Z.normalBias,L.shadowRadius=Z.radius,L.shadowMapSize=Z.mapSize,L.shadowCameraNear=Z.camera.near,L.shadowCameraFar=Z.camera.far,r.pointShadow[x]=L,r.pointShadowMap[x]=Y,r.pointShadowMatrix[x]=V.shadow.matrix,P++}r.point[x]=$,x++}else if(V.isHemisphereLight){const $=e.get(V);$.skyColor.copy(V.color).multiplyScalar(he),$.groundColor.copy(V.groundColor).multiplyScalar(he),r.hemi[C]=$,C++}}O>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ie.LTC_FLOAT_1,r.rectAreaLTC2=Ie.LTC_FLOAT_2):(r.rectAreaLTC1=Ie.LTC_HALF_1,r.rectAreaLTC2=Ie.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=_,r.ambient[2]=v;const G=r.hash;(G.sunLength!==S||G.directionalLength!==y||G.pointLength!==x||G.spotLength!==I||G.rectAreaLength!==O||G.hemiLength!==C||G.numSunShadows!==E||G.numDirectionalShadows!==R||G.numPointShadows!==P||G.numSpotShadows!==F||G.numSpotMaps!==w||G.numLightProbes!==B)&&(r.sun.length=S,r.directional.length=y,r.spot.length=I,r.rectArea.length=O,r.point.length=x,r.hemi.length=C,r.sunShadow.length=E,r.sunShadowMap.length=E,r.sunShadowMatrix.length=b,r.sunShadowCascade.length=b,r.directionalShadow.length=R,r.directionalShadowMap.length=R,r.directionalShadowMatrix.length=R,r.pointShadow.length=P,r.pointShadowMap.length=P,r.pointShadowMatrix.length=P,r.spotShadow.length=F,r.spotShadowMap.length=F,r.spotLightMatrix.length=F+w-D,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=D,r.numLightProbes=B,G.sunLength=S,G.directionalLength=y,G.pointLength=x,G.spotLength=I,G.rectAreaLength=O,G.hemiLength=C,G.numSunShadows=E,G.numDirectionalShadows=R,G.numPointShadows=P,G.numSpotShadows=F,G.numSpotMaps=w,G.numLightProbes=B,r.version=ew++)}function f(p,g){let _=0,v=0,S=0,E=0,b=0,y=0;const x=g.matrixWorldInverse;for(let I=0,O=p.length;I<O;I++){const C=p[I];if(C.isSunLight){const R=r.sun[_];R.direction.setFromMatrixPosition(C.matrixWorld),R.direction.transformDirection(x),_++}else if(C.isDirectionalLight){const R=r.directional[v];R.direction.setFromMatrixPosition(C.matrixWorld),a.setFromMatrixPosition(C.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(x),v++}else if(C.isSpotLight){const R=r.spot[E];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(x),R.direction.setFromMatrixPosition(C.matrixWorld),a.setFromMatrixPosition(C.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(x),E++}else if(C.isRectAreaLight){const R=r.rectArea[b];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(x),c.identity(),l.copy(C.matrixWorld),l.premultiply(x),c.extractRotation(l),R.halfWidth.set(C.width*.5,0,0),R.halfHeight.set(0,C.height*.5,0),R.halfWidth.applyMatrix4(c),R.halfHeight.applyMatrix4(c),b++}else if(C.isPointLight){const R=r.point[S];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(x),S++}else if(C.isHemisphereLight){const R=r.hemi[y];R.direction.setFromMatrixPosition(C.matrixWorld),R.direction.transformDirection(x),y++}}}return{setup:d,setupView:f,state:r}}function mg(s){const e=new nw(s),t=[],r=[],a=[];function l(v){_.camera=v,t.length=0,r.length=0,a.length=0}function c(v){t.push(v)}function d(v){r.push(v)}function f(v){a.push(v)}function p(){e.setup(t)}function g(v){e.setupView(t,v)}const _={lightsArray:t,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:l,state:_,setupLights:p,setupLightsView:g,pushLight:c,pushShadow:d,pushLightProbeGrid:f}}function iw(s){let e=new WeakMap;function t(a,l=0){const c=e.get(a);let d;return c===void 0?(d=new mg(s),e.set(a,[d])):l>=c.length?(d=new mg(s),c.push(d)):d=c[l],d}function r(){e=new WeakMap}return{get:t,dispose:r}}const rw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,aw=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],ow=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],gg=new kt,lo=new q,Dd=new q;function lw(s,e,t){let r=new Oh;const a=new ct,l=new ct,c=new Zt,d=new mx,f=new gx,p={},g=t.maxTextureSize,_={[fs]:Wn,[Wn]:fs,[ui]:ui},v=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:rw,fragmentShader:sw}),S=v.clone();S.defines.HORIZONTAL_PASS=1;const E=new hi;E.setAttribute("position",new Pi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new lt(E,v),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jl;let x=this.type;this.render=function(P,F,w){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||P.length===0)return;this.type===Mg&&(st("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=jl);const D=s.getRenderTarget(),B=s.getActiveCubeFace(),G=s.getActiveMipmapLevel(),K=s.state;K.setBlending(dr),K.buffers.depth.getReversed()===!0?K.buffers.color.setClear(0,0,0,0):K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const ee=x!==this.type;ee&&F.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(J=>J.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,J=P.length;V<J;V++){const he=P[V],te=he.shadow;if(te===void 0){st("WebGLShadowMap:",he,"has no shadow.");continue}if(te.autoUpdate===!1&&te.needsUpdate===!1)continue;a.copy(te.mapSize);const Y=te.getFrameExtents();a.multiply(Y),l.copy(te.mapSize),(a.x>g||a.y>g)&&(a.x>g&&(l.x=Math.floor(g/Y.x),a.x=l.x*Y.x,te.mapSize.x=l.x),a.y>g&&(l.y=Math.floor(g/Y.y),a.y=l.y*Y.y,te.mapSize.y=l.y));const $=s.state.buffers.depth.getReversed();if(te.camera._reversedDepth=$,te.map===null||ee===!0){if(te.map!==null&&(te.map.depthTexture!==null&&(te.map.depthTexture.dispose(),te.map.depthTexture=null),te.map.dispose()),this.type===ho){if(he.isPointLight){st("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}te.map=new Ri(a.x,a.y,{format:ms,type:Gi,minFilter:Pn,magFilter:Pn,generateMipmaps:!1}),te.map.texture.name=he.name+".shadowMap",te.map.depthTexture=new xo(a.x,a.y,Ci),te.map.depthTexture.name=he.name+".shadowMapDepth",te.map.depthTexture.format=fr,te.map.depthTexture.compareFunction=null,te.map.depthTexture.minFilter=Sn,te.map.depthTexture.magFilter=Sn}else he.isPointLight?(te.map=new n0(a.x),te.map.depthTexture=new cx(a.x,Vi)):(te.map=new Ri(a.x,a.y),te.map.depthTexture=new xo(a.x,a.y,Vi)),te.map.depthTexture.name=he.name+".shadowMap",te.map.depthTexture.format=fr,this.type===jl?(te.map.depthTexture.compareFunction=$?Ih:Nh,te.map.depthTexture.minFilter=Pn,te.map.depthTexture.magFilter=Pn):(te.map.depthTexture.compareFunction=null,te.map.depthTexture.minFilter=Sn,te.map.depthTexture.magFilter=Sn);te.camera.updateProjectionMatrix()}te.map.isWebGLCubeRenderTarget!==!0&&(te.map.width!==a.x||te.map.height!==a.y)&&te.map.setSize(a.x,a.y);const Z=te.map.isWebGLCubeRenderTarget?6:te.getViewportCount();he.isPointLight!==!0&&te.updateMatrices(he,w);for(let L=0;L<Z;L++){const ae=te.getCamera(L);if(he.isPointLight){const ye=te.camera,Ve=te.matrix,ze=he.distance||ye.far;ze!==ye.far&&(ye.far=ze,ye.updateProjectionMatrix()),lo.setFromMatrixPosition(he.matrixWorld),ye.position.copy(lo),Dd.copy(ye.position),Dd.add(aw[L]),ye.up.copy(ow[L]),ye.lookAt(Dd),ye.updateMatrixWorld(),Ve.makeTranslation(-lo.x,-lo.y,-lo.z),gg.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),te._frustum.setFromProjectionMatrix(gg,ye.coordinateSystem,ye.reversedDepth)}if(te.map.isWebGLCubeRenderTarget)s.setRenderTarget(te.map,L),s.clear();else{L===0&&(s.setRenderTarget(te.map),s.clear());const ye=te.getViewport(L);c.set(l.x*ye.x,l.y*ye.y,l.x*ye.z,l.y*ye.w),K.viewport(c)}r=te.getFrustum(L),C(F,w,ae,he,this.type)}te.isPointLightShadow!==!0&&this.type===ho&&I(te,w),te.needsUpdate=!1}x=this.type,y.needsUpdate=!1,s.setRenderTarget(D,B,G)};function I(P,F){const w=e.update(b);v.defines.VSM_SAMPLES!==P.blurSamples&&(v.defines.VSM_SAMPLES=P.blurSamples,S.defines.VSM_SAMPLES=P.blurSamples,v.needsUpdate=!0,S.needsUpdate=!0),P.mapPass===null?P.mapPass=new Ri(a.x,a.y,{format:ms,type:Gi}):(P.mapPass.width!==P.map.width||P.mapPass.height!==P.map.height)&&P.mapPass.setSize(P.map.width,P.map.height),v.uniforms.shadow_pass.value=P.map.depthTexture,v.uniforms.resolution.value.set(P.map.width,P.map.height),v.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(F,null,w,v,b,null),S.uniforms.shadow_pass.value=P.mapPass.texture,S.uniforms.resolution.value.set(P.map.width,P.map.height),S.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(F,null,w,S,b,null)}function O(P,F,w,D){let B=null;const G=w.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(G!==void 0)B=G;else if(B=w.isPointLight===!0?f:d,s.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const K=B.uuid,ee=F.uuid;let V=p[K];V===void 0&&(V={},p[K]=V);let J=V[ee];J===void 0&&(J=B.clone(),V[ee]=J,F.addEventListener("dispose",R)),B=J}if(B.visible=F.visible,B.wireframe=F.wireframe,D===ho?B.side=F.shadowSide!==null?F.shadowSide:F.side:B.side=F.shadowSide!==null?F.shadowSide:_[F.side],B.alphaMap=F.alphaMap,B.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,B.map=F.map,B.clipShadows=F.clipShadows,B.clippingPlanes=F.clippingPlanes,B.clipIntersection=F.clipIntersection,B.displacementMap=F.displacementMap,B.displacementScale=F.displacementScale,B.displacementBias=F.displacementBias,B.wireframeLinewidth=F.wireframeLinewidth,B.linewidth=F.linewidth,w.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const K=s.properties.get(B);K.light=w}return B}function C(P,F,w,D,B){if(P.visible===!1)return;if(P.layers.test(F.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&B===ho)&&(!P.frustumCulled||P.intersectsFrustum(r))){P.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,P.matrixWorld);const ee=e.update(P),V=P.material;if(Array.isArray(V)){const J=ee.groups;for(let he=0,te=J.length;he<te;he++){const Y=J[he],$=V[Y.materialIndex];if($&&$.visible){const Z=O(P,$,D,B);P.onBeforeShadow(s,P,F,w,ee,Z,Y),s.renderBufferDirect(w,null,ee,Z,P,Y),P.onAfterShadow(s,P,F,w,ee,Z,Y)}}}else if(V.visible){const J=O(P,V,D,B);P.onBeforeShadow(s,P,F,w,ee,J,null),s.renderBufferDirect(w,null,ee,J,P,null),P.onAfterShadow(s,P,F,w,ee,J,null)}}const K=P.children;for(let ee=0,V=K.length;ee<V;ee++)C(K[ee],F,w,D,B)}function R(P){P.target.removeEventListener("dispose",R);for(const w in p){const D=p[w],B=P.target.uuid;B in D&&(D[B].dispose(),delete D[B])}}}function cw(s,e){function t(){let z=!1;const Ce=new Zt;let me=null;const be=new Zt(0,0,0,0);return{setMask:function(Ue){me!==Ue&&!z&&(s.colorMask(Ue,Ue,Ue,Ue),me=Ue)},setLocked:function(Ue){z=Ue},setClear:function(Ue,ve,je,Ye,Ct){Ct===!0&&(Ue*=Ye,ve*=Ye,je*=Ye),Ce.set(Ue,ve,je,Ye),be.equals(Ce)===!1&&(s.clearColor(Ue,ve,je,Ye),be.copy(Ce))},reset:function(){z=!1,me=null,be.set(-1,0,0,0)}}}function r(){let z=!1,Ce=!1,me=null,be=null,Ue=null;return{setReversed:function(ve){if(Ce!==ve){const je=e.get("EXT_clip_control");ve?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT),Ce=ve;const Ye=Ue;Ue=null,this.setClear(Ye)}},getReversed:function(){return Ce},setTest:function(ve){ve?de(s.DEPTH_TEST):Ee(s.DEPTH_TEST)},setMask:function(ve){me!==ve&&!z&&(s.depthMask(ve),me=ve)},setFunc:function(ve){if(Ce&&(ve=N_[ve]),be!==ve){switch(ve){case Nd:s.depthFunc(s.NEVER);break;case Id:s.depthFunc(s.ALWAYS);break;case Ud:s.depthFunc(s.LESS);break;case mo:s.depthFunc(s.LEQUAL);break;case Fd:s.depthFunc(s.EQUAL);break;case Od:s.depthFunc(s.GEQUAL);break;case kd:s.depthFunc(s.GREATER);break;case Bd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}be=ve}},setLocked:function(ve){z=ve},setClear:function(ve){Ue!==ve&&(Ue=ve,Ce&&(ve=1-ve),s.clearDepth(ve))},reset:function(){z=!1,me=null,be=null,Ue=null,Ce=!1}}}function a(){let z=!1,Ce=null,me=null,be=null,Ue=null,ve=null,je=null,Ye=null,Ct=null;return{setTest:function(Et){z||(Et?de(s.STENCIL_TEST):Ee(s.STENCIL_TEST))},setMask:function(Et){Ce!==Et&&!z&&(s.stencilMask(Et),Ce=Et)},setFunc:function(Et,vn,ei){(me!==Et||be!==vn||Ue!==ei)&&(s.stencilFunc(Et,vn,ei),me=Et,be=vn,Ue=ei)},setOp:function(Et,vn,ei){(ve!==Et||je!==vn||Ye!==ei)&&(s.stencilOp(Et,vn,ei),ve=Et,je=vn,Ye=ei)},setLocked:function(Et){z=Et},setClear:function(Et){Ct!==Et&&(s.clearStencil(Et),Ct=Et)},reset:function(){z=!1,Ce=null,me=null,be=null,Ue=null,ve=null,je=null,Ye=null,Ct=null}}}const l=new t,c=new r,d=new a,f=new WeakMap,p=new WeakMap;let g={},_={},v={},S=new WeakMap,E=[],b=null,y=!1,x=null,I=null,O=null,C=null,R=null,P=null,F=null,w=new gt(0,0,0),D=0,B=!1,G=null,K=null,ee=null,V=null,J=null;const he=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let te=!1,Y=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec($)[1]),te=Y>=1):$.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),te=Y>=2);let Z=null,L={};const ae=s.getParameter(s.SCISSOR_BOX),ye=s.getParameter(s.VIEWPORT),Ve=new Zt().fromArray(ae),ze=new Zt().fromArray(ye);function Ge(z,Ce,me,be){const Ue=new Uint8Array(4),ve=s.createTexture();s.bindTexture(z,ve),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let je=0;je<me;je++)z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,Ue):s.texImage2D(Ce+je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ue);return ve}const le={};le[s.TEXTURE_2D]=Ge(s.TEXTURE_2D,s.TEXTURE_2D,1),le[s.TEXTURE_CUBE_MAP]=Ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[s.TEXTURE_2D_ARRAY]=Ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),le[s.TEXTURE_3D]=Ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),c.setClear(1),d.setClear(0),de(s.DEPTH_TEST),c.setFunc(mo),ft(!1),Ft(_m),de(s.CULL_FACE),_t(dr);function de(z){g[z]!==!0&&(s.enable(z),g[z]=!0)}function Ee(z){g[z]!==!1&&(s.disable(z),g[z]=!1)}function Qe(z,Ce){return v[z]!==Ce?(s.bindFramebuffer(z,Ce),v[z]=Ce,z===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=Ce),z===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Fe(z,Ce){let me=E,be=!1;if(z){me=S.get(Ce),me===void 0&&(me=[],S.set(Ce,me));const Ue=z.textures;if(me.length!==Ue.length||me[0]!==s.COLOR_ATTACHMENT0){for(let ve=0,je=Ue.length;ve<je;ve++)me[ve]=s.COLOR_ATTACHMENT0+ve;me.length=Ue.length,be=!0}}else me[0]!==s.BACK&&(me[0]=s.BACK,be=!0);be&&s.drawBuffers(me)}function dt(z){return b!==z?(s.useProgram(z),b=z,!0):!1}const Vt={[oa]:s.FUNC_ADD,[t_]:s.FUNC_SUBTRACT,[n_]:s.FUNC_REVERSE_SUBTRACT};Vt[i_]=s.MIN,Vt[r_]=s.MAX;const ht={[s_]:s.ZERO,[a_]:s.ONE,[o_]:s.SRC_COLOR,[Eg]:s.SRC_ALPHA,[f_]:s.SRC_ALPHA_SATURATE,[d_]:s.DST_COLOR,[c_]:s.DST_ALPHA,[l_]:s.ONE_MINUS_SRC_COLOR,[wg]:s.ONE_MINUS_SRC_ALPHA,[h_]:s.ONE_MINUS_DST_COLOR,[u_]:s.ONE_MINUS_DST_ALPHA,[p_]:s.CONSTANT_COLOR,[m_]:s.ONE_MINUS_CONSTANT_COLOR,[g_]:s.CONSTANT_ALPHA,[v_]:s.ONE_MINUS_CONSTANT_ALPHA};function _t(z,Ce,me,be,Ue,ve,je,Ye,Ct,Et){if(z===dr){y===!0&&(Ee(s.BLEND),y=!1);return}if(y===!1&&(de(s.BLEND),y=!0),z!==e_){if(z!==x||Et!==B){if((I!==oa||R!==oa)&&(s.blendEquation(s.FUNC_ADD),I=oa,R=oa),Et)switch(z){case po:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xm:s.blendFunc(s.ONE,s.ONE);break;case ym:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sm:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Tt("WebGLState: Invalid blending: ",z);break}else switch(z){case po:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case xm:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ym:Tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sm:Tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Tt("WebGLState: Invalid blending: ",z);break}O=null,C=null,P=null,F=null,w.set(0,0,0),D=0,x=z,B=Et}return}Ue=Ue||Ce,ve=ve||me,je=je||be,(Ce!==I||Ue!==R)&&(s.blendEquationSeparate(Vt[Ce],Vt[Ue]),I=Ce,R=Ue),(me!==O||be!==C||ve!==P||je!==F)&&(s.blendFuncSeparate(ht[me],ht[be],ht[ve],ht[je]),O=me,C=be,P=ve,F=je),(Ye.equals(w)===!1||Ct!==D)&&(s.blendColor(Ye.r,Ye.g,Ye.b,Ct),w.copy(Ye),D=Ct),x=z,B=!1}function Dt(z,Ce){z.side===ui?Ee(s.CULL_FACE):de(s.CULL_FACE);let me=z.side===Wn;Ce&&(me=!me),ft(me),z.blending===po&&z.transparent===!1?_t(dr):_t(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),c.setFunc(z.depthFunc),c.setTest(z.depthTest),c.setMask(z.depthWrite),l.setMask(z.colorWrite);const be=z.stencilWrite;d.setTest(be),be&&(d.setMask(z.stencilWriteMask),d.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),d.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),nn(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?de(s.SAMPLE_ALPHA_TO_COVERAGE):Ee(s.SAMPLE_ALPHA_TO_COVERAGE)}function ft(z){G!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),G=z)}function Ft(z){z!==Jv?(de(s.CULL_FACE),z!==K&&(z===_m?s.cullFace(s.BACK):z===Qv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ee(s.CULL_FACE),K=z}function jt(z){z!==ee&&(te&&s.lineWidth(z),ee=z)}function nn(z,Ce,me){z?(de(s.POLYGON_OFFSET_FILL),(V!==Ce||J!==me)&&(V=Ce,J=me,c.getReversed()&&(Ce=-Ce),s.polygonOffset(Ce,me))):Ee(s.POLYGON_OFFSET_FILL)}function Lt(z){z?de(s.SCISSOR_TEST):Ee(s.SCISSOR_TEST)}function Gt(z){z===void 0&&(z=s.TEXTURE0+he-1),Z!==z&&(s.activeTexture(z),Z=z)}function W(z,Ce,me){me===void 0&&(Z===null?me=s.TEXTURE0+he-1:me=Z);let be=L[me];be===void 0&&(be={type:void 0,texture:void 0},L[me]=be),(be.type!==z||be.texture!==Ce)&&(Z!==me&&(s.activeTexture(me),Z=me),s.bindTexture(z,Ce||le[z]),be.type=z,be.texture=Ce)}function an(){const z=L[Z];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function At(){try{s.compressedTexImage2D(...arguments)}catch(z){Tt("WebGLState:",z)}}function N(){try{s.compressedTexImage3D(...arguments)}catch(z){Tt("WebGLState:",z)}}function M(){try{s.texSubImage2D(...arguments)}catch(z){Tt("WebGLState:",z)}}function j(){try{s.texSubImage3D(...arguments)}catch(z){Tt("WebGLState:",z)}}function oe(){try{s.compressedTexSubImage2D(...arguments)}catch(z){Tt("WebGLState:",z)}}function fe(){try{s.compressedTexSubImage3D(...arguments)}catch(z){Tt("WebGLState:",z)}}function Me(){try{s.texStorage2D(...arguments)}catch(z){Tt("WebGLState:",z)}}function Ae(){try{s.texStorage3D(...arguments)}catch(z){Tt("WebGLState:",z)}}function pe(){try{s.texImage2D(...arguments)}catch(z){Tt("WebGLState:",z)}}function ge(){try{s.texImage3D(...arguments)}catch(z){Tt("WebGLState:",z)}}function Re(z){return _[z]!==void 0?_[z]:s.getParameter(z)}function Ke(z,Ce){_[z]!==Ce&&(s.pixelStorei(z,Ce),_[z]=Ce)}function Pe(z){Ve.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),Ve.copy(z))}function Te(z){ze.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),ze.copy(z))}function $e(z,Ce){let me=p.get(Ce);me===void 0&&(me=new WeakMap,p.set(Ce,me));let be=me.get(z);be===void 0&&(be=s.getUniformBlockIndex(Ce,z.name),me.set(z,be))}function et(z,Ce){const be=p.get(Ce).get(z);f.get(Ce)!==be&&(s.uniformBlockBinding(Ce,be,z.__bindingPointIndex),f.set(Ce,be))}function it(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),c.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),g={},_={},Z=null,L={},v={},S=new WeakMap,E=[],b=null,y=!1,x=null,I=null,O=null,C=null,R=null,P=null,F=null,w=new gt(0,0,0),D=0,B=!1,G=null,K=null,ee=null,V=null,J=null,Ve.set(0,0,s.canvas.width,s.canvas.height),ze.set(0,0,s.canvas.width,s.canvas.height),l.reset(),c.reset(),d.reset()}return{buffers:{color:l,depth:c,stencil:d},enable:de,disable:Ee,bindFramebuffer:Qe,drawBuffers:Fe,useProgram:dt,setBlending:_t,setMaterial:Dt,setFlipSided:ft,setCullFace:Ft,setLineWidth:jt,setPolygonOffset:nn,setScissorTest:Lt,activeTexture:Gt,bindTexture:W,unbindTexture:an,compressedTexImage2D:At,compressedTexImage3D:N,texImage2D:pe,texImage3D:ge,pixelStorei:Ke,getParameter:Re,updateUBOMapping:$e,uniformBlockBinding:et,texStorage2D:Me,texStorage3D:Ae,texSubImage2D:M,texSubImage3D:j,compressedTexSubImage2D:oe,compressedTexSubImage3D:fe,scissor:Pe,viewport:Te,reset:it}}function uw(s,e,t,r,a,l,c){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new ct,g=new WeakMap,_=new Set;let v;const S=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(N,M){return E?new OffscreenCanvas(N,M):lc("canvas")}function y(N,M,j){let oe=1;const fe=At(N);if((fe.width>j||fe.height>j)&&(oe=j/Math.max(fe.width,fe.height)),oe<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const Me=Math.floor(oe*fe.width),Ae=Math.floor(oe*fe.height);v===void 0&&(v=b(Me,Ae));const pe=M?b(Me,Ae):v;return pe.width=Me,pe.height=Ae,pe.getContext("2d").drawImage(N,0,0,Me,Ae),st("WebGLRenderer: Texture has been resized from ("+fe.width+"x"+fe.height+") to ("+Me+"x"+Ae+")."),pe}else return"data"in N&&st("WebGLRenderer: Image in DataTexture is too big ("+fe.width+"x"+fe.height+")."),N;return N}function x(N){return N.generateMipmaps}function I(N){s.generateMipmap(N)}function O(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function C(N,M,j,oe,fe,Me=!1){if(N!==null){if(s[N]!==void 0)return s[N];st("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let Ae;oe&&(Ae=e.get("EXT_texture_norm16"),Ae||st("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let pe=M;if(M===s.RED&&(j===s.FLOAT&&(pe=s.R32F),j===s.HALF_FLOAT&&(pe=s.R16F),j===s.UNSIGNED_BYTE&&(pe=s.R8),j===s.UNSIGNED_SHORT&&Ae&&(pe=Ae.R16_EXT),j===s.SHORT&&Ae&&(pe=Ae.R16_SNORM_EXT)),M===s.RED_INTEGER&&(j===s.UNSIGNED_BYTE&&(pe=s.R8UI),j===s.UNSIGNED_SHORT&&(pe=s.R16UI),j===s.UNSIGNED_INT&&(pe=s.R32UI),j===s.BYTE&&(pe=s.R8I),j===s.SHORT&&(pe=s.R16I),j===s.INT&&(pe=s.R32I)),M===s.RG&&(j===s.FLOAT&&(pe=s.RG32F),j===s.HALF_FLOAT&&(pe=s.RG16F),j===s.UNSIGNED_BYTE&&(pe=s.RG8),j===s.UNSIGNED_SHORT&&Ae&&(pe=Ae.RG16_EXT),j===s.SHORT&&Ae&&(pe=Ae.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(j===s.UNSIGNED_BYTE&&(pe=s.RG8UI),j===s.UNSIGNED_SHORT&&(pe=s.RG16UI),j===s.UNSIGNED_INT&&(pe=s.RG32UI),j===s.BYTE&&(pe=s.RG8I),j===s.SHORT&&(pe=s.RG16I),j===s.INT&&(pe=s.RG32I)),M===s.RGB_INTEGER&&(j===s.UNSIGNED_BYTE&&(pe=s.RGB8UI),j===s.UNSIGNED_SHORT&&(pe=s.RGB16UI),j===s.UNSIGNED_INT&&(pe=s.RGB32UI),j===s.BYTE&&(pe=s.RGB8I),j===s.SHORT&&(pe=s.RGB16I),j===s.INT&&(pe=s.RGB32I)),M===s.RGBA_INTEGER&&(j===s.UNSIGNED_BYTE&&(pe=s.RGBA8UI),j===s.UNSIGNED_SHORT&&(pe=s.RGBA16UI),j===s.UNSIGNED_INT&&(pe=s.RGBA32UI),j===s.BYTE&&(pe=s.RGBA8I),j===s.SHORT&&(pe=s.RGBA16I),j===s.INT&&(pe=s.RGBA32I)),M===s.RGB&&(j===s.UNSIGNED_SHORT&&Ae&&(pe=Ae.RGB16_EXT),j===s.SHORT&&Ae&&(pe=Ae.RGB16_SNORM_EXT),j===s.UNSIGNED_INT_5_9_9_9_REV&&(pe=s.RGB9_E5),j===s.UNSIGNED_INT_10F_11F_11F_REV&&(pe=s.R11F_G11F_B10F)),M===s.RGBA){const ge=Me?oc:St.getTransfer(fe);j===s.FLOAT&&(pe=s.RGBA32F),j===s.HALF_FLOAT&&(pe=s.RGBA16F),j===s.UNSIGNED_BYTE&&(pe=ge===It?s.SRGB8_ALPHA8:s.RGBA8),j===s.UNSIGNED_SHORT&&Ae&&(pe=Ae.RGBA16_EXT),j===s.SHORT&&Ae&&(pe=Ae.RGBA16_SNORM_EXT),j===s.UNSIGNED_SHORT_4_4_4_4&&(pe=s.RGBA4),j===s.UNSIGNED_SHORT_5_5_5_1&&(pe=s.RGB5_A1)}return(pe===s.R16F||pe===s.R32F||pe===s.RG16F||pe===s.RG32F||pe===s.RGBA16F||pe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),pe}function R(N,M){let j;return N?M===null||M===Vi||M===vo?j=s.DEPTH24_STENCIL8:M===Ci?j=s.DEPTH32F_STENCIL8:M===go&&(j=s.DEPTH24_STENCIL8,st("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Vi||M===vo?j=s.DEPTH_COMPONENT24:M===Ci?j=s.DEPTH_COMPONENT32F:M===go&&(j=s.DEPTH_COMPONENT16),j}function P(N,M){return x(N)===!0||N.isFramebufferTexture&&N.minFilter!==Sn&&N.minFilter!==Pn?Math.log2(Math.max(M.width,M.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?M.mipmaps.length:1}function F(N){const M=N.target;M.removeEventListener("dispose",F),D(M),M.isVideoTexture&&g.delete(M),M.isHTMLTexture&&_.delete(M)}function w(N){const M=N.target;M.removeEventListener("dispose",w),G(M)}function D(N){const M=r.get(N);if(M.__webglInit===void 0)return;const j=N.source,oe=S.get(j);if(oe){const fe=oe[M.__cacheKey];fe.usedTimes--,fe.usedTimes===0&&B(N),Object.keys(oe).length===0&&S.delete(j)}r.remove(N)}function B(N){const M=r.get(N);s.deleteTexture(M.__webglTexture);const j=N.source,oe=S.get(j);delete oe[M.__cacheKey],c.memory.textures--}function G(N){const M=r.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),r.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(M.__webglFramebuffer[oe]))for(let fe=0;fe<M.__webglFramebuffer[oe].length;fe++)s.deleteFramebuffer(M.__webglFramebuffer[oe][fe]);else s.deleteFramebuffer(M.__webglFramebuffer[oe]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[oe])}else{if(Array.isArray(M.__webglFramebuffer))for(let oe=0;oe<M.__webglFramebuffer.length;oe++)s.deleteFramebuffer(M.__webglFramebuffer[oe]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let oe=0;oe<M.__webglColorRenderbuffer.length;oe++)M.__webglColorRenderbuffer[oe]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[oe]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const j=N.textures;for(let oe=0,fe=j.length;oe<fe;oe++){const Me=r.get(j[oe]);Me.__webglTexture&&(s.deleteTexture(Me.__webglTexture),c.memory.textures--),r.remove(j[oe])}r.remove(N)}let K=0;function ee(){K=0}function V(){return K}function J(N){K=N}function he(){const N=K;return N>=a.maxTextures&&st("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+a.maxTextures),K+=1,N}function te(N){const M=[];return M.push(N.wrapS),M.push(N.wrapT),M.push(N.wrapR||0),M.push(N.magFilter),M.push(N.minFilter),M.push(N.anisotropy),M.push(N.internalFormat),M.push(N.format),M.push(N.type),M.push(N.generateMipmaps),M.push(N.premultiplyAlpha),M.push(N.flipY),M.push(N.unpackAlignment),M.push(N.colorSpace),M.join()}function Y(N,M){const j=r.get(N);if(N.isVideoTexture&&W(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&j.__version!==N.version){const oe=N.image;if(oe===null)st("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)st("WebGLRenderer: Texture marked for update but image is incomplete");else{Ee(j,N,M);return}}else N.isExternalTexture&&(j.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,j.__webglTexture,s.TEXTURE0+M)}function $(N,M){const j=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&j.__version!==N.version){Ee(j,N,M);return}else N.isExternalTexture&&(j.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,j.__webglTexture,s.TEXTURE0+M)}function Z(N,M){const j=r.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&j.__version!==N.version){Ee(j,N,M);return}t.bindTexture(s.TEXTURE_3D,j.__webglTexture,s.TEXTURE0+M)}function L(N,M){const j=r.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&j.__version!==N.version){Qe(j,N,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture,s.TEXTURE0+M)}const ae={[zd]:s.REPEAT,[ur]:s.CLAMP_TO_EDGE,[Hd]:s.MIRRORED_REPEAT},ye={[Sn]:s.NEAREST,[y_]:s.NEAREST_MIPMAP_NEAREST,[Tl]:s.NEAREST_MIPMAP_LINEAR,[Pn]:s.LINEAR,[ed]:s.LINEAR_MIPMAP_NEAREST,[us]:s.LINEAR_MIPMAP_LINEAR},Ve={[w_]:s.NEVER,[R_]:s.ALWAYS,[T_]:s.LESS,[Nh]:s.LEQUAL,[A_]:s.EQUAL,[Ih]:s.GEQUAL,[C_]:s.GREATER,[b_]:s.NOTEQUAL};function ze(N,M){if(M.type===Ci&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Pn||M.magFilter===ed||M.magFilter===Tl||M.magFilter===us||M.minFilter===Pn||M.minFilter===ed||M.minFilter===Tl||M.minFilter===us)&&st("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,ae[M.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,ae[M.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,ae[M.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,ye[M.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,ye[M.minFilter]),M.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,Ve[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Sn||M.minFilter!==Tl&&M.minFilter!==us||M.type===Ci&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||r.get(M).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");s.texParameterf(N,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy}}}function Ge(N,M){let j=!1;N.__webglInit===void 0&&(N.__webglInit=!0,M.addEventListener("dispose",F));const oe=M.source;let fe=S.get(oe);fe===void 0&&(fe={},S.set(oe,fe));const Me=te(M);if(Me!==N.__cacheKey){fe[Me]===void 0&&(fe[Me]={texture:s.createTexture(),usedTimes:0},c.memory.textures++,j=!0),fe[Me].usedTimes++;const Ae=fe[N.__cacheKey];Ae!==void 0&&(fe[N.__cacheKey].usedTimes--,Ae.usedTimes===0&&B(M)),N.__cacheKey=Me,N.__webglTexture=fe[Me].texture}return j}function le(N,M,j){return Math.floor(Math.floor(N/j)/M)}function de(N,M,j,oe){const Me=N.updateRanges;if(Me.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,j,oe,M.data);else{Me.sort((Ke,Pe)=>Ke.start-Pe.start);let Ae=0;for(let Ke=1;Ke<Me.length;Ke++){const Pe=Me[Ae],Te=Me[Ke],$e=Pe.start+Pe.count,et=le(Te.start,M.width,4),it=le(Pe.start,M.width,4);Te.start<=$e+1&&et===it&&le(Te.start+Te.count-1,M.width,4)===et?Pe.count=Math.max(Pe.count,Te.start+Te.count-Pe.start):(++Ae,Me[Ae]=Te)}Me.length=Ae+1;const pe=t.getParameter(s.UNPACK_ROW_LENGTH),ge=t.getParameter(s.UNPACK_SKIP_PIXELS),Re=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Ke=0,Pe=Me.length;Ke<Pe;Ke++){const Te=Me[Ke],$e=Math.floor(Te.start/4),et=Math.ceil(Te.count/4),it=$e%M.width,z=Math.floor($e/M.width),Ce=et,me=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,it),t.pixelStorei(s.UNPACK_SKIP_ROWS,z),t.texSubImage2D(s.TEXTURE_2D,0,it,z,Ce,me,j,oe,M.data)}N.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,pe),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ge),t.pixelStorei(s.UNPACK_SKIP_ROWS,Re)}}function Ee(N,M,j){let oe=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(oe=s.TEXTURE_3D);const fe=Ge(N,M),Me=M.source;t.bindTexture(oe,N.__webglTexture,s.TEXTURE0+j);const Ae=r.get(Me);if(Me.version!==Ae.__version||fe===!0){if(t.activeTexture(s.TEXTURE0+j),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const me=St.getPrimaries(St.workingColorSpace),be=M.colorSpace===kr?null:St.getPrimaries(M.colorSpace),Ue=M.colorSpace===kr||me===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let ge=y(M.image,!1,a.maxTextureSize);ge=an(M,ge);const Re=l.convert(M.format,M.colorSpace),Ke=l.convert(M.type);let Pe=C(M.internalFormat,Re,Ke,M.normalized,M.colorSpace,M.isVideoTexture);ze(oe,M);let Te;const $e=M.mipmaps,et=M.isVideoTexture!==!0,it=Ae.__version===void 0||fe===!0,z=Me.dataReady,Ce=P(M,ge);if(M.isDepthTexture)Pe=R(M.format===ds,M.type),it&&(et?t.texStorage2D(s.TEXTURE_2D,1,Pe,ge.width,ge.height):t.texImage2D(s.TEXTURE_2D,0,Pe,ge.width,ge.height,0,Re,Ke,null));else if(M.isDataTexture)if($e.length>0){et&&it&&t.texStorage2D(s.TEXTURE_2D,Ce,Pe,$e[0].width,$e[0].height);for(let me=0,be=$e.length;me<be;me++)Te=$e[me],et?z&&t.texSubImage2D(s.TEXTURE_2D,me,0,0,Te.width,Te.height,Re,Ke,Te.data):t.texImage2D(s.TEXTURE_2D,me,Pe,Te.width,Te.height,0,Re,Ke,Te.data);M.generateMipmaps=!1}else et?(it&&t.texStorage2D(s.TEXTURE_2D,Ce,Pe,ge.width,ge.height),z&&de(M,ge,Re,Ke)):t.texImage2D(s.TEXTURE_2D,0,Pe,ge.width,ge.height,0,Re,Ke,ge.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){et&&it&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Pe,$e[0].width,$e[0].height,ge.depth);for(let me=0,be=$e.length;me<be;me++)if(Te=$e[me],M.format!==bi)if(Re!==null)if(et){if(z)if(M.layerUpdates.size>0){const Ue=Km(Te.width,Te.height,M.format,M.type);for(const ve of M.layerUpdates){const je=Te.data.subarray(ve*Ue/Te.data.BYTES_PER_ELEMENT,(ve+1)*Ue/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,ve,Te.width,Te.height,1,Re,je)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,0,Te.width,Te.height,ge.depth,Re,Te.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,me,Pe,Te.width,Te.height,ge.depth,0,Te.data,0,0);else st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?z&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,me,0,0,0,Te.width,Te.height,ge.depth,Re,Ke,Te.data):t.texImage3D(s.TEXTURE_2D_ARRAY,me,Pe,Te.width,Te.height,ge.depth,0,Re,Ke,Te.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{et&&it&&t.texStorage2D(s.TEXTURE_2D,Ce,Pe,$e[0].width,$e[0].height);for(let me=0,be=$e.length;me<be;me++)Te=$e[me],M.format!==bi?Re!==null?et?z&&t.compressedTexSubImage2D(s.TEXTURE_2D,me,0,0,Te.width,Te.height,Re,Te.data):t.compressedTexImage2D(s.TEXTURE_2D,me,Pe,Te.width,Te.height,0,Te.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?z&&t.texSubImage2D(s.TEXTURE_2D,me,0,0,Te.width,Te.height,Re,Ke,Te.data):t.texImage2D(s.TEXTURE_2D,me,Pe,Te.width,Te.height,0,Re,Ke,Te.data)}else if(M.isDataArrayTexture)if(et){if(it&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Pe,ge.width,ge.height,ge.depth),z)if(M.layerUpdates.size>0){const me=Km(ge.width,ge.height,M.format,M.type);for(const be of M.layerUpdates){const Ue=ge.data.subarray(be*me/ge.data.BYTES_PER_ELEMENT,(be+1)*me/ge.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,be,ge.width,ge.height,1,Re,Ke,Ue)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ge.width,ge.height,ge.depth,Re,Ke,ge.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Pe,ge.width,ge.height,ge.depth,0,Re,Ke,ge.data);else if(M.isData3DTexture)et?(it&&t.texStorage3D(s.TEXTURE_3D,Ce,Pe,ge.width,ge.height,ge.depth),z&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ge.width,ge.height,ge.depth,Re,Ke,ge.data)):t.texImage3D(s.TEXTURE_3D,0,Pe,ge.width,ge.height,ge.depth,0,Re,Ke,ge.data);else if(M.isFramebufferTexture){if(it)if(et)t.texStorage2D(s.TEXTURE_2D,Ce,Pe,ge.width,ge.height);else{let me=ge.width,be=ge.height;for(let Ue=0;Ue<Ce;Ue++)t.texImage2D(s.TEXTURE_2D,Ue,Pe,me,be,0,Re,Ke,null),me>>=1,be>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){const me=s.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),ge.parentNode!==me){me.appendChild(ge),_.add(M),me.onpaint=be=>{const Ue=be.changedElements;for(const ve of _)Ue.includes(ve.image)&&(ve.needsUpdate=!0)},me.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ge);else{const Ue=s.RGBA,ve=s.RGBA,je=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ue,ve,je,ge)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if($e.length>0){if(et&&it){const me=At($e[0]);t.texStorage2D(s.TEXTURE_2D,Ce,Pe,me.width,me.height)}for(let me=0,be=$e.length;me<be;me++)Te=$e[me],et?z&&t.texSubImage2D(s.TEXTURE_2D,me,0,0,Re,Ke,Te):t.texImage2D(s.TEXTURE_2D,me,Pe,Re,Ke,Te);M.generateMipmaps=!1}else if(et){if(it){const me=At(ge);t.texStorage2D(s.TEXTURE_2D,Ce,Pe,me.width,me.height)}z&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Re,Ke,ge)}else t.texImage2D(s.TEXTURE_2D,0,Pe,Re,Ke,ge);x(M)&&I(oe),Ae.__version=Me.version,M.onUpdate&&M.onUpdate(M)}N.__version=M.version}function Qe(N,M,j){if(M.image.length!==6)return;const oe=Ge(N,M),fe=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+j);const Me=r.get(fe);if(fe.version!==Me.__version||oe===!0){t.activeTexture(s.TEXTURE0+j);const Ae=St.getPrimaries(St.workingColorSpace),pe=M.colorSpace===kr?null:St.getPrimaries(M.colorSpace),ge=M.colorSpace===kr||Ae===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Re=M.isCompressedTexture||M.image[0].isCompressedTexture,Ke=M.image[0]&&M.image[0].isDataTexture,Pe=[];for(let ve=0;ve<6;ve++)!Re&&!Ke?Pe[ve]=y(M.image[ve],!0,a.maxCubemapSize):Pe[ve]=Ke?M.image[ve].image:M.image[ve],Pe[ve]=an(M,Pe[ve]);const Te=Pe[0],$e=l.convert(M.format,M.colorSpace),et=l.convert(M.type),it=C(M.internalFormat,$e,et,M.normalized,M.colorSpace),z=M.isVideoTexture!==!0,Ce=Me.__version===void 0||oe===!0,me=fe.dataReady;let be=P(M,Te);ze(s.TEXTURE_CUBE_MAP,M);let Ue;if(Re){z&&Ce&&t.texStorage2D(s.TEXTURE_CUBE_MAP,be,it,Te.width,Te.height);for(let ve=0;ve<6;ve++){Ue=Pe[ve].mipmaps;for(let je=0;je<Ue.length;je++){const Ye=Ue[je];M.format!==bi?$e!==null?z?me&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,0,0,Ye.width,Ye.height,$e,Ye.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,it,Ye.width,Ye.height,0,Ye.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,0,0,Ye.width,Ye.height,$e,et,Ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je,it,Ye.width,Ye.height,0,$e,et,Ye.data)}}}else{if(Ue=M.mipmaps,z&&Ce){Ue.length>0&&be++;const ve=At(Pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,be,it,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Ke){z?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Pe[ve].width,Pe[ve].height,$e,et,Pe[ve].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,it,Pe[ve].width,Pe[ve].height,0,$e,et,Pe[ve].data);for(let je=0;je<Ue.length;je++){const Ct=Ue[je].image[ve].image;z?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,0,0,Ct.width,Ct.height,$e,et,Ct.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,it,Ct.width,Ct.height,0,$e,et,Ct.data)}}else{z?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,$e,et,Pe[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,it,$e,et,Pe[ve]);for(let je=0;je<Ue.length;je++){const Ye=Ue[je];z?me&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,0,0,$e,et,Ye.image[ve]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,je+1,it,$e,et,Ye.image[ve])}}}x(M)&&I(s.TEXTURE_CUBE_MAP),Me.__version=fe.version,M.onUpdate&&M.onUpdate(M)}N.__version=M.version}function Fe(N,M,j,oe,fe,Me){const Ae=l.convert(j.format,j.colorSpace),pe=l.convert(j.type),ge=C(j.internalFormat,Ae,pe,j.normalized,j.colorSpace),Re=r.get(M),Ke=r.get(j);if(Ke.__renderTarget=M,!Re.__hasExternalTextures){const Pe=Math.max(1,M.width>>Me),Te=Math.max(1,M.height>>Me);fe===s.TEXTURE_3D||fe===s.TEXTURE_2D_ARRAY?t.texImage3D(fe,Me,ge,Pe,Te,M.depth,0,Ae,pe,null):t.texImage2D(fe,Me,ge,Pe,Te,0,Ae,pe,null)}t.bindFramebuffer(s.FRAMEBUFFER,N),Gt(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,fe,Ke.__webglTexture,0,Lt(M)):(fe===s.TEXTURE_2D||fe>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&fe<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,fe,Ke.__webglTexture,Me),t.bindFramebuffer(s.FRAMEBUFFER,null)}function dt(N,M,j){if(s.bindRenderbuffer(s.RENDERBUFFER,N),M.depthBuffer){const oe=M.depthTexture,fe=oe&&oe.isDepthTexture?oe.type:null,Me=R(M.stencilBuffer,fe),Ae=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Gt(M)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Lt(M),Me,M.width,M.height):j?s.renderbufferStorageMultisample(s.RENDERBUFFER,Lt(M),Me,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Me,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ae,s.RENDERBUFFER,N)}else{const oe=M.textures;for(let fe=0;fe<oe.length;fe++){const Me=oe[fe],Ae=l.convert(Me.format,Me.colorSpace),pe=l.convert(Me.type),ge=C(Me.internalFormat,Ae,pe,Me.normalized,Me.colorSpace);Gt(M)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Lt(M),ge,M.width,M.height):j?s.renderbufferStorageMultisample(s.RENDERBUFFER,Lt(M),ge,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ge,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Vt(N,M,j){const oe=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,N),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const fe=r.get(M.depthTexture);if(fe.__renderTarget=M,(!fe.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),oe){if(fe.__webglInit===void 0&&(fe.__webglInit=!0,M.depthTexture.addEventListener("dispose",F)),fe.__webglTexture===void 0){fe.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture),ze(s.TEXTURE_CUBE_MAP,M.depthTexture);const Re=l.convert(M.depthTexture.format),Ke=l.convert(M.depthTexture.type);let Pe;M.depthTexture.format===fr?Pe=s.DEPTH_COMPONENT24:M.depthTexture.format===ds&&(Pe=s.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Pe,M.width,M.height,0,Re,Ke,null)}}else Y(M.depthTexture,0);const Me=fe.__webglTexture,Ae=Lt(M),pe=oe?s.TEXTURE_CUBE_MAP_POSITIVE_X+j:s.TEXTURE_2D,ge=M.depthTexture.format===ds?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===fr)Gt(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ge,pe,Me,0,Ae):s.framebufferTexture2D(s.FRAMEBUFFER,ge,pe,Me,0);else if(M.depthTexture.format===ds)Gt(M)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ge,pe,Me,0,Ae):s.framebufferTexture2D(s.FRAMEBUFFER,ge,pe,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ht(N){const M=r.get(N),j=N.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==N.depthTexture){const oe=N.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),oe){const fe=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,oe.removeEventListener("dispose",fe)};oe.addEventListener("dispose",fe),M.__depthDisposeCallback=fe}M.__boundDepthTexture=oe}if(N.depthTexture&&!M.__autoAllocateDepthBuffer)if(j)for(let oe=0;oe<6;oe++)Vt(M.__webglFramebuffer[oe],N,oe);else{const oe=N.texture.mipmaps;oe&&oe.length>0?Vt(M.__webglFramebuffer[0],N,0):Vt(M.__webglFramebuffer,N,0)}else if(j){M.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[oe]),M.__webglDepthbuffer[oe]===void 0)M.__webglDepthbuffer[oe]=s.createRenderbuffer(),dt(M.__webglDepthbuffer[oe],N,!1);else{const fe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=M.__webglDepthbuffer[oe];s.bindRenderbuffer(s.RENDERBUFFER,Me),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,Me)}}else{const oe=N.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),dt(M.__webglDepthbuffer,N,!1);else{const fe=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Me=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Me),s.framebufferRenderbuffer(s.FRAMEBUFFER,fe,s.RENDERBUFFER,Me)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function _t(N,M,j){const oe=r.get(N);M!==void 0&&Fe(oe.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),j!==void 0&&ht(N)}function Dt(N){const M=N.texture,j=r.get(N),oe=r.get(M);N.addEventListener("dispose",w);const fe=N.textures,Me=N.isWebGLCubeRenderTarget===!0,Ae=fe.length>1;if(Ae||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=M.version,c.memory.textures++),Me){j.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(M.mipmaps&&M.mipmaps.length>0){j.__webglFramebuffer[pe]=[];for(let ge=0;ge<M.mipmaps.length;ge++)j.__webglFramebuffer[pe][ge]=s.createFramebuffer()}else j.__webglFramebuffer[pe]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){j.__webglFramebuffer=[];for(let pe=0;pe<M.mipmaps.length;pe++)j.__webglFramebuffer[pe]=s.createFramebuffer()}else j.__webglFramebuffer=s.createFramebuffer();if(Ae)for(let pe=0,ge=fe.length;pe<ge;pe++){const Re=r.get(fe[pe]);Re.__webglTexture===void 0&&(Re.__webglTexture=s.createTexture(),c.memory.textures++)}if(N.samples>0&&Gt(N)===!1){j.__webglMultisampledFramebuffer=s.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let pe=0;pe<fe.length;pe++){const ge=fe[pe];j.__webglColorRenderbuffer[pe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,j.__webglColorRenderbuffer[pe]);const Re=l.convert(ge.format,ge.colorSpace),Ke=l.convert(ge.type),Pe=C(ge.internalFormat,Re,Ke,ge.normalized,ge.colorSpace,N.isXRRenderTarget===!0),Te=Lt(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,Pe,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,j.__webglColorRenderbuffer[pe])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(j.__webglDepthRenderbuffer=s.createRenderbuffer(),dt(j.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Me){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),ze(s.TEXTURE_CUBE_MAP,M);for(let pe=0;pe<6;pe++)if(M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)Fe(j.__webglFramebuffer[pe][ge],N,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ge);else Fe(j.__webglFramebuffer[pe],N,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);x(M)&&I(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let pe=0,ge=fe.length;pe<ge;pe++){const Re=fe[pe],Ke=r.get(Re);let Pe=s.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(Pe=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Pe,Ke.__webglTexture),ze(Pe,Re),Fe(j.__webglFramebuffer,N,Re,s.COLOR_ATTACHMENT0+pe,Pe,0),x(Re)&&I(Pe)}t.unbindTexture()}else{let pe=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(pe=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(pe,oe.__webglTexture),ze(pe,M),M.mipmaps&&M.mipmaps.length>0)for(let ge=0;ge<M.mipmaps.length;ge++)Fe(j.__webglFramebuffer[ge],N,M,s.COLOR_ATTACHMENT0,pe,ge);else Fe(j.__webglFramebuffer,N,M,s.COLOR_ATTACHMENT0,pe,0);x(M)&&I(pe),t.unbindTexture()}N.depthBuffer&&ht(N)}function ft(N){const M=N.textures;for(let j=0,oe=M.length;j<oe;j++){const fe=M[j];if(x(fe)){const Me=O(N),Ae=r.get(fe).__webglTexture;t.bindTexture(Me,Ae),I(Me),t.unbindTexture()}}}const Ft=[],jt=[];function nn(N){if(N.samples>0){if(Gt(N)===!1){const M=N.textures,j=N.width,oe=N.height;let fe=s.COLOR_BUFFER_BIT;const Me=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ae=r.get(N),pe=M.length>1;if(pe)for(let Re=0;Re<M.length;Re++)t.bindFramebuffer(s.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const ge=N.texture.mipmaps;ge&&ge.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Re=0;Re<M.length;Re++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(fe|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(fe|=s.STENCIL_BUFFER_BIT)),pe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ae.__webglColorRenderbuffer[Re]);const Ke=r.get(M[Re]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ke,0)}s.blitFramebuffer(0,0,j,oe,0,0,j,oe,fe,s.NEAREST),f===!0&&(Ft.length=0,jt.length=0,Ft.push(s.COLOR_ATTACHMENT0+Re),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&(Ft.push(Me),jt.push(Me),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,jt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ft))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pe)for(let Re=0;Re<M.length;Re++){t.bindFramebuffer(s.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,Ae.__webglColorRenderbuffer[Re]);const Ke=r.get(M[Re]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ae.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,Ke,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&f){const M=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Lt(N){return Math.min(a.maxSamples,N.samples)}function Gt(N){const M=r.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function W(N){const M=c.render.frame;g.get(N)!==M&&(g.set(N,M),N.update())}function an(N,M){const j=N.colorSpace,oe=N.format,fe=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||j!==ac&&j!==kr&&(St.getTransfer(j)===It?(oe!==bi||fe!==Qn)&&st("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Tt("WebGLTextures: Unsupported texture color space:",j)),M}function At(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(p.width=N.naturalWidth||N.width,p.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(p.width=N.displayWidth,p.height=N.displayHeight):(p.width=N.width,p.height=N.height),p}this.allocateTextureUnit=he,this.resetTextureUnits=ee,this.getTextureUnits=V,this.setTextureUnits=J,this.setTexture2D=Y,this.setTexture2DArray=$,this.setTexture3D=Z,this.setTextureCube=L,this.rebindTextures=_t,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=nn,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=Gt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function dw(s,e){function t(r,a=kr){let l;const c=St.getTransfer(a);if(r===Qn)return s.UNSIGNED_BYTE;if(r===Ch)return s.UNSIGNED_SHORT_4_4_4_4;if(r===bh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Ug)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Fg)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===Ng)return s.BYTE;if(r===Ig)return s.SHORT;if(r===go)return s.UNSIGNED_SHORT;if(r===Ah)return s.INT;if(r===Vi)return s.UNSIGNED_INT;if(r===Ci)return s.FLOAT;if(r===Gi)return s.HALF_FLOAT;if(r===Og)return s.ALPHA;if(r===kg)return s.RGB;if(r===bi)return s.RGBA;if(r===fr)return s.DEPTH_COMPONENT;if(r===ds)return s.DEPTH_STENCIL;if(r===Rh)return s.RED;if(r===Ph)return s.RED_INTEGER;if(r===ms)return s.RG;if(r===Lh)return s.RG_INTEGER;if(r===Dh)return s.RGBA_INTEGER;if(r===Jl||r===Ql||r===ec||r===tc)if(c===It)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===Jl)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ql)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ec)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===tc)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===Jl)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ql)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ec)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===tc)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Vd||r===Gd||r===Wd||r===Xd)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===Vd)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Gd)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Wd)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Xd)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Yd||r===qd||r===Kd||r===$d||r===Zd||r===ic||r===jd)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Yd||r===qd)return c===It?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Kd)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC;if(r===$d)return l.COMPRESSED_R11_EAC;if(r===Zd)return l.COMPRESSED_SIGNED_R11_EAC;if(r===ic)return l.COMPRESSED_RG11_EAC;if(r===jd)return l.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Jd||r===Qd||r===eh||r===th||r===nh||r===ih||r===rh||r===sh||r===ah||r===oh||r===lh||r===ch||r===uh||r===dh)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===Jd)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Qd)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===eh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===th)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===nh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ih)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===rh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===sh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ah)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===oh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===lh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ch)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===uh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===dh)return c===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===hh||r===fh||r===ph)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===hh)return c===It?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===fh)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ph)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===mh||r===gh||r===rc||r===vh)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===mh)return l.COMPRESSED_RED_RGTC1_EXT;if(r===gh)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===rc)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===vh)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===vo?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const hw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const r=new Zg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new Xi({vertexShader:hw,fragmentShader:fw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new lt(new hs(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mw extends gs{constructor(e,t){super();const r=this;let a=null,l=1,c=null,d="local-floor",f=1,p=null,g=null,_=null,v=null,S=null,E=null;const b=typeof XRWebGLBinding<"u",y=new pw,x={},I=t.getContextAttributes();let O=null,C=null;const R=[],P=[],F=new ct;let w=null,D=null;const B=new Jn;B.viewport=new Zt;const G=new Jn;G.viewport=new Zt;const K=[B,G],ee=new Mx;let V=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(le){let de=R[le];return de===void 0&&(de=new cd,R[le]=de),de.getTargetRaySpace()},this.getControllerGrip=function(le){let de=R[le];return de===void 0&&(de=new cd,R[le]=de),de.getGripSpace()},this.getHand=function(le){let de=R[le];return de===void 0&&(de=new cd,R[le]=de),de.getHandSpace()};function he(le){const de=P.indexOf(le.inputSource);if(de===-1)return;const Ee=R[de];Ee!==void 0&&(Ee.update(le.inputSource,le.frame,p||c),Ee.dispatchEvent({type:le.type,data:le.inputSource}))}function te(){a.removeEventListener("select",he),a.removeEventListener("selectstart",he),a.removeEventListener("selectend",he),a.removeEventListener("squeeze",he),a.removeEventListener("squeezestart",he),a.removeEventListener("squeezeend",he),a.removeEventListener("end",te),a.removeEventListener("inputsourceschange",Y);for(let le=0;le<R.length;le++){const de=P[le];de!==null&&(P[le]=null,R[le].disconnect(de))}V=null,J=null,y.reset();for(const le in x)delete x[le];if(e.setRenderTarget(O),S=null,v=null,_=null,a=null,C=null,Ge.stop(),r.isPresenting=!1,e.setPixelRatio(w),e.setSize(F.width,F.height,!1),D!==null){const le=D.camera;le.fov=D.fov,le.zoom=D.zoom,le.updateProjectionMatrix(),D=null}r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(le){l=le,r.isPresenting===!0&&st("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(le){d=le,r.isPresenting===!0&&st("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||c},this.setReferenceSpace=function(le){p=le},this.getBaseLayer=function(){return v!==null?v:S},this.getBinding=function(){return _===null&&b&&(_=new XRWebGLBinding(a,t)),_},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(le){if(a=le,a!==null){if(O=e.getRenderTarget(),a.addEventListener("select",he),a.addEventListener("selectstart",he),a.addEventListener("selectend",he),a.addEventListener("squeeze",he),a.addEventListener("squeezestart",he),a.addEventListener("squeezeend",he),a.addEventListener("end",te),a.addEventListener("inputsourceschange",Y),I.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(F),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ee=null,Qe=null,Fe=null;I.depth&&(Fe=I.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ee=I.stencil?ds:fr,Qe=I.stencil?vo:Vi);const dt={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:l};_=this.getBinding(),v=_.createProjectionLayer(dt),a.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),C=new Ri(v.textureWidth,v.textureHeight,{format:bi,type:Qn,depthTexture:new xo(v.textureWidth,v.textureHeight,Qe,void 0,void 0,void 0,void 0,void 0,void 0,Ee),stencilBuffer:I.stencil,colorSpace:e.outputColorSpace,samples:I.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const Ee={antialias:I.antialias,alpha:!0,depth:I.depth,stencil:I.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,t,Ee),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),C=new Ri(S.framebufferWidth,S.framebufferHeight,{format:bi,type:Qn,colorSpace:e.outputColorSpace,stencilBuffer:I.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1,storeMultisampledDepthBuffer:S.ignoreDepthValues===!1,storeMultisampledStencilBuffer:S.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(f),p=null,c=await a.requestReferenceSpace(d),Ge.setContext(a),Ge.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Y(le){for(let de=0;de<le.removed.length;de++){const Ee=le.removed[de],Qe=P.indexOf(Ee);Qe>=0&&(P[Qe]=null,R[Qe].disconnect(Ee))}for(let de=0;de<le.added.length;de++){const Ee=le.added[de];let Qe=P.indexOf(Ee);if(Qe===-1){for(let dt=0;dt<R.length;dt++)if(dt>=P.length){P.push(Ee),Qe=dt;break}else if(P[dt]===null){P[dt]=Ee,Qe=dt;break}if(Qe===-1)break}const Fe=R[Qe];Fe&&Fe.connect(Ee)}}const $=new q,Z=new q;function L(le,de,Ee){$.setFromMatrixPosition(de.matrixWorld),Z.setFromMatrixPosition(Ee.matrixWorld);const Qe=$.distanceTo(Z),Fe=de.projectionMatrix.elements,dt=Ee.projectionMatrix.elements,Vt=Fe[14]/(Fe[10]-1),ht=Fe[14]/(Fe[10]+1),_t=(Fe[9]+1)/Fe[5],Dt=(Fe[9]-1)/Fe[5],ft=(Fe[8]-1)/Fe[0],Ft=(dt[8]+1)/dt[0],jt=Vt*ft,nn=Vt*Ft,Lt=Qe/(-ft+Ft),Gt=Lt*-ft;if(de.matrixWorld.decompose(le.position,le.quaternion,le.scale),le.translateX(Gt),le.translateZ(Lt),le.matrixWorld.compose(le.position,le.quaternion,le.scale),le.matrixWorldInverse.copy(le.matrixWorld).invert(),Fe[10]===-1)le.projectionMatrix.copy(de.projectionMatrix),le.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const W=Vt+Lt,an=ht+Lt,At=jt-Gt,N=nn+(Qe-Gt),M=_t*ht/an*W,j=Dt*ht/an*W;le.projectionMatrix.makePerspective(At,N,M,j,W,an),le.projectionMatrixInverse.copy(le.projectionMatrix).invert()}}function ae(le,de){de===null?le.matrixWorld.copy(le.matrix):le.matrixWorld.multiplyMatrices(de.matrixWorld,le.matrix),le.matrixWorldInverse.copy(le.matrixWorld).invert()}this.updateCamera=function(le){if(a===null)return;let de=le.near,Ee=le.far;y.texture!==null&&(y.depthNear>0&&(de=y.depthNear),y.depthFar>0&&(Ee=y.depthFar)),ee.near=G.near=B.near=de,ee.far=G.far=B.far=Ee,(V!==ee.near||J!==ee.far)&&(a.updateRenderState({depthNear:ee.near,depthFar:ee.far}),V=ee.near,J=ee.far),ee.layers.mask=le.layers.mask|6,B.layers.mask=ee.layers.mask&-5,G.layers.mask=ee.layers.mask&-3;const Qe=le.parent,Fe=ee.cameras;ae(ee,Qe);for(let dt=0;dt<Fe.length;dt++)ae(Fe[dt],Qe);Fe.length===2?L(ee,B,G):ee.projectionMatrix.copy(B.projectionMatrix),D===null&&le.isPerspectiveCamera&&(D={camera:le,fov:le.fov,zoom:le.zoom}),ye(le,ee,Qe)};function ye(le,de,Ee){Ee===null?le.matrix.copy(de.matrixWorld):(le.matrix.copy(Ee.matrixWorld),le.matrix.invert(),le.matrix.multiply(de.matrixWorld)),le.matrix.decompose(le.position,le.quaternion,le.scale),le.updateMatrixWorld(!0),le.projectionMatrix.copy(de.projectionMatrix),le.projectionMatrixInverse.copy(de.projectionMatrixInverse),le.isPerspectiveCamera&&(le.fov=_h*2*Math.atan(1/le.projectionMatrix.elements[5]),le.zoom=1)}this.getCamera=function(){return ee},this.getFoveation=function(){if(!(v===null&&S===null))return f},this.setFoveation=function(le){f=le,v!==null&&(v.fixedFoveation=le),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=le)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(ee)},this.getCameraTexture=function(le){return x[le]};let Ve=null;function ze(le,de){if(g=de.getViewerPose(p||c),E=de,g!==null){const Ee=g.views;S!==null&&(e.setRenderTargetFramebuffer(C,S.framebuffer),e.setRenderTarget(C));let Qe=!1;Ee.length!==ee.cameras.length&&(ee.cameras.length=0,Qe=!0);for(let ht=0;ht<Ee.length;ht++){const _t=Ee[ht];let Dt=null;if(S!==null)Dt=S.getViewport(_t);else{const Ft=_.getViewSubImage(v,_t);Dt=Ft.viewport,ht===0&&(e.setRenderTargetTextures(C,Ft.colorTexture,Ft.depthStencilTexture),e.setRenderTarget(C))}let ft=K[ht];ft===void 0&&(ft=new Jn,ft.layers.enable(ht),ft.viewport=new Zt,K[ht]=ft),ft.matrix.fromArray(_t.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(_t.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),ht===0&&(ee.matrix.copy(ft.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale)),Qe===!0&&ee.cameras.push(ft)}const Fe=a.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){_=r.getBinding();const ht=_.getDepthInformation(Ee[0]);ht&&ht.isValid&&ht.texture&&y.init(ht,a.renderState)}if(Fe&&Fe.includes("camera-access")&&b){e.state.unbindTexture(),_=r.getBinding();for(let ht=0;ht<Ee.length;ht++){const _t=Ee[ht].camera;if(_t){let Dt=x[_t];Dt||(Dt=new Zg,x[_t]=Dt);const ft=_.getCameraImage(_t);Dt.sourceTexture=ft}}}}for(let Ee=0;Ee<R.length;Ee++){const Qe=P[Ee],Fe=R[Ee];Qe!==null&&Fe!==void 0&&Fe.update(Qe,de,p||c)}Ve&&Ve(le,de),de.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:de}),E=null}const Ge=new e0;Ge.setAnimationLoop(ze),this.setAnimationLoop=function(le){Ve=le},this.dispose=function(){}}}const gw=new kt,o0=new ot;o0.set(-1,0,0,0,1,0,0,0,1);function vw(s,e){function t(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function r(y,x){x.color.getRGB(y.fogColor.value,jg(s)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function a(y,x,I,O,C){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?l(y,x):x.isMeshLambertMaterial?(l(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(l(y,x),_(y,x)):x.isMeshPhongMaterial?(l(y,x),g(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(l(y,x),v(y,x),x.isMeshPhysicalMaterial&&S(y,x,C)):x.isMeshMatcapMaterial?(l(y,x),E(y,x)):x.isMeshDepthMaterial?l(y,x):x.isMeshDistanceMaterial?(l(y,x),b(y,x)):x.isMeshNormalMaterial?l(y,x):x.isLineBasicMaterial?(c(y,x),x.isLineDashedMaterial&&d(y,x)):x.isPointsMaterial?f(y,x,I,O):x.isSpriteMaterial?p(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function l(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,t(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===Wn&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,t(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===Wn&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,t(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,t(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const I=e.get(x),O=I.envMap,C=I.envMapRotation;O&&(y.envMap.value=O,y.envMapRotation.value.setFromMatrix4(gw.makeRotationFromEuler(C)).transpose(),O.isCubeTexture&&O.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(o0),y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap&&(y.lightMap.value=x.lightMap,y.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,y.lightMapTransform)),x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,y.aoMapTransform))}function c(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform))}function d(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function f(y,x,I,O){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*I,y.scale.value=O*.5,x.map&&(y.map.value=x.map,t(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function p(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function g(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function _(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function v(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,y.roughnessMapTransform)),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function S(y,x,I){y.ior.value=x.ior,x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Wn&&y.clearcoatNormalScale.value.negate())),x.dispersion>0&&(y.dispersion.value=x.dispersion),x.retroreflectivity>0&&(y.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,x){x.matcap&&(y.matcap.value=x.matcap)}function b(y,x){const I=e.get(x).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function _w(s,e,t,r){let a={},l={},c=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function f(C,R){const P=R.program;r.uniformBlockBinding(C,P)}function p(C,R){let P=a[C.id];P===void 0&&(y(C),P=g(C),a[C.id]=P,C.addEventListener("dispose",I));const F=R.program;r.updateUBOMapping(C,F);const w=e.render.frame;l[C.id]!==w&&(v(C),l[C.id]=w)}function g(C){const R=_();C.__bindingPointIndex=R;const P=s.createBuffer(),F=C.__size,w=C.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,F,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,R,P),P}function _(){for(let C=0;C<d;C++)if(c.indexOf(C)===-1)return c.push(C),C;return Tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(C){const R=a[C.id],P=C.uniforms,F=C.__cache;s.bindBuffer(s.UNIFORM_BUFFER,R);for(let w=0,D=P.length;w<D;w++){const B=P[w];if(Array.isArray(B))for(let G=0,K=B.length;G<K;G++)S(B[G],w,G,F);else S(B,w,0,F)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(C,R,P,F){if(b(C,R,P,F)===!0){const w=C.__offset,D=C.value;if(Array.isArray(D)){let B=0;for(let G=0;G<D.length;G++){const K=D[G],ee=x(K);E(K,C.__data,B),typeof K!="number"&&typeof K!="boolean"&&!K.isMatrix3&&!ArrayBuffer.isView(K)&&(B+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(D,C.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,w,C.__data)}}function E(C,R,P){typeof C=="number"||typeof C=="boolean"?R[0]=C:C.isMatrix3?(R[0]=C.elements[0],R[1]=C.elements[1],R[2]=C.elements[2],R[3]=0,R[4]=C.elements[3],R[5]=C.elements[4],R[6]=C.elements[5],R[7]=0,R[8]=C.elements[6],R[9]=C.elements[7],R[10]=C.elements[8],R[11]=0):ArrayBuffer.isView(C)?R.set(new C.constructor(C.buffer,C.byteOffset,R.length)):C.toArray(R,P)}function b(C,R,P,F){const w=C.value,D=R+"_"+P;if(F[D]===void 0)return typeof w=="number"||typeof w=="boolean"?F[D]=w:ArrayBuffer.isView(w)?F[D]=w.slice():F[D]=w.clone(),!0;{const B=F[D];if(typeof w=="number"||typeof w=="boolean"){if(B!==w)return F[D]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(B.equals(w)===!1)return B.copy(w),!0}}return!1}function y(C){const R=C.uniforms;let P=0;const F=16;for(let D=0,B=R.length;D<B;D++){const G=Array.isArray(R[D])?R[D]:[R[D]];for(let K=0,ee=G.length;K<ee;K++){const V=G[K],J=Array.isArray(V.value)?V.value:[V.value];for(let he=0,te=J.length;he<te;he++){const Y=J[he],$=x(Y),Z=P%F,L=Z%$.boundary,ae=Z+L;P+=L,ae!==0&&F-ae<$.storage&&(P+=F-ae),V.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=P,P+=$.storage}}}const w=P%F;return w>0&&(P+=F-w),C.__size=P,C.__cache={},this}function x(C){const R={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(R.boundary=4,R.storage=4):C.isVector2?(R.boundary=8,R.storage=8):C.isVector3||C.isColor?(R.boundary=16,R.storage=12):C.isVector4?(R.boundary=16,R.storage=16):C.isMatrix3?(R.boundary=48,R.storage=48):C.isMatrix4?(R.boundary=64,R.storage=64):C.isTexture?st("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(C)?(R.boundary=16,R.storage=C.byteLength):st("WebGLRenderer: Unsupported uniform value type.",C),R}function I(C){const R=C.target;R.removeEventListener("dispose",I);const P=c.indexOf(R.__bindingPointIndex);c.splice(P,1),s.deleteBuffer(a[R.id]),delete a[R.id],delete l[R.id]}function O(){for(const C in a)s.deleteBuffer(a[C]);c=[],a={},l={}}return{bind:f,update:p,dispose:O}}const xw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fi=null;function yw(){return Fi===null&&(Fi=new Kg(xw,16,16,ms,Gi),Fi.name="DFG_LUT",Fi.minFilter=Pn,Fi.magFilter=Pn,Fi.wrapS=ur,Fi.wrapT=ur,Fi.generateMipmaps=!1,Fi.needsUpdate=!0),Fi}class Sw{constructor(e={}){const{canvas:t=L_(),context:r=null,depth:a=!0,stencil:l=!1,alpha:c=!1,antialias:d=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:v=!1,outputBufferType:S=Qn}=e;this.isWebGLRenderer=!0;let E;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=r.getContextAttributes().alpha}else E=c;const b=S,y=new Set([Dh,Lh,Ph]),x=new Set([Qn,Vi,go,vo,Ch,bh]),I=new Uint32Array(4),O=new Int32Array(4),C=new q;let R=null,P=null;const F=[],w=[];let D=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const B=this;let G=!1,K=null,ee=null,V=null,J=null;this._outputColorSpace=ci;let he=0,te=0,Y=null,$=-1,Z=null;const L=new Zt,ae=new Zt;let ye=null;const Ve=new gt(0);let ze=0,Ge=t.width,le=t.height,de=1,Ee=null,Qe=null;const Fe=new Zt(0,0,Ge,le),dt=new Zt(0,0,Ge,le);let Vt=!1;const ht=new Oh;let _t=!1,Dt=!1;const ft=new kt,Ft=new q,jt=new Zt,nn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Lt=!1;function Gt(){return Y===null?de:1}let W=r;function an(A,H){return t.getContext(A,H)}let At,N,M,j,oe,fe,Me,Ae,pe,ge,Re,Ke,Pe,Te,$e,et,it,z,Ce,me,be,Ue,ve;try{const A={alpha:!0,depth:a,stencil:l,antialias:d,premultipliedAlpha:f,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wh}`),t.addEventListener("webglcontextlost",Ct,!1),t.addEventListener("webglcontextrestored",Et,!1),t.addEventListener("webglcontextcreationerror",vn,!1),W===null){const H="webgl2";if(W=an(H,A),W===null)throw an(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}je()}catch(A){throw t.removeEventListener("webglcontextlost",Ct,!1),t.removeEventListener("webglcontextrestored",Et,!1),t.removeEventListener("webglcontextcreationerror",vn,!1),Tt("WebGLRenderer: "+A.message),A}function je(){At=new yM(W),At.init(),be=new dw(W,At),N=new uM(W,At,e,be),M=new cw(W,At),N.reversedDepthBuffer&&v&&M.buffers.depth.setReversed(!0),ee=W.createFramebuffer(),V=W.createFramebuffer(),J=W.createFramebuffer(),j=new EM(W),oe=new $E,fe=new uw(W,At,M,oe,N,be,j),Me=new xM(B),Ae=new Tx(W),Ue=new lM(W,Ae),pe=new SM(W,Ae,j,Ue),ge=new TM(W,pe,Ae,Ue,j),z=new wM(W,N,fe),$e=new dM(oe),Re=new KE(B,Me,At,N,Ue,$e),Ke=new vw(B,oe),Pe=new jE,Te=new iw(At),it=new oM(B,Me,M,ge,E,f),et=new lw(B,ge,N),ve=new _w(W,j,N,M),Ce=new cM(W,At,j),me=new MM(W,At,j),j.programs=Re.programs,B.capabilities=N,B.extensions=At,B.properties=oe,B.renderLists=Pe,B.shadowMap=et,B.state=M,B.info=j}b!==Qn&&(D=new CM(b,t.width,t.height,d,a,l));const Ye=new mw(B,W);this.xr=Ye,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const A=At.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=At.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(A){A!==void 0&&(de=A,this.setSize(Ge,le,!1))},this.getSize=function(A){return A.set(Ge,le)},this.setSize=function(A,H,ce=!0){if(Ye.isPresenting){st("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=A,le=H,t.width=Math.floor(A*de),t.height=Math.floor(H*de),ce===!0&&(t.style.width=A+"px",t.style.height=H+"px"),D!==null&&D.setSize(t.width,t.height),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(Ge*de,le*de).floor()},this.setDrawingBufferSize=function(A,H,ce){Ge=A,le=H,de=ce,t.width=Math.floor(A*ce),t.height=Math.floor(H*ce),this.setViewport(0,0,A,H)},this.setEffects=function(A){if(b===Qn){Tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let H=0;H<A.length;H++)if(A[H].isOutputPass===!0){st("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(Fe)},this.setViewport=function(A,H,ce,ne){A.isVector4?Fe.set(A.x,A.y,A.z,A.w):Fe.set(A,H,ce,ne),M.viewport(L.copy(Fe).multiplyScalar(de).round())},this.getScissor=function(A){return A.copy(dt)},this.setScissor=function(A,H,ce,ne){A.isVector4?dt.set(A.x,A.y,A.z,A.w):dt.set(A,H,ce,ne),M.scissor(ae.copy(dt).multiplyScalar(de).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(A){M.setScissorTest(Vt=A)},this.setOpaqueSort=function(A){Ee=A},this.setTransparentSort=function(A){Qe=A},this.getClearColor=function(A){return A.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,ce=!0){let ne=0;if(A){let Q=!1;if(Y!==null){const Ne=Y.texture.format;Q=y.has(Ne)}if(Q){const Ne=Y.texture.type,Le=x.has(Ne),De=it.getClearColor(),We=it.getClearAlpha(),Ze=De.r,at=De.g,ut=De.b;Le?(I[0]=Ze,I[1]=at,I[2]=ut,I[3]=We,W.clearBufferuiv(W.COLOR,0,I)):(O[0]=Ze,O[1]=at,O[2]=ut,O[3]=We,W.clearBufferiv(W.COLOR,0,O))}else ne|=W.COLOR_BUFFER_BIT}H&&(ne|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ce&&(ne|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&W.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),K=A},this.dispose=function(){t.removeEventListener("webglcontextlost",Ct,!1),t.removeEventListener("webglcontextrestored",Et,!1),t.removeEventListener("webglcontextcreationerror",vn,!1),it.dispose(),Pe.dispose(),Te.dispose(),oe.dispose(),Me.dispose(),ge.dispose(),Ue.dispose(),ve.dispose(),Re.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",So),Ye.removeEventListener("sessionend",Mo),Dn.stop()};function Ct(A){A.preventDefault(),cc("WebGLRenderer: Context Lost."),G=!0}function Et(){cc("WebGLRenderer: Context Restored."),G=!1;const A=j.autoReset,H=et.enabled,ce=et.autoUpdate,ne=et.needsUpdate,Q=et.type;je(),j.autoReset=A,et.enabled=H,et.autoUpdate=ce,et.needsUpdate=ne,et.type=Q}function vn(A){Tt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ei(A){const H=A.target;H.removeEventListener("dispose",ei),zr(H)}function zr(A){xs(A),oe.remove(A)}function xs(A){const H=oe.get(A).programs;H!==void 0&&(H.forEach(function(ce){Re.releaseProgram(ce)}),A.isShaderMaterial&&Re.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,ce,ne,Q,Ne){H===null&&(H=nn);const Le=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,De=qt(A,H,ce,ne,Q);M.setMaterial(ne,Le);let We=ce.index,Ze=1;if(ne.wireframe===!0){if(We=pe.getWireframeAttribute(ce),We===void 0)return;Ze=2}const at=ce.drawRange,ut=ce.attributes.position;let Be=at.start*Ze,xt=(at.start+at.count)*Ze;Ne!==null&&(Be=Math.max(Be,Ne.start*Ze),xt=Math.min(xt,(Ne.start+Ne.count)*Ze)),We!==null?(Be=Math.max(Be,0),xt=Math.min(xt,We.count)):ut!=null&&(Be=Math.max(Be,0),xt=Math.min(xt,ut.count));const Jt=xt-Be;if(Jt<0||Jt===1/0)return;Ue.setup(Q,ne,De,ce,We);let Ot,Pt=Ce;if(We!==null&&(Ot=Ae.get(We),Pt=me,Pt.setIndex(Ot)),Q.isMesh)ne.wireframe===!0?(M.setLineWidth(ne.wireframeLinewidth*Gt()),Pt.setMode(W.LINES)):Pt.setMode(W.TRIANGLES);else if(Q.isLine){let on=ne.linewidth;on===void 0&&(on=1),M.setLineWidth(on*Gt()),Q.isLineSegments?Pt.setMode(W.LINES):Q.isLineLoop?Pt.setMode(W.LINE_LOOP):Pt.setMode(W.LINE_STRIP)}else Q.isPoints?Pt.setMode(W.POINTS):Q.isSprite&&Pt.setMode(W.TRIANGLES);if(Q.isBatchedMesh)if(At.get("WEBGL_multi_draw"))Pt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const on=Q._multiDrawStarts,Oe=Q._multiDrawCounts,en=Q._multiDrawCount,yt=We?Ae.get(We).bytesPerElement:1,En=oe.get(ne).currentProgram.getUniforms();for(let pt=0;pt<en;pt++)En.setValue(W,"_gl_DrawID",pt),Pt.render(on[pt]/yt,Oe[pt])}else if(Q.isInstancedMesh)Pt.renderInstances(Be,Jt,Q.count);else if(ce.isInstancedBufferGeometry){const on=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,Oe=Math.min(ce.instanceCount,on);Pt.renderInstances(Be,Jt,Oe)}else Pt.render(Be,Jt)};function Hr(A,H,ce,ne){K!==null&&A.isNodeMaterial&&K.setObject(ne,A),_t===!0&&$e.setState(A,ce,!1),A.transparent===!0&&A.side===ui&&A.forceSinglePass===!1?(A.side=Wn,A.needsUpdate=!0,Wr(A,H,ne),A.side=fs,A.needsUpdate=!0,Wr(A,H,ne),A.side=ui):Wr(A,H,ne)}this.compile=function(A,H,ce=null){ce===null&&(ce=A),K!==null&&K.renderStart(A,H,ce),P=Te.get(ce),P.init(H),w.push(P),ce.traverseVisible(function(Q){Q.isLight&&Q.layers.test(H.layers)&&(P.pushLight(Q),Q.castShadow&&P.pushShadow(Q))}),A!==ce&&A.traverseVisible(function(Q){Q.isLight&&Q.layers.test(H.layers)&&(P.pushLight(Q),Q.castShadow&&P.pushShadow(Q))}),P.setupLights(),K!==null&&K.updateLights(P.state.lightsArray),Dt=this.localClippingEnabled,_t=$e.init(this.clippingPlanes,Dt),_t===!0&&$e.setGlobalState(this.clippingPlanes,H),K!==null&&et.render(P.state.shadowsArray,ce,H);const ne=new Set;return A.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const Ne=Q.material;if(Ne)if(Array.isArray(Ne))for(let Le=0;Le<Ne.length;Le++){const De=Ne[Le];Hr(De,ce,H,Q),ne.add(De)}else Hr(Ne,ce,H,Q),ne.add(Ne)}),P=w.pop(),K!==null&&K.renderEnd(),ne},this.compileAsync=function(A,H,ce=null){const ne=this.compile(A,H,ce);return new Promise(Q=>{function Ne(){if(ne.forEach(function(Le){const We=oe.get(Le).currentProgram;(We===void 0||We.isReady())&&ne.delete(Le)}),ne.size===0){Q(A);return}setTimeout(Ne,10)}At.get("KHR_parallel_shader_compile")!==null?Ne():setTimeout(Ne,10)})};let Vr=null;function gc(A){Vr&&Vr(A)}function So(){Dn.stop()}function Mo(){Dn.start()}const Dn=new e0;Dn.setAnimationLoop(gc),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(A){Vr=A,Ye.setAnimationLoop(A),A===null?Dn.stop():Dn.start()},Ye.addEventListener("sessionstart",So),Ye.addEventListener("sessionend",Mo),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){Tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;K!==null&&K.renderStart(A,H);const ce=Ye.enabled===!0&&Ye.isPresenting===!0,ne=D!==null&&(Y===null||ce)&&D.begin(B,Y);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(H),H=Ye.getCamera()),A.isScene===!0&&A.onBeforeRender(B,A,H,Y),P=Te.get(A,w.length),P.init(H),P.state.textureUnits=fe.getTextureUnits(),w.push(P),ft.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ht.setFromProjectionMatrix(ft,zi,H.reversedDepth),Dt=this.localClippingEnabled,_t=$e.init(this.clippingPlanes,Dt),R=Pe.get(A,F.length),R.init(),F.push(R),Ye.enabled===!0&&Ye.isPresenting===!0){const Le=B.xr.getDepthSensingMesh();Le!==null&&ys(Le,H,-1/0,B.sortObjects)}ys(A,H,0,B.sortObjects),R.finish(),K!==null&&K.updateLights(P.state.lightsArray),B.sortObjects===!0&&R.sort(Ee,Qe),Lt=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,Lt&&it.addToRenderList(R,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),_t===!0&&$e.beginShadows();const Q=P.state.shadowsArray;if(et.render(Q,A,H),_t===!0&&$e.endShadows(),(ne&&D.hasRenderPass())===!1){const Le=R.opaque,De=R.transmissive;if(P.setupLights(),H.isArrayCamera){const We=H.cameras;if(De.length>0)for(let Ze=0,at=We.length;Ze<at;Ze++){const ut=We[Ze];Eo(Le,De,A,ut)}Lt&&it.render(A);for(let Ze=0,at=We.length;Ze<at;Ze++){const ut=We[Ze];ma(R,A,ut,ut.viewport)}}else De.length>0&&Eo(Le,De,A,H),Lt&&it.render(A),ma(R,A,H)}Y!==null&&te===0&&(fe.updateMultisampleRenderTarget(Y),fe.updateRenderTargetMipmap(Y)),ne&&D.end(B),A.isScene===!0&&A.onAfterRender(B,A,H),Ue.resetDefaultState(),$=-1,Z=null,w.pop(),w.length>0?(P=w[w.length-1],fe.setTextureUnits(P.state.textureUnits),_t===!0&&$e.setGlobalState(B.clippingPlanes,P.state.camera)):P=null,F.pop(),F.length>0?R=F[F.length-1]:R=null,K!==null&&K.renderEnd()};function ys(A,H,ce,ne){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)ce=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLightProbeGrid)P.pushLightProbeGrid(A);else if(A.isLight)P.pushLight(A),A.castShadow&&P.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(ht)){ne&&jt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ft);const Le=ge.update(A),De=A.material;De.visible&&R.push(A,Le,De,ce,jt.z,null,H)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(ht))){const Le=ge.update(A),De=A.material;if(ne&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),jt.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),jt.copy(Le.boundingSphere.center)),jt.applyMatrix4(A.matrixWorld).applyMatrix4(ft)),Array.isArray(De)){const We=Le.groups;for(let Ze=0,at=We.length;Ze<at;Ze++){const ut=We[Ze],Be=De[ut.materialIndex];Be&&Be.visible&&R.push(A,Le,Be,ce,jt.z,ut,H)}}else De.visible&&R.push(A,Le,De,ce,jt.z,null,H)}}const Ne=A.children;for(let Le=0,De=Ne.length;Le<De;Le++)ys(Ne[Le],H,ce,ne)}function ma(A,H,ce,ne){const{opaque:Q,transmissive:Ne,transparent:Le}=A;P.setupLightsView(ce),_t===!0&&$e.setGlobalState(B.clippingPlanes,ce),ne&&M.viewport(L.copy(ne)),Q.length>0&&Gr(Q,H,ce),Ne.length>0&&Gr(Ne,H,ce),Le.length>0&&Gr(Le,H,ce),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Eo(A,H,ce,ne){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[ne.id]===void 0){const Be=At.has("EXT_color_buffer_half_float")||At.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[ne.id]=new Ri(1,1,{generateMipmaps:!0,type:Be?Gi:Qn,minFilter:us,samples:Math.max(4,N.samples),stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:St.workingColorSpace})}const Ne=P.state.transmissionRenderTarget[ne.id],Le=ne.viewport||L;Ne.setSize(Le.z*B.transmissionResolutionScale,Le.w*B.transmissionResolutionScale);const De=B.getRenderTarget(),We=B.getActiveCubeFace(),Ze=B.getActiveMipmapLevel();B.setRenderTarget(Ne),B.getClearColor(Ve),ze=B.getClearAlpha(),ze<1&&B.setClearColor(16777215,.5),B.clear(),Lt&&it.render(ce);const at=B.toneMapping;B.toneMapping=Hi;const ut=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),P.setupLightsView(ne),_t===!0&&$e.setGlobalState(B.clippingPlanes,ne),Gr(A,ce,ne),fe.updateMultisampleRenderTarget(Ne),fe.updateRenderTargetMipmap(Ne),At.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let xt=0,Jt=H.length;xt<Jt;xt++){const Ot=H[xt],{object:Pt,geometry:on,material:Oe,group:en}=Ot;if(Oe.side===ui&&Pt.layers.test(ne.layers)){const yt=Oe.side;Oe.side=Wn,Oe.needsUpdate=!0,ga(Pt,ce,ne,on,Oe,en),Oe.side=yt,Oe.needsUpdate=!0,Be=!0}}Be===!0&&(fe.updateMultisampleRenderTarget(Ne),fe.updateRenderTargetMipmap(Ne))}B.setRenderTarget(De,We,Ze),B.setClearColor(Ve,ze),ut!==void 0&&(ne.viewport=ut),B.toneMapping=at}function Gr(A,H,ce){const ne=H.isScene===!0?H.overrideMaterial:null;for(let Q=0,Ne=A.length;Q<Ne;Q++){const Le=A[Q],{object:De,geometry:We,group:Ze}=Le;let at=Le.material;at.allowOverride===!0&&ne!==null&&(at=ne),De.layers.test(ce.layers)&&ga(De,H,ce,We,at,Ze)}}function ga(A,H,ce,ne,Q,Ne){K!==null&&Q.isNodeMaterial&&K.setObject(A,Q),A.onBeforeRender(B,H,ce,ne,Q,Ne),A.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Q.onBeforeRender(B,H,ce,ne,A,Ne),Q.transparent===!0&&Q.side===ui&&Q.forceSinglePass===!1?(Q.side=Wn,Q.needsUpdate=!0,B.renderBufferDirect(ce,H,ne,Q,A,Ne),Q.side=fs,Q.needsUpdate=!0,B.renderBufferDirect(ce,H,ne,Q,A,Ne),Q.side=ui):B.renderBufferDirect(ce,H,ne,Q,A,Ne),A.onAfterRender(B,H,ce,ne,Q,Ne)}function Wr(A,H,ce){H.isScene!==!0&&(H=nn);const ne=oe.get(A),Q=P.state.lights,Ne=P.state.shadowsArray,Le=Q.state.version,De=Re.getParameters(A,Q.state,Ne,H,ce,P.state.lightProbeGridArray),We=Re.getProgramCacheKey(De);let Ze=ne.programs;ne.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,ne.fog=H.fog;const at=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;ne.envMap=Me.get(A.envMap||ne.environment,at),ne.envMapRotation=ne.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Ze===void 0&&(A.addEventListener("dispose",ei),Ze=new Map,ne.programs=Ze);let ut=Ze.get(We);if(ut!==void 0){if(ne.currentProgram===ut&&ne.lightsStateVersion===Le)return wo(A,De),ut}else De.uniforms=Re.getUniforms(A),K!==null&&A.isNodeMaterial&&K.build(A,ce,De),A.onBeforeCompile(De,B),ut=Re.acquireProgram(De,We),Ze.set(We,ut),ne.uniforms=De.uniforms;const Be=ne.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Be.clippingPlanes=$e.uniform),wo(A,De),ne.needsLights=_a(A),ne.lightsStateVersion=Le,ne.needsLights&&(Be.ambientLightColor.value=Q.state.ambient,Be.lightProbe.value=Q.state.probe,Be.sunLights.value=Q.state.sun,Be.sunLightShadows.value=Q.state.sunShadow,Be.directionalLights.value=Q.state.directional,Be.directionalLightShadows.value=Q.state.directionalShadow,Be.spotLights.value=Q.state.spot,Be.spotLightShadows.value=Q.state.spotShadow,Be.rectAreaLights.value=Q.state.rectArea,Be.ltc_1.value=Q.state.rectAreaLTC1,Be.ltc_2.value=Q.state.rectAreaLTC2,Be.pointLights.value=Q.state.point,Be.pointLightShadows.value=Q.state.pointShadow,Be.hemisphereLights.value=Q.state.hemi,Be.sunShadowMatrix.value=Q.state.sunShadowMatrix,Be.sunShadowCascade.value=Q.state.sunShadowCascade,Be.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Be.spotLightMatrix.value=Q.state.spotLightMatrix,Be.spotLightMap.value=Q.state.spotLightMap,Be.pointShadowMatrix.value=Q.state.pointShadowMatrix),ne.lightProbeGrid=P.state.lightProbeGridArray.length>0,ne.currentProgram=ut,ne.uniformsList=null,ut}function va(A){if(A.uniformsList===null){const H=A.currentProgram.getUniforms();A.uniformsList=nc.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function wo(A,H){const ce=oe.get(A);ce.outputColorSpace=H.outputColorSpace,ce.batching=H.batching,ce.batchingColor=H.batchingColor,ce.instancing=H.instancing,ce.instancingColor=H.instancingColor,ce.instancingMorph=H.instancingMorph,ce.skinning=H.skinning,ce.morphTargets=H.morphTargets,ce.morphNormals=H.morphNormals,ce.morphColors=H.morphColors,ce.morphTargetsCount=H.morphTargetsCount,ce.numClippingPlanes=H.numClippingPlanes,ce.numIntersection=H.numClipIntersection,ce.vertexAlphas=H.vertexAlphas,ce.vertexTangents=H.vertexTangents,ce.toneMapping=H.toneMapping}function vc(A,H){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;C.setFromMatrixPosition(H.matrixWorld);for(let ce=0,ne=A.length;ce<ne;ce++){const Q=A[ce];if(Q.texture!==null&&Q.boundingBox.containsPoint(C))return Q}return null}function qt(A,H,ce,ne,Q){H.isScene!==!0&&(H=nn),fe.resetTextureUnits();const Ne=H.fog,Le=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?H.environment:null,De=Y===null?B.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:St.workingColorSpace,We=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Ze=Me.get(ne.envMap||Le,We),at=ne.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,ut=!!ce.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Be=!!ce.morphAttributes.position,xt=!!ce.morphAttributes.normal,Jt=!!ce.morphAttributes.color;let Ot=Hi;ne.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ot=B.toneMapping);const Pt=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,on=Pt!==void 0?Pt.length:0,Oe=oe.get(ne),en=P.state.lights;if(_t===!0&&(Dt===!0||A!==Z)){const Nt=A===Z&&ne.id===$;$e.setState(ne,A,Nt)}let yt=!1;ne.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==en.state.version||Oe.outputColorSpace!==De||Q.isBatchedMesh&&Oe.batching===!1||!Q.isBatchedMesh&&Oe.batching===!0||Q.isBatchedMesh&&Oe.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Oe.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Oe.instancing===!1||!Q.isInstancedMesh&&Oe.instancing===!0||Q.isSkinnedMesh&&Oe.skinning===!1||!Q.isSkinnedMesh&&Oe.skinning===!0||Q.isInstancedMesh&&Oe.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Oe.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Oe.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Oe.instancingMorph===!1&&Q.morphTexture!==null||Oe.envMap!==Ze||ne.fog===!0&&Oe.fog!==Ne||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==$e.numPlanes||Oe.numIntersection!==$e.numIntersection)||Oe.vertexAlphas!==at||Oe.vertexTangents!==ut||Oe.morphTargets!==Be||Oe.morphNormals!==xt||Oe.morphColors!==Jt||Oe.toneMapping!==Ot||Oe.morphTargetsCount!==on||!!Oe.lightProbeGrid!=P.state.lightProbeGridArray.length>0)&&(yt=!0):(yt=!0,Oe.__version=ne.version);let En=Oe.currentProgram;yt===!0&&(En=Wr(ne,H,Q),K&&ne.isNodeMaterial&&K.onUpdateProgram(ne,En,Oe));let pt=!1,fi=!1,Yi=!1;const bt=En.getUniforms(),Wt=Oe.uniforms;if(M.useProgram(En.program)&&(pt=!0,fi=!0,Yi=!0),ne.id!==$&&($=ne.id,fi=!0),Oe.needsLights){const Nt=vc(P.state.lightProbeGridArray,Q);Oe.lightProbeGrid!==Nt&&(Oe.lightProbeGrid=Nt,fi=!0)}if(pt||Z!==A){M.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),bt.setValue(W,"projectionMatrix",A.projectionMatrix),bt.setValue(W,"viewMatrix",A.matrixWorldInverse);const ti=bt.map.cameraPosition;ti!==void 0&&ti.setValue(W,Ft.setFromMatrixPosition(A.matrixWorld)),N.logarithmicDepthBuffer&&bt.setValue(W,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&bt.setValue(W,"isOrthographic",A.isOrthographicCamera===!0),Z!==A&&(Z=A,fi=!0,Yi=!0)}if(Oe.needsLights&&(en.state.sunShadowMap.length>0&&bt.setValue(W,"sunShadowMap",en.state.sunShadowMap,fe),en.state.directionalShadowMap.length>0&&bt.setValue(W,"directionalShadowMap",en.state.directionalShadowMap,fe),en.state.spotShadowMap.length>0&&bt.setValue(W,"spotShadowMap",en.state.spotShadowMap,fe),en.state.pointShadowMap.length>0&&bt.setValue(W,"pointShadowMap",en.state.pointShadowMap,fe)),Q.isSkinnedMesh){bt.setOptional(W,Q,"bindMatrix"),bt.setOptional(W,Q,"bindMatrixInverse");const Nt=Q.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),bt.setValue(W,"boneTexture",Nt.boneTexture,fe))}Q.isBatchedMesh&&(bt.setOptional(W,Q,"batchingTexture"),bt.setValue(W,"batchingTexture",Q._matricesTexture,fe),bt.setOptional(W,Q,"batchingIdTexture"),bt.setValue(W,"batchingIdTexture",Q._indirectTexture,fe),bt.setOptional(W,Q,"batchingColorTexture"),Q._colorsTexture!==null&&bt.setValue(W,"batchingColorTexture",Q._colorsTexture,fe));const pi=ce.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&z.update(Q,ce,En),(fi||Oe.receiveShadow!==Q.receiveShadow)&&(Oe.receiveShadow=Q.receiveShadow,bt.setValue(W,"receiveShadow",Q.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&H.environment!==null&&(Wt.envMapIntensity.value=H.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=yw()),fi){if(bt.setValue(W,"toneMappingExposure",B.toneMappingExposure),Oe.needsLights&&_c(Wt,Yi),Ne&&ne.fog===!0&&Ke.refreshFogUniforms(Wt,Ne),Ke.refreshMaterialUniforms(Wt,ne,de,le,P.state.transmissionRenderTarget[A.id]),Oe.needsLights&&Oe.lightProbeGrid){const Nt=Oe.lightProbeGrid;Wt.probesSH.value=Nt.texture,Wt.probesMin.value.copy(Nt.boundingBox.min),Wt.probesMax.value.copy(Nt.boundingBox.max),Wt.probesResolution.value.copy(Nt.resolution)}nc.upload(W,va(Oe),Wt,fe)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(nc.upload(W,va(Oe),Wt,fe),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&bt.setValue(W,"center",Q.center),bt.setValue(W,"modelViewMatrix",Q.modelViewMatrix),bt.setValue(W,"normalMatrix",Q.normalMatrix),bt.setValue(W,"modelMatrix",Q.matrixWorld),ne.uniformsGroups!==void 0){const Nt=ne.uniformsGroups;for(let ti=0,mi=Nt.length;ti<mi;ti++){const gi=Nt[ti];ve.update(gi,En),ve.bind(gi,En)}}return En}function _c(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.sunLights.needsUpdate=H,A.sunLightShadows.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function _a(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return he},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(A,H,ce){const ne=oe.get(A);ne.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),oe.get(A.texture).__webglTexture=H,oe.get(A.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:ce,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){const ce=oe.get(A);ce.__webglFramebuffer=H,ce.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,ce=0){Y=A,he=H,te=ce;let ne=null,Q=!1,Ne=!1;if(A){const De=oe.get(A);if(De.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(W.FRAMEBUFFER,De.__webglFramebuffer),L.copy(A.viewport),ae.copy(A.scissor),ye=A.scissorTest,M.viewport(L),M.scissor(ae),M.setScissorTest(ye),$=-1;return}else if(De.__webglFramebuffer===void 0)fe.setupRenderTarget(A);else if(De.__hasExternalTextures)fe.rebindTextures(A,oe.get(A.texture).__webglTexture,oe.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const at=A.depthTexture;if(De.__boundDepthTexture!==at){if(at!==null&&oe.has(at)&&(A.width!==at.image.width||A.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");fe.setupDepthRenderbuffer(A)}}const We=A.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Ne=!0);const Ze=oe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ze[H])?ne=Ze[H][ce]:ne=Ze[H],Q=!0):A.samples>0&&fe.useMultisampledRTT(A)===!1?ne=oe.get(A).__webglMultisampledFramebuffer:Array.isArray(Ze)?ne=Ze[ce]:ne=Ze,L.copy(A.viewport),ae.copy(A.scissor),ye=A.scissorTest}else L.copy(Fe).multiplyScalar(de).floor(),ae.copy(dt).multiplyScalar(de).floor(),ye=Vt;if(ce!==0&&(ne=ee),M.bindFramebuffer(W.FRAMEBUFFER,ne)&&M.drawBuffers(A,ne),M.viewport(L),M.scissor(ae),M.setScissorTest(ye),Q){const De=oe.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+H,De.__webglTexture,ce)}else if(Ne){const De=H;for(let We=0;We<A.textures.length;We++){const Ze=oe.get(A.textures[We]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+We,Ze.__webglTexture,ce,De)}}else if(A!==null&&ce!==0){const De=oe.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,De.__webglTexture,ce)}$=-1};function xa(A){const H=oe.get(A);return(H.__readFormat!==A.format||H.__readType!==A.type)&&(H.__readFormat=A.format,H.__readType=A.type,H.__formatReadable=N.textureFormatReadable(A.format),H.__typeReadable=N.textureTypeReadable(A.type)),H}this.readRenderTargetPixels=function(A,H,ce,ne,Q,Ne,Le,De=0){if(!(A&&A.isWebGLRenderTarget)){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=oe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(We=We[Le]),We){M.bindFramebuffer(W.FRAMEBUFFER,We);try{const Ze=A.textures[De],at=Ze.format,ut=Ze.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+De);const Be=xa(Ze);if(Be.__formatReadable===!1){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){Tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-ne&&ce>=0&&ce<=A.height-Q&&W.readPixels(H,ce,ne,Q,be.convert(at),be.convert(ut),Ne)}finally{const Ze=Y!==null?oe.get(Y).__webglFramebuffer:null;M.bindFramebuffer(W.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(A,H,ce,ne,Q,Ne,Le,De=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=oe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(We=We[Le]),We)if(H>=0&&H<=A.width-ne&&ce>=0&&ce<=A.height-Q){M.bindFramebuffer(W.FRAMEBUFFER,We);const Ze=A.textures[De],at=Ze.format,ut=Ze.type;A.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+De);const Be=xa(Ze);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const xt=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,xt),W.bufferData(W.PIXEL_PACK_BUFFER,Ne.byteLength,W.STREAM_READ),W.readPixels(H,ce,ne,Q,be.convert(at),be.convert(ut),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);const Jt=Y!==null?oe.get(Y).__webglFramebuffer:null;M.bindFramebuffer(W.FRAMEBUFFER,Jt);const Ot=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await D_(W,Ot,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,xt),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Ne),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(xt),W.deleteSync(Ot),Ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,H=null,ce=0){const ne=Math.pow(2,-ce),Q=Math.floor(A.image.width*ne),Ne=Math.floor(A.image.height*ne),Le=H!==null?H.x:0,De=H!==null?H.y:0;fe.setTexture2D(A,0),W.copyTexSubImage2D(W.TEXTURE_2D,ce,0,0,Le,De,Q,Ne),M.unbindTexture()},this.copyTextureToTexture=function(A,H,ce=null,ne=null,Q=0,Ne=0){let Le,De,We,Ze,at,ut,Be,xt,Jt;const Ot=A.isCompressedTexture?A.mipmaps[Ne]:A.image;if(ce!==null)Le=ce.max.x-ce.min.x,De=ce.max.y-ce.min.y,We=ce.isBox3?ce.max.z-ce.min.z:1,Ze=ce.min.x,at=ce.min.y,ut=ce.isBox3?ce.min.z:0;else{const Wt=Math.pow(2,-Q);Le=Math.floor(Ot.width*Wt),De=Math.floor(Ot.height*Wt),A.isDataArrayTexture?We=Ot.depth:A.isData3DTexture?We=Math.floor(Ot.depth*Wt):We=1,Ze=0,at=0,ut=0}ne!==null?(Be=ne.x,xt=ne.y,Jt=ne.z):(Be=0,xt=0,Jt=0);const Pt=be.convert(H.format),on=be.convert(H.type);let Oe;H.isData3DTexture?(fe.setTexture3D(H,0),Oe=W.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(fe.setTexture2DArray(H,0),Oe=W.TEXTURE_2D_ARRAY):(fe.setTexture2D(H,0),Oe=W.TEXTURE_2D),M.activeTexture(W.TEXTURE0),M.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,H.flipY),M.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),M.pixelStorei(W.UNPACK_ALIGNMENT,H.unpackAlignment);const en=M.getParameter(W.UNPACK_ROW_LENGTH),yt=M.getParameter(W.UNPACK_IMAGE_HEIGHT),En=M.getParameter(W.UNPACK_SKIP_PIXELS),pt=M.getParameter(W.UNPACK_SKIP_ROWS),fi=M.getParameter(W.UNPACK_SKIP_IMAGES);M.pixelStorei(W.UNPACK_ROW_LENGTH,Ot.width),M.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Ot.height),M.pixelStorei(W.UNPACK_SKIP_PIXELS,Ze),M.pixelStorei(W.UNPACK_SKIP_ROWS,at),M.pixelStorei(W.UNPACK_SKIP_IMAGES,ut);const Yi=A.isDataArrayTexture||A.isData3DTexture,bt=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){const Wt=oe.get(A),pi=oe.get(H),Nt=oe.get(Wt.__renderTarget),ti=oe.get(pi.__renderTarget);M.bindFramebuffer(W.READ_FRAMEBUFFER,Nt.__webglFramebuffer),M.bindFramebuffer(W.DRAW_FRAMEBUFFER,ti.__webglFramebuffer);for(let mi=0;mi<We;mi++)Yi&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,oe.get(A).__webglTexture,Q,ut+mi),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,oe.get(H).__webglTexture,Ne,Jt+mi)),W.blitFramebuffer(Ze,at,Le,De,Be,xt,Le,De,W.DEPTH_BUFFER_BIT,W.NEAREST);M.bindFramebuffer(W.READ_FRAMEBUFFER,null),M.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(Q!==0||A.isRenderTargetTexture||oe.has(A)){const Wt=oe.get(A),pi=oe.get(H);M.bindFramebuffer(W.READ_FRAMEBUFFER,V),M.bindFramebuffer(W.DRAW_FRAMEBUFFER,J);for(let Nt=0;Nt<We;Nt++)Yi?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Wt.__webglTexture,Q,ut+Nt):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,Wt.__webglTexture,Q),bt?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,pi.__webglTexture,Ne,Jt+Nt):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,pi.__webglTexture,Ne),Q!==0?W.blitFramebuffer(Ze,at,Le,De,Be,xt,Le,De,W.COLOR_BUFFER_BIT,W.NEAREST):bt?W.copyTexSubImage3D(Oe,Ne,Be,xt,Jt+Nt,Ze,at,Le,De):W.copyTexSubImage2D(Oe,Ne,Be,xt,Ze,at,Le,De);M.bindFramebuffer(W.READ_FRAMEBUFFER,null),M.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else bt?A.isDataTexture||A.isData3DTexture?W.texSubImage3D(Oe,Ne,Be,xt,Jt,Le,De,We,Pt,on,Ot.data):H.isCompressedArrayTexture?W.compressedTexSubImage3D(Oe,Ne,Be,xt,Jt,Le,De,We,Pt,Ot.data):W.texSubImage3D(Oe,Ne,Be,xt,Jt,Le,De,We,Pt,on,Ot):A.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Ne,Be,xt,Le,De,Pt,on,Ot.data):A.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Ne,Be,xt,Ot.width,Ot.height,Pt,Ot.data):W.texSubImage2D(W.TEXTURE_2D,Ne,Be,xt,Le,De,Pt,on,Ot);M.pixelStorei(W.UNPACK_ROW_LENGTH,en),M.pixelStorei(W.UNPACK_IMAGE_HEIGHT,yt),M.pixelStorei(W.UNPACK_SKIP_PIXELS,En),M.pixelStorei(W.UNPACK_SKIP_ROWS,pt),M.pixelStorei(W.UNPACK_SKIP_IMAGES,fi),Ne===0&&H.generateMipmaps&&W.generateMipmap(Oe),M.unbindTexture()},this.initRenderTarget=function(A){oe.get(A).__webglFramebuffer===void 0&&fe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?fe.setTextureCube(A,0):A.isData3DTexture?fe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?fe.setTexture2DArray(A,0):fe.setTexture2D(A,0),M.unbindTexture()},this.resetState=function(){he=0,te=0,Y=null,M.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=St._getDrawingBufferColorSpace(e),t.unpackColorSpace=St._getUnpackColorSpace()}}const ls=0,vg=1,_g=2,xg=3,l0=4,yg=250,cs=8,Sg=20,Mw=20,cr=1,gn=16,Oi=class Oi{constructor(){this.chunks=new Map,console.log("VoxelWorld constructor started"),this.mesh=new jn,Oi.sharedGeometry||(Oi.sharedGeometry=new Yt(cr,cr,cr)),Oi.sharedMaterial||(Oi.sharedMaterial=new yn({color:16777215})),this.initializeChunks(),this.generateTerrain(),console.log("Terrain generated"),this.rebuildAllChunks(),console.log("All chunks rebuilt")}key(e,t,r){return`${e},${t},${r}`}getChunkKey(e,t){const r=Math.floor(e/gn),a=Math.floor(t/gn);return`${r},${a}`}getOrCreateChunk(e,t){const r=this.getChunkKey(e,t);let a=this.chunks.get(r);if(!a){const l=Math.floor(e/gn),c=Math.floor(t/gn);a={voxels:new Map,mesh:null,dirty:!0,minX:l*gn,maxX:(l+1)*gn-1,minZ:c*gn,maxZ:(c+1)*gn-1,voxelIndices:new Map},this.chunks.set(r,a)}return a}initializeChunks(){const e=yg/2,t=Math.floor(-e/gn),r=Math.floor(e/gn),a=Math.floor(-e/gn),l=Math.floor(e/gn);for(let c=t;c<=r;c++)for(let d=a;d<=l;d++){const f=`${c},${d}`;this.chunks.set(f,{voxels:new Map,mesh:null,dirty:!0,minX:c*gn,maxX:(c+1)*gn-1,minZ:d*gn,maxZ:(d+1)*gn-1,voxelIndices:new Map})}}getVoxel(e,t,r){const a=this.chunks.get(this.getChunkKey(e,r));return a&&a.voxels.get(this.key(e,t,r))||null}setVoxel(e,t,r,a,l=3){const c=this.getOrCreateChunk(e,r),d=this.key(e,t,r);a===ls?c.voxels.delete(d):c.voxels.set(d,{type:a,durability:l}),c.dirty=!0;const f=e-c.minX,p=r-c.minZ;f===0&&this.markNeighborChunkDirty(e-1,r),f===gn-1&&this.markNeighborChunkDirty(e+1,r),p===0&&this.markNeighborChunkDirty(e,r-1),p===gn-1&&this.markNeighborChunkDirty(e,r+1)}markNeighborChunkDirty(e,t){const r=this.chunks.get(this.getChunkKey(e,t));r&&(r.dirty=!0)}isSolid(e,t,r){const a=this.getVoxel(e,t,r);return a!==null&&a.type!==ls}generateTerrain(){const e=yg/2;for(let t=-e;t<e;t++)for(let r=-e;r<e;r++){const a=cs+Math.floor(Math.sin(t*.1)*Math.cos(r*.1)*2);for(let l=0;l<=a;l++){let c=vg;l===a?c=xg:l<a-2&&(c=_g),this.setVoxel(t,l,r,c,3)}}}getGroundHeight(e,t){const r=Math.floor(e),a=Math.floor(t);for(let l=cs+Sg+5;l>=0;l--)if(this.isSolid(r,l,a))return l+.5;return 0}getOriginalGroundLevel(){return cs+.5}canDig(e,t,r){return t>=cs-Mw}canBuild(e,t,r){return!(t>cs+Sg||this.isSolid(e,t,r)||t>cs&&!this.hasSupport(e,t,r,12))}damageVoxel(e,t,r,a){const l=this.getVoxel(e,t,r);if(!l)return{destroyed:!1,collapsed:0,collapsedVoxels:[]};if(l.durability-=a,l.durability<=0){this.setVoxel(e,t,r,ls);const c=this.collapseDisconnected(e,t,r);return{destroyed:!0,collapsed:c.count,collapsedVoxels:c.voxels}}return this.updateVoxelColor(e,t,r,l.type,l.durability),{destroyed:!1,collapsed:0,collapsedVoxels:[]}}collapseDisconnected(e,t,r){if(e===void 0||t===void 0||r===void 0)return{count:0,voxels:[]};const a=[],l=new Set,c=[[e+1,t,r],[e-1,t,r],[e,t+1,r],[e,t-1,r],[e,t,r+1],[e,t,r-1]];for(const[f,p,g]of c){const _=this.getVoxel(f,p,g);if(!_||_.type===ls)continue;const v=this.key(f,p,g);l.has(v)||this.hasSupport(f,p,g,12)||this.findUnsupportedChain(f,p,g,a,l)}const d=[];for(const f of a){const p=f.split(","),g=parseInt(p[0]),_=parseInt(p[1]),v=parseInt(p[2]),S=this.getVoxel(g,_,v);S&&d.push({x:g,y:_,z:v,type:S.type}),this.setVoxel(g,_,v,ls)}return{count:a.length,voxels:d}}hasSupport(e,t,r,a){const l=new Set,c=[];for(c.push({x:e,y:t,z:r,dist:0}),l.add(this.key(e,t,r));c.length>0;){const d=c.shift();if(d.y<=cs)return!0;if(d.dist>=a)continue;const f=[[d.x+1,d.y,d.z],[d.x-1,d.y,d.z],[d.x,d.y+1,d.z],[d.x,d.y-1,d.z],[d.x,d.y,d.z+1],[d.x,d.y,d.z-1]];for(const[p,g,_]of f){const v=this.key(p,g,_);if(l.has(v))continue;const S=this.getVoxel(p,g,_);!S||S.type===ls||(l.add(v),c.push({x:p,y:g,z:_,dist:d.dist+1}))}}return!1}findUnsupportedChain(e,t,r,a,l){const c=[];for(c.push({x:e,y:t,z:r}),l.add(this.key(e,t,r));c.length>0;){const d=c.shift(),f=this.key(d.x,d.y,d.z);a.push(f);const p=[[d.x+1,d.y,d.z],[d.x-1,d.y,d.z],[d.x,d.y+1,d.z],[d.x,d.y-1,d.z],[d.x,d.y,d.z+1],[d.x,d.y,d.z-1]];for(const[g,_,v]of p){const S=this.key(g,_,v);if(l.has(S))continue;const E=this.getVoxel(g,_,v);!E||E.type===ls||(l.add(S),this.hasSupport(g,_,v,12)||c.push({x:g,y:_,z:v}))}}}getBaseColor(e){return{[vg]:9136404,[_g]:8421504,[xg]:4885567,[l0]:12886874}[e]||16777215}getColorWithDurability(e,t){const r=this.getBaseColor(e),a=t/3,l=(r>>16&255)/255*a,c=(r>>8&255)/255*a,d=(r&255)/255*a;return new gt(l,c,d)}updateVoxelColor(e,t,r,a,l){const c=this.chunks.get(this.getChunkKey(e,r));if(!c||!c.mesh)return;const d=this.key(e,t,r),f=c.voxelIndices.get(d);if(f===void 0)return;const p=this.getColorWithDurability(a,l);c.mesh.setColorAt(f,p),c.mesh.instanceColor&&(c.mesh.instanceColor.needsUpdate=!0)}rebuildChunk(e){const t=this.chunks.get(e);if(!t)return;t.mesh&&(this.mesh.remove(t.mesh),t.mesh.dispose(),t.mesh=null),t.voxelIndices.clear();const r=[];for(const[d,f]of t.voxels){const p=d.split(","),g=parseInt(p[0]),_=parseInt(p[1]),v=parseInt(p[2]);(!this.isSolid(g+1,_,v)||!this.isSolid(g-1,_,v)||!this.isSolid(g,_+1,v)||!this.isSolid(g,_-1,v)||!this.isSolid(g,_,v+1)||!this.isSolid(g,_,v-1))&&r.push({x:g,y:_,z:v,type:f.type,durability:f.durability,key:d})}if(r.length===0)return;const a=new ax(Oi.sharedGeometry,Oi.sharedMaterial,r.length),l=new kt,c=new gt;for(let d=0;d<r.length;d++){const f=r[d];l.setPosition(f.x,f.y,f.z),a.setMatrixAt(d,l),c.copy(this.getColorWithDurability(f.type,f.durability)),a.setColorAt(d,c),t.voxelIndices.set(f.key,d)}if(a.instanceMatrix.needsUpdate=!0,a.instanceColor)a.instanceColor.needsUpdate=!0;else{const d=new Float32Array(r.length*3);for(let f=0;f<r.length;f++){const p=r[f],g=this.getColorWithDurability(p.type,p.durability);d[f*3]=g.r,d[f*3+1]=g.g,d[f*3+2]=g.b}a.instanceColor=new xh(d,3)}a.castShadow=!1,a.receiveShadow=!0,t.mesh=a,this.mesh.add(a)}rebuildAllChunks(){for(const[e,t]of this.chunks)this.rebuildChunk(e),t.dirty=!1}update(e=!1){let t=0;const r=e?9999:8;for(const[a,l]of this.chunks)l.dirty&&(e||t<r)&&(this.rebuildChunk(a),l.dirty=!1,t++)}raycast(e,t,r){const l=Math.abs(t.x)<1e-8?t.x>=0?1e-8:-1e-8:t.x,c=Math.abs(t.y)<1e-8?t.y>=0?1e-8:-1e-8:t.y,d=Math.abs(t.z)<1e-8?t.z>=0?1e-8:-1e-8:t.z,f=l>0?1:-1,p=c>0?1:-1,g=d>0?1:-1;let _=Math.floor(e.x),v=Math.floor(e.y),S=Math.floor(e.z);const E=Math.abs(1/l),b=Math.abs(1/c),y=Math.abs(1/d);let x=l>0?(_+1-e.x)*E:(e.x-_)*E,I=c>0?(v+1-e.y)*b:(e.y-v)*b,O=d>0?(S+1-e.z)*y:(e.z-S)*y,C=new q,R=0;for(let P=0;P<r*3;P++){if(this.isSolid(_,v,S))return{hit:!0,position:new q(_,v,S),normal:C.clone(),voxelPos:{x:_,y:v,z:S},distance:R};if(x<I?x<O?(_+=f,R=x,x+=E,C.set(-f,0,0)):(S+=g,R=O,O+=y,C.set(0,0,-g)):I<O?(v+=p,R=I,I+=b,C.set(0,-p,0)):(S+=g,R=O,O+=y,C.set(0,0,-g)),R>r)break}return null}};Oi.sharedGeometry=null,Oi.sharedMaterial=null;let Mh=Oi;class Ew{constructor(e){this.yaw=0,this.pitch=0,this.hp=100,this.maxHp=100,this.isDead=!1,this.isGrounded=!1,this.isSprinting=!1,this.isCrouching=!1,this.height=1.7,this.crouchHeight=1.2,this.radius=.3,this.speed=5,this.sprintMultiplier=1.6,this.crouchMultiplier=.3,this.jumpForce=8,this.gravity=20,this.sensitivity=.002,this.respawnTimer=0,this.targetInfo="",this.team="blue",this.carryingFlag=!1,this.flagMesh=null,this.headBobTime=0,this.headBobIntensity=0,this.weaponSwayX=0,this.weaponSwayY=0,this.cameraShake=0,this.landingImpact=0,this.lastVelocityY=0,this.keys=new Set,this.crouchKeyPressed=!1,this.world=e;const t=e.getGroundHeight(0,0);this.position=new q(0,t,0),this.velocity=new q(0,0,0),this.camera=new Jn(75,window.innerWidth/window.innerHeight,.1,200),this.updateCamera()}get currentHeight(){return this.isCrouching?this.crouchHeight:this.height}getForward(){return new q(-Math.sin(this.yaw),0,-Math.cos(this.yaw)).normalize()}getRight(){return new q(Math.cos(this.yaw),0,-Math.sin(this.yaw)).normalize()}getAimDirection(){const e=new q(0,0,-1);return e.applyQuaternion(this.camera.quaternion),e.normalize()}handleKeyDown(e){this.keys.add(e.toLowerCase()),e==="Space"&&this.jump(),(e==="ShiftLeft"||e==="ShiftRight")&&(this.isSprinting=!0),(e==="ControlLeft"||e==="ControlRight"||e==="KeyC")&&!this.crouchKeyPressed&&(this.crouchKeyPressed=!0,this.isCrouching=!this.isCrouching)}handleKeyUp(e){this.keys.delete(e.toLowerCase()),(e==="ShiftLeft"||e==="ShiftRight")&&(this.isSprinting=!1),(e==="ControlLeft"||e==="ControlRight"||e==="KeyC")&&(this.crouchKeyPressed=!1)}hasKey(e){return this.keys.has(e.toLowerCase())}handleMouseMove(e,t){this.isDead||(this.yaw-=e*this.sensitivity,this.pitch-=t*this.sensitivity,this.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,this.pitch)),this.addWeaponSway(e,t))}jump(){this.isDead||this.isGrounded&&(this.velocity.y=this.jumpForce,this.isGrounded=!1)}takeDamage(e){this.isDead||(this.hp-=e,this.hp<=0&&(this.hp=0,this.die()))}die(){this.isDead=!0,this.respawnTimer=4}respawn(e="blue",t){if(this.isDead=!1,this.hp=this.maxHp,t)this.position.copy(t);else{let r;e==="blue"?r=-100+Math.random()*10:r=90+Math.random()*10;const a=(Math.random()-.5)*40,l=this.world.getGroundHeight(a,r);this.position.set(a,l,r)}this.velocity.set(0,0,0),this.yaw=e==="blue"?Math.PI:0,this.pitch=0}isPointInSolid(e,t,r){const a=Math.floor(e),l=Math.floor(t),c=Math.floor(r);return this.world.isSolid(a,l,c)}checkCollisionAt(e){const t=this.radius,r=this.currentHeight,a=[e.y,e.y+r*.5,e.y+r-.1];for(const l of a){const c=[[e.x,e.z],[e.x-t,e.z],[e.x+t,e.z],[e.x,e.z-t],[e.x,e.z+t],[e.x-t*.7,e.z-t*.7],[e.x+t*.7,e.z-t*.7],[e.x-t*.7,e.z+t*.7],[e.x+t*.7,e.z+t*.7]];for(const[d,f]of c)if(this.isPointInSolid(d,l,f))return!0}return!1}canStepUp(e,t){const a=t.clone();return a.y=e.y+1,!this.checkCollisionAt(a)}isOnGround(e){const t=this.radius,r=e.y-.05,a=[[e.x,e.z],[e.x-t,e.z],[e.x+t,e.z],[e.x,e.z-t],[e.x,e.z+t]];for(const[l,c]of a)if(this.isPointInSolid(l,r,c))return!0;return!1}pushOutOfSolids(e){const t=e.clone();if(this.radius,this.currentHeight,!this.checkCollisionAt(t))return t;const r=.1,a=[[r,0,0],[-r,0,0],[0,0,r],[0,0,-r],[0,r,0]];for(const[l,c,d]of a){const f=t.clone();if(f.x+=l,f.y+=c,f.z+=d,!this.checkCollisionAt(f))return f}for(let l=0;l<10;l++)if(t.y+=.5,!this.checkCollisionAt(t))return t;return t}findGroundBelow(e,t){return this.world.getGroundHeight(e,t)}update(e){if(this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.respawn(this.team),this.updateCamera();return}if(this.checkCollisionAt(this.position)){const g=this.pushOutOfSolids(this.position);this.position.copy(g)}this.keys.has("arrowleft")&&(this.yaw+=2.2*e),this.keys.has("arrowright")&&(this.yaw-=2.2*e),this.keys.has("arrowup")&&(this.pitch+=1.6*e,this.pitch=Math.min(Math.PI/2-.01,this.pitch)),this.keys.has("arrowdown")&&(this.pitch-=1.6*e,this.pitch=Math.max(-Math.PI/2+.01,this.pitch));const t=new q(0,0,0),r=this.getForward(),a=this.getRight();this.keys.has("keyw")&&t.add(r),this.keys.has("keys")&&t.sub(r),this.keys.has("keya")&&t.sub(a),this.keys.has("keyd")&&t.add(a),t.length()>0&&t.normalize();let l=this.speed;this.isSprinting&&!this.isCrouching&&(l*=this.sprintMultiplier),this.isCrouching&&(l*=this.crouchMultiplier);const c=t.x*l,d=t.z*l,f=this.isGrounded?15:8;this.velocity.x+=(c-this.velocity.x)*Math.min(f*e,1),this.velocity.z+=(d-this.velocity.z)*Math.min(f*e,1),this.isGrounded=this.isOnGround(this.position),this.isGrounded?this.velocity.y<=0&&(this.velocity.y=0):(this.velocity.y-=this.gravity*e,this.velocity.y<-30&&(this.velocity.y=-30));const p=this.position.clone();if(p.x+=this.velocity.x*e,this.checkCollisionAt(p)&&(this.isGrounded&&this.canStepUp(this.position,p)?p.y=this.position.y+1:(p.x=this.position.x,this.velocity.x=0)),p.z+=this.velocity.z*e,this.checkCollisionAt(p)&&(this.isGrounded&&this.canStepUp(this.position,p)?p.y=this.position.y+1:(p.z=this.position.z,this.velocity.z=0)),p.y+=this.velocity.y*e,this.checkCollisionAt(p)){if(this.velocity.y<0){this.isGrounded=!0;const g=this.findGroundBelow(p.x,p.z);p.y=g}else p.y=this.position.y;this.velocity.y=0}if(p.y<-10){const g=this.world.getGroundHeight(0,0);p.set(0,g,0),this.velocity.set(0,0,0)}if(this.checkCollisionAt(p)){const g=this.pushOutOfSolids(p);p.copy(g)}this.isGrounded&&this.lastVelocityY<-5&&(this.landingImpact=Math.min(Math.abs(this.lastVelocityY)*.02,.15)),this.lastVelocityY=this.velocity.y,this.position.copy(p),this.updateCamera(e)}updateCamera(e=.016){const t=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.z*this.velocity.z);if(this.isGrounded&&t>.5){const a=this.isSprinting?12:8,l=this.isSprinting?.06:.04;this.headBobTime+=e*a,this.headBobIntensity=Math.sin(this.headBobTime)*l}else this.headBobIntensity*=.9;const r=.85;this.weaponSwayX*=r,this.weaponSwayY*=r,this.landingImpact*=.9,this.cameraShake*=.9,this.camera.position.copy(this.position),this.camera.position.y+=this.currentHeight*.85,this.camera.position.y+=this.headBobIntensity,this.camera.position.y-=this.landingImpact,this.cameraShake>.001&&(this.camera.position.x+=(Math.random()-.5)*this.cameraShake,this.camera.position.y+=(Math.random()-.5)*this.cameraShake),this.camera.rotation.set(this.pitch,this.yaw,0,"YXZ")}addWeaponSway(e,t){this.weaponSwayX+=e*.001,this.weaponSwayY+=t*.001,this.weaponSwayX=Math.max(-.05,Math.min(.05,this.weaponSwayX)),this.weaponSwayY=Math.max(-.05,Math.min(.05,this.weaponSwayY))}addCameraShake(e){this.cameraShake=Math.max(this.cameraShake,e)}getEyePosition(){return new q(this.position.x,this.position.y+this.currentHeight*.85,this.position.z)}}class ww{constructor(){this.audioContext=null,this.enabled=!0;const e=()=>{this.audioContext||(this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.audioContext.state==="suspended"&&this.audioContext.resume()),document.removeEventListener("click",e),document.removeEventListener("keydown",e)};document.addEventListener("click",e),document.addEventListener("keydown",e)}setEnabled(e){this.enabled=e}playTone(e,t,r=.3,a="sine"){if(!this.enabled||!this.audioContext)return;const l=this.audioContext.createOscillator(),c=this.audioContext.createGain();l.connect(c),c.connect(this.audioContext.destination),l.frequency.value=e,l.type=a,c.gain.setValueAtTime(r,this.audioContext.currentTime),c.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+t),l.start(this.audioContext.currentTime),l.stop(this.audioContext.currentTime+t)}playNoise(e,t=.3){if(!this.enabled||!this.audioContext)return;const r=this.audioContext.sampleRate*e,a=this.audioContext.createBuffer(1,r,this.audioContext.sampleRate),l=a.getChannelData(0);for(let f=0;f<r;f++)l[f]=Math.random()*2-1;const c=this.audioContext.createBufferSource(),d=this.audioContext.createGain();c.buffer=a,c.connect(d),d.connect(this.audioContext.destination),d.gain.setValueAtTime(t,this.audioContext.currentTime),d.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e),c.start()}rifleShot(){this.playNoise(.1,.4),this.playTone(150,.05,.3,"square")}smgShot(){this.playNoise(.08,.3),this.playTone(200,.03,.2,"square")}hitMarker(){this.playTone(800,.1,.2,"sine")}killSound(){this.playTone(600,.1,.3,"sine"),setTimeout(()=>this.playTone(800,.1,.3,"sine"),100)}pickaxeHit(){this.playNoise(.15,.2),this.playTone(300,.1,.2,"triangle")}spadeHit(){this.playNoise(.1,.15),this.playTone(250,.08,.15,"triangle")}buildPlace(){this.playTone(400,.1,.2,"sine"),this.playTone(500,.1,.2,"sine")}voxelBreak(){this.playNoise(.2,.25),this.playTone(200,.15,.2,"sawtooth")}collapse(){this.playNoise(.5,.4),this.playTone(100,.3,.3,"sawtooth")}jump(){this.playTone(300,.1,.1,"sine")}death(){this.playTone(200,.3,.3,"sawtooth"),setTimeout(()=>this.playTone(150,.3,.3,"sawtooth"),200)}respawn(){this.playTone(400,.1,.2,"sine"),setTimeout(()=>this.playTone(600,.1,.2,"sine"),100),setTimeout(()=>this.playTone(800,.1,.2,"sine"),200)}capture(){this.playTone(523,.15,.3,"sine"),setTimeout(()=>this.playTone(659,.15,.3,"sine"),150),setTimeout(()=>this.playTone(784,.15,.3,"sine"),300),setTimeout(()=>this.playTone(1047,.3,.4,"sine"),450)}weaponSwitch(){this.playTone(500,.05,.15,"sine")}reload(){this.playNoise(.1,.2),this.playTone(300,.08,.15,"square"),setTimeout(()=>{this.playNoise(.1,.25),this.playTone(400,.1,.2,"square")},800)}playSoundAtVolume(e,t){e==="rifle"?(this.playNoise(.1,.4*t),this.playTone(150,.05,.3*t,"square")):e==="smg"&&(this.playNoise(.08,.3*t),this.playTone(200,.03,.2*t,"square"))}playDistantShot(e,t,r){if(!this.enabled||!this.audioContext)return;const l=Math.max(0,1-t/100)*.6;if(l<.05)return;const c=this.audioContext.createStereoPanner();if(c.pan.value=Math.max(-1,Math.min(1,r)),e==="rifle"){const d=this.audioContext.createOscillator(),f=this.audioContext.createGain();d.connect(f),f.connect(c),c.connect(this.audioContext.destination),d.frequency.value=120,d.type="sawtooth",f.gain.setValueAtTime(l*.3,this.audioContext.currentTime),f.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.15),d.start(),d.stop(this.audioContext.currentTime+.15),this.playSpatialNoise(.12,l*.4,r)}else{const d=this.audioContext.createOscillator(),f=this.audioContext.createGain();d.connect(f),f.connect(c),c.connect(this.audioContext.destination),d.frequency.value=180,d.type="square",f.gain.setValueAtTime(l*.25,this.audioContext.currentTime),f.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.08),d.start(),d.stop(this.audioContext.currentTime+.08),this.playSpatialNoise(.08,l*.3,r)}}playSpatialNoise(e,t,r){if(!this.audioContext)return;const a=this.audioContext.sampleRate*e,l=this.audioContext.createBuffer(1,a,this.audioContext.sampleRate),c=l.getChannelData(0);for(let g=0;g<a;g++)c[g]=(Math.random()*2-1)*.5;const d=this.audioContext.createBufferSource(),f=this.audioContext.createGain(),p=this.audioContext.createStereoPanner();d.buffer=l,d.connect(f),f.connect(p),p.connect(this.audioContext.destination),p.pan.value=Math.max(-1,Math.min(1,r)),f.gain.setValueAtTime(t,this.audioContext.currentTime),f.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e),d.start()}bulletWhizz(e,t){if(!this.enabled||!this.audioContext||e>3)return;const r=Math.max(0,1-e/3)*.5;if(r<.05)return;const a=this.audioContext.createStereoPanner();a.pan.value=Math.max(-1,Math.min(1,t));const l=this.audioContext.createOscillator(),c=this.audioContext.createGain();l.connect(c),c.connect(a),a.connect(this.audioContext.destination),l.frequency.setValueAtTime(2e3,this.audioContext.currentTime),l.frequency.exponentialRampToValueAtTime(800,this.audioContext.currentTime+.15),l.type="sine",c.gain.setValueAtTime(r,this.audioContext.currentTime),c.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.15),l.start(),l.stop(this.audioContext.currentTime+.15),this.playSpatialNoise(.1,r*.3,t)}bulletImpact(e,t){if(!this.enabled||!this.audioContext||e>20)return;const r=Math.max(0,1-e/20)*.4;if(r<.05)return;const a=this.audioContext.createStereoPanner();a.pan.value=Math.max(-1,Math.min(1,t));const l=this.audioContext.sampleRate*.08,c=this.audioContext.createBuffer(1,l,this.audioContext.sampleRate),d=c.getChannelData(0);for(let g=0;g<l;g++)d[g]=(Math.random()*2-1)*Math.exp(-g/(l*.3));const f=this.audioContext.createBufferSource(),p=this.audioContext.createGain();f.buffer=c,f.connect(p),p.connect(a),a.connect(this.audioContext.destination),p.gain.setValueAtTime(r,this.audioContext.currentTime),p.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+.08),f.start()}hurt(){this.playTone(180,.12,.35,"sawtooth"),this.playNoise(.08,.25)}headshot(){this.playTone(1200,.08,.35,"sine"),setTimeout(()=>this.playTone(1600,.1,.4,"sine"),60)}deathSound(){this.death()}flagPickup(){this.playTone(600,.1,.3,"sine"),setTimeout(()=>this.playTone(900,.15,.35,"sine"),100)}flagAlarm(){this.playTone(400,.15,.3,"sawtooth"),setTimeout(()=>this.playTone(300,.15,.3,"sawtooth"),150)}flagCapture(){this.capture()}}class Tw{constructor(e){if(this.ws=null,this.messageHandlers=new Map,this.reconnectAttempts=0,this.maxReconnectAttempts=5,this.reconnectDelay=2e3,this.onConnectCallback=null,this.onDisconnectCallback=null,e)this.serverUrl=e;else if(typeof window<"u"){const t=window.location.protocol==="https:"?"wss:":"ws:";this.serverUrl=`${t}//${window.location.host}`}else this.serverUrl="ws://localhost:3000"}connect(){return new Promise((e,t)=>{try{console.log("Connecting to server:",this.serverUrl),this.ws=new WebSocket(this.serverUrl),this.ws.onopen=()=>{console.log("Connected to server"),this.reconnectAttempts=0,this.onConnectCallback&&this.onConnectCallback(),e()},this.ws.onmessage=r=>{try{const a=JSON.parse(r.data);this.handleMessage(a)}catch(a){console.error("Error parsing message:",a)}},this.ws.onclose=()=>{console.log("Disconnected from server"),this.onDisconnectCallback&&this.onDisconnectCallback(),this.attemptReconnect()},this.ws.onerror=r=>{console.error("WebSocket error:",r),t(r)}}catch(r){console.error("Connection error:",r),t(r)}})}handleMessage(e){const t=this.messageHandlers.get(e.type);t?t(e):console.warn("No handler for message type:",e.type)}attemptReconnect(){this.reconnectAttempts<this.maxReconnectAttempts?(this.reconnectAttempts++,console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`),setTimeout(()=>{this.connect().catch(e=>{console.error("Reconnection failed:",e)})},this.reconnectDelay)):console.error("Max reconnection attempts reached")}send(e){this.ws&&this.ws.readyState===WebSocket.OPEN?this.ws.send(JSON.stringify(e)):console.warn("Cannot send message: WebSocket not connected")}onMessage(e,t){this.messageHandlers.set(e,t)}onConnect(e){this.onConnectCallback=e}onDisconnect(e){this.onDisconnectCallback=e}disconnect(){this.ws&&(this.ws.close(),this.ws=null)}isConnected(){return this.ws!==null&&this.ws.readyState===WebSocket.OPEN}sendJoin(e,t){this.send({type:"join",team:e,position:t})}sendPlayerInput(e){this.send({type:"playerInput",input:e})}sendShoot(e,t,r){this.send({type:"shoot",origin:e,direction:t,targetId:r==null?void 0:r.targetId,isHeadshot:r==null?void 0:r.isHeadshot})}sendReload(){this.send({type:"reload"})}sendUseTool(e,t){this.send({type:"useTool",tool:e,target:t})}sendBuild(e){this.send({type:"build",position:e})}}const Aw={red:{body:13378082,accent:16729156,legs:6689041,label:"RED"},blue:{body:2245836,accent:4491519,legs:1122918,label:"BLUE"}},Cw=-100,bw=-90,Rw=90,Pw=100,Lw=20,co={x:0,z:-80},uo={x:0,z:80};class Dw{constructor(e,t="multiplayer",r="blue"){this.bots=[],this.equipment="rifle",this.inventory=0,this.lastActionTime=0,this.isMouseDown=!1,this.muzzleTimer=0,this.hitMarkerTimer=0,this.message="",this.messageTimer=0,this.blueKills=0,this.redKills=0,this.blueCaptures=0,this.redCaptures=0,this.isSpectating=!1,this.spectatorAngle=0,this.buildMode=!1,this.onStateChange=null,this.playerTeam="blue",this.weaponModels=new Map,this.currentWeaponModel=null,this.isAiming=!1,this.aimTransition=0,this.hipPosition=new q(.3,-.3,-.6),this.adsPosition=new q(0,-.2,-.45),this.pickaxeAnimationTime=0,this.isPickaxeAnimating=!1,this.pickaxeAnimationDuration=.3,this.deathAnimations=new Map,this.bulletTracers=[],this.collapseAnimations=[],this.reloadAnimationTime=0,this.isReloadAnimating=!1,this.reloadAnimationDuration=1.5,this.bulletShells=[],this.muzzleFlashes=[],this.captureZoneSize=4,this.gameMode="multiplayer",this.networkClient=null,this.remotePlayers=new Map,this.localPlayerId=null,this.lastInputSendTime=0,this.inputSendRate=50,this.weapons={rifle:{fireRate:.4,lastFired:0,damage:{head:100,body:34},spread:5e-4,name:"Rifle",magazineSize:10,currentAmmo:10,reloadTime:2,isReloading:!1,reloadStartTime:0},smg:{fireRate:.1,lastFired:0,damage:{head:100,body:34},spread:.04,name:"SMG",magazineSize:30,currentAmmo:30,reloadTime:1.5,isReloading:!1,reloadStartTime:0},spade:{fireRate:.5,lastFired:0,damage:{head:40,body:25},spread:0,name:"Spade",magazineSize:0,currentAmmo:0,reloadTime:0,isReloading:!1,reloadStartTime:0},pickaxe:{fireRate:.5,lastFired:0,damage:{head:40,body:25},spread:0,name:"Pickaxe",magazineSize:0,currentAmmo:0,reloadTime:0,isReloading:!1,reloadStartTime:0}},this.animate=()=>{var c,d,f,p;requestAnimationFrame(this.animate);const a=Math.min(this.clock.getDelta(),.05);if(this.player.update(a),this.world.update(),this.player.isDead&&(this.player.respawnTimer-=a,this.player.respawnTimer<=0)){this.player.respawn(this.playerTeam);for(const g of Object.keys(this.weapons)){const _=this.weapons[g];_&&_.magazineSize>0&&(_.currentAmmo=_.magazineSize,_.isReloading=!1)}this.isReloadAnimating=!1,this.sounds.respawn()}this.isMouseDown&&!this.player.isDead&&(this.equipment==="smg"||this.equipment==="pickaxe"||this.equipment==="spade")&&this.performAction();const l=this.isAiming?this.equipment==="rifle"?45:55:75;if(Math.abs(this.player.camera.fov-l)>.1&&(this.player.camera.fov+=(l-this.player.camera.fov)*Math.min(a*12,1),this.player.camera.updateProjectionMatrix()),this.currentWeaponModel){const g=this.isAiming?this.adsPosition:this.hipPosition;this.currentWeaponModel.position.lerp(g,Math.min(a*10,1))}if(this.isReloadAnimating&&(this.reloadAnimationTime+=a,this.reloadAnimationTime>=this.reloadAnimationDuration)){const g=this.weapons[this.equipment];g&&g.magazineSize>0&&(g.currentAmmo=g.magazineSize,g.isReloading=!1),this.isReloadAnimating=!1}for(let g=this.muzzleFlashes.length-1;g>=0;g--){const _=this.muzzleFlashes[g];_.life+=a,_.life>=_.maxLife&&(this.scene.remove(_.light),this.scene.remove(_.mesh),this.muzzleFlashes.splice(g,1))}for(let g=this.bulletTracers.length-1;g>=0;g--){const _=this.bulletTracers[g];_.mesh.position.add(_.velocity.clone().multiplyScalar(a)),_.life+=a,_.life>=_.maxLife&&(this.scene.remove(_.mesh),this.bulletTracers.splice(g,1))}for(let g=this.bulletShells.length-1;g>=0;g--){const _=this.bulletShells[g];if(_.velocity.y-=9.8*a,_.mesh.position.add(_.velocity.clone().multiplyScalar(a)),_.mesh.rotation.x+=_.rotationSpeed.x*a,_.mesh.rotation.y+=_.rotationSpeed.y*a,_.mesh.rotation.z+=_.rotationSpeed.z*a,_.life+=a,_.life>_.maxLife-.5){const v=(_.maxLife-_.life)/.5;_.mesh.material.opacity=v}_.life>=_.maxLife&&(this.scene.remove(_.mesh),this.bulletShells.splice(g,1))}if(this.updateFlags(a),this.updateBots(a),this.networkClient&&this.networkClient.isConnected()&&!this.player.isDead){const g=performance.now();g-this.lastInputSendTime>this.inputSendRate&&(this.lastInputSendTime=g,this.networkClient.sendPlayerInput({moveX:(this.player.hasKey("KeyD")?1:0)-(this.player.hasKey("KeyA")?1:0),moveZ:(this.player.hasKey("KeyW")?1:0)-(this.player.hasKey("KeyS")?1:0),jump:this.player.hasKey("Space"),crouch:this.player.isCrouching,sprint:this.player.isSprinting,yaw:this.player.yaw,pitch:this.player.pitch,position:{x:this.player.position.x,y:this.player.position.y,z:this.player.position.z},equipment:this.equipment,isAiming:this.isAiming}))}for(const[,g]of this.remotePlayers){g.mesh.position.lerp(g.targetPosition,Math.min(a*15,1)),g.mesh.rotation.y=g.targetRotation.y;const v=g.mesh.position.distanceTo(g.targetPosition)>.05,S=g.mesh.children[3],E=g.mesh.children[4],b=g.mesh.children[5],y=g.mesh.children[6];if(v){const x=Math.sin(performance.now()*.01)*.45;b&&(b.rotation.x=x),y&&(y.rotation.x=-x),S&&(S.rotation.x=-x),E&&(E.rotation.x=x)}else b&&(b.rotation.x=0),y&&(y.rotation.x=0),S&&(S.rotation.x=0),E&&(E.rotation.x=0)}if(this.hitMarkerTimer>0&&(this.hitMarkerTimer-=a,this.hitMarkerTimer<=0&&(this.hitMarkerTimer=0)),this.isSpectating){this.spectatorAngle+=a*.22;let g=new q(0,this.world.getOriginalGroundLevel()+2,0);if((c=this.redFlag)!=null&&c.carrier){const y=this.redFlag.carrier.isPlayer?this.player.position:(d=this.redFlag.carrier.bot)==null?void 0:d.position;y&&(g=y.clone())}else if((f=this.blueFlag)!=null&&f.carrier){const y=this.blueFlag.carrier.isPlayer?this.player.position:(p=this.blueFlag.carrier.bot)==null?void 0:p.position;y&&(g=y.clone())}const _=30,v=18,S=g.x+Math.sin(this.spectatorAngle)*_,E=g.z+Math.cos(this.spectatorAngle)*_,b=Math.max(this.world.getGroundHeight(S,E)+4,g.y+v);this.player.camera.position.lerp(new q(S,b,E),Math.min(a*4,1)),this.player.camera.lookAt(g.x,g.y+1.5,g.z)}this.messageTimer>0&&(this.messageTimer-=a,this.messageTimer<=0&&(this.message="")),this.emitState(),this.renderer.render(this.scene,this.player.camera)};try{console.log("Game constructor started"),this.canvas=e,this.clock=new Ex,this.sounds=new ww,this.gameMode=t,this.playerTeam=r,this.scene=new K_,this.scene.background=new gt(8900331),this.scene.fog=new Fh(8900331,60,150),this.renderer=new Sw({canvas:e,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Mg;const a=new yx(16777215,.6);this.scene.add(a);const l=new xx(16777215,.8);l.position.set(30,50,20),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-50,l.shadow.camera.right=50,l.shadow.camera.top=50,l.shadow.camera.bottom=-50,this.scene.add(l),console.log("Creating world..."),this.world=new Mh,this.scene.add(this.world.mesh),console.log("World created and added to scene"),this.addTeamZoneMarkers(),console.log("Creating player..."),this.player=new Ew(this.world),this.player.team=r;const c=this.getSafeSpawnPos(r);this.player.position.copy(c),this.player.yaw=r==="blue"?Math.PI:0,this.player.updateCamera(),console.log("Player created");const d=new Yt(cr+.02,cr+.02,cr+.02),f=new lr({color:16777215,wireframe:!0,transparent:!0,opacity:.6});this.highlightMesh=new lt(d,f),this.highlightMesh.visible=!1,this.scene.add(this.highlightMesh);const p=new Yt(cr*.95,cr*.95,cr*.95),g=new lr({color:65416,transparent:!0,opacity:.4});this.buildPreviewMesh=new lt(p,g),this.buildPreviewMesh.visible=!1,this.scene.add(this.buildPreviewMesh),this.muzzleFlash=new Ad(16755200,0,5),this.scene.add(this.muzzleFlash),this.weaponContainer=new jn,this.player.camera.add(this.weaponContainer),this.scene.add(this.player.camera),this.createWeaponModels(),this.switchWeaponModel("rifle"),this.createFlags(),this.createCaptureZones(),this.gameMode==="multiplayer"&&(console.log("Spawning bots..."),this.spawnTeamBots("blue",6),this.spawnTeamBots("red",7),console.log("Bots spawned")),this.gameMode==="online"&&this.initializeNetwork(),this.boundResize=this.onResize.bind(this),this.boundMouseDown=this.onMouseDown.bind(this),this.boundMouseUp=this.onMouseUp.bind(this),this.boundWheel=this.onWheel.bind(this),this.boundKeyDown=this.onKeyDown.bind(this),this.boundKeyUp=this.onKeyUp.bind(this),this.boundMouseMove=this.onMouseMove.bind(this),window.addEventListener("resize",this.boundResize),e.addEventListener("mousedown",this.boundMouseDown),e.addEventListener("mouseup",this.boundMouseUp),e.addEventListener("wheel",this.boundWheel),document.addEventListener("keydown",this.boundKeyDown),document.addEventListener("keyup",this.boundKeyUp),document.addEventListener("mousemove",this.boundMouseMove),e.addEventListener("contextmenu",_=>_.preventDefault())}catch(a){throw console.error("Error in game constructor:",a),a}}addTeamZoneMarkers(){const e=new hs(100,60),t=new lr({color:2245836,transparent:!0,opacity:.05,side:ui}),r=new lt(e,t);r.rotation.x=-Math.PI/2,r.position.set(0,this.world.getOriginalGroundLevel()+.02,-45),this.scene.add(r);const a=new hs(100,60),l=new lr({color:13378082,transparent:!0,opacity:.05,side:ui}),c=new lt(a,l);c.rotation.x=-Math.PI/2,c.position.set(0,this.world.getOriginalGroundLevel()+.02,45),this.scene.add(c),this.addTeamFlag(co.x,co.z,2245836,"BLUE BASE"),this.addTeamFlag(uo.x,uo.z,13378082,"RED BASE")}addTeamFlag(e,t,r,a){const l=this.world.getGroundHeight(e,t),c=new Ai(.05,.05,4,6),d=new yn({color:8947848}),f=new lt(c,d);f.position.set(e,l+2,t),this.scene.add(f);const p=new hs(1.5,1),g=new yn({color:r,side:ui}),_=new lt(p,g);_.position.set(e+.8,l+3.5,t),this.scene.add(_)}getSafeSpawnPos(e){const t=e==="blue"?Cw:Rw,r=e==="blue"?bw:Pw,a=(Math.random()-.5)*Lw*2,l=t+Math.random()*(r-t),c=this.world.getGroundHeight(a,l);return new q(a,c,l)}createWeaponModels(){const e=new jn,t=new lt(new Yt(.08,.08,.55),new or({color:5921370,metalness:.7,roughness:.3}));t.position.set(0,0,-.15),e.add(t);const r=new lt(new Ai(.025,.025,.6,8),new or({color:3815994,metalness:.8,roughness:.2}));r.rotation.x=Math.PI/2,r.position.set(0,.01,-.65),e.add(r);const a=new lt(new Yt(.08,.12,.3),new or({color:9127187,metalness:.1,roughness:.8}));a.position.set(0,-.02,.25),e.add(a),e.position.copy(this.hipPosition),this.weaponModels.set("rifle",e);const l=new jn,c=new lt(new Yt(.09,.09,.35),new or({color:5921370,metalness:.7,roughness:.3}));c.position.set(0,0,-.1),l.add(c);const d=new lt(new Ai(.025,.025,.35,8),new or({color:3815994,metalness:.8,roughness:.2}));d.rotation.x=Math.PI/2,d.position.set(0,.01,-.4),l.add(d);const f=new lt(new Yt(.07,.1,.18),new or({color:9127187,metalness:.1,roughness:.8}));f.position.set(0,-.01,.18),l.add(f),l.position.copy(this.hipPosition),this.weaponModels.set("smg",l);const p=new jn,g=new lt(new Ai(.02,.02,.5,8),new yn({color:7029795}));g.position.set(0,0,-.2),p.add(g);const _=new lt(new Yt(.15,.02,.2),new yn({color:8947848}));_.position.set(0,-.25,-.45),p.add(_),p.position.copy(this.hipPosition),this.weaponModels.set("spade",p);const v=new jn,S=new lt(new Ai(.02,.02,.5,8),new yn({color:7029795}));S.position.set(0,0,-.2),v.add(S);const E=new lt(new Yt(.25,.04,.04),new yn({color:8947848}));E.position.set(0,.25,-.45),v.add(E),v.position.copy(this.hipPosition),this.weaponModels.set("pickaxe",v)}switchWeaponModel(e){this.isReloadAnimating=!1,this.reloadAnimationTime=0;for(const r of Object.keys(this.weapons))this.weapons[r].isReloading=!1;this.currentWeaponModel&&this.weaponContainer.remove(this.currentWeaponModel);const t=this.weaponModels.get(e);t&&(this.weaponContainer.add(t),this.currentWeaponModel=t,t.position.copy(this.hipPosition),t.rotation.set(0,0,0))}createFlags(){this.blueFlag=this.createFlagObject("blue",co),this.redFlag=this.createFlagObject("red",uo)}createFlagObject(e,t){const r=new jn,a=this.world.getGroundHeight(t.x,t.z);r.position.set(t.x,a,t.z);const l=new Ai(.06,.08,4,8),c=new or({color:10066329,roughness:.3,metalness:.7}),d=new lt(l,c);d.position.y=2,r.add(d);const f=new Ai(.6,.8,.3,12),p=new or({color:e==="blue"?2245768:8921634}),g=new lt(f,p);g.position.y=.15,r.add(g);const _=e==="blue"?2258943:16720435,v=new Yt(1.6,.9,.06),S=new yn({color:_}),E=new lt(v,S);E.position.set(.85,3.3,0),r.add(E);const b=new dc(.2,12,12),y=new lr({color:e==="blue"?6728447:16737894}),x=new lt(b,y);x.position.y=4,r.add(x);const I=e==="blue"?4491519:16729156,O=new Ad(I,3,22);O.position.y=4,r.add(O);const C=this.createNameTag(e,e==="blue"?"BLUE FLAG":"RED FLAG");return C.position.set(0,4.6,0),C.scale.set(2.4,.6,1),r.add(C),this.scene.add(r),{team:e,basePos:{...t},currentPos:new q(t.x,a,t.z),carrier:null,isDropped:!1,dropTimer:0,mesh:r,clothMesh:E,light:O}}resetFlagToBase(e){const t=this.world.getGroundHeight(e.basePos.x,e.basePos.z);e.currentPos.set(e.basePos.x,t,e.basePos.z),e.mesh.position.copy(e.currentPos),e.carrier=null,e.isDropped=!1,e.dropTimer=0}updateFlags(e){const t=[this.blueFlag,this.redFlag];for(const r of t)if(r.carrier){const a=r.carrier;let l=null,c=!1,d;if(a.isPlayer?(c=this.player.isDead,l=this.player.position,d=this.playerTeam):a.bot&&(c=a.bot.isDead,l=a.bot.position,d=a.bot.team),c||!l)r.carrier=null,r.isDropped=!0,r.dropTimer=30,a.isPlayer&&(this.player.carryingFlag=!1),a.bot&&(a.bot.carryingFlag=!1),this.showMessage(`🚩 ${r.team.toUpperCase()} flag was dropped!`);else{r.currentPos.set(l.x,l.y+.8,l.z),r.mesh.position.copy(r.currentPos),a.isPlayer&&(this.player.carryingFlag=!0),a.bot&&(a.bot.carryingFlag=!0);const f=d==="blue"?co:uo;Math.hypot(l.x-f.x,l.z-f.z)<5&&(d==="blue"?(this.blueCaptures++,this.showMessage(`🎉 BLUE TEAM (${a.name}) CAPTURED THE RED FLAG!`)):(this.redCaptures++,this.showMessage(`🚩 RED TEAM (${a.name}) CAPTURED THE BLUE FLAG!`)),this.sounds.capture(),a.isPlayer&&(this.player.carryingFlag=!1),a.bot&&(a.bot.carryingFlag=!1),this.resetFlagToBase(r))}}else if(r.mesh.position.copy(r.currentPos),r.clothMesh.rotation.y=Math.sin(performance.now()*.003)*.3,r.isDropped?(r.dropTimer-=e,r.light.intensity=2+Math.sin(performance.now()*.01)*1.5,r.dropTimer<=0&&(this.resetFlagToBase(r),this.showMessage(`🏳️ ${r.team.toUpperCase()} flag returned to base`))):r.light.intensity=3,this.player.isDead||Math.hypot(this.player.position.x-r.currentPos.x,this.player.position.z-r.currentPos.z)<3.5&&Math.abs(this.player.position.y-r.currentPos.y)<3.5&&(this.playerTeam!==r.team?(r.carrier={isPlayer:!0,name:"You"},r.isDropped=!1,this.player.carryingFlag=!0,this.sounds.capture(),this.showMessage(`🚩 YOU TOOK THE ${r.team.toUpperCase()} FLAG! Bring it to base!`)):r.isDropped&&(this.resetFlagToBase(r),this.sounds.respawn(),this.showMessage(`🛡️ YOU RETURNED THE ${r.team.toUpperCase()} FLAG TO BASE!`))),!r.carrier)for(const a of this.bots){if(a.isDead||a.carryingFlag)continue;if(Math.hypot(a.position.x-r.currentPos.x,a.position.z-r.currentPos.z)<3.5&&Math.abs(a.position.y-r.currentPos.y)<3.5){if(a.team!==r.team){r.carrier={isPlayer:!1,bot:a,name:a.name},r.isDropped=!1,a.carryingFlag=!0,this.sounds.weaponSwitch(),this.showMessage(`🚩 ${a.name} (${a.team.toUpperCase()}) took the ${r.team.toUpperCase()} flag!`);break}else if(r.isDropped){this.resetFlagToBase(r),this.sounds.respawn(),this.showMessage(`🛡️ ${a.name} returned the ${r.team.toUpperCase()} flag!`);break}}}}createCaptureZones(){}spawnTeamBots(e,t){for(let r=0;r<t;r++){const a=this.getSafeSpawnPos(e),l=this.createBotMesh(e);l.position.copy(a),this.scene.add(l);const c=`${e==="blue"?"Blue":"Red"} Bot ${r+1}`,d=this.createNameTag(e,c);d.position.y=2.6,l.add(d);const f=r===0||r===1?"defender":"attacker",p=(r%3-1)*8+(Math.random()-.5)*4;this.bots.push({mesh:l,position:a.clone(),velocity:new q,hp:100,maxHp:100,isDead:!1,respawnTimer:0,targetPos:a.clone(),moveTimer:1+Math.random()*2,shootTimer:1+Math.random()*2,burstRemaining:0,burstTimer:0,headY:1.8,grounded:!1,team:e,name:c,role:f,laneOffset:p,nameTag:d,isCrouching:!1,crouchTimer:0,behaviorState:f==="attacker"?"rushFlag":"defend",behaviorTimer:2+Math.random()*3,strafeDirection:Math.random()>.5?1:-1,stuckTimer:0,lastPos:a.clone(),jumpCooldown:0,skill:.6+Math.random()*.4,aggression:.5+Math.random()*.5,lastDamageTime:0,dodgeTimer:0,coverTimer:0,weapon:Math.random()>.5?"rifle":"smg",weaponMesh:null,isAiming:!1,aimTransition:0,carryingFlag:!1,flagMesh:null,lookAroundTimer:0,lookAroundTarget:0,walkCycle:Math.random()*Math.PI*2})}}createBotMesh(e){const t=Aw[e],r=new jn,a=new lt(new Yt(.6,.8,.4),new yn({color:t.body}));a.position.y=1.1,r.add(a);const l=new lt(new Yt(.4,.4,.4),new yn({color:16767916}));l.position.y=1.8,r.add(l);const c=new lt(new Yt(.45,.2,.45),new yn({color:t.accent}));c.position.y=2.05,r.add(c);const d=new lt(new Yt(.18,.6,.2),new yn({color:t.body}));d.position.set(-.4,1.1,0),r.add(d);const f=new lt(new Yt(.18,.6,.2),new yn({color:t.body}));f.position.set(.4,1.1,0),r.add(f);const p=new lt(new Yt(.2,.6,.25),new yn({color:t.legs}));p.position.set(-.15,.3,0),r.add(p);const g=new lt(new Yt(.2,.6,.25),new yn({color:t.legs}));g.position.set(.15,.3,0),r.add(g);const _=new jn,v=new lt(new Yt(.08,.08,.5),new yn({color:4868682}));_.add(v);const S=new lt(new Ai(.025,.025,.3,8),new yn({color:2763306}));return S.rotation.x=Math.PI/2,S.position.z=-.3,_.add(S),_.position.set(.4,1.1,-.3),r.add(_),r}createNameTag(e,t){const r=document.createElement("canvas");r.width=256,r.height=64;const a=r.getContext("2d");a.fillStyle=e==="blue"?"#4488ff":"#ff4444",a.font="bold 32px Arial",a.textAlign="center",a.fillText(t,128,40);const l=new lx(r),c=new Yg({map:l,transparent:!0}),d=new nx(c);return d.scale.set(2,.5,1),d}initializeNetwork(){this.networkClient=new Tw,this.networkClient.onConnect(()=>{this.showMessage(`Connected to game server as ${this.playerTeam.toUpperCase()}!`),this.networkClient.sendJoin(this.playerTeam,{x:this.player.position.x,y:this.player.position.y,z:this.player.position.z})}),this.networkClient.onDisconnect(()=>{this.showMessage("Disconnected from server. Reconnecting...")}),this.networkClient.onMessage("init",e=>{if(this.localPlayerId=e.playerId,e.captures&&(this.blueCaptures=e.captures.blue||0,this.redCaptures=e.captures.red||0),e.scores&&(this.blueKills=e.scores.blue||0,this.redKills=e.scores.red||0),e.players&&Array.isArray(e.players))for(const t of e.players)t.id!==this.localPlayerId&&this.addRemotePlayer(t.id,t.state);if(typeof e.inventory=="number"&&(this.inventory=e.inventory),e.voxelChanges&&Array.isArray(e.voxelChanges)&&e.voxelChanges.length>0){for(const t of e.voxelChanges)this.world.setVoxel(t.x,t.y,t.z,t.type,t.durability);this.world.update(!0)}this.showMessage(`🟢 Online Match Ready! (${this.playerTeam.toUpperCase()} Team)`)}),this.networkClient.onMessage("playerJoined",e=>{e.playerId!==this.localPlayerId&&this.addRemotePlayer(e.playerId,e.state)}),this.networkClient.onMessage("playerLeft",e=>{this.removeRemotePlayer(e.playerId)}),this.networkClient.onMessage("playerUpdated",e=>{var r;if(e.playerId===this.localPlayerId){((r=e.state)==null?void 0:r.hp)!==void 0&&e.state.hp<this.player.hp&&(this.player.hp=e.state.hp,this.sounds.hurt());return}let t=this.remotePlayers.get(e.playerId);if(t||(this.addRemotePlayer(e.playerId,e.state),t=this.remotePlayers.get(e.playerId)),t){if(t.state.team!==e.state.team){this.scene.remove(t.mesh);const a=this.createBotMesh(e.state.team),l=this.createNameTag(e.state.team,`Player ${e.playerId.slice(-4)}`);l.position.y=2.6,a.add(l),this.scene.add(a),t.mesh=a}t.state=e.state,t.mesh.visible=!e.state.isDead,t.targetPosition.set(e.state.position.x,e.state.position.y,e.state.position.z),t.targetRotation.set(0,e.state.rotation.yaw,0,"YXZ")}}),this.networkClient.onMessage("playerShot",e=>{e.playerId!==this.localPlayerId&&this.renderRemotePlayerShot(e.playerId,e.origin,e.direction,e.weapon)}),this.networkClient.onMessage("hitConfirmed",e=>{this.hitMarkerTimer=.25,this.sounds.hitMarker(),e.isHeadshot&&this.sounds.headshot()}),this.networkClient.onMessage("playerDamaged",e=>{if(e.playerId===this.localPlayerId)this.player.takeDamage(e.damage),this.sounds.hurt();else{const t=this.remotePlayers.get(e.playerId);t&&(t.state.hp=Math.max(0,t.state.hp-e.damage))}}),this.networkClient.onMessage("playerDied",e=>{if(e.playerId===this.localPlayerId)this.player.die(),this.player.respawnTimer=4,this.sounds.deathSound(),this.showMessage("☠️ You were eliminated! Respawning in 4s...");else{const t=this.remotePlayers.get(e.playerId);t&&(t.mesh.visible=!1,t.state.isDead=!0,t.state.hp=0),e.killerId===this.localPlayerId&&(this.playerTeam==="blue"?this.blueKills++:this.redKills++,this.sounds.killSound(),this.showMessage(`🎯 You eliminated Player ${e.playerId.slice(-4)}!`))}}),this.networkClient.onMessage("playerRespawned",e=>{if(e.playerId===this.localPlayerId)this.player.respawn(this.playerTeam,new q(e.position.x,e.position.y,e.position.z)),this.sounds.respawn(),this.showMessage("Respawned at base!");else{const t=this.remotePlayers.get(e.playerId);t&&(t.state.isDead=!1,t.state.hp=100,t.mesh.visible=!0,t.mesh.position.set(e.position.x,e.position.y,e.position.z),t.targetPosition.set(e.position.x,e.position.y,e.position.z))}}),this.networkClient.onMessage("voxelChanged",e=>{const{x:t,y:r,z:a,type:l,durability:c}=e.change,d=this.world.getVoxel(t,r,a);this.world.setVoxel(t,r,a,l,c),l!==0&&c<3&&this.world.updateVoxelColor(t,r,a,l,c),this.player.camera.position.distanceTo(new q(t,r,a))<30&&(l===0&&d&&d.type!==0?this.sounds.spadeHit():l===4&&(!d||d.type===0)&&this.sounds.buildPlace())}),this.networkClient.onMessage("inventoryUpdated",e=>{typeof e.inventory=="number"&&(this.inventory=e.inventory)}),this.networkClient.onMessage("flagPickedUp",e=>{const t=e.playerId===this.localPlayerId,r=e.flagTeam==="blue"?this.blueFlag:this.redFlag;r&&(r.isDropped=!1,t?(this.player.carryingFlag=!0,this.sounds.flagPickup(),this.showMessage(`🚩 YOU TOOK THE ${e.flagTeam.toUpperCase()} FLAG! RUN TO BASE!`)):(this.sounds.flagAlarm(),this.showMessage(`⚠️ ${e.flagTeam.toUpperCase()} FLAG TAKEN by Player ${e.playerId.slice(-4)}!`)))}),this.networkClient.onMessage("flagDropped",e=>{const t=e.flagTeam==="blue"?this.blueFlag:this.redFlag;t&&(t.currentPos.set(e.position.x,e.position.y+.5,e.position.z),t.mesh.position.copy(t.currentPos),t.carrier=null,t.isDropped=!0,this.showMessage(`🚩 ${e.flagTeam.toUpperCase()} FLAG DROPPED on the battlefield!`))}),this.networkClient.onMessage("flagReturned",e=>{const t=e.flagTeam==="blue"?this.blueFlag:this.redFlag;t&&(this.resetFlagToBase(t),this.showMessage(`🛡️ ${e.flagTeam.toUpperCase()} FLAG RETURNED TO BASE!`))}),this.networkClient.onMessage("flagCaptured",e=>{this.blueCaptures=e.captures.blue,this.redCaptures=e.captures.red,this.sounds.flagCapture(),e.playerId===this.localPlayerId?this.showMessage("🏆 YOU CAPTURED THE ENEMY FLAG! (+1 SCORE)"):this.showMessage(`🏆 ${e.team.toUpperCase()} TEAM SCORED A FLAG CAPTURE!`)}),this.networkClient.connect().catch(e=>{console.error("Failed to connect to server:",e),this.showMessage("Failed to connect to server")})}addRemotePlayer(e,t){if(this.remotePlayers.has(e))return;const r=this.createBotMesh(t.team);r.position.set(t.position.x,t.position.y,t.position.z);const a=this.createNameTag(t.team,`Player ${e.slice(-4)}`);a.position.y=2.6,r.add(a),this.scene.add(r),this.remotePlayers.set(e,{mesh:r,state:t,targetPosition:new q(t.position.x,t.position.y,t.position.z),targetRotation:new Wi(0,t.rotation.yaw,0,"YXZ"),lastShootingTime:0}),this.showMessage(`🎮 Player ${e.slice(-4)} (${t.team.toUpperCase()}) joined!`)}removeRemotePlayer(e){const t=this.remotePlayers.get(e);t&&(this.scene.remove(t.mesh),this.remotePlayers.delete(e),this.showMessage(`Player ${e.slice(-4)} left the game.`))}renderRemotePlayerShot(e,t,r,a){const l=new q(t.x,t.y,t.z),c=new q(r.x,r.y,r.z);this.createMuzzleFlash(l,c),this.createBulletTracer(l,c),this.createBulletShell(l,c),a==="smg"?this.sounds.smgShot():this.sounds.rifleShot()}onResize(){this.player.camera.aspect=window.innerWidth/window.innerHeight,this.player.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}onMouseDown(e){e.button===0?(this.isMouseDown=!0,this.performAction()):e.button===2&&(this.equipment==="rifle"||this.equipment==="smg"?this.isAiming=!this.isAiming:(this.buildMode=!0,this.tryBuild()))}onMouseUp(e){e.button===0&&(this.isMouseDown=!1),e.button===2&&(this.buildMode=!1)}onWheel(e){const t=["rifle","smg","spade","pickaxe"],r=t.indexOf(this.equipment);this.equipment=e.deltaY>0?t[(r+1)%4]:t[(r-1+4)%4],this.switchWeaponModel(this.equipment),this.isAiming=!1}onKeyDown(e){e.code==="Digit1"&&(this.equipment="rifle",this.switchWeaponModel("rifle")),e.code==="Digit2"&&(this.equipment="smg",this.switchWeaponModel("smg")),e.code==="Digit3"&&(this.equipment="spade",this.switchWeaponModel("spade")),e.code==="Digit4"&&(this.equipment="pickaxe",this.switchWeaponModel("pickaxe")),e.code==="KeyR"&&this.startReload(),e.code==="KeyP"&&this.toggleSpectator(),this.player.handleKeyDown(e.code)}onKeyUp(e){this.player.handleKeyUp(e.code)}onMouseMove(e){document.pointerLockElement?this.player.handleMouseMove(e.movementX,e.movementY):this.isMouseDown&&this.player.handleMouseMove(e.movementX*1.5,e.movementY*1.5)}toggleSpectator(){this.isSpectating=!this.isSpectating,this.isSpectating||this.player.updateCamera(),this.showMessage(this.isSpectating?"🎥 Spectator Camera: ON":"🎯 Player First-Person: ON")}requestPointerLock(e){e.requestPointerLock()}performAction(){if(this.player.isDead)return;const e=performance.now()/1e3;this.equipment==="rifle"||this.equipment==="smg"?this.shoot(e):this.equipment==="pickaxe"?this.usePickaxe(e):this.equipment==="spade"&&this.useSpade(e)}shoot(e){const t=this.weapons[this.equipment];if(!t||t.magazineSize===0||t.isReloading||e-t.lastFired<t.fireRate)return;if(t.currentAmmo<=0){this.startReload();return}t.lastFired=e,t.currentAmmo--;const r=this.player.getAimDirection(),a=this.player.camera.position.clone().add(r.clone().multiplyScalar(.5));this.createMuzzleFlash(a,r.clone()),this.createBulletTracer(a,r.clone()),this.createBulletShell(a,r.clone()),this.equipment==="rifle"?this.sounds.rifleShot():this.equipment==="smg"&&this.sounds.smgShot();const l=this.world.raycast(a,r,100),c=l?l.distance:100;l&&this.world.getVoxel(l.voxelPos.x,l.voxelPos.y,l.voxelPos.z)&&this.world.damageVoxel(l.voxelPos.x,l.voxelPos.y,l.voxelPos.z,1)&&this.world.updateVoxelColor(l.voxelPos.x,l.voxelPos.y,l.voxelPos.z,0,0);let d=null,f=!1;for(const[p,g]of this.remotePlayers){if(g.state.isDead||g.state.team===this.playerTeam)continue;const v=g.mesh.position.clone().sub(this.player.position).dot(r);if(v>0&&v<100&&v<c){const S=this.player.position.clone().add(r.clone().multiplyScalar(v)),E=Math.hypot(S.x-g.mesh.position.x,S.z-g.mesh.position.z),b=S.y-g.mesh.position.y;if(E<.75&&b>=-.2&&b<=2.3){d=p,f=b>=1.45,this.hitMarkerTimer=.25,this.sounds.hitMarker(),f&&this.sounds.headshot();break}}}this.networkClient&&this.networkClient.isConnected()&&this.networkClient.sendShoot({x:a.x,y:a.y,z:a.z},{x:r.x,y:r.y,z:r.z},d?{targetId:d,isHeadshot:f}:void 0);for(const p of this.bots){if(p.isDead||p.team===this.playerTeam)continue;const _=p.position.clone().sub(this.player.position).dot(r);if(_>0&&_<60&&_<c){const v=this.player.position.clone().add(r.clone().multiplyScalar(_)),S=Math.hypot(v.x-p.position.x,v.z-p.position.z),E=v.y-p.position.y;if(S<.65&&E>=0&&E<=2.1){const b=E>=1.5,y=b?t.damage.head:t.damage.body;p.hp-=y,this.hitMarkerTimer=.2,this.sounds.hitMarker(),p.hp<=0&&(p.isDead=!0,p.mesh.visible=!1,p.respawnTimer=6,this.playerTeam==="blue"?this.blueKills++:this.redKills++,this.sounds.killSound(),this.showMessage(`🎯 You killed ${p.name} ${b?"(HEADSHOT!)":""}`));break}}}}usePickaxe(e){if(e-this.lastActionTime<.3)return;this.lastActionTime=e;const t=this.player.getAimDirection(),r=this.player.camera.position.clone().add(t.clone().multiplyScalar(.5)),a=this.world.raycast(r,t,5);a&&(this.world.damageVoxel(a.voxelPos.x,a.voxelPos.y,a.voxelPos.z,3).destroyed&&(this.inventory++,this.sounds.pickaxeHit()),this.networkClient&&this.networkClient.isConnected()&&this.networkClient.sendUseTool("pickaxe",{x:a.voxelPos.x,y:a.voxelPos.y,z:a.voxelPos.z}))}useSpade(e){if(e-this.lastActionTime<.3)return;this.lastActionTime=e;const t=this.player.getAimDirection(),r=this.player.camera.position.clone().add(t.clone().multiplyScalar(.5)),a=this.world.raycast(r,t,5);a&&(this.world.damageVoxel(a.voxelPos.x,a.voxelPos.y,a.voxelPos.z,3),this.sounds.spadeHit(),this.networkClient&&this.networkClient.isConnected()&&this.networkClient.sendUseTool("spade",{x:a.voxelPos.x,y:a.voxelPos.y,z:a.voxelPos.z}))}tryBuild(){if(this.inventory<=0)return;const e=this.player.getAimDirection(),t=this.player.camera.position.clone().add(e.clone().multiplyScalar(.5)),r=this.world.raycast(t,e,6);if(r){const a=r.voxelPos.x+Math.round(r.normal.x),l=r.voxelPos.y+Math.round(r.normal.y),c=r.voxelPos.z+Math.round(r.normal.z);!this.world.isSolid(a,l,c)&&this.world.canBuild(a,l,c)&&(this.world.setVoxel(a,l,c,l0,3),this.inventory--,this.sounds.buildPlace(),this.networkClient&&this.networkClient.isConnected()&&this.networkClient.sendBuild({x:a,y:l,z:c}))}}startReload(){const e=this.weapons[this.equipment];!e||e.magazineSize===0||e.isReloading||e.currentAmmo===e.magazineSize||(e.isReloading=!0,e.reloadStartTime=performance.now()/1e3,this.isReloadAnimating=!0,this.reloadAnimationTime=0,this.reloadAnimationDuration=e.reloadTime,this.sounds.reload(),this.networkClient&&this.networkClient.isConnected()&&this.networkClient.sendReload())}createMuzzleFlash(e,t){const r=new Ad(16755200,5,8);r.position.copy(e),this.scene.add(r);const a=new dc(.15,8,8),l=new lr({color:16763904,transparent:!0,opacity:.9}),c=new lt(a,l);c.position.copy(e),this.scene.add(c),this.muzzleFlashes.push({light:r,mesh:c,life:0,maxLife:.08})}createBulletTracer(e,t){const r=new Yt(.02,.02,.5),a=new lr({color:16776960,transparent:!0,opacity:.8}),l=new lt(r,a);l.position.copy(e),this.scene.add(l);const c=t.clone().multiplyScalar(200);this.bulletTracers.push({mesh:l,velocity:c,life:0,maxLife:.5,hasWhizzed:!1,hasImpacted:!1})}createBulletShell(e,t){const r=new Ai(.01,.01,.03,8),a=new or({color:14329120,metalness:.8,roughness:.2}),l=new lt(r,a);l.position.copy(e),l.rotation.z=Math.PI/2,this.scene.add(l);const d=new q(-t.z,0,t.x).normalize().multiplyScalar(3).add(new q(0,2,0)),f=new q((Math.random()-.5)*10,(Math.random()-.5)*10,(Math.random()-.5)*10);this.bulletShells.push({mesh:l,velocity:d,rotationSpeed:f,life:0,maxLife:2})}showMessage(e){this.message=e,this.messageTimer=2}start(){this.animate()}findNearestEnemy(e){let t=null,r=1/0;const a=e.team==="blue"?this.blueFlag:this.redFlag;if(a&&a.carrier){if(a.carrier.isPlayer&&e.team!==this.playerTeam&&!this.player.isDead){if(e.position.distanceTo(this.player.position)<75)return{pos:this.player.position.clone(),isPlayer:!0}}else if(a.carrier.bot&&!a.carrier.bot.isDead&&a.carrier.bot.team!==e.team&&e.position.distanceTo(a.carrier.bot.position)<75)return{pos:a.carrier.bot.position.clone(),isPlayer:!1,bot:a.carrier.bot}}if(e.team!==this.playerTeam&&!this.player.isDead){const l=e.position.distanceTo(this.player.position);l<r&&(r=l,t={pos:this.player.position.clone(),isPlayer:!0})}for(const l of this.bots){if(l===e||l.isDead||l.team===e.team)continue;const c=e.position.distanceTo(l.position);c<r&&(r=c,t={pos:l.position.clone(),isPlayer:!1,bot:l})}return t}updateBots(e){var a;const t=l=>l==="blue"?this.blueFlag:this.redFlag,r=l=>l==="blue"?this.redFlag:this.blueFlag;for(let l=0;l<this.bots.length;l++){const c=this.bots[l];if(c.isDead){if(c.respawnTimer-=e,c.respawnTimer<=0){c.isDead=!1,c.hp=c.maxHp,c.mesh.visible=!0;const E=this.getSafeSpawnPos(c.team);c.position.copy(E),c.lastPos.copy(E),c.stuckTimer=0,c.carryingFlag=!1,c.mesh.position.copy(c.position)}continue}const d=r(c.team),f=t(c.team),p=c.team==="blue"?co:uo,g=this.findNearestEnemy(c),_=g?c.position.distanceTo(g.pos):1/0;if(c.carryingFlag)c.targetPos.set(p.x+c.laneOffset*.3,0,p.z),c.behaviorState="returnFlag";else if(f&&f.carrier){const E=f.carrier.isPlayer?this.player.position:(a=f.carrier.bot)==null?void 0:a.position;E&&c.position.distanceTo(E)<90?(c.targetPos.copy(E),c.behaviorState="intercept"):(c.targetPos.set(d.currentPos.x+c.laneOffset,0,d.currentPos.z),c.behaviorState="rushFlag")}else if(d&&d.carrier)c.targetPos.set(p.x+c.laneOffset,0,p.z),c.behaviorState="escort";else if(c.role==="attacker")c.targetPos.set(d.currentPos.x+c.laneOffset,0,d.currentPos.z),c.behaviorState="rushFlag";else{if(c.moveTimer-=e,c.moveTimer<=0){c.moveTimer=2+Math.random()*2;const E=Math.random()*Math.PI*2,b=6+Math.random()*14;c.targetPos.set(p.x+Math.cos(E)*b,0,p.z+Math.sin(E)*b)}c.behaviorState="defend"}const v=c.targetPos.clone().sub(c.position);if(v.y=0,v.length()>.8){const E=v.clone().normalize();let b=c.carryingFlag?6.5:c.role==="attacker"?5.8:4.6;c.isCrouching&&(b=2.5);const y=c.position.x+E.x*.8,x=c.position.z+E.z*.8;if(this.world.getGroundHeight(y,x)-c.position.y>1.25){const Y=-E.z*c.strafeDirection,$=E.x*c.strafeDirection;E.x=Y,E.z=$}const C=c.position.x+E.x*b*e,R=c.position.z+E.z*b*e,P=this.world.getGroundHeight(C,R);P-c.position.y<=1.35&&(c.position.x=C,c.position.z=R,c.position.y=P),Math.hypot(c.position.x-c.lastPos.x,c.position.z-c.lastPos.z)<.04?(c.stuckTimer+=e,c.stuckTimer>.3&&(c.strafeDirection=-c.strafeDirection,c.position.y+=.5,c.stuckTimer=0)):(c.stuckTimer=0,c.lastPos.copy(c.position));let w=E;if(g&&_<35){const Y=g.pos.clone().sub(c.position);Y.y=0,Y.length()>.1&&(w=Y.normalize())}const D=Math.atan2(w.x,w.z),B=c.mesh.rotation.y;let G=D-B;for(;G>Math.PI;)G-=Math.PI*2;for(;G<-Math.PI;)G+=Math.PI*2;c.mesh.rotation.y+=G*Math.min(e*12,1),c.walkCycle+=e*(b*1.8);const K=Math.sin(c.walkCycle)*.5,ee=c.mesh.children,V=ee.find(Y=>Y.position.x<-.1&&Y.position.y<1),J=ee.find(Y=>Y.position.x>.1&&Y.position.y<1),he=ee.find(Y=>Y.position.x<-.3&&Y.position.y>.8),te=ee.find(Y=>Y.position.x>.3&&Y.position.y>.8);V&&(V.rotation.x=K),J&&(J.rotation.x=-K),he&&(he.rotation.x=-K*.7),te&&(te.rotation.x=K*.7)}else{const E=c.mesh.children,b=E.find(O=>O.position.x<-.1&&O.position.y<1),y=E.find(O=>O.position.x>.1&&O.position.y<1),x=E.find(O=>O.position.x<-.3&&O.position.y>.8),I=E.find(O=>O.position.x>.3&&O.position.y>.8);b&&(b.rotation.x*=.9),y&&(y.rotation.x*=.9),x&&(x.rotation.x*=.9),I&&(I.rotation.x*=.9)}if(c.mesh.position.copy(c.position),g&&_<35){const E=c.mesh.children.find(b=>b.position.y>1.7&&b.position.y<2);if(E){const b=g.pos.clone().sub(c.position),y=Math.atan2(b.x,b.z)-c.mesh.rotation.y;let x=Math.atan2(Math.sin(y),Math.cos(y));E.rotation.y=Math.max(-1.05,Math.min(1.05,x))}}g&&_<45&&(c.burstRemaining>0?(c.burstTimer-=e,c.burstTimer<=0&&(c.burstRemaining--,c.burstTimer=.11,this.executeBotShot(c,g))):(c.shootTimer-=e,c.shootTimer<=0&&(c.weapon==="smg"?(c.burstRemaining=3+Math.floor(Math.random()*3),c.burstTimer=0,c.shootTimer=1+Math.random()*.8):(this.executeBotShot(c,g),c.shootTimer=.7+Math.random()*.6))))}}executeBotShot(e,t){const r=e.position.clone().add(new q(0,1.4,0)),a=t.pos.clone().add(new q(0,1.2,0)).sub(r),l=a.length(),c=a.clone().normalize(),d=this.world.raycast(r,c,50);if(d&&d.distance<l-.5)return;this.createMuzzleFlash(r,c),this.createBulletTracer(r,c);const f=e.position.distanceTo(this.player.position),p=Math.sin(Math.atan2(e.position.x-this.player.position.x,e.position.z-this.player.position.z)-this.player.yaw);this.sounds.playDistantShot(e.weapon,f,p);const g=Math.max(.25,.75-l/60)*e.skill;if(Math.random()<g){if(t.isPlayer){const _=e.weapon==="rifle"?25+Math.random()*20:12+Math.random()*12;this.player.takeDamage(_),this.player.addCameraShake(.15),this.sounds.hurt(),this.player.isDead&&(e.team==="red"?this.redKills++:this.blueKills++,this.sounds.killSound(),this.showMessage(`☠️ You were killed by ${e.name}!`))}else if(t.bot){const _=e.weapon==="rifle"?40+Math.random()*25:18+Math.random()*15;t.bot.hp-=_,t.bot.hp<=0&&(t.bot.isDead=!0,t.bot.mesh.visible=!1,t.bot.respawnTimer=6,e.team==="blue"?this.blueKills++:this.redKills++,this.showMessage(`🎯 ${e.name} eliminated ${t.bot.name}!`))}}}handleBuildClick(){this.tryBuild()}emitState(){var e,t,r,a;if(this.onStateChange){const l=this.weapons[this.equipment];let c="";this.player.carryingFlag?c=`You (${this.playerTeam.toUpperCase()})`:(e=this.redFlag)!=null&&e.carrier?c=`${this.redFlag.carrier.name} (${this.redFlag.carrier.isPlayer?this.playerTeam.toUpperCase():(t=this.redFlag.carrier.bot)==null?void 0:t.team.toUpperCase()})`:(r=this.blueFlag)!=null&&r.carrier&&(c=`${this.blueFlag.carrier.name} (${this.blueFlag.carrier.isPlayer?this.playerTeam.toUpperCase():(a=this.blueFlag.carrier.bot)==null?void 0:a.team.toUpperCase()})`),this.onStateChange({hp:this.player.hp,maxHp:this.player.maxHp,equipment:this.equipment,inventory:this.inventory,isDead:this.player.isDead,respawnTimer:this.player.respawnTimer,hitMarker:this.hitMarkerTimer>0,targetInfo:this.player.targetInfo||"",message:this.message,messageTimer:this.messageTimer,buildMode:this.buildMode,buildValid:this.inventory>0,blueKills:this.blueKills,redKills:this.redKills,blueCaptures:this.blueCaptures,redCaptures:this.redCaptures,isAiming:this.isAiming,currentAmmo:l?l.currentAmmo:0,magazineSize:l?l.magazineSize:0,isReloading:l?l.isReloading:!1,playerCarryingFlag:this.player.carryingFlag,flagCarrierName:c,isSpectating:this.isSpectating,isOnline:this.gameMode==="online",connectedPlayersCount:this.remotePlayers.size+1,isNetworkConnected:this.networkClient?this.networkClient.isConnected():!1,localPlayerId:this.localPlayerId})}}destroy(){this.networkClient&&this.networkClient.disconnect(),window.removeEventListener("resize",this.boundResize),this.canvas.removeEventListener("mousedown",this.boundMouseDown),this.canvas.removeEventListener("mouseup",this.boundMouseUp),this.canvas.removeEventListener("wheel",this.boundWheel),document.removeEventListener("keydown",this.boundKeyDown),document.removeEventListener("keyup",this.boundKeyUp),document.removeEventListener("mousemove",this.boundMouseMove),this.renderer.dispose()}}function Nw(){const s=tr.useRef(null),e=tr.useRef(null),[t,r]=tr.useState({hp:100,maxHp:100,equipment:"rifle",inventory:0,isDead:!1,respawnTimer:0,hitMarker:!1,targetInfo:"",message:"",messageTimer:0,buildMode:!1,buildValid:!0,blueKills:0,redKills:0,blueCaptures:0,redCaptures:0,isAiming:!1,currentAmmo:10,magazineSize:10,isReloading:!1,playerCarryingFlag:!1,flagCarrierName:"",isSpectating:!1}),[a,l]=tr.useState(!1),[c,d]=tr.useState(null),[f,p]=tr.useState("blue"),[g,_]=tr.useState(!1);tr.useEffect(()=>{const x=()=>{_(!!document.pointerLockElement)};return document.addEventListener("pointerlockchange",x),()=>document.removeEventListener("pointerlockchange",x)},[]),tr.useEffect(()=>{if(!s.current||e.current||!c)return;const x=s.current;return console.log("Creating game with mode:",c,"team:",f,"canvas size:",x.width,x.height),(x.width===0||x.height===0)&&(x.width=window.innerWidth,x.height=window.innerHeight),setTimeout(()=>{if(!s.current||e.current)return;const I=new Dw(s.current,c,f);I.onStateChange=O=>r(O),I.start(),e.current=I,console.log("Game created and started with mode:",c,"team:",f),I.requestPointerLock(s.current),l(!0)},100),()=>{console.log("Cleaning up game"),e.current&&(e.current.destroy(),e.current=null)}},[c,f]);const v=(x,I="blue")=>{p(I),d(x)},S=()=>{s.current&&e.current&&!document.pointerLockElement&&e.current.requestPointerLock(s.current)},E=x=>{x.preventDefault(),e.current&&e.current.handleBuildClick()},b={rifle:"🎯 Rifle",smg:"💨 SMG",spade:"🪣 Spade",pickaxe:"⛏️ Pickaxe"},y={rifle:"1",smg:"2",spade:"3",pickaxe:"4"};return re.jsxs("div",{className:"relative w-screen h-screen overflow-hidden bg-black",children:[re.jsx("canvas",{ref:s,className:"w-full h-full block",onClick:S,onContextMenu:E}),!a&&re.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-black/80 z-50",children:re.jsxs("div",{className:"text-center max-w-3xl px-4",children:[re.jsx("h1",{className:"text-5xl font-bold text-white mb-3",children:"🎮 Voxel FPS"}),re.jsx("p",{className:"text-lg text-gray-300 mb-1",children:"Red vs Blue — Capture the Flag"}),re.jsxs("p",{className:"text-sm text-gray-400 mb-6",children:["You are ",re.jsx("span",{className:"text-blue-400 font-bold",children:"BLUE"})," team. Push to the ",re.jsx("span",{className:"text-red-400 font-bold",children:"RED"})," flag!"]}),re.jsxs("div",{className:"flex flex-wrap gap-3 justify-center mb-6",children:[re.jsx("button",{onClick:()=>v("multiplayer","blue"),className:"px-6 py-3.5 bg-[#00ff88] text-black font-bold text-lg rounded-xl hover:bg-[#00cc66] transition-colors shadow-lg cursor-pointer",children:"🤖 Play vs Bots"}),re.jsxs("button",{onClick:()=>v("online","blue"),className:"px-6 py-3.5 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2",children:[re.jsx("span",{children:"🌐"})," Join Online (Blue Team)"]}),re.jsxs("button",{onClick:()=>v("online","red"),className:"px-6 py-3.5 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2",children:[re.jsx("span",{children:"🌐"})," Join Online (Red Team)"]}),re.jsxs("button",{onClick:()=>{v("multiplayer"),setTimeout(()=>{var x;return(x=e.current)==null?void 0:x.toggleSpectator()},300)},className:"px-6 py-3.5 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2",children:[re.jsx("span",{children:"🎥"})," AI Spectator"]}),re.jsx("button",{onClick:()=>v("singleplayer"),className:"px-5 py-3.5 bg-gray-700 text-gray-200 font-bold text-base rounded-xl hover:bg-gray-600 transition-colors shadow-lg cursor-pointer",children:"🧪 Free Sandbox"})]}),re.jsxs("p",{className:"text-xs text-purple-300/80 mb-2",children:["💡 ",re.jsx("b",{children:"Multiplayer Testing:"})," Open this app in 2 browser tabs or windows, choose Blue on one and Red on the other!"]}),re.jsxs("div",{className:"mt-6 bg-gray-900/60 rounded-xl p-5 text-left max-w-xl mx-auto text-sm",children:[re.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[re.jsxs("div",{children:[re.jsx("h4",{className:"text-[#00ff88] font-bold mb-2",children:"Movement"}),re.jsx("p",{className:"text-gray-300",children:"WASD - Move"}),re.jsx("p",{className:"text-gray-300",children:"Mouse - Look"}),re.jsx("p",{className:"text-gray-300",children:"Space - Jump"}),re.jsx("p",{className:"text-gray-300",children:"Shift - Sprint"}),re.jsx("p",{className:"text-gray-300",children:"Ctrl/C - Crouch"})]}),re.jsxs("div",{children:[re.jsx("h4",{className:"text-[#00ff88] font-bold mb-2",children:"Equipment"}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"1"})," 🎯 Rifle (WW2 iron sights)"]}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"2"})," 💨 SMG (WW2 iron sights)"]}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"3"})," 🪣 Spade (dig 2 blocks)"]}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"4"})," ⛏️ Pickaxe (harvest)"]})]})]}),re.jsxs("div",{className:"mt-3 pt-3 border-t border-gray-700",children:[re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"Left Click"})," — Shoot / Use tool"]}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"Right Click"})," — Toggle iron sights / Build"]}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"R"})," — Reload weapon"]}),re.jsxs("p",{className:"text-gray-300",children:[re.jsx("b",{children:"Mouse Wheel"})," — Switch equipment"]}),re.jsxs("div",{className:"mt-2 text-xs text-gray-400 space-y-1",children:[re.jsx("p",{children:"🎯 1 headshot / 3 body shots to kill"}),re.jsx("p",{children:"🔫 Rifle: 10 rounds | SMG: 30 rounds (unlimited ammo)"}),re.jsx("p",{children:"🏃 Running + shooting = less accurate | 🧎 Crouching = more accurate"}),re.jsxs("p",{children:["🏗️ ",re.jsx("b",{children:"How to build:"})," Harvest blocks with pickaxe (4), then right-click to place"]}),re.jsx("p",{children:"💥 All terrain is destroyable by gunfire (3 shots per voxel)"}),re.jsx("p",{children:"🧪 Singleplayer mode: No bots, test building & combat freely"})]})]})]})]})}),a&&re.jsxs(re.Fragment,{children:[re.jsxs("div",{className:"absolute top-4 left-4 z-40 flex items-center gap-2",children:[!g&&!t.isSpectating&&re.jsxs("div",{onClick:S,className:"bg-gray-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-700 text-xs text-gray-300 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors shadow-lg",title:"Click anywhere to lock pointer aim",children:[re.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-pulse"}),re.jsxs("span",{children:[re.jsx("b",{children:"Click Canvas"})," to Lock Aim"]}),re.jsx("span",{className:"text-gray-500",children:"|"}),re.jsx("span",{className:"text-gray-400",children:"Drag/Arrows to turn"})]}),re.jsxs("button",{onClick:()=>{var x;return(x=e.current)==null?void 0:x.toggleSpectator()},className:`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${t.isSpectating?"bg-indigo-600 hover:bg-indigo-500 text-white ring-2 ring-indigo-400":"bg-gray-900/80 hover:bg-gray-800 text-gray-300 border border-gray-700"}`,children:[re.jsx("span",{children:"🎥"}),re.jsx("span",{children:t.isSpectating?"Exit Spectator (P)":"Spectate AI (P)"})]})]}),t.isSpectating&&re.jsxs("div",{className:"absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-indigo-950/80 border border-indigo-500/50 backdrop-blur-md px-5 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs text-indigo-200",children:[re.jsx("span",{className:"w-2 h-2 rounded-full bg-indigo-400 animate-ping"}),re.jsxs("span",{children:["🎥 ",re.jsx("b",{children:"SPECTATOR CAMERA ACTIVE"})," — Tracking live battle action & flag carriers (Press ",re.jsx("b",{children:"P"})," to play)"]})]}),c==="online"&&re.jsxs("div",{className:"absolute top-4 right-4 z-30 flex flex-col items-end gap-1.5",children:[re.jsxs("div",{className:"bg-gray-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-purple-500/50 shadow-xl flex items-center gap-2.5 text-xs text-white",children:[re.jsx("span",{className:`w-2.5 h-2.5 rounded-full ${t.isNetworkConnected?"bg-emerald-400 animate-pulse":"bg-amber-400"}`}),re.jsx("span",{className:"font-semibold",children:t.isNetworkConnected?`Live Server: ${t.connectedPlayersCount||1} Player${(t.connectedPlayersCount||1)>1?"s":""}`:"Connecting to Server..."}),re.jsxs("span",{className:`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${f==="blue"?"bg-blue-950 text-blue-300 border border-blue-800":"bg-red-950 text-red-300 border border-red-800"}`,children:[f," Team"]})]}),(t.connectedPlayersCount||1)<=1&&re.jsx("div",{className:"bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-700 text-[11px] text-gray-300 max-w-xs text-right",children:"💡 Open in a 2nd tab/window to test 1v1 PvP & flags!"})]}),(c==="multiplayer"||c==="online")&&re.jsx("div",{className:"absolute top-4 left-1/2 -translate-x-1/2 z-10",children:re.jsxs("div",{className:"flex flex-col items-center gap-2",children:[re.jsxs("div",{className:"flex items-center bg-gray-900/90 rounded-xl overflow-hidden border-2 border-gray-700",children:[re.jsxs("div",{className:"px-5 py-2 bg-blue-900/40 flex flex-col items-center gap-1",children:[re.jsx("span",{className:"text-blue-300 font-bold text-sm",children:"BLUE"}),re.jsxs("div",{className:"flex items-center gap-3",children:[re.jsxs("div",{className:"flex flex-col items-center",children:[re.jsx("span",{className:"text-gray-400 text-xs",children:"Kills"}),re.jsx("span",{className:"text-white font-bold text-xl",children:t.blueKills})]}),re.jsxs("div",{className:"flex flex-col items-center",children:[re.jsx("span",{className:"text-gray-400 text-xs",children:"Flags"}),re.jsx("span",{className:"text-yellow-400 font-bold text-xl",children:t.blueCaptures})]})]})]}),re.jsx("div",{className:"px-3 py-2 text-gray-500 font-bold",children:"VS"}),re.jsxs("div",{className:"px-5 py-2 bg-red-900/40 flex flex-col items-center gap-1",children:[re.jsx("span",{className:"text-red-300 font-bold text-sm",children:"RED"}),re.jsxs("div",{className:"flex items-center gap-3",children:[re.jsxs("div",{className:"flex flex-col items-center",children:[re.jsx("span",{className:"text-gray-400 text-xs",children:"Kills"}),re.jsx("span",{className:"text-white font-bold text-xl",children:t.redKills})]}),re.jsxs("div",{className:"flex flex-col items-center",children:[re.jsx("span",{className:"text-gray-400 text-xs",children:"Flags"}),re.jsx("span",{className:"text-yellow-400 font-bold text-xl",children:t.redCaptures})]})]})]})]}),t.flagCarrierName&&re.jsx("div",{className:"bg-yellow-900/90 px-4 py-2 rounded-lg border-2 border-yellow-500 animate-pulse",children:re.jsxs("span",{className:"text-yellow-300 font-bold text-sm",children:["🚩 Flag Carrier: ",t.flagCarrierName]})})]})}),c==="singleplayer"&&re.jsx("div",{className:"absolute top-4 left-1/2 -translate-x-1/2 z-10",children:re.jsx("div",{className:"bg-blue-900/80 rounded-xl px-6 py-2 border-2 border-blue-600",children:re.jsx("span",{className:"text-blue-200 font-bold text-sm",children:"🧪 SINGLEPLAYER MODE"})})}),re.jsx("div",{className:"absolute bottom-8 left-8 z-10",children:re.jsx("div",{className:"bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700",children:re.jsxs("div",{className:"flex items-center gap-3",children:[re.jsx("div",{className:"w-32 h-3 bg-gray-700 rounded-full overflow-hidden",children:re.jsx("div",{className:"h-full rounded-full transition-all",style:{width:`${t.hp/t.maxHp*100}%`,background:t.hp>50?"#00ff88":t.hp>25?"#ffcc00":"#ff3366"}})}),re.jsx("span",{className:"text-white font-bold text-lg",children:t.hp})]})})}),re.jsx("div",{className:"absolute bottom-8 right-8 z-10",children:re.jsxs("div",{className:"bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700",children:[re.jsx("div",{className:"space-y-1",children:["rifle","smg","spade","pickaxe"].map(x=>re.jsxs("div",{className:`flex items-center gap-2 px-2 py-1 rounded text-sm ${t.equipment===x?"bg-[#00ff88]/20 text-[#00ff88]":"text-gray-400"}`,children:[re.jsx("span",{className:"font-mono w-3",children:y[x]}),re.jsx("span",{children:b[x]}),t.equipment===x&&re.jsx("span",{className:"ml-auto",children:"●"})]},x))}),(t.equipment==="rifle"||t.equipment==="smg")&&re.jsx("div",{className:"text-xs text-gray-500 mt-2 pt-1 border-t border-gray-700",children:t.isAiming?"🎯 Iron Sights":"Right-click to aim"})]})}),(t.equipment==="rifle"||t.equipment==="smg")&&re.jsx("div",{className:"absolute bottom-32 right-8 z-10",children:re.jsxs("div",{className:"bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700",children:[re.jsx("div",{className:"text-gray-400 text-xs mb-1",children:"Ammo"}),re.jsxs("div",{className:"flex items-baseline gap-2",children:[re.jsx("span",{className:`text-2xl font-bold ${(t.currentAmmo??0)===0?"text-red-500":(t.currentAmmo??0)<(t.magazineSize??10)*.3?"text-yellow-500":"text-white"}`,children:t.currentAmmo??0}),re.jsxs("span",{className:"text-gray-500 text-sm",children:["/ ",t.magazineSize??0]})]}),t.isReloading&&re.jsx("div",{className:"text-xs text-yellow-500 mt-1 animate-pulse",children:"🔄 Reloading..."})]})}),re.jsx("div",{className:"absolute top-8 right-8 z-10",children:re.jsxs("div",{className:"bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700",children:[re.jsx("div",{className:"text-gray-400 text-xs",children:"Inventory"}),re.jsxs("div",{className:"text-white font-bold text-xl",children:["📦 ",t.inventory]})]})}),re.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10",children:re.jsxs("div",{className:"relative w-8 h-8",children:[t.isAiming&&re.jsx("div",{className:"absolute inset-0 rounded-full border-2 border-white/30"}),re.jsx("div",{className:"absolute top-1/2 left-0 w-3 h-0.5 bg-white -translate-y-1/2"}),re.jsx("div",{className:"absolute top-1/2 right-0 w-3 h-0.5 bg-white -translate-y-1/2"}),re.jsx("div",{className:"absolute left-1/2 top-0 w-0.5 h-3 bg-white -translate-x-1/2"}),re.jsx("div",{className:"absolute left-1/2 bottom-0 w-0.5 h-3 bg-white -translate-x-1/2"}),re.jsx("div",{className:"absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"})]})}),t.hitMarker&&re.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30",children:re.jsxs("div",{className:"w-6 h-6 relative",children:[re.jsx("div",{className:"absolute top-0 left-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] rotate-45 origin-left"}),re.jsx("div",{className:"absolute top-0 right-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] -rotate-45 origin-right"}),re.jsx("div",{className:"absolute bottom-0 left-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] -rotate-45 origin-left"}),re.jsx("div",{className:"absolute bottom-0 right-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] rotate-45 origin-right"}),re.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"})]})}),t.message&&t.messageTimer>0&&re.jsx("div",{className:"absolute top-1/3 left-1/2 -translate-x-1/2 z-10",children:re.jsx("div",{className:"bg-gray-900/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-700",children:re.jsx("p",{className:"text-white font-medium text-center",children:t.message})})}),t.targetInfo&&re.jsx("div",{className:"absolute bottom-24 left-1/2 -translate-x-1/2 z-10",children:re.jsx("div",{className:"bg-gray-900/60 rounded-lg px-3 py-1",children:re.jsx("p",{className:"text-gray-300 text-xs",children:t.targetInfo})})}),t.isDead&&re.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-red-900/40 z-30",children:re.jsxs("div",{className:"text-center",children:[re.jsx("h2",{className:"text-4xl font-bold text-white mb-2",children:"☠️ ELIMINATED"}),re.jsxs("p",{className:"text-gray-300",children:["Respawning in ",Math.ceil(t.respawnTimer),"s"]}),re.jsxs("p",{className:"text-gray-400 text-sm mt-2",children:["BLUE ",t.blueKills," — ",t.redKills," RED"]})]})})]})]})}jv.createRoot(document.getElementById("root")).render(re.jsx(Nw,{}));
