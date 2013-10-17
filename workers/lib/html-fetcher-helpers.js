var fs = require('fs');
var http = require('http-get');
var sitesDir =  __dirname + "/../../data/sites/";

exports.readUrls = function(url, cb){
  var results = fs.readFileSync(url, 'utf8').split('\n');
  return cb(results);
};

exports.downloadUrls = function(urls){
  // to length -1 because assumed the last urls is empty
  for (var i=0; i<urls.length-1; i++) {
    http.get("http://"+urls[i],sitesDir+urls[i], function(err,result){
      if(err) throw err;
      console.log("success downloading url");
    });
  }
};
