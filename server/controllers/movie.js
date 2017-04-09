'use strict';

const Movie        = require('../models/movie');
const errorMessage = require('../consts/errors');
const fsp          = require('fs-promise');
const path         = require('path');

exports.getMovies = (req, res, next) => {
    var criteria = req.query.criteria;

    if (criteria) {
        Movie
            .find({ $or: [{ name: { $regex : `${criteria}`} }, { author: { $regex : `${criteria}`} }] })
            .exec(function(err, movies) {
                if (err) {
                    next(err);
                }

                res.status(200).send(movies);
            })
    } else {
        Movie
            .find()
            .exec(function(err, movies) {
                if (err) {
                    next(err);
                }

                res.status(200).send(movies);
            })
    }
}

exports.getMoviesByCriteria = (req, res, next) => {
    let criteria = req.query.criteria;

    if (!criteria) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.find({ name: new RegExp(`.*${criteria}.*`, 'i') }).exec((err, movies) => {
        if (err) {
            return next(err);
        }

        res.send(movies);
    });
}

exports.getMovieById = (req, res, next) => {
    var id = req.params.id;

    Movie.find( { _id: id }).exec((err, user) => {
        if (err) {
            return next(err);
        }

        res.send(user);
    });
}

exports.updateMovieById = (req, res, next) => {
    var body = req.body.data;
    var avatarFile = req.files ? req.files[0] : null;
    var movieFile = req.files ? req.files[1] : null;

    if (!body.name) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.findOne({ _id: req.params.id }, function (err, movie) {
        if (err) {
            return next(err);
        }

        if (!movie) {
            return res.status(404).send(errorMessage.NO_SUCH_USER);
        }

        let promisses = [];
        let newAvatarPath = '';
        let newMoviePath = '';

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

        if (movieFile) {
            let moviePromise = new Promise((resolve, reject) => {
                fsp.readFile(movieFile.path)
                    .then(function (data) {
                        newMoviePath = path.join(__dirname, `../../dist/assets/img/${movieFile.originalname}`);
                        return fsp.writeFile(newMoviePath, data);
                    })
                    .then(function (){
                        resolve();
                    });
            });

            promisses.push(moviePromise);
        }

        Promise.all(promisses)
            .then(() => {
                movie.name = body.name;
                movie.description = body.description;
                movie.author = body.author;
                movie.url = newMoviePath
                    ? `./${path.relative('/Users/dmitryboyarchik/Documents/BSUIR/SAIPIS/dimb000.media/dist/', newMoviePath)}`
                    : movie.url;
                movie.avatarUrl = newAvatarPath
                    ? `./${path.relative('/Users/dmitryboyarchik/Documents/BSUIR/SAIPIS/dimb000.media/dist/', newAvatarPath)}`
                    : movie.avatarUrl;
                movie.releaseDate = body.releaseDate;
                movie.startDate = body.startDate;
                movie.endDate = body.endDate;
                movie.cost = body.cost;

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
    let movieFile = req.files[0];
    let avatarFile = req.files[1];
    let body = req.body.data;

    if (!body.name || !movieFile) {
        res.status(400).end(errorMessage.MUST_PROVIDE_NAME_AND_TRACK_FILE);
    }

    Movie.findOne(
        {
            name: body.name
        },
        (err, movie) => {
            if (err) {
                return next(err);
            }

            if (movie !== null) {
                return res.status(401)
                    .send(errorMessage.TRACK_WITH_NAME_EXISTS);
            }

            let newMoviePath = '';
            let newAvatarPath = '';

            fsp.readFile(movieFile.path)
                .then(function (data) {
                    newMoviePath = path.join(__dirname, `../../dist/music/${movieFile.originalname}`);

                    return fsp.writeFile(newMoviePath, data)
                })
                .then(function () {
                    return fsp.readFile(avatarFile.path)
                })
                .then(function (data) {
                    newAvatarPath = path.join(__dirname, `../../dist/assets/img/${avatarFile.originalname}`);
                    return fsp.writeFile(newAvatarPath, data)
                })
                .then(function () {
                    movie = new Movie({
                        name: body.name,
                        description: body.description,
                        author: body.author,
                        url: `./${path.relative('/Users/dmitryboyarchik/Documents/BSUIR/SAIPIS/dimb000.media/dist/', newMoviePath)}`,
                        avatarUrl: `./${path.relative('/Users/dmitryboyarchik/Documents/BSUIR/SAIPIS/dimb000.media/dist/', newAvatarPath)}`,
                        releaseDate: body.releaseDate,
                        startDate: body.startDate,
                        endDate: body.endDate,
                        cost: body.cost
                    });

                    movie.save((err, movie) => {
                        res.status(201).send(movie);
                    });
                });
        });
}

exports.deleteMovieById = (req, res, next) => {
    var id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Movie.remove({ _id: id }, function (err, data) {
        // TODO: add removing of related movie
        if (!err) {
            res.status(200).send('Movie has been deleted');
        }
        else {
            res.status(404).send('Movie has been not found');
        }
    });
}
