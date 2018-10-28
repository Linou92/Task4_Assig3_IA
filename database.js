var keys = require('./configs/keys');
var mysql = require('mysql');


var connection = mysql.createPool({
          host: keys.mySQLdb.host,
          user: keys.mySQLdb.user,
          password: keys.mySQLdb.password,
          database: keys.mySQLdb.database,
          multipleStatements: true
});



connection.getConnection((err, con)=>{
    if(err) throw err;

    var role = "SELECT userID FROM User WHERE Role_IDrole = '2' LIMIT 1";
    connection.query(role, function (err, rows, fields) {
    if (err) throw err;
    for (var i in rows){
      var role = rows[i].userID;
      console.log("role = ", role);
    }
    var test = "SELECT Test_Session_IDtest_session FROM Note WHERE User_IDmed = "+role;
    connection.query(test, function(err, rows, fields){
    if (err) throw err;
      for (var i in rows){
        var test = rows[i].Test_Session_IDtest_session;
        console.log("test = ", test);
      } 
    var data = "SELECT DataURL FROM Test_Session WHERE test_SessionID = "+test;
    connection.query(data, function(err, rows, fields){
    if (err) throw err;
      for (var i in rows){
        var data = rows[i].DataURL;
        console.log("data = ", data);
      }
    var activity = "SELECT Therapy_List.Name, Therapy_List.Dosage, Medicine.Name FROM Medicine JOIN Therapy_List ON medicineId = medicine_IDmedicine JOIN Therapy ON therapy_listId = therapyList_IDtherapyList JOIN User ON userId = User_IDpatient WHERE Role_IDrole = 1"; 
    connection.query(activity, function(err, rows, fields){
        if(err) throw err;
        for (var i in rows){
        var activity = rows[i];
        console.log("activity = ", activity);
      }
      con.release();    
      });
    });
  });
  });
  });



module.exports = connection;