//Implements the routes necessary to support signup, login, editing, and user deletion.
//This code also implements static routes that support loading static files.

// req.session is the session created when expressSession() middleware was added in auth_server.js


module.exports = function(app, passport){

	//LANDING PAGE (Home Page) - has signup form
	app.get('/', function(req,res){
		//Redirect to dashboard if the user is already logged in
		if(req.isAuthenticated()){
			res.redirect('/dashboard');
		}else{
		  res.render('landing_page', {
			signup_message: req.flash('signupMessage'),
			login_message: req.flash('loginMessage'),
			page: req.url
		  }); //load the landing page
        }

	});

	//LOGIN
	//Show the login form
	app.get('/login', function(req,res){
		if(req.isAuthenticated()){
			res.redirect('/dashboard');
		}
		res.render('login', { 
			//render the page and pass in any flash data if it exists
			login_message: req.flash('loginMessage'),
			page: req.url
		});
	});

	 // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the dashboard signup form if any errors
        failureFlash : true // allow flash messages
    }));


	//WELCOME DASHBOARD (for successfully logged in users)
	//Protected by using middleware (isLoggedIn)
	app.get('/dashboard', isLoggedIn, function(req,res){
		res.render('dashboard', {
			user: req.user //get the user out of the session and pass to templete
		});
	});


	//LOGOUT
	app.get('/logout', function(req, res) {
        req.logout(); //provided by passport 
        res.redirect('/');
    });

      // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
	    passport.authenticate('facebook', {
	        successRedirect : '/dashboard',
	        failureRedirect : '/'
    }));


     // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
	    passport.authenticate('twitter', {
	        successRedirect : '/dashboard',
	        failureRedirect : '/'
    }));


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/dashboard',
                    failureRedirect : '/'
    }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect_local', function(req, res) {
            res.render('connect_local', { signup_message: req.flash('signupMessage') });
        });
        app.post('/connect_local', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/connect_local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
        }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
        }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/dashboard',
                failureRedirect : '/'
        }));






// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // facebook -------------------------------
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/dashboard');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
           res.redirect('/dashboard');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
           res.redirect('/dashboard');
        });
    });

};


//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}