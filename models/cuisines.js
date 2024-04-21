const mongoose = require('mongoose');
const cusineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Cuisnes', cusineSchema)