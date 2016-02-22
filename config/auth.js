/*!
 * mentorleaf (http://mentorleaf.com)
 * 
 * Authors - Fumbani Chibaka (http://fumba.me)
 * 
 * Authentication credentials. 
 */

module.exports = {

	'facebookAuth' : {
		'clientID' : process.env.FACEBOOK_CLIENT_ID,
		'clientSecret' : process.env.FACEBOOK_CLIENT_SECRET,
		'callbackURL' : process.env.FACEBOOK_CALLBACK_URL
	},

	'twitterAuth' : {
		'consumerKey' : process.env.TWITTER_CONSUMER_KEY,
		'consumerSecret' : process.env.TWITTER_CONSUMER_SECRET,
		'callbackURL' : process.env.TWITTER_CALLBACK_URL
	},

	'googleAuth' : {
		'clientID' : process.env.GOOGLE_CLIENT_ID,
		'clientSecret' : process.env.GOOGLE_CLIENT_SECRET,
		'callbackURL' : process.env.GOOGLE_CALLBACK_URL
	},

	'awsAuth' : {
		'accessKeyId' : process.env.FACEBOOK_ACCESS_KEY_ID,
		'secretAccessKey' : process.env.FACEBOOK_SECRET_ACCESS_KEY,
		'awsEndPoint' : process.env.FACEBOOK_AWS_END_POINT
	}

};