var XML = require('xml');
var _ = require('underscore');
var util = require('util');

var DocumentSource = require('./document-source');
var Document = require('./document');

var XMLDocumentSource = function(query) {
  this.query = query;
  this.documents = [];
}

util.inherits(XMLDocumentSource, DocumentSource);

XMLDocumentSource.prototype.setQuery = function(query) {
  this.query = query;
  return this;
}

XMLDocumentSource.prototype.addDocument = function(doc) {
  var self = this;
  if (doc instanceof Document) {
    self.documents.push(doc);
  }

  return self;
}

XMLDocumentSource.prototype.add = function(id, title, snippet, url, fields) {
  return this.addDocument(new Document(id, title, snippet, url, fields));
}

XMLDocumentSource.prototype.toXML = function(options) {
  return XML(this.toJSON(), options);
}

XMLDocumentSource.prototype.toJSON = function() {
  var self = this;
  var base = {
    searchresult: [
      {
        query: self.query
      }
    ]
  };

  _.each(self.documents, function(doc) {
    base.searchresult.push(doc.toJSON());
  });

  return base;
}

module.exports = XMLDocumentSource;