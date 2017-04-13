'use strict';

const Session      = require('../models/session');
const Movie        = require('../models/movie');
const errorMessage = require('../consts/errors');
const fsp          = require('fs-promise');
const path         = require('path');

exports.getSessions = (req, res, next) => {
    let criteria = {};
    if (req.query.movie) {
        criteria.movie = req.query.movie
    }
    if (req.query.date) {
        let startDate = new Date(req.query.date);
        let endDate = new Date(req.query.date);

        endDate = new Date(endDate.setDate(endDate.getDate() + 1));
        criteria.startDate = { $gt: startDate, $lt: endDate };
    }

    Session
        .find(criteria)
        .populate('movie')
        .exec(function(err, sessions) {
            if (err) {
                next(err);
            }

            res.status(200).send(sessions);
        });
}

exports.getSessionById = (req, res, next) => {
    let id = req.params.id;

    Session.find( { _id: id }).exec((err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user);
    });
}

exports.updateSessionById = (req, res, next) => {
    let body = req.body.data;

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
    let body = req.body;
    let session = new Session({
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        movie: body.movie
    });

    session.save((err, session) => {
        if (err) {
            return next(err);
        }

        Movie.findOne({ _id: session.movie })
            .exec((err, movie) => {
                movie.sessions.push(session._id);

                movie.save((err) => {
                    Session.findOne({ _id: session._id })
                        .populate('movie')
                        .exec(function(err, session) {
                            if (err) {
                                return next(err);
                            }

                            res.status(200).send(session);
                        });
                });
            });
    });
}

exports.deleteSessionById = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Session.remove({ _id: id }, function (err) {
        if (!err) {
            Movie.findOne({ sessions: id })
                .exec((err, movie) => {
                    movie.sessions.splice(movie.sessions.indexOf(id), 1);

                    movie.save((err) => {
                        res.status(200).send('Session has been deleted');
                    });
                });
        }
        else {
            res.status(404).send('Session has been not found');
        }
    });
}
