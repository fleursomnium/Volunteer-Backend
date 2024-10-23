const mongoose = require('mongoose');

const statestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    }

});

const States = mongoose.model('State', statestSchema);

module.exports = States;
