'use strict';

const Session      = require('../models/session');
const errorMessage = require('../consts/errors');
const fsp          = require('fs-promise');
const path         = require('path');

exports.getSessions = (req, res, next) => {
    var movieID = req.query.movieID;

    Session
        .find({ movie: movieID })
        .exec(function(err, sessions) {
            if (err) {
                next(err);
            }

            res.status(200).send(sessions);
        })
}

exports.getSessionById = (req, res, next) => {
    var id = req.params.id;

    Session.find( { _id: id }).exec((err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user);
    });
}

exports.updateSessionById = (req, res, next) => {
    var body = req.body.data;

    if (!body.name) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Session.findOne({ _id: req.params.id }, function (err, session) {
        if (err) {
            return next(err);
        }

        if (!session) {
            return res.status(404).send(errorMessage.NO_SUCH_USER);
        }

        session.startDate = body.startDate;
        session.endDate = body.endDate;
        session.movie = body.movie;

        session.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send(session);
        });
    });
}

exports.createSession = (req, res, next) => {
    let body = req.body.data;

    if (!body.name || !sessionFile) {
        res.status(400).end(errorMessage.MUST_PROVIDE_NAME_AND_TRACK_FILE);
    }

    Session.findOne(
        {
            name: body.name
        },
        (err, session) => {
            if (err) {
                return next(err);
            }

            if (session !== null) {
                return res.status(401)
                    .send(errorMessage.TRACK_WITH_NAME_EXISTS);
            }

            session = new Session({
                startDate: body.startDate,
                endDate: body.endDate,
                movie: body.movie
            });

            session.save((err, session) => {
                res.status(201).send(session);
            });
        });
}

exports.deleteSessionById = (req, res, next) => {
    var id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Session.remove({ _id: id }, function (err, data) {
        if (!err) {
            res.status(200).send('Session has been deleted');
        }
        else {
            res.status(404).send('Session has been not found');
        }
    });
}
