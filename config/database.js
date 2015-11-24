// config/database.js
module.exports = {
    'mongoUri' : process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myapp'
};