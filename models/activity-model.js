var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	username: String,
    activityid: String,
    timestamp:String,
    value:String
});

var activitylog = mongoose.model('activitylog', activitySchema);


module.exports = activitylog;

