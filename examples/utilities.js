var carrot = require('../lib');
var client = carrot.createClient({ host: 'localhost', port: '8080'});

client.status().on('complete', function(data) {
  output('GET /dcs/rest/status', data);
});

client.example("output", "xml").on('complete', function(data) {
  output('GET /dcs/rest/output-example-xml', data);
});

client.example("output", "json").on('complete', function(data) {
  output('GET /dcs/rest/output-example-json', data);
});

client.example("input").on('complete', function(data) {
  output('GET /dcs/rest/input-example', data);
});

client.components(true).on('complete', function(data) {
  output('GET /dcs/rest/components', data);
});

function output(title, data) {
  writeHead(title);
  writeRest(data);
}

function writeHead(str) {
  console.log(str);
  console.log('==========================');
}

function writeRest(str) {
  console.log(str);
  writeFooter();
}

function writeFooter(str) {
  console.log('--------------------------');
  console.log();
}