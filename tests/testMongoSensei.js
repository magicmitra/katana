const { MongoSensei } = require('../src/MongoSensei');
const businessLAFake = require('./businessLAFake');

// initialize the database
// passing a NON EXISTENT DB: mongo will create this DB and 
// do shit to it accordingly
const db = new MongoSensei('dbDevTest2');
db.seed(businessLAFake);

