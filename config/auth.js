/*!
 * mentorleaf (http://mentorleaf.com)
 * 
 * Authors - Fumbani Chibaka (http://fumba.me)
 * 
 * Authentication credentials. 
 */

module.exports = function(dev_nconf) {

	var module = {};
	
	module.facebookAuth = {
		'clientID' : process.env.FACEBOOK_CLIENT_ID
				|| dev_nconf.FACEBOOK_CLIENT_ID,
		'clientSecret' : process.env.FACEBOOK_CLIENT_SECRET
				|| dev_nconf.FACEBOOK_CLIENT_SECRET,
		'callbackURL' : process.env.FACEBOOK_CALLBACK_URL
				|| dev_nconf.FACEBOOK_CALLBACK_URL
	};

	module.twitterAuth = {
		'consumerKey' : process.env.TWITTER_CONSUMER_KEY
				|| dev_nconf.TWITTER_CONSUMER_KEY,
		'consumerSecret' : process.env.TWITTER_CONSUMER_SECRET
				|| dev_nconf.TWITTER_CONSUMER_SECRET,
		'callbackURL' : process.env.TWITTER_CALLBACK_URL
				|| dev_nconf.TWITTER_CALLBACK_URL
	};

	module.googleAuth = {
		'clientID' : process.env.GOOGLE_CLIENT_ID || dev_nconf.GOOGLE_CLIENT_ID,
		'clientSecret' : process.env.GOOGLE_CLIENT_SECRET
				|| dev_nconf.GOOGLE_CLIENT_SECRET,
		'callbackURL' : process.env.GOOGLE_CALLBACK_URL
				|| dev_nconf.GOOGLE_CALLBACK_URL
	};

	module.awsAuth = {
		'accessKeyId' : process.env.AWS_ACCESS_KEY_ID
				|| dev_nconf.AWS_ACCESS_KEY_ID,
		'secretAccessKey' : process.env.AWS_SECRET_ACCESS_KEY
				|| dev_nconf.AWS_SECRET_ACCESS_KEY,
		'awsEndPoint' : process.env.AWS_END_POINT
				|| dev_nconf.AWS_END_POINT,
		'bucketName' : process.env.BUCKET_NAME
				|| dev_nconf.BUCKET_NAME
	};
	
	return module;

};