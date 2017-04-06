'use strict';

const jwt    = require('jsonwebtoken');
const config = require('../config');

exports.createToken = (user) =>
    jwt.sign(
        {
            user: user
        },
        config.JWT_SECRET
    );

exports.isAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
            if (err) {
                return next(err);
            }
            if (!decoded.user.isAdmin) {
                return res.sendStatus(401);
            }

            req.user = decoded.user;

            return next();
        });
    } else {
        return res.sendStatus(401);
    }
};

exports.isAuthenticate = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(err);
            }

            req.user = decoded.user;

            return next();
        });
    } else {
        return res.sendStatus(401);
    }
};
