'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const config   = require('../config');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    login:    { type: String, unique: true, trim: true },
    email:    { type: String },
    password: { type: String },
    isAdmin:  { type: Boolean, default: false },
    albums:   [ { type: mongoose.Schema.Types.ObjectId, ref: 'Album', unique: true } ],
    avatarUrl: { type: String }
});

userSchema.pre('save',function (next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(config.SALT_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
