var mongoose = require("mongoose");

var pollSchema = new mongoose.Schema({
	title: String,
	options: [{text:String, votecount: Number}],
	author:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		email: String
	}
});

module.exports = mongoose.model("Poll", pollSchema);