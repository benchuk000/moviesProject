'use strict';

const mongoose               = require('mongoose');
const config                 = require('../config');

const sessionSchema = new mongoose.Schema({
    startDate:      { type: Date, required: true },
    endDate:        { type: Date, required: true },
    movie:          { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    cost:           { type: Number, require: true },
    selectedPlaces: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Place' } ]
});

module.exports = mongoose.model('Session', sessionSchema);
