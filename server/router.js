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

	app.get('/user', requireAuth, Authentication.getUser);

	app.get("/polls", Polls.fetchPolls);

	app.get("/polls/:id", Polls.fetchPoll);

	app.put("/polls/:id/newoption", Polls.addNewOption);

	app.put("/polls/:id/:option", Polls.addVote);

	app.post("/polls", requireAuth, Polls.createPoll);

	app.put("/polls/:id", requireAuth, Polls.editPoll);

	app.delete("/polls/:id", requireAuth, Polls.deletePoll);

	app.post("/signin", requireSignIn, Authentication.signin);
	
	app.post("/signup", Authentication.signup);

	


	

}