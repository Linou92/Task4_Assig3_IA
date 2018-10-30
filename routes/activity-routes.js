var router = require('express').Router();
var keys = require('../configs/keys');
var mysql = require('mysql');
var express = require('express');
var heartrate = require('mongoose').model('activitylog');
var userdetails = require('mongoose').model('userdetail');
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



// router.get('/', authCheck, (req, res) => {

// 	res.render('activity', {
// 		user: req.user,
//         activities:activities,
//         users:[]
// 	}); 
// });


router.get('/heartratedata/:id?',(req,res)=>{
    var username =req.params.id?req.params.id:'Q0TawBOYDG';
    //console.log(username);
    let time =new Date().getTime();
    
    let query = 
    {
        $gte:time-2000,
        $lte:time
    };

  //  console.log(query);
    heartrate.find({username:username,timestamp:query}).
    then(data=>{
    //    console.log(data);
        res.json(data)
    })
    .catch(err=>{
        res.json({error:err});
    })
});

router.get('/',authCheck,(req,res)=>{
    let query = {
        role:'Patient',
    };
    

   let userinfo = req._passport.session;
   if(userinfo.role=='Researcher'){
       query.researcher = userinfo.loggedInDetails.username;
   }
   else if(userinfo.role=='Doctor'){
    query.doctor = userinfo.loggedInDetails.username;
   }
   else{
       query.username =userinfo.loggedInDetails.username;
   }
            userdetails.find(query)
            .then(result=>{
              //  console.log(result);
                res.render('activity',{user:req.user,users:result});
            }).catch(err=>{
                res.render('login',{user:userinfo});
            })
})



module.exports = router;