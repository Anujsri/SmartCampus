var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Room = require('../models/room');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	if(req.user.usertype === 'Admin'){
        Room.find({},(err,room)=>{
        	if(err) throw err;
        	res.render('admin/index',{
        		room
        	});
        })
        
	}
	else{
            res.render('index')
        }	
});

router.get('/accept/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
    Room.findById(id,(err,room)=>{
    	if(err) throw err;
    	room.booked = true;
    	room.save((err)=>{
    		if(err) throw err;
    		console.log("accepted");
    		req.flash('success_msg', 'You accepted the request');
    		res.redirect('/');
    	})
    })
});

router.get('/reject/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
     
     console.log("Rejected");
     req.flash('success_msg', 'You Rejected the request');
    res.redirect('/');
     
});

router.get('/bookroom/:id',ensureAuthenticated,(req,res)=>{
    var userid = req.params.id;
    Room.find({userid : userid},(err,room)=>{
        if(err) throw err;
        res.render('bookroom',{room});
    })
    
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.post('/bookroom/:id',ensureAuthenticated, function(req, res){
    var id = req.params.id;
    var days = req.body.days;
    var room_name = req.body.room_name;
    User.findById(id,(err,user)=>{
        if(err) throw err;
        var name= user.name;
        var email = user.email;

        var newRoom  = new Room({
            booked : false,
            userid : id,
            name : name,
            email : email,
            room_name : room_name,
            days : days
        });
    Room.createRoom(newRoom,(err, product)=>{
        if(err) throw err;
        console.log("Room request send" + product);
        req.flash('success_msg', 'Booking request send to admin');
        res.redirect('/');
    })
    });
    

});

module.exports = router;