// var express = require("express");
// var app = express();
// var port = 8080;
// var ip = "127.0.0.1";

// app.configure(function(){
//   app.use(
//     "/",
//     express.static(__dirname + "/public")
//     );
// });
// app.listen(port, ip);

var http = require("http");
var handle = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(handle.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

