var events = require('events');
var util = require('util');

var Client = function Client(options) {
  events.EventEmitter.call(this);
}

util.inherits(Client, events.EventEmitter);

module.exports = Client;