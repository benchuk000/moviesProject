'use strict';

const User         = require('../models/user');
const authHelper   = require('../helpers/auth');
const errorMessage = require('../consts/errors');
const fs           = require('fs');
const path         = require('path');

exports.createUser = (req, res, next) => {
    let body = req.body;

    if (!body.login || !body.password || !body.username) {
        res.status(400).end(errorMessage.MUST_PROVIDE_EMAIL_OR_PASSWORD);
    }

    User.findOne(
        {
            login: body.login
        },
        (err, user) => {
            if (err) {
                return next(err);
            }

            if (user !== null && user.login === body.login) {
                return res.status(401)
                    .send(errorMessage.USER_WITH_EMAIL_EXISTS);
            }

            user = new User({
                username: body.username,
                usersurname: body.usersurname,
                passport: body.passport,
                login: body.login,
                password: body.password,
                email: body.email
            });

            user.save((err) => {
                if (err) {
                    return next(err);
                }

                res.status(201).send({
                    token: authHelper.createToken(user)
                });
            });
        }
    );
};

exports.getUsers = (req, res, next) =>
    User.find().exec((err, users) => {
        if (err) {
            return next(err);
        }

        res.send(users);
    });

exports.getUserById = (req, res, next) => {
    let id = req.params.id;

    User.find( { _id: id }).exec((err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user);
    });
}

exports.getUsersByCriteria = (req, res, next) => {
    let criteria = req.query.criteria;

    if (!criteria) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    User.find({ login: new RegExp(`.*${criteria}.*`, 'i') }).exec((err, users) => {
        if (err) {
            return next(err);
        }

        res.send(users);
    });
}

exports.updateUserById = (req, res, next) => {
    let body = req.body.data;

    if (!body.login) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    User.findOne({ _id: req.params.id }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(404).send(errorMessage.NO_SUCH_USER);
        }

        user.username = req.body.data.username;
        user.usersurname = req.body.data.usersurname;
        user.isAdmin = req.body.data.isAdmin;
        user.tickets = req.body.data.tickets || [];
        user.email = req.body.data.email;
        user.login = req.body.data.login;
        user.passport = req.body.data.passport;

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    });
}

exports.deleteUserById = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    User.remove({ _id: id }, function (err) {
        if (!err) {
            res.status(200).send('User has been deleted');
        }
        else {
            res.status(404).send('User has been not found');
        }
    });
}
