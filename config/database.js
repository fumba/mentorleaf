/*!
 * mentorleaf (http://mentorleaf.com)
 * 
 * Authors - Fumbani Chibaka (http://fumba.me)
 * 
 * Databse config. 
 */
module.exports = {
    'mongoUri' : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/mentorleaf'
};