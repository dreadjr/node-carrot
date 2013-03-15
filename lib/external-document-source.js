var util = require('util');

var DocumentSource = require('./document-source');

var ExternalDocumentSource = function(query, source) {
  this.query = query;
  this.source = source;
}

util.inherits(ExternalDocumentSource, DocumentSource);

ExternalDocumentSource.prototype.setQuery = function(query) {
  this.query = query;
  return this;
}

ExternalDocumentSource.prototype.setSource = function(source) {
  this.source = source;
  return this;
}

module.exports = ExternalDocumentSource;