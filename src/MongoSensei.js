/* Replicate lowdb data using mongodb
 * just cuz we can
 * dbDevTest -> name if the DB to hold collections of businesses
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const Business = require('../models/business.model');

class MongoSensei {
    //=============================constructor=================================
    constructor() {/** none in here */}
    //==========================================================================

    //=============================connect to the DB============================
    connect() {
        mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/kat?retryWrites=true`,
            {useNewUrlParser: true} 
        )
    }
    //==========================================================================

    senseiGet(req, res) {
        Business
            .find()
            .where('name')
            .regex(req.query.filter || '')
            .then(businesses => res.json(businesses));
    }
}


module.exports = {
    MongoSensei,
};
