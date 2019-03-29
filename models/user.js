const mongoose = require('mongoose');

//user schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('visitor', UserSchema);
