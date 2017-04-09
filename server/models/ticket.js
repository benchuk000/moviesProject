'use strict';

const mongoose = require('mongoose');
const config   = require('../config');

const ticketSchema = new mongoose.Schema({
    date:  { type: Date, required: true },
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

module.exports = mongoose.model('Movie', movieSchema);
