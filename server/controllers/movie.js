'use strict';

const Movie        = require('../models/movie');
const errorMessage = require('../consts/errors');
const fsp          = require('fs-promise');
const path         = require('path');

exports.getMovies = (req, res, next) => {
    let criteria = {};
    if (req.query.genre) {
        criteria.genre = req.query.genre;
    }
    let date;
    if (req.query.date) {
        date = new Date(req.query.date);
    }
    if (req.query.time) {
        date = new Date(req.query.time);
    }

    Movie
        .find(criteria)
        .populate('sessions')
        .exec((err, movies) => {
            if (err) {
                next(err);
            }

            movies = movies.filter(movie => {
                let sessions = movie.sessions.filter(session => {
                    return date ? (new Date(session.startDate)) > date : true;
                });

                return date ? sessions.length : true;
            });

            res.status(200).send(movies);
        });
}

exports.getMoviesByCriteria = (req, res, next) => {
    let criteria = req.query.criteria;

    if (!criteria) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.find({ name: new RegExp(`.*${criteria}.*`, 'i') })
        .exec((err, movies) => {
            if (err) {
                return next(err);
            }

            res.send(movies);
        });
}

exports.getMovieById = (req, res, next) => {
    let id = req.params.id;

    Movie.find( { _id: id })
        .populate('sessions')
        .exec((err, user) => {
            if (err) {
                return next(err);
            }

            res.send(user);
        });
}

exports.updateMovieById = (req, res, next) => {
    let body = req.body.data;
    let avatarFile = req.files ? req.files[0] : null;

    if (!body.name) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.findOne({ _id: req.params.id })
        .populate('sessions')
        .exec((err, movie) => {
            if (err) {
                return next(err);
            }

            if (!movie) {
                return res.status(404).send(errorMessage.NO_SUCH_USER);
            }

            let promisses = [];
            let newAvatarPath = '';

            if (avatarFile) {
                let avatarPromise = new Promise((resolve, reject) => {
                    fsp.readFile(avatarFile.path)
                        .then(function (data) {
                            newAvatarPath = path.join(__dirname, `../../dist/assets/img/${avatarFile.originalname}`);
                            return fsp.writeFile(newAvatarPath, data);
                        })
                        .then(function () {
                            resolve();
                        });
                });

                promisses.push(avatarPromise);
            }

            Promise.all(promisses)
                .then(() => {
                    movie.name = body.name;
                    movie.description = body.description;
                    movie.author = body.author;
                    movie.url = body.url;
                    movie.genre = body.genre;
                    movie.avatarUrl = newAvatarPath
                        ? `./${path.relative(path.join(__dirname, '../../dist/'), newAvatarPath)}`
                        : movie.avatarUrl;
                    movie.releaseDate = body.releaseDate;

                    movie.save(function (err) {
                        if (err) {
                            return next(err);
                        }

                        res.status(200).send(movie);
                    });
                });
        });
}

exports.createMovie = (req, res, next) => {
    let avatarFile = req.files[0];
    let body = req.body.data;

    if (!body.name) {
        res.status(400).end(errorMessage.MUST_PROVIDE_NAME_AND_TRACK_FILE);
    }

    Movie.findOne({ name: body.name })
        .populate('sessions')
        .exec((err, movie) => {
            if (err) {
                return next(err);
            }

            if (movie !== null) {
                return res.status(401)
                    .send(errorMessage.TRACK_WITH_NAME_EXISTS);
            }

            let newAvatarPath = '';

            fsp.readFile(avatarFile.path)
                .then(function (data) {
                    newAvatarPath = path.join(__dirname, `../../dist/assets/img/${avatarFile.originalname}`);
                    return fsp.writeFile(newAvatarPath, data)
                })
                .then(function () {
                    movie = new Movie({
                        name: body.name,
                        description: body.description,
                        author: body.author,
                        url: body.url,
                        genre: body.genre,
                        avatarUrl: `./${path.relative(path.join(__dirname, '../../dist/'), newAvatarPath)}`,
                        releaseDate: body.releaseDate
                    });

                    movie.save((err, movie) => {
                        res.status(201).send(movie);
                    });
                });
        });
}

exports.deleteMovieById = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.remove({ _id: id })
        .exec((err, data) => {
            // TODO: add removing of related movie
            if (!err) {
                res.status(200).send('Movie has been deleted');
            }
            else {
                res.status(404).send('Movie has been not found');
            }
        });
}

exports.setRating = (req, res, next) => {
    let body = req.body;
    let id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.findOne({ _id: id })
        .populate('sessions')
        .exec((err, movie) => {
            movie.calculateRating(body.rating, body.userID);
            console.log(movie);

            if (err) {
                return next(err);
            }

            movie.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(movie);
            });
        });
}

exports.getTopMovies = (req, res, next) => {
    Movie.find({})
        .sort({ 'rating': -1 })
        .limit(5)
        .exec((err, movies) => {
            if (err) {
                return next(err);
            }

            res.status(200).send(movies);
        });
}
