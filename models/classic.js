const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gpower: Number,
    attribute: String,

});

module.exports = mongoose.model('classic', itemSchema);
