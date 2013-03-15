var Client = require('./client');
var util = require('util');
var rest = require('restler');
var _ = require('underscore');
var xmlsource = require('./xml-document-source');
var externalsource = require('./external-document-source');

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

var rest = require('restler');
require('xml2js');

// TODO: support both event emitter and callback style
var RestClient = rest.service(function(options) {
    this.defaults.host = options.host;
    this.defaults.port = options.port;
    this.defaults.baseURL = 'http://' + this.defaults.host + ':' + this.defaults.port;
    this.baseURL = this.defaults.baseURL;
    console.log('+'+this.defaults.baseURL);
  },
  {
    //baseURL: 'http://localhost:8080'
  },
  {
    components: function(simpleOutput) {
      var self = this;
      function componentSimpleParser(data, callback) {
        rest.parsers.xml(data, function(err, data) {
          if (err) {
            return callback(err, null);
          }

          if (!data) { // already js object
            return callback(null, null);
          }

          var components = {
            sources: _.map(data["component-suite"].sources[0].source, function(elem) {
              return {
                id: elem.$.id,
                component_class: elem.$["component-class"],
                attribute_sets_resource: elem.$["attribute-sets-resource"],
                label: elem.label[0],
                mnemonic: elem.mnemonic[0],
                title: elem.title[0],
                description: elem.description[0],
                icon_path: (elem["icon-path"]||[])[0] || '',
                examples: _.map((((elem["example-queries"]||{})[0]||[])["example-query"]||[]), function(query) { return query; })
              };
            }),
            algorithms: _.map(data["component-suite"].algorithms[0].algorithm, function(elem) {
              return {
                id: elem.$.id,
                component_class: elem.$["component-class"],
                attribute_sets_resource: elem.$["attribute-sets-resource"] || '',
                label: elem.label[0],
                title: elem.title[0]
              };
            })
          }

          return callback(null, components);
        });
      }

      return self.get('/dcs/components', { parser: simpleOutput ? componentSimpleParser : rest.parsers.auto });
    },
    example: function(type, format) {
      var self = this;
      // input, output-example-xml, output-example-json

      var url = '/dcs/'+type+'-example';
      if (format) {
        url += '-'+format;
      }

      return self.get(url);
    },
    status: function() {
      return this.get('/dcs/status', { parser: rest.parsers.xml });
    },
    rest: function(source, options) {
      if (!options) options = {}
      // source // external, xml

      var opts = {
        multipart: true,
        data: _.clone(options)
      }

      // some defaults
      opts.data["dcs.algorithm"] = options["dcs.algorithm"] || "lingo";
      opts.data["dcs.output.format"] = options["dcs.output.format"] || "JSON";
      opts.data["dcs.json.callback"] = options["dcs.json.callback"] || "";
      opts.data["dcs.clusters.only"] = options["dcs.clusters.only"] || false;
      //opts.data["MultilingualClustering.defaultLanguage"] = options["MultilingualClustering.defaultLanguage"] || "";

      if (source instanceof xmlsource) {
        opts.data["dcs.c2stream"] = source.toXML();
      } else if (source instanceof externalsource) {
        console.log("------external");
        opts.data["query"] = source.query;
        opts.data["dcs.source"] = source.source;
      }

      return this.post('/dcs/rest', opts);
    },
    cluster: function() {
      return this.rest.apply(this, arguments);
    }
    /*test: function() {
     var self = this;
     return {
     one: function() {
     return self.get('/dcs/components', { parser: rest.parsers.xml });
     }
     }
     },*/
  }
);

/*
var RestClient = function Client(options) {
  Client.call(this, options);
}

util.inherits(RestClient, Client);
*/

module.exports = RestClient;