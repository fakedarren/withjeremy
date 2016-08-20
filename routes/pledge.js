const cloudinary = require('cloudinary');
const config = require('../config');
const mongoose = require('mongoose');
const multiparty = require('multiparty');
const Pledge = require('../models/pledge');


cloudinary.config(config.cloudinary);


module.exports = (req, res) => {
    const form = new multiparty.Form({ maxFieldsSize: '5mb' });

    form.parse(req, (err, fields) => {

        if (fields.image[0].length){
            const cleaned = fields.image[0]
                    .replace(/^url\(["']?/, '')
                    .replace(/['"]?\)$/, '');

            cloudinary.uploader.upload(cleaned, (result) => {
                const newPledge = new Pledge({
                    image: 'url(' + result.secure_url + ')',
                    name: fields.name[0],
                    job: fields.job[0],
                    lives: fields.lives[0],
                    age: fields.age[0],
                    email: fields.email[0],
                    share: fields.share[0]
                });

                newPledge.save(err => {
                    res.send('ok')
                });
            });
        } else {
            const newPledge = new Pledge({
                image: '',
                name: fields.name[0],
                job: fields.job[0],
                lives: fields.lives[0],
                age: fields.age[0],
                email: fields.email[0],
                share: fields.share[0]
            });

            newPledge.save(err => res.send('ok'));
        }

    });
};