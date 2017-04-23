'use strict';

const Place      = require('../models/place');
const errorMessage = require('../consts/errors');

exports.getPlaces = (req, res, next) => {
    Place.find()
        .exec(function(err, places) {
            if (err) {
                next(err);
            }

            res.status(200).send(places);
        });
}
