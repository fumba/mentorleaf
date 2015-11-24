// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '407786016094112', // your App ID
        'clientSecret'  : '038c4e9710ceb17e52d0a46828ad1545', // your App Secret
        'callbackURL'   : 'http://localhost:8055/auth/facebook/callback'
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