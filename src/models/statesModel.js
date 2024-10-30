const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }

});

const State = mongoose.model('State', stateSchema);

module.exports = State;