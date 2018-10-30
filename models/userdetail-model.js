var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "username" : String, 
    "role" : String, 
    "doctor" : String, 
    "researcher" : String, 
    "firstname" : String, 
    "lastname" : String,
    "profilepic":String,
    "organisation":String,
    "email":String,
    latitude:String,
    longitude:String,
    ex_day:String,
    ex_month:String,
    ex_week:String,
    ex_time:String
});

var User = mongoose.model('userdetail', userSchema);


module.exports = User;

