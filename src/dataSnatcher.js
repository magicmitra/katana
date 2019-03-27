/* dataSnatcher.js - snatches data from the business API
 */
const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const businessLA = require('../sample-data/los-angeles-data/businessLA');
const auraList = require('../sample-data/aura/auras.json');
const { yelpAPI } = require('../src/API');
const Business = require('../models/business.model');
const { MongoSensei } = require('./MongoSensei');

/* Create the DB, if it doesn't exist, then seed it
 * with data.
 * Then sync the adapter and router, and then create router
 */
const adapter = new FileSync('businessLA.json', {
  defaultValue: { businessData: businessLA },
});

const db = lowdb(adapter);
const router = express.Router();

// GET request
router.get('/api/resources', (req, res) => {
  const db = new MongoSensei();
  db.senseiGet(req, res);
});

// GET request for aura list
router.get('/auras', (req, res) => {
  res.json(auraList);
});

router.get('/yelp', (req, res) => {
  yelpAPI
    .getBusinessesByLocation(req.query.location)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      // log the error here
      res.status(500).json({ msg: 'Server failure' });
    });
});

module.exports = router;
