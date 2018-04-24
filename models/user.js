var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	dob: {
		type: Date
	},
	phone: {
		type: Number
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback)=>{
	bcrypt.genSalt(10, (err, salt) =>{
	    bcrypt.hash(newUser.password, salt,(err, hash) =>{
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = (username, callback)=>{
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = (id, callback)=>{
	User.findById(id, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
	bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

//database for blogs
 

 