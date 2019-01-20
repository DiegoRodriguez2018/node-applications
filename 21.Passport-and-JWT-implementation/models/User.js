const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
});
//hashing
UserSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
//unhashing
UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};
//Json Web Token
UserSchema.methods.generateJWT = function () {
  //TODO: use some environment variables to store secret.
  const token = jwt.sign(
    {
      username: this.username,
      id: this._id
    },
    'secret',
    { expiresIn: '1h' }
  )

  return token;
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
  };
};

mongoose.model('User', UserSchema);