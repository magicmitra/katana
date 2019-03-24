/* Replicate lowdb data using mongodb
 * just cuz we can
 * dbDevTest -> name if the DB to hold collections of businesses
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const MongoClient = require('mongodb').MongoClient;
const dbLocalHost = process.env.dbLocalHost;
const url = `mongodb://localhost:${dbLocalHost}/`;
const businessLAFake = require('../tests/businessLAFake');

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    // create DB object
    const dbo = db.db('dbDevTest');
    // create a collection
    dbo.createCollection('businesses', (err, res) => {
        if(err) throw err;
        console.log('Collection Created');
    });
    // insert a document into a collection, collections.insert is 
    // deprecated, therefore, use insertMany.
    dbo.collection('businesses').insertMany(businessLAFake, (err, res) => {
        if(err) throw err;
        console.log("documents inserted");
        // res.ops for the document section only
        //console.log(res.ops); 
        db.close();
    });
  });
