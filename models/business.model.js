const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    postal_code: String,
    attributes: {
        aura: String
    },
    alias: String,
    url: String,
    img: String,
    categories: String
}, {
    timestamps: true,
    },
);

const Business = mongoose.model('business', schema);

module.exports = Business;