/*!
 * mentorleaf (http://mentorleaf.com)
 * 
 * Authors - Fumbani Chibaka (http://fumba.me)
 * 
 * Supports interaction with the DB model. 
 *  Implements user controller routes
 */

var mongoose = require('mongoose');
var User =  mongoose.model('User');

// File System (used for fetching staged multer uploads)
var fs = require('fs'); 

// load the auth variables
var configAuth = require('./auth');

var AWS = require('aws-sdk');

AWS.config.update({ 
	accessKeyId: configAuth.awsAuth.accessKeyId,
	secretAccessKey: configAuth.awsAuth.accessKeyId
		});


// Updates the user information
exports.updateUser = function(req, res, next){
	
  User.findOne({ _id: req.session.passport.user })
  .exec(function(err, user) {
    	
	user.set('first_name', req.body.first_name);
    user.set('last_name', req.body.last_name);
	user.set('account_type', req.body.account_type);
		
	user.save(function(err) {
      if (err){
		// TODO Handle error correctly on front end
        res.session.error = err;
		return next(err);
      }
	  return next();
    });
	
  });
};


// Gets user profiles (using provided search criteria)
exports.searchProfiles = function(req, res, next){
	User.find({}).exec(function(err, data) {
		res.json(data);
		return next();
	});
};


// Updates the user information
exports.updateAvatarImg = function(req, res, next){
	
  User.findOne({ _id: req.session.passport.user })
  .exec(function(err, user) {

	var filePath = req.file.path;
	var data = fs.readFileSync(filePath);
	var metaData = "image/png";
	
	var s3 = new AWS.S3();
	
	var params = {
		ACL: 'public-read',
		Bucket: "edifystars", 
		Key: req.session.passport.user + ".png",
		ContentType: metaData,
		Body: data
	};
	 
	s3.putObject(params, function(error,response){ 
		
		// store an img in binary in mongo
		var user = req.user;
		user.avatar_path = configAuth.awsAuth.accessKeyId.awsEndPoint + req.session.passport.user + ".png";

		user.save(function(err) {
		  if (err){
			// TODO Handle error correctly on front end
			res.session.error = err;
			return next(err);
		  }
		  return next();
		});
	
	});
	
  });
};


function getContentTypeByFile(fileName) {
  var rc = 'application/octet-stream';
  var fn = fileName.toLowerCase();

  if (fn.indexOf('.html') >= 0) rc = 'text/html';
  else if (fn.indexOf('.css') >= 0) rc = 'text/css';
  else if (fn.indexOf('.json') >= 0) rc = 'application/json';
  else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
  else if (fn.indexOf('.png') >= 0) rc = 'image/png';
  else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';

  return rc;
}