var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  nameFirst: String,
  nameLast: String,
  username: String,
  email: String,
  password: String,
  connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}]
});

module.exports = mongoose.model('User', UserSchema);
