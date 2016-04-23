/*!
 * mentorleaf (http://mentorleaf.com)
 * 
 * Authors - Fumbani Chibaka (http://fumba.me)
 * 
 * Database configuration. 
 */
module.exports = function(dev_nconf) {
	module.mongoUri = process.env.MONGOLAB_URI || dev_nconf.get('MONGOLAB_URI');
	return module;
};