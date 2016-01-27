var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema =  mongoose.Schema;

var LogUserSchema = new Schema({
  firstName : String,
  lastName : String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  username : {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true
  },
  password : {
    type: String,
    validate: [
    function(password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
  // type : String,
   hash : String,
  // provider: {
  //   type: String,
  //   required: 'Provider is required'
  // },
  // providerId: String,
  // providerData: {},
  created: {
    type: Date,
    default: Date.now
  }
},{collection: "users"});

LogUserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

// LogUserSchema.pre('save', function(next) {
//   if (this.password) {
//     this.hash = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//     this.password = this.hashPassword(this.password);
//   }
//   next();
// });

LogUserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.hash, 10000, 64).toString('base64');
};

LogUserSchema.methods.authenticate = function(password) {
  console.log("inside log user model");
  return this.password === this.hashPassword(password);
};

LogUserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

LogUserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', LogUserSchema);
