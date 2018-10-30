var config = require('./configs/keys');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
	username: String,
    activityid: String,
    timestamp:String,
    value:String
});
mongoose.connect(config.mongodb.dbURL);
mongoose.model('activitylog', activitySchema);

let activityModel = require('mongoose').model('activitylog');
function getRandomInt(min, max) {
    let x = new Date().getTime();
    let y = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    let dataModel = new activityModel({
        username: 'Q0TawBOYDG',
        timestamp: x,
        value: y,
        activityId: '5bd53585f3f6417585a49e15'
    });
    dataModel.save().then(result => {
       // console.log(result);
    }).catch(err => {
        console.log(err);
    })

}

setInterval(getRandomInt, 1000);
