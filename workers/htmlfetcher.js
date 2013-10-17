var helpers = require(__dirname+'/lib/html-fetcher-helpers');

var sitesFile = __dirname + "/../data/sites.txt";
var allURLs;

helpers.readUrls(sitesFile, function(urls){
  helpers.downloadUrls(urls);}
);