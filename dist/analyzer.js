let host="api.asynctrace.com",port="80",nodeProcess=require("process"),fs=require("fs"),path=require("path"),readline=require("readline"),querystring=require("querystring"),https=require("http"),args=process.argv.find(a=>a.includes("apiKey")),apiKey="demo-key",regex=/(?<=class )[^ ]*/;(function(){if(!args)return void console.log("AsyncTrace: ApiKey is not found!. Please set the ApiKey to analyze components.");apiKey=args.split("=")[1],nodeProcess.chdir("../../"),console.log("current directory",nodeProcess.cwd());let a=findFilePathByExtension(nodeProcess.cwd()+"/src",".ts"),b=[],c=[];for(let d=0;d<a.length;d++){let e=a[d],f=readline.createInterface({input:fs.createReadStream(e),crlfDelay:1/0});b.push(new Promise(a=>{f.on("line",b=>{let d=regex.exec(b);if(d&&d[0]){let b=path.relative(nodeProcess.cwd(),e);b=b.replace(/\\/g,"/"),c.push({name:d[0],path:b}),f.close(),f.removeAllListeners(),a()}}),f.on("close",()=>{a()})}))}Promise.all(b).then(()=>{sendToServer(c)})})();function findFilePathByExtension(a,b,c,d){return c=c||fs.readdirSync(a),d=d||[],c.forEach(c=>{var e=path.join(a,c);fs.statSync(e).isDirectory()?d=findFilePathByExtension(e,b,fs.readdirSync(e),d):-1===c.indexOf(".spec.ts")&&-1===c.indexOf(".d.ts")&&0<=c.indexOf(b)&&d.push(e)}),d}function sendToServer(a){var b=querystring.stringify({apiKey:apiKey,componentList:a.map(a=>a.name+":"+a.path).join(",")}),c={host:host,port:port,path:"/componentAnalyzer",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":b.length}},d=https.request(c,a=>{a.on("data",a=>{process.stdout.write(a)})});d.on("error",a=>{console.error(a)}),d.write(b),d.end()}