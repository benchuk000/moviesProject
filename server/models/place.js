'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    rowNumber:   { type: mongoose.Schema.Types.Number },
    placeNumber: { type: mongoose.Schema.Types.Number },
});

module.exports = mongoose.model('Place', placeSchema);
