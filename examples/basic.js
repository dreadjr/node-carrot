var carrot = require('../lib');
var client = carrot.createClient({ host: 'localhost', port: '8080'});

var source = new carrot.XMLDocumentSource('query1');
source.add(0, 'title','snippet','url', { rank: 1, "sentiment": "good"});
source.add(1, 'title1','snippet2','url3', { rank: 25, "sentiment": "bad"});

client.rest(source).on('complete', function(result) {
  if (result instanceof Error) {
    // got error
    console.log('Error:', result);
  } else {
    console.log(result);
  }
});

client.cluster(source,
  {
    "LingoClusteringAlgorithm.desiredClusterCountBase": "10",
    "LingoClusteringAlgorithm.phraseLabelBoost": "1.0",
    "TermDocumentMatrixReducer.factorizationFactory": "org.carrot2.matrix.factorization.LocalNonnegativeMatrixFactorizationFactory"
  }).on('complete', function(result) {
    if (result instanceof Error) {
      // got error
      console.log('Error:', result);
    } else {
      console.log(result);
    }
});