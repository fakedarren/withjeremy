const mongoose = require('mongoose');
const Pledges = require('../models/pledge');


module.exports = (req, res) => {

    if (req.method === 'POST'){
        Pledges
            .findById(req.body.id, (err, pledge) => {
                var update = { updated: Date.now() };

                if (req.body.type === 'approve') update.moderated = true;
                if (req.body.type === 'delete') update.deleted = true;

                pledge.update(update, (err) => {
                    res.send('ok');
                });
            });
    } else {
        const results = new Promise((resolve, reject) => {
            Pledges
                .find({ share: true, deleted: false, moderated: false })
                .sort({ created: 1 })
                .limit(10)
                .exec((err, pledges) => resolve(pledges));
        });

        const total = new Promise((resolve, reject) => {
            Pledges
                .find({ deleted: false, moderated: false })
                .count()
                .exec((err, count) => {
                    resolve(count);
                });
        });

        Promise.all([results, total])
            .then(response => {
                res.render('moderation', {
                    pledges: response[0],
                    time: new Date().toLocaleString('en-GB'),
                    total: response[1]
                });
            });
    }

};