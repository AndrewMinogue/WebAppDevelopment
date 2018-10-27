let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        email : {type : String, unique : true},
        password : {type : String}},
    {collection: 'userdb'});

module.exports = mongoose.model('user', UserSchema);
