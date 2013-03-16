var XML = require('xml');
var _ = require('underscore');

var Document = function(id, title, snippet, url, fields) {
  this.id = id;
  this.title = title;
  this.snippet = snippet;
  this.url = url;
  this.fields = fields;
  //<field key="rank"><value type="java.lang.Integer" value="9"/></field>
  // { rank: 9 } infer type
}

Document.prototype.toXML = function(options) {
  return XML(this.toJSON(), options);
}

Document.prototype.calculateJavaType = function(value) {
  return (typeof value === 'number') ? 'java.lang.Integer' : 'java.lang.String';
}

Document.prototype.toJSON = function() {
  var self = this;

  var json = {
    document: [
      { _attr: { id: self.id } },
      { title: self.title },
      { snippet: self.snippet },
      { url: self.url }
    ]
  };

  if (self.fields) {
    _.each(self.fields, function(value, key) {
      var type = self.calculateJavaType(value);

      if (type)

      var field_json = [
        { _attr: { key: key }},
        {
          value: {
            _attr: { type: type, value: value }
          }
        }
      ];

      json.document.push({ field: field_json });
    });

  }

  return json;
}

module.exports = Document
