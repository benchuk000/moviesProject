'use strict';

const Order        = require('../models/order');
const Place        = require('../models/place');
const Session      = require('../models/session');
const errorMessage = require('../consts/errors');
const sendMail     = require('../helpers/mail');

exports.getOrders = (req, res, next) => {
    Order
        .find()
        .populate('session')
        .populate('user')
        .populate('place')
        .exec(function(err, orders) {
            if (err) {
                next(err);
            }

            res.status(200).send(orders);
        });
}

exports.getOrderById = (req, res, next) => {
    let id = req.params.id;

    Order.find({ _id: id })
        .populate('session')
        .populate('user')
        .populate('place')
        .exec((err, user) => {
            if (err) {
                return next(err);
            }

            res.send(user);
        });
}

exports.updateOrderById = (req, res, next) => {
    let body = req.body.data;

    if (!body.name) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Order.findOne({ _id: req.params.id }, function (err, order) {
        if (err) {
            return next(err);
        }

        if (!order) {
            return res.status(404).send(errorMessage.NO_SUCH_USER);
        }

        order.session = body.sessionID;
        order.user = body.userID;
        order.place= body.placeID;

        order.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send(order);
        });
    });
}

exports.createOrder = (req, res, next) => {
    let body = req.body;
    let order = new Order({
        session: body.sessionID,
        user: body.userID,
        place: body.placeID
    });

    order.save((err, order) => {
        if (err) {
            return next(err);
        }

        Session.findOne({ _id : order.session })
            .populate('movie')
            .exec((err, session) => {
                if (err) {
                    return next(err);
                }

                session.selectedPlaces.push(order.place);

                session.save((err) => {
                    if (err) {
                        return next(err);
                    }

                    Order.findOne({ _id: order._id })
                        .populate('place')
                        .populate('user')
                        .populate('session')
                        .populate('session.movie')
                        .exec((err, order) => {
                            sendMail({
                                from: '"Olya Cinema 👻" <cinema.est2017@gmail.com>',
                                to: `${order.user.email}`,
                                subject: '✔ Подтверждение бронирования ✔',
                                text:
`
Вы забронировали место на фильм ${session.movie.name}

Дата: ${order.session.startDate.getDate()}.${order.session.startDate.getMonth()+1}.${order.session.startDate.getFullYear()}
Время сеанса: ${order.session.startDate.getHours()}:${order.session.startDate.getMinutes()} - ${order.session.endDate.getHours()}:${order.session.endDate.getMinutes()}

Место: ${order.place.placeNumber + 1}
Ряд: ${order.place.rowNumber + 1}

Цена билета: ${order.session.cost} BYN
`
                            });

                            res.status(200).send(order);
                        });
                });
            });
    });
}

exports.deleteOrderById = (req, res, next) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Order.remove({ _id: id }, function (err) {
        if (!err) {
            res.status(200).send('Order has been deleted');
        }
        else {
            res.status(404).send('Order has been not found');
        }
    });
}
