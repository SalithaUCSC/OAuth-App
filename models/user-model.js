const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    oauthId: String,
    email: String,
    type: String,
    image: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;