// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '941673395897850', // your App ID
        'clientSecret'  : '38a271d01dc1a0c2e4dd990250ec1afd', // your App Secret
        'callbackURL'   : 'https://edifystars.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : '5HPClpkB38CYX1PVYXV2G1eLf',
        'consumerSecret'    : 'LYotFM9qh2vERDLavu4Cj7VsjoptzGKou2UwqgGPOfXeunF7KC',
        'callbackURL'       : 'https://edifystars.herokuapp.com/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '921575573164-5i8p9np7d6ia04fvglpndj91qc2n5tob.apps.googleusercontent.com',
        'clientSecret'  : '3aXcUUibm0hz6IAYi1zMNJ20',
        'callbackURL'   : 'https://edifystars.herokuapp.com/auth/google/callback'
    }

};