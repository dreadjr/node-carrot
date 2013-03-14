var XML = require('xml');

var Document = function(title, snippet, url) {
  this.title = title;
  this.snippet = snippet;
  this.url = url;
}

Document.prototype.toXML = function(options) {
  return XML(this.toJSON(), options);
}

Document.prototype.toJSON = function() {
  var self = this;
  return {
    document: [
      { title: self.title },
      { snippet: self.snippet },
      { url: self.url }
    ]
  }; 
}

module.exports = Document