/* Replicate lowdb data using mongodb
 * just cuz we can
 * dbDevTest -> name if the DB to hold collections of businesses
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const dbLocalHost = process.env.dbLocalHost;
const businessLAFake = require('../tests/businessLAFake');


class MongoSensei {
    //==============================constructor=========================================
    /** 
     * @param {*} nameOfDatabase -> name of the database
     * initialize the Database, MongoClient and Database Object
     */
    constructor(databaseName) {
        this.databaseName = databaseName;
        this.mongoClient = new MongoClient(new Server('localhost', `${dbLocalHost}`));
        this.collectionName = 'businesses';
    }
    //====================================================================================

    //===============================seed the database====================================
    seed(items) {
        try {
            // connect MongoClient
            this.mongoClient.connect((err, mongoClient) => {
                if(err) throw err;
                const dbObject = this.mongoClient.db(this.databaseName);
                // create a collection
                dbObject.createCollection(this.collectionName, (err, res) => {
                    if(err) throw err;
                });
                // seed the created collection. use insertMany()
                dbObject.collection(this.collectionName).insertMany(items, (err, res) => {
                    if(err) throw err;
                    // res.ops to get the document section only
                    mongoClient.close();
                });
            });
        }
        catch(err){
            console.error(err);
        }
    }
    //=====================================================================================

    //==============================add one entry to the database============================
    addEntry(item) {
        try{    
            // connect MongoClient
            this.mongoClient.connect((err, mongoClient) => {
                if(err) throw err;
                const dbObject = this.mongoClient.db(this.databaseName);
                // add the entry, use insertOne
                dbObject.collection(this.collectionName).insertOne(item, (err, res) => {
                    if(err) throw err;
                    mongoClient.close();
                })
            });
        }
        catch(err) {
            console.error(err);
        }
    }
}

module.exports = {
    MongoSensei,
};
