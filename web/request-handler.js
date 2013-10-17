var path = require('path');
var fs = require('fs');
var headers = {};

var mimeTypes = {
  '.js' : 'text/javascript',
  '.css' : 'text/css',
  '.gif' : 'image/gif',
  '.html': 'text/html'
};

module.exports.datadir = path.join(__dirname, "/../data/sites.txt"); // tests will need to override this.

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
// ------------ GET ------------------
//
var handleGET = function(request, response){
  var fileName = path.basename(request.url) || "index.html";
  var fileExt = path.extname(request.url);
  var statusCode = 200;
  // console.log("fileExt="+fileExt);
  var fullPath;

  if (fileName === "index.html" || fileExt === ".css" || fileExt === ".js") {
    fullPath = __dirname+"/public/"+fileName;
  } else {
    fullPath = __dirname + "/../data/sites/" + fileName;
  }
  fs.readFile(fullPath, function(err, stuff){
    if(!err){
      headers['Content-Type'] = mimeTypes[fileExt];
      response.writeHead(statusCode, headers);
      response.end(stuff);
    }else{
      console.log("there's a problem   ", err);
    }
  });
};



//
// ------------ POST ------------------
//
var handlePOST = function(request, response){
  // console.log("recieved POST request");
  var body = "";
  var urlName;
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    // console.log("something happened, yo: ", body);
    urlName = body.split("=")[1];
    writeToFile(urlName);
    response.writeHead(302, headers);
    response.end();
  });
};

var writeToFile = function(urlToAdd){
  var file = __dirname + "/../data/sites/"+urlToAdd;
  if (fs.existsSync(file)) {
    return;
  } else {
    // var stream = fs.createWriteStream(module.exports.datadir);
    // stream.once('open', function(fd) {
      // stream.append(urlToAdd + "\n");
      // stream.end();
    // });
    fs.appendFile(module.exports.datadir,urlToAdd+"\n", function(err) {
      if(err) throw err;
      console.log("Successfully appended to file!");
    });
  }

};








