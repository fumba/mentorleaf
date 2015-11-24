// Supports interaction with the DB model. 
// Implements user controller routes

var crypto = require('crypto'); // Used to implement the hashPW() function

var mongoose = require('mongoose');
var User =  mongoose.model('User');

// Creates the hashed password values
function hashPW(pwd){ 
	return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}

// Implements the signup routine. 
// On error, the user is redirected back to the signup page.
exports.signup = function(req,res){
	var user = new User( {username: req.body.username} );

	user.set('hashed_password', hashPW(req.body.password));
	user.set('email', req.body.email);

	user.save(function(err){		
		if(err){
			req.session.error = err;
			
			//handle duplicate username errors
			if(err.code === 11000 ){
				req.session.msg = 'Sorry, username: '+ req.body.username + ' is already taken!';
			};

			res.redirect('/signup');
		}else{
			req.session.user = user.id;
			req.session.username = user.username;
			req.session.msg = 'Authenticated as ' + user.username;
			res.redirect('/');
		}
	});
};


//Implements the user login route
// If passwords match the user session is regenerated
exports.login = function(req, res){
	User.findOne({username:req.body.username}).exec( function(err,user){
		if(!user){
			err = 'User not found';
		}else if(user.hashed_password == hashPW(req.body.password.toString())){
			req.session.regenerate( function(){
				req.session.user = user.id;
				req.session.username = user.username;
				req.session.msg = 'Authenticated as ' + user.username;
				res.redirect('/dashboard');
			});
		}else{
			err = 'Authentication failed!!';
		}

		//Handle error scenarios
		if(err){
			req.session.regenerate( function(){
				req.session.msg = err;
				res.redirect('/login');
			});
		}

	});
};


// Finds the user by using the user id that is stored in req.session.user.
exports.getUserProfile = function(req,res){
	User.findOne({_id: req.session.user}).exec( function(err, user){
		if(!user){
			res.json( 404, {err:'User not found'} );
		}else{
			res.json(user);
		}
	});
};


// Updates the user information
exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    user.set('email', req.body.email);
    user.set('color', req.body.color);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
      }
      res.redirect('/user');
    });
  });
};

//Deletes the user
exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if(user){
      user.remove(function(err){
        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    } else{
      req.session.msg = "User Not Found!";
      req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};