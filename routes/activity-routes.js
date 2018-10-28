var router = require('express').Router();
var keys = require('../configs/keys');
var mysql = require('mysql');
var express = require('express');

var activities;

var connection = mysql.createPool({
          host: keys.mySQLdb.host,
          user: keys.mySQLdb.user,
          password: keys.mySQLdb.password,
          database: keys.mySQLdb.database,
          multipleStatements: true
});


var authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	}
	else{
		next();
	}
};


connection.getConnection((err, con)=>{
    if(err) throw err;
    var activity = "SELECT Therapy_List.Name, Therapy_List.Dosage, Medicine.Name FROM Medicine JOIN Therapy_List ON medicineId = medicine_IDmedicine JOIN Therapy ON therapy_listId = therapyList_IDtherapyList JOIN User ON userId = User_IDpatient WHERE Role_IDrole = 1"; 
    connection.query(activity, function(err, rows, fields){
        if(err) throw err;
        if(rows.length > 0){
        	activities = rows;
        } else{
        	activities = null;
        }
        
      });
    con.release();
    });



router.get('/', authCheck, (req, res) => {
	res.render('activity', {
		user: req.user,
		activities:activities
	});
});

module.exports = router;