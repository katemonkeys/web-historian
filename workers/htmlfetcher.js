var helpers = require(__dirname+'/lib/html-fetcher-helpers');
var helperTime = helpers.rightNow;
// var allURLs;
var sitesFile = __dirname + "/../data/sites.txt";

helpers.readUrls(sitesFile, function(urls){
  helpers.downloadUrls(urls);}
);
