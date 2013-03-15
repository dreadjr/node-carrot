var rest = require('./rest-client');
var Document = require('./document');
var XMLDocumentSource = require('./xml-document-source');
var ExternalDocumentSource = require('./external-document-source');

module.exports = {
  createClient: function(options) {
    return new rest(options);
  },
  Document: Document,
  XMLDocumentSource: XMLDocumentSource,
  ExternalDocumentSource: ExternalDocumentSource
}
