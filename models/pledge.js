const mongoose = require('mongoose');


module.exports = mongoose.model('Pledge', {
    image: String,
    name: String,
    job: String,
    lives: String,
    age: Number,
    email: String,
    share: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    moderated: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
});