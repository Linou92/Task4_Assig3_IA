var router = require('express').Router();
var userdetails = require('mongoose').model('userdetail');

var authCheck = (req, res, next) => {
	if(!req.user){
		res.redirect('/auth/login');
	}
	else{
		next();
	}
};

router.post('/addComment',authCheck,(req,res)=>{
	userdetails.findOneAndUpdate({username:req.body.patientId},
	{$push:{
			comments:{body :req.body.comment,addedbyId:'Researcher1'}
	}}).then(x=>{
		console.log(x);
		res.json({success:'Comment Added'});
	}).catch(y=>{
		res.json({success:'Comment Added'});
	});
	
})

router.get('/:id?', authCheck, (req, res) => {
	var id = req.params.id;

	if(id){
		userdetails.findOne({username:id}).then(x=>{
			if(x){
				res.render('patientprofile',{user:x})
			}
			else{
				res.render('patient-profile', {user: req.user});
			}
		}).catch(err=>{
			res.render('patient-profile', {user: req.user});
		})
	}
	else{
		res.render('patient-profile', {user: req.user});
	}
	
});

module.exports = router;