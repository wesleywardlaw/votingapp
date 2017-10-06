const Authentication = require('./controllers/authentication');
const Polls = require('./controllers/polls');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function(app){

	app.get("/", requireAuth, function(req,res){
		res.send({message: 'Super secret code 123'});
	})
	app.post("/signin", requireSignIn, Authentication.signin);
	app.post("/signup", Authentication.signup);


	app.get("/polls", Polls.fetchPolls);

}