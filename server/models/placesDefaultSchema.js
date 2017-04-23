const Place = require('../models/place');

module.exports = (rowCount, columnCount) => {
    let places = [];

    for (let i = 0; i < rowCount; i++) {
        if (!places[i]) {
            places[i] = [];
        }

        for (let j = 0; j < columnCount; j++) {
            let place = new Place({
                rowNumber: i,
                placeNumber: j
            })
            Place.create(place);
        }
    }

    return places;
};
