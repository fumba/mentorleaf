// Supports interaction with the DB model. 
// Implements user controller routes


var mongoose = require('mongoose');
var User =  mongoose.model('User');


// Updates the user information 
exports.updateUser = function(req, res, next){
	
  User.findOne({ _id: req.session.passport.user })
  .exec(function(err, user) {
    	
	user.set('first_name', req.body.first_name);
    user.set('last_name', req.body.last_name);
	user.set('account_type', req.body.account_type);
		
	user.save(function(err) {
      if (err){
		//TODO Handle error correctly on front end
        res.session.error = err;
		return next(err);
      }
	  return next();
    });
	
  });
};