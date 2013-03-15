var carrot = require('../lib');
var client = carrot.createClient({ host: 'localhost', port: '8080'});

var external_source = new carrot.ExternalDocumentSource('carrot', 'etools');
client.rest(external_source).on('complete', function(result){
  if (result instanceof Error) {
    // got error
    console.log('Error:', result);
  } else {
    console.log(result);
  }
});