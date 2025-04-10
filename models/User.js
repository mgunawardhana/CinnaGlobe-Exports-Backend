const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true, minlength: 2, maxlength: 100
    }, email: {
        type: String, required: true, unique: true, lowercase: true, match: /.+\@.+\..+/,
    }, age: {
        type: Number, required: true, min: 0, max: 120
    }, password: {
        type: String, required: true, minlength: 8,
    }, phone: {
        type: String, required: true, match: /^\d{10}$/,
    }, address: {
        type: String, required: true,
    }, city: {
        type: String, required: true,
    }, state: {
        type: String, required: true,
    }, zip: {
        type: String, required: true,
    }, country: {
        type: String, required: true,
    },
}, {timestamps: true});  // Automatically add createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);
module.exports = User;
