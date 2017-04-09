'use strict';

const mongoose = require('mongoose');
const config   = require('../config');

const ticketSchema = new mongoose.Schema({
    date:    { type: Date, required: true },
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
});

module.exports = mongoose.model('Movie', movieSchema);
