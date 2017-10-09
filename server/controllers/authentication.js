const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');
const Poll = require('../models/poll');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	//sub is for subject, iat is for issued at time
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.signin = function(req,res,next){
	//user has already had their email and password authd, we just need to give them a token
	console.log(req.user);
	res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req,res,next){
	const email = req.body.email;
	const password = req.body.password;

	if(!email||!password){
		return res.status(422).send({error: "You must provide email and password"});
	}
	//See if a user with the given email exists
	User.findOne({email:email}, function(err, existingUser){
		if(err) return next(err);
		//If a user with email does exist return an error
		if(existingUser){
			res.status(422).send({error: "Email is in use"});
		}
		//If a user with email does not exist create and save user record
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err){
			if(err) return next(err);
			//Respond to request indicating user was created
			res.json({token: tokenForUser(user)});
		})
		

	});

	

	
}


exports.createPoll = function(req,res, next){
		//get data from form and add to polls array
		var title = req.body.title;
		var options = req.body.options;
		// console.log(req.user);
		// var author = {
		// 	id: req.user._id,
		// 	email: req.user.email
		// };
		console.log(req.user);
		var newPoll = {title:title, options:options};
		//Create a new blog and save to db
		Poll.create(newPoll, function(err, newlyCreated){
			if(err){
				console.log(err);
				console.log(newPoll);
				return next(err);
			} else{
				res.status(200).send('success');
			}
		});
	};


	exports.test = function(req,res,next){
	//user has already had their email and password authd, we just need to give them a token
	console.log(req.user);
	

	res.send("who is that lady");
	
}