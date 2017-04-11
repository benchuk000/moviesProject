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
    rating:      { type: Number, default: 0 },
    ratedUsers:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true } ]
});

movieSchema.methods.calculateRating = function (newRating, userID) {
    var ratingSum = this.rating * this.ratedUsers.length;

    this.rating = (ratingSum + newRating) / (this.ratedUsers.length + 1);
    this.ratedUsers.push(userID);
};

module.exports = mongoose.model('Movie', movieSchema);
