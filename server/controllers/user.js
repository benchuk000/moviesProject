'use strict';

const User         = require('../models/user');
const authHelper   = require('../helpers/auth');
const errorMessage = require('../consts/errors');
const fs = require('fs');
const path = require('path');

exports.createUser = (req, res, next) => {
    let body = req.body.data;
    let avatarFile = req.files[0];

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

            if (avatarFile) {
                fs.readFile(avatarFile.path, function (err, data) {
                    if (err) {
                        return next(err);
                    }

                    let newAvatarPath = path.join(__dirname, `../../public/assets/img/${avatarFile.originalname}`);
                    fs.writeFile(newAvatarPath, data, function (err) {
                        if (err) {
                            return next(err);
                        }

                        user = new User({
                            username: body.username,
                            login: body.login,
                            password: body.password,
                            email: body.email,
                            avatarUrl: `./${path.relative('/Users/dmitryboyarchik/Documents/BSUIR/SAIPIS/dimb000.media/public/', newAvatarPath)}`
                        });

                        user.save((err) => {
                            if (err) {
                                return next(err);
                            }

                            res.status(201).send(user);
                        });
                    });
                });

            } else {
                user = new User({
                    username: body.username,
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
    let avatarFile = req.files ? req.files[0] : null;

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

        if (avatarFile) {
            fs.readFile(avatarFile.path, function (err, data) {
                if (err) {
                    return next(err);
                }

                let newAvatarPath = path.join(__dirname, `../../public/assets/img/${avatarFile.originalname}`);
                fs.writeFile(newAvatarPath, data, function (err) {
                    if (err) {
                        return next(err);
                    }

                    user.username = req.body.data.username;
                    user.isAdmin = req.body.data.isAdmin;
                    user.albums = req.body.data.albums || [];
                    user.email = req.body.data.email;
                    user.login = req.body.data.login;
                    user.avatarUrl = `./${path.relative('/Users/dmitryboyarchik/Documents/BSUIR/SAIPIS/dimb000.media/public/', newAvatarPath)}`;

                    user.save(function (err) {
                        if (err) {
                            return next(err);
                        }

                        res.status(200).send(user);
                    });
                });
            });

        } else {
            user.username = req.body.data.username;
            user.isAdmin = req.body.data.isAdmin;
            user.albums = req.body.data.albums || [];
            user.email = req.body.data.email;
            user.login = req.body.data.login;

            user.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(user);
            });
        }
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
