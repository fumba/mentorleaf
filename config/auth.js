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
				|| dev_nconf.get('FACEBOOK_CLIENT_ID'),
		'clientSecret' : process.env.FACEBOOK_CLIENT_SECRET
				|| dev_nconf.get('FACEBOOK_CLIENT_SECRET'),
		'callbackURL' : process.env.FACEBOOK_CALLBACK_URL
				|| dev_nconf.get('FACEBOOK_CALLBACK_URL')
	};

	module.twitterAuth = {
		'consumerKey' : process.env.TWITTER_CONSUMER_KEY
				|| dev_nconf.get('TWITTER_CONSUMER_KEY'),
		'consumerSecret' : process.env.TWITTER_CONSUMER_SECRET
				|| dev_nconf.get('TWITTER_CONSUMER_SECRET'),
		'callbackURL' : process.env.TWITTER_CALLBACK_URL
				|| dev_nconf.get('TWITTER_CALLBACK_URL')
	};

	module.googleAuth = {
		'clientID' : process.env.GOOGLE_CLIENT_ID
				|| dev_nconf.get('GOOGLE_CLIENT_ID'),
		'clientSecret' : process.env.GOOGLE_CLIENT_SECRET
				|| dev_nconf.get('GOOGLE_CLIENT_SECRET'),
		'callbackURL' : process.env.GOOGLE_CALLBACK_URL
				|| dev_nconf.get('GOOGLE_CALLBACK_URL')
	};

	module.awsAuth = {
		'accessKeyId' : process.env.AWS_ACCESS_KEY_ID
				|| dev_nconf.get('AWS_ACCESS_KEY_ID'),
		'secretAccessKey' : process.env.AWS_SECRET_ACCESS_KEY
				|| dev_nconf.get('AWS_SECRET_ACCESS_KEY'),
		'awsEndPoint' : process.env.AWS_END_POINT
				|| dev_nconf.get('AWS_END_POINT'),
		'bucketName' : process.env.BUCKET_NAME || dev_nconf.get('BUCKET_NAME')
	};
	
	module.sessionAuth = {
			'secret' : process.env.AWS_ACCESS_KEY_ID
					|| dev_nconf.get('SESSION_SECRET')};

	return module;

};