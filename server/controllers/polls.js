var Poll = require('../models/poll');


//INDEX ROUTE
exports.fetchPolls = function(req,res){
	//Get all blogs from db
	Poll.find({}, function(err, allPolls){
		if(err){
			console.log(err);
		} else {
			
			const arrayToObject = (array, keyField) =>
			   array.reduce((obj, item) => {
			     obj[item[keyField]] = item
			     return obj
			   }, {})

			const pollsObject = arrayToObject(allPolls, "_id")   
			res.send(pollsObject);
		}
	});
}

//CREATE ROUTE
exports.createPoll = function(req,res){
		//get data from form and add to polls array
		var title = req.body.title;
		var options = req.body.options.map(option => {
			return(
			{
				text: option,
				votecount: 0
			}
			);
		});

		console.log(req.user);
		var author = {
			id: req.user._id,
			email: req.user.email
		};
		console.log(req.user);
		var newPoll = {title:title, options:options, author:author};
		//Create a new poll and save to db
		Poll.create(newPoll, function(err, newlyCreated){
			if(err){
				console.log(err);
				console.log(newPoll);
			} else{
				res.status(200).send('success');
			}
		});
	};


exports.addVote = function(req,res){
	Poll.findById(req.params.id, function(err, poll){
		if(err){
			console.log(err);
		} else{
			poll.options[req.params.option].votecount+=1;
			poll.save(function(err){
				if(err){
					console.log(err);
				} else{
					res.send(poll);
				}
			});
		}
	});
}

//SHOW ROUTE

exports.fetchPoll = function(req, res){
    //find the poll with provided ID
    Poll.findById(req.params.id, function(err, foundPoll){
        if(err){
            console.log(err);
        } else {
            res.send(foundPoll);
        }
    });
}


exports.editPoll = function(req,res){
	var title = req.body.title;

	var author = {
		id: req.user._id,
		email: req.user.email
	};

	var options = req.body.options.map(option => {
		return(
			{
				text: option,
				votecount: 0
			}
		);
	});
	
	var newPoll = {title:title, options: options, author:author};
	//find and update correct blog
	Poll.findByIdAndUpdate(req.params.id, newPoll, function(err, foundPoll){
		if(err){
			console.log(err);
		} else{
			res.status(200).send('success');
		}
	});
}

exports.addNewOption = function(req,res){
	console.log(req.body);
	var newOption = {
		text: req.body.newOption,
		votecount: 0
	}
	Poll.findById(req.params.id, function(err, poll){
		if(err){
			console.log(err);
		} else{
			poll.options.push(newOption);
			poll.save(function(err){
				if(err){
					console.log(err);
				} else{
					res.send(poll);
				}
			});
		}
	});

}

//DESTROY ROUTE
exports.deletePoll = function(req,res){
	Poll.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else{
			res.status(200).send('success');
		}
	});
}

