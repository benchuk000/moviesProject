'use strict';

const UserModel      = require('../models/user');
const authHelper     = require('../helpers/auth');
const errorMessage   = require('../consts/errors');
const crypto         = require('crypto');
// const email          = require('./email');
const userController = require('./user');
const config         = require('../config');

exports.authenticate = function (req, res, next) {
    const body = req.body;

    if (!body.login || !body.password) {
        res.status(400).end(errorMessage.MUST_PROVIDE_EMAIL_OR_PASSWORD);
    }

    UserModel.findOne({ login: body.login }).exec(function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401)
                .send(errorMessage.EMAIL_OR_PASSWORD_DONT_MATCH);
        }

        user.comparePassword(body.password, function (err, isMatch) {
            if (err) {
                return next(err);
            }

            if (isMatch) {
                return res.status(201).send({
                    token: authHelper.createToken(user),
                    user: {
                        _id: user._id,
                        isAdmin: user.isAdmin,
                        login: user.login,
                        username: user.username,
                        email: user.email,
                        albums: user.albums,
                        avatarUrl: user.avatarUrl
                    }
                });
            }

            return res.status(401)
                .send(errorMessage.EMAIL_OR_PASSWORD_DONT_MATCH);
        });
    });
};
