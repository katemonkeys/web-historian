var fs = require('fs');
var http = require('http-get');
exports.rightNow = new Date().valueOf();
var sitesDir =  __dirname + "/../../data/sites/" + exports.rightNow + "-";
var mysql = require('mysql');

mysqlClient = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web_historian',
  supportBigNumbers: true
});

exports.readUrls = function(url, cb){
  var results = fs.readFileSync(url, 'utf8').split('\n');
  // console.log('results',results);
  return cb(results);
};

exports.downloadUrls = function(urls){
  // to length -1 because assumed the last line in sites.txt is empty
  for (var i=0; i<urls.length-1; i++) {
    writeToDB(urls[i]);
    http.get("http://"+urls[i],sitesDir+urls[i], function(err,response){
      if(err) console.error("Error! ", err);
    });
  }
};

var writeToDB = function(urlToAdd){
  // var humanReadable = new Date(exports.rightNow).toString();
  var siteToAdd = ''+urlToAdd;
  var locationToAdd = ''+sitesDir+urlToAdd;
  // console.log("site to add" + urlToAdd);

  var toInsert = {
    site: siteToAdd,
    disklocation: locationToAdd,
    timearchived: exports.rightNow
  };
  var headerString = 'INSERT INTO archives SET ?';
  mysqlClient.query(headerString, toInsert, function(err){
    if (err) throw err;
    console.log("inserted entry to DB");
  });
};
