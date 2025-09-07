const mongoose = require('mongoose');

const bartenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "bartender"
    }
}, { timestamps: true });

module.exports = mongoose.model('Bartender', bartenderSchema);
