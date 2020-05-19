(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports,require("@angular/core")):"function"==typeof define&&define.amd?define(["exports","@angular/core"],b):b(a.asyncTrace={},a.core)})(this,function(a,b){'use strict';function c(a={}){return Object.keys(a).map(b=>encodeURIComponent(b)+"="+encodeURIComponent(a[b])).join("&")}function d(a,b={}){const d=c(b);return d?a+(-1===a.indexOf("?")?"?":"&")+d:a}function e(a){return{ok:200<=a.status&&300>a.status,status:a.status,statusText:a.statusText,headers:a.getAllResponseHeaders(),data:a.responseText,json:()=>JSON.parse(a.responseText)}}function f(a,b=null){return{ok:!1,status:a.status,statusText:a.statusText,headers:a.getAllResponseHeaders(),data:b||a.statusText,json:()=>JSON.parse(b||a.statusText)}}function g(a,b,c={},g=null,h=n){const i=h.ignoreCache||n.ignoreCache,j=h.headers||n.headers,k=h.timeout||n.timeout;return new Promise(h=>{const l=new XMLHttpRequest;l.open(a,d(b,c)),j&&Object.keys(j).forEach(a=>l.setRequestHeader(a,j[a])),i&&l.setRequestHeader("Cache-Control","no-cache"),l.timeout=k,l.onload=()=>{h(e(l))},l.onerror=()=>{h(f(l,"Failed to make request."))},l.ontimeout=()=>{h(f(l,"Request took longer than expected."))},"post"===a&&g?(l.setRequestHeader("Content-Type","application/json"),l.send(JSON.stringify(g))):l.send()})}function h(){"toJSON"in Error.prototype||Object.defineProperty(Error.prototype,"toJSON",{value:function(){var a={};return Object.getOwnPropertyNames(this).forEach(function(b){a[b]=this[b]},this),void 0===a.stack&&this.stack&&(a.stack=this.stack),a},configurable:!0,writable:!0}),"toJSON"in l.prototype||Object.defineProperty(l.prototype,"toJSON",{value:function(){if(this&&this.task){var a={type:this.task.type,// data: this.task.data,
source:this.task.source,// @ts-ignore
target:this.task.target,// @ts-ignore
eventName:this.task.eventName};return a.target&&a.target instanceof HTMLElement?a.target=a.target.outerHTML:a.target&&a.target instanceof XMLHttpRequest&&(a.target="XMLHttpRequest"),a}return null},configurable:!0,writable:!0})}class i{static InvalidApiKey(){throw new Error("Invalid api key, Please contact apikey@asynctrace.com")}}class j{static getFrames(a){return a.stack?a.stack.split(j.NEWLINE):[]}}j.NEWLINE="\n",j.ERROR_TAG="STACKTRACE TRACKING",j.creationTrace="__creationTrace__",j.SEP_TAG="__SEP_TAG__",j.sepTemplate=j.SEP_TAG+"@[native]",j.demoApiKey="async-trace-demo";class k{constructor(a){this.timestamp=new Date,this.task=new l(a);// Some implementations of exception handling don't create a stack trace if the exception
// isn't thrown, however it's faster not to actually throw the exception.
const b=this.getStacktraceWithUncaughtError(),c=this.getStacktraceWithCaughtError();this.error=b.stack?b:c.stack?c:b}getStacktraceWithUncaughtError(){return new Error(j.ERROR_TAG)}getStacktraceWithCaughtError(){try{throw this.getStacktraceWithUncaughtError()}catch(a){return a}}}class l{constructor(a){this.task=a}}class m{constructor(){this._useLocalUrl=!1,this.apiKey=j.demoApiKey}static get instance(){return this._instance||(this._instance=new this)}setConfig(a){a.userInfo&&(this.userInfo={id:a.userInfo.id,email:a.userInfo.email,userName:a.userInfo.userName,other:a.userInfo.other}),this.apiKey=a.apiKey,this.sourceMapLocation=a.sourceMapLocation,this.enablePerformanceMonitor=a.enablePerformanceMonitor,this.enableApiMonitor=a.enableApiMonitor,this._useLocalUrl=a._useLocalUrl}}const n={ignoreCache:!1,headers:{Accept:"application/json, text/javascript, text/plain"},// default max duration for a request
timeout:5e3};class o{constructor(){this.unknown="-",this.nVer=navigator.appVersion,this.nAgt=navigator.userAgent,this.browser=navigator.appName,this.version=""+parseFloat(navigator.appVersion),this.majorVersion=parseInt(navigator.appVersion,10),this.mobile=!1,this.screenSize="",this.os=this.unknown,this.osVersion=this.unknown,this.cookieEnabled=!!navigator.cookieEnabled,this.setScreenSizeIfPossible(),this.setBrowserInfo(),this.setCookieInfo(),this.setOsInfo()}setScreenSizeIfPossible(){if(window.screen.width){const a=screen.width?screen.width:"",b=screen.height?screen.height:"";this.screenSize+=""+a+" x "+b}}setBrowserInfo(){let a,b,c;// Opera
// mobile version
-1!=(b=this.nAgt.indexOf("Opera"))&&(this.browser="Opera",this.version=this.nAgt.substring(b+6),-1!=(b=this.nAgt.indexOf("Version"))&&(this.version=this.nAgt.substring(b+8))),-1==(b=this.nAgt.indexOf("OPR"))?-1==(b=this.nAgt.indexOf("Edge"))?-1==(b=this.nAgt.indexOf("MSIE"))?-1==(b=this.nAgt.indexOf("Chrome"))?-1==(b=this.nAgt.indexOf("Safari"))?-1==(b=this.nAgt.indexOf("Firefox"))?-1==this.nAgt.indexOf("Trident/")?(a=this.nAgt.lastIndexOf(" ")+1)<(b=this.nAgt.lastIndexOf("/"))&&(this.browser=this.nAgt.substring(a,b),this.version=this.nAgt.substring(b+1),this.browser.toLowerCase()==this.browser.toUpperCase()&&(this.browser=navigator.appName)):(this.browser="Microsoft Internet Explorer",this.version=this.nAgt.substring(this.nAgt.indexOf("rv:")+3)):(this.browser="Firefox",this.version=this.nAgt.substring(b+8)):(this.browser="Safari",this.version=this.nAgt.substring(b+7),-1!=(b=this.nAgt.indexOf("Version"))&&(this.version=this.nAgt.substring(b+8))):(this.browser="Chrome",this.version=this.nAgt.substring(b+7)):(this.browser="Microsoft Internet Explorer",this.version=this.nAgt.substring(b+5)):(this.browser="Microsoft Edge",this.version=this.nAgt.substring(b+5)):(this.browser="Opera",this.version=this.nAgt.substring(b+4)),-1!=(c=this.version.indexOf(";"))&&(this.version=this.version.substring(0,c)),-1!=(c=this.version.indexOf(" "))&&(this.version=this.version.substring(0,c)),-1!=(c=this.version.indexOf(")"))&&(this.version=this.version.substring(0,c)),this.majorVersion=parseInt(""+this.version,10),isNaN(this.majorVersion)&&(this.version=""+parseFloat(navigator.appVersion),this.majorVersion=parseInt(navigator.appVersion,10)),this.mobile=/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(this.nVer)}setCookieInfo(){"undefined"!=typeof navigator.cookieEnabled||this.cookieEnabled||(document.cookie="testcookie",this.cookieEnabled=-1!=document.cookie.indexOf("testcookie"))}setOsInfo(){// system
let a=[{s:"Windows 10",r:/(Windows 10.0|Windows NT 10.0)/},{s:"Windows 8.1",r:/(Windows 8.1|Windows NT 6.3)/},{s:"Windows 8",r:/(Windows 8|Windows NT 6.2)/},{s:"Windows 7",r:/(Windows 7|Windows NT 6.1)/},{s:"Windows Vista",r:/Windows NT 6.0/},{s:"Windows Server 2003",r:/Windows NT 5.2/},{s:"Windows XP",r:/(Windows NT 5.1|Windows XP)/},{s:"Windows 2000",r:/(Windows NT 5.0|Windows 2000)/},{s:"Windows ME",r:/(Win 9x 4.90|Windows ME)/},{s:"Windows 98",r:/(Windows 98|Win98)/},{s:"Windows 95",r:/(Windows 95|Win95|Windows_95)/},{s:"Windows NT 4.0",r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},{s:"Windows CE",r:/Windows CE/},{s:"Windows 3.11",r:/Win16/},{s:"Android",r:/Android/},{s:"Open BSD",r:/OpenBSD/},{s:"Sun OS",r:/SunOS/},{s:"Chrome OS",r:/CrOS/},{s:"Linux",r:/(Linux|X11(?!.*CrOS))/},{s:"iOS",r:/(iPhone|iPad|iPod)/},{s:"Mac OS X",r:/Mac OS X/},{s:"Mac OS",r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:"QNX",r:/QNX/},{s:"UNIX",r:/UNIX/},{s:"BeOS",r:/BeOS/},{s:"OS/2",r:/OS\/2/},{s:"Search Bot",r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}];for(let b in a){let c=a[b];if(c.r.test(this.nAgt)){this.os=c.s;break}}let b;switch(/Windows/.test(this.os)&&(b=/Windows (.*)/.exec(this.os),this.osVersion=b?b[1]:this.unknown,this.os="Windows"),this.os){case"Mac OS X":b=/Mac OS X (10[\.\_\d]+)/.exec(this.nAgt),this.osVersion=b?b[1]:this.unknown;break;case"Android":b=/Android ([\.\_\d]+)/.exec(this.nAgt),this.osVersion=b?b[1]:this.unknown;break;case"iOS":this.osVersion=/OS (\d+)_(\d+)_?(\d+)?/.exec(this.nVer),this.osVersion=this.osVersion[1]+"."+this.osVersion[2]+"."+(0|this.osVersion[3]);}}/**
         * getDeviceInfo
         */getDeviceInfo(){return{screen:this.screenSize,browser:this.browser,browserVersion:this.version,browserMajorVersion:this.majorVersion,mobile:this.mobile,os:this.os,osVersion:this.osVersion,cookies:this.cookieEnabled}}}let p=[];class q{constructor(){this.handleSyncError=a=>{const b=!!a.stack&&a.stack.includes("__handled_async_error__");if(!b){const b=window.Zone.currentTask,c={frames:[new k(b)],currentFrame:a.stack?a.stack.split("\n"):[],error:"",deviceInfo:new o().getDeviceInfo(),userInfo:m.instance.userInfo,apiKey:m.instance.apiKey,url:window.location.href};c.error=a.message,m.instance._useLocalUrl&&console.log("handleSyncError sync error",c),this.sendToServer(c)}}}post(a,b,c,d){// if Error.stackTraceLimit is 0, means stack trace
// is disabled, so we don't need to generate long stack trace
// this will improve performance in some test(some test will
// set stackTraceLimit to 0, https://github.com/angular/zone.js/issues/698
const e=window.Zone.currentTask||d.task,f={frames:e.data&&e.data[j.creationTrace],currentFrame:[],error:"",deviceInfo:new o().getDeviceInfo(),userInfo:m.instance.userInfo,apiKey:m.instance.apiKey,url:window.location.href};if(d instanceof Error&&e){if(f.currentFrame=d.stack?d.stack.split("\n"):[],f.error=d.message,d.message.includes("Uncaught (in promise)")&&d.message&&d.message.length){const a=d.message.split("\n");a&&a.length&&(f.error=a[0])}m.instance._useLocalUrl&&console.log("post: send to server: Error instance",f)}else f.currentFrame=d,f.error=d.message,m.instance._useLocalUrl&&console.log("post: send to server: Not Error instance",f);this.sendToServer(f)}sendToServer(a){const b=m.instance._useLocalUrl?"http://localhost:3000/clientError":"https://api.asynctrace.com/clientError";// console.log('final', JSON.parse(JSON.stringify(clientError)));
g("post",b,{},a).then(a=>{p.forEach(b=>b(!1,a))},a=>console.warn(a))}}class r{constructor(){this.name="asynctrace-stack-trace",this.longStackTraceLimit=10}onScheduleTask(a,b,c,d){const e=window.Zone.currentTask;let f=e&&e.data&&e.data[j.creationTrace]||[];// if (AsyncTraceConfig.instance._useLocalUrl) {
//   console.log('onScheduleTask', trace)
// }
// console.log('target', currentTask && currentTask)
//
return d.source.includes("XMLHttpRequest")&&(Error.stackTraceLimit=30),f=[new k(e)].concat(f),d.source.includes("XMLHttpRequest")&&(Error.stackTraceLimit=15),f.length>this.longStackTraceLimit&&(f.length=this.longStackTraceLimit),d.data||(d.data={}),"eventTask"===d.type&&(d.data=Object.assign({},d.data)),d.data[j.creationTrace]=f,a.scheduleTask(c,d)}onHandleError(a,b,c,d){return m.instance._useLocalUrl&&console.log("onHandleError: current error",d),d.stack+="\n    __handled_async_error__",new q().post(a,b,c,d),m.instance._useLocalUrl&&console.log("onHandleError: current error",d,"other frames",window.Zone.currentTask||d.task),a.handleError(c,d)}}class s extends b.NgZone{constructor(a=!1){super({enableLongStackTrace:a||!1}),Error.stackTraceLimit=15,this._inner=this._inner.fork(new r)}}class t extends s{constructor(){super(!0)}}const u=new class{constructor(){// this is need to define `toJson` implementation for Error
h(),this.platformConfig=m.instance}setUp(a){return this.platformConfig.setConfig(a),this.isValidApiKey()?this:i.InvalidApiKey()}getAsyncTraceZone(){if(!this.isValidApiKey())return i.InvalidApiKey();const a=new s;return a}getAsyncTraceFullStackZone(){if(!this.isValidApiKey())return i.InvalidApiKey();const a=new t;return a}isValidApiKey(){// this.platformConfig.apiKey
return!0}},v=new j,w=new q().handleSyncError;a.asyncTrace=u,a.AsyncTraceUtil=j,a.asyncTraceUtil=v,a.LongStackTrace=k,a.handleSyncError=w,a.httpRequestKey=function(a,b,c={},d={},e=n){return d.apiKey=m.instance.apiKey,g(a,b,c,d,e)},a.sendErrorHook=function(a){p.push(a)},Object.defineProperty(a,"__esModule",{value:!0})});