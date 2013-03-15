var restler = require('restler');

var HttpRequest = function HttpRequest(client, operation, params) {
  this.params = params;
  this.client = client;
  /*this.event = {
    method: (meta.method || "").toLowerCase(),
    path: meta.path,
    started_at: new Date(),
    uuid: this._uuid(),
    meta: meta
  }*/
}

HttpRequest.prototype.execute = function() {
  var self = this;

  this.client.emit('dcs.rest.start', this.event);

  restler.post("http://localhost:8080/dcs/rest", {
    multipart: true,
    data: {
      "dcs.c2stream": source.toXML(),
      "dcs.algorithm": 'lingo',
      "dcs.output.format": 'JSON',
      "dcs.json.callback": ''
    }
  }).on("complete", function(data) {
    console.log(data);
  });
}