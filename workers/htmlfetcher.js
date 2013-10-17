var helpers = require(__dirname+'/lib/html-fetcher-helpers');
var allURLs = helpers.readUrls();
helpers.downloadUrls(allURLs);