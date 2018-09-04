var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var RoomSchema = mongoose.Schema({
	room_name: {
		type: String,
		index:true
	},
	booked: {
		type: Boolean,
		default : false
	},
	userid : {
		type : String
	},
	days : {
		type : Number,
		default : 0
	},
	name : {
		type :String
	},
	email : {
		type : String
	}
	 
});

var Room = module.exports = mongoose.model('Room', RoomSchema);
module.exports.createRoom = (newRoom, callback)=>{  
            newRoom.save(callback);   
}

 
//database for blogs
 

 