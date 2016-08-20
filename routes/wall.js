const mongoose = require('mongoose');
const Pledges = require('../models/pledge');
const shuffle = require('lodash.shuffle');


module.exports = (req, res) => {
    Pledges
        .$where('this.image.length > 0')
        .find({ deleted: false, moderated: true })
        .sort({ pinned: -1, updated: -1 })
        .limit(1000)
        .exec((err, pledges) => {
            const random = pledges.splice(0, pledges.length - (pledges.length % 10));
            const some = shuffle(random).slice(0, 400);
            const processed = some.map((item, index) => {
                return {
                    image: some[index].image,
                    rotation: 10 - Math.floor(Math.random() * 20)
                };
            }).map((item) => {
                item.image = item.image.replace('/image/upload/', '/image/upload/q_60,f_auto/');
                return item;
            });

            res.render('wall', {
                pledges: processed,
                resizable: true
            });
        });
}