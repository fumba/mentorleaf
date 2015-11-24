// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '941673395897850', // your App ID
        'clientSecret'  : '38a271d01dc1a0c2e4dd990250ec1afd', // your App Secret
        'callbackURL'   : 'https://edifystars.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'Ca54gzOim0oVMXIj9TYvEf54y',
        'consumerSecret'    : '3ngRBZluPx6tLM2YgHSUwPU0USXAvWEQb6D6AOfHBQsrZjH6T6',
        'callbackURL'       : 'http://localhost:8055/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '691261336106-cv5lk14s6uqbmmu4fpqbdngft68g9g5t.apps.googleusercontent.com',
        'clientSecret'  : 'O8VHdcO78KN5kUSoi-BZaSsz',
        'callbackURL'   : 'http://localhost:8055/auth/google/callback'
    }

};