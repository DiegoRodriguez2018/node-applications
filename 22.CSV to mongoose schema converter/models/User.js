const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    OauthToken: String,
    OrganisationID: { type: Schema.Types.ObjectId, ref: 'Organisation' },
    isAdmin: Boolean,
});

module.exports = mongoose.model('User', userSchema);