const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
	email: {type: String, unique: true, lowercase: true},
	//unique keeps people from inputting same email as someone else and lowercase makes BILL@BILL.COM same as bill@bill.com instead of two unique e-mails
	password: String
});

//on save hook, encrypt password
//before saving a model, run this function
userSchema.pre('save', function(next){
	//get access to user model
	const user = this;
	//generate a salt, then run callback
	bcrypt.genSalt(10, function(err,salt){
		//hash(encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return next(err);
			//overwrite plain text password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){return callback(err);}
		callback(null, isMatch);
	});
}

//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;