'use strict';

const mongoose               = require('mongoose');
const config                 = require('../config');
const getPlacesDefaultSchema = require('./placesDefaultSchema');

const sessionSchema = new mongoose.Schema({
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place:   { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }
});

module.exports = mongoose.model('Order', sessionSchema);
