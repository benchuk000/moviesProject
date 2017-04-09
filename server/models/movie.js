'use strict';

const mongoose = require('mongoose');
const config   = require('../config');

const movieSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    description: { type: String },
    author:      { type: String, required: true },
    url:         { type: String, required: true },
    avatarUrl:   { type: String },
    releaseDate: { type: Date },
    rating:      { type: Number },
    ratedUsers:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true } ]
});

movieSchema.methods.calculateRating = function (newRating, userID) {
    this.ratedUsers.push(userID);
    this.rating = this.rating * ratedUsers.length - 1 / ratedUsers.length - 1;
};

module.exports = mongoose.model('Movie', movieSchema);
