var HttpRequest = require('./http-request');
var Client = require('./client');
var util = require('util');

var HttpClient = function Client(options) {
  Client.call(this, options);
}

util.inherits(HttpClient, Client);

HttpClient.prototype.get = function(options, source, callback) {
  var defaults = {
    // IF XML
    "dcs.c2stream": source.toXML(),



    // IF Source
    "query": "",
    "dcs.source": "",
    /*
     etools — eTools Metasearch Engine
     bing-web — Bing Web Search
     news — Bing News Search
     images — Bing Image Search
     wiki — Wikipedia search with eTools
     pubmed — PubMed medical database
     indeed — Jobs from indeed.com
     xml — XML
     solr — Solr Search Engine
     */
    "results": "",




    "dcs.algorithm": "lingo",
    "dcs.output.format": "JSON", // JSON | XML
    "dcs.json.callback": "",
    "dcs.clusters.only": false,
    "MultilingualClustering.defaultLanguage": ""
  }

  // TODO: can pass in other attribute/key values

  this._request(options, source, callback);
}

HttpClient.prototype.components = function(callback) {
  // dcs/components
}

// GET
// dcs/input-example
// dcs/output-example-xml
// dcs/output-example-json
// dcs/status

// http://localhost:8080/dcs/rest?dcs.source=etools&query=doug
// only DCS_C2STREAM can do POST
// POST
// dcs/rest
// dcs/cluster

// http://localhost:8080/parameters.html

// TODO: make own events
HttpClient.prototype._request = function(operation, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  var request =  new AWS.Request(this, operation, params);

  if (callback) {
    request.on('complete', function (resp) {
      callback.call(resp, resp.error, resp.data);
    });
    request.send();
  }

  return request;

  //new HttpRequest(this, options, source).execute(callback);
}

module.exports = HttpClient;