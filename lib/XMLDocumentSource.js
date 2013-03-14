var XML = require('xml');
var _ = require('underscore');
var util = require('util');

var DocumentSource = require('./documentsource');
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
    this.documents.push(doc);
  }

  return this;
}

XMLDocumentSource.prototype.add = function(title, snippet, url) {
  return this.addDocument(new Document(title, snippet, url));
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