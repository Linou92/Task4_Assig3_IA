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
		next();
	}).catch(y=>{
		res.redirect(`/patient-profile/${req.body.patientId}`);
	});
	
})

function renderPage(req, res){
	var id = req.params.id?req.params.id:req.body.patientId;

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
	
}

router.get('/:id?', authCheck,renderPage );

module.exports = router;