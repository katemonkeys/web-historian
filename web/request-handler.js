var path = require('path');
var fs = require('fs');
var headers = {};

var mimeTypes = {
  '.js' : 'text/javascript',
  '.css' : 'text/css',
  '.gif' : 'image/gif',
  '.html': 'text/html'
};

module.exports.datadir = path.join(__dirname, "/../data/sites.txt");

module.exports.handleRequest = function (request, response) {
  if (request.method === 'GET') {
    handleGET(request, response);
  }else if (request.method === 'POST') {
    handlePOST(request, response);
  } else {
    var statusCode = 404;
    response.writeHead(statusCode,headers);
    console.log(exports.datadir);
  }
};

//
// ------------ SUB-HANDLERS: ------------------
//
var handleGET = function(request, response){
  var fileName = path.basename(request.url) || "index.html";
  var fileExt = path.extname(request.url);
  var statusCode = 200;
  var fullPath;

  // --  checks if should serve archived content or client interface
  if (fileName === "index.html" || fileExt === ".css" || fileExt === ".js") {
    fullPath = __dirname+"/public/"+fileName;
  } else {
    fullPath = __dirname + "/../data/sites/" + fileName;
  }

  // -- checks if file exists and serves or returns 404
  if(fs.existsSync(fullPath)){
    fs.readFile(fullPath, function(err, stuff){
      if(!err){
        headers['Content-Type'] = mimeTypes[fileExt];
        response.writeHead(statusCode, headers);
        response.end(stuff);
      }else{
        console.log("there's a problem   ", err);
      }
    });
  } else{
    response.writeHead(404, headers);
    response.end();
  }

};

var handlePOST = function(request, response){
  var body = "";
  var urlName;

  request.on('data', function(data){
    body += data;
  });

  request.on('end', function(){
    urlName = body.split("=")[1];
    writeToFile(urlName);
    // writeToDB(urlName);
    response.writeHead(302, headers);
    response.end();
  });
};

var writeToFile = function(urlToAdd){
  var file = __dirname + "/../data/sites/"+urlToAdd;
  if (fs.existsSync(file)) {
    return;
  } else {
    fs.appendFile(module.exports.datadir,urlToAdd+"\n", function(err) {
      if(err) throw err;
    });
  }
};






