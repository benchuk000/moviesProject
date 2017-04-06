'use strict';

const mongoose = require('mongoose');
const config   = require('../config');

const movieSchema = new mongoose.Schema({
    name:      { type: String, required: true },
    author:    { type: String, required: true },
    url:       { type: String, required: true },
    avatarUrl: { type: String }
});

module.exports = mongoose.model('Movie', movieSchema);
