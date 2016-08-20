const mongoose = require('mongoose');
const Pledges = require('../models/pledge');
const shuffle = require('lodash.shuffle');


module.exports = (req, res) => {

    const results = new Promise((resolve, reject) => {
        Pledges
            .$where('this.image.length > 0')
            .find({ deleted: false, moderated: true })
            .sort({ pinned: -1, updated: -1 })
            .limit(40)
            .exec((err, pledges) => {
                const list = Array.from(new Array(40));
                const processed = list.map((item, index) => {
                    return {
                        pledge: pledges[index],
                        rotation: 10 - Math.floor(Math.random() * 20)
                    };
                }).map((item) => {
                    item.pledge.image = item.pledge.image.replace('/image/upload/', '/image/upload/q_60,f_auto/');
                    return item;
                });

                resolve(shuffle(processed));
            });
    });

    const total = new Promise((resolve, reject) => {
        Pledges
            .count()
            .exec((err, count) => {
                resolve(count);
            });
    });

    Promise.all([results, total])
        .then(response => {
            res.render('page', {
                pledges: response[0],
                total: (parseInt(response[1], 10) + 10000).toLocaleString()
            });
        });
};