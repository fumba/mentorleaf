//Implements the routes necessary to support signup, login, editing, and user deletion.
//This code also implements static routes that support loading static files.

// req.session is the session created when expressSession() middleware was added in mentorleaf_server.js

module.exports = function(app, passport, usersController, uploader, fs) {

	//LANDING PAGE (Home Page) - has signup form
	app.get('/', function(req, res) {
		//Redirect to dashboard if the user is already logged in
		if (req.isAuthenticated()) {
			res.redirect('/dashboard');
		} else {
			res.render('landing_page', {
				signup_message : req.flash('signupMessage'),
				login_message : req.flash('loginMessage'),
				page : req.url,
				email : req.flash('email')
			}); //load the landing page
		}

	});

	//LOGIN
	//Show the login form
	app.get('/login', function(req, res) {
		if (req.isAuthenticated()) {
			res.redirect('/dashboard');
		}
		res.render('login', {
			//render the page and pass in any flash data if it exists
			login_message : req.flash('loginMessage'),
			page : req.url,
		});
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true
	// allow flash messages
	}));

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/details', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the dashboard signup form if any errors
		failureFlash : true
	// allow flash messages
	}));

	//Details (Collect user information)
	app.get('/details', isLoggedIn, function(req, res) {
		res.render('details', {
			user : req.user, //get the user out of the session and pass to templete
			page : req.url
		});
	});

	//Details (Update user information)
	app.post('/details', usersController.updateUser, function(req, res) {
		res.redirect('/dashboard');
	});

	//Gets user profile (for angularJS)
	app.get('/user/profile', isLoggedIn, function(req, res) {
		var user = req.user;
		if (!user) {
			res.json(404, {
				err : 'User Not Found.'
			});
		} else {
			res.json(user);
		}
	});

	//WELCOME DASHBOARD (for successfully logged in users)
	//Protected by using middleware (isLoggedIn)
	app.get('/dashboard', isLoggedIn, function(req, res) {
		
		var avatar_url = req.user.avatar_path;
		res.render('dashboard', {
			user : req.user, //get the user out of the session and pass to template
			page : req.url,
		});
	});

	//LOGOUT
	app.get('/logout', function(req, res) {
		req.logout(); //provided by passport 
		res.redirect('/');
	});

	//EDIT PROFILE LINK
	app.get('/edit', isLoggedIn, function(req, res) {
		res.render('edit', {
			user : req.user, //get the user out of the session and pass to templete
			page : req.url
		});
	});

	//Details (Update user information)
	app.post('/edit', uploader, usersController.updateAvatarImg, function(req,
			res) {

		//TODO show modal dialog? continue editing vs go back to dashboard....
		
		res.redirect('/edit');
	});

	//SEARCH
	app.get('/search', isLoggedIn, function(req, res) {
		res.render('search', {
			user : req.user, //get the user out of the session and pass to templete
			page : req.url,
		});
	});

	//SEARCH FOR PROFILES...
	app.post('/profiles/get', isLoggedIn, usersController.searchProfiles);
	
	//Add a Connection 
	app.post('/profiles/add', isLoggedIn,	usersController.addConnection);
	
	//Remove a connection
	app.get('/remove_connection', isLoggedIn,	usersController.removeConnection);
	
	
	//Get Connections
	app.get('/get_connections', isLoggedIn, usersController.getConnections);

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'email'
	}));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/dashboard',
		failureRedirect : '/'
	}));

	// =====================================
	// TWITTER ROUTES ======================
	// =====================================
	// route for twitter authentication and login
	app.get('/auth/twitter', passport.authenticate('twitter'));

	// handle the callback after twitter has authenticated the user
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect : '/dashboard',
		failureRedirect : '/'
	}));

	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
	app.get('/auth/google', passport.authenticate('google', {
		scope : [ 'profile', 'email' ]
	}));

	// the callback after google has authenticated the user
	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/dashboard',
		failureRedirect : '/'
	}));

	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

	// locally --------------------------------
	app.get('/connect_local', function(req, res) {
		res.render('connect_local', {
			signup_message : req.flash('signupMessage'),
			page : req.url,
			email : req.flash('email')
		});
	});
	app.post('/connect_local', passport.authenticate('local-signup', {
		successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/connect_local', // redirect back to the signup page if there is an error
		failureFlash : true
	// allow flash messages
	}));

	// facebook -------------------------------

	// send to facebook to do the authentication
	app.get('/connect/facebook', passport.authorize('facebook', {
		scope : 'email'
	}));

	// handle the callback after facebook has authorized the user
	app.get('/connect/facebook/callback', passport.authorize('facebook', {
		successRedirect : '/dashboard',
		failureRedirect : '/'
	}));

	// twitter --------------------------------

	// send to twitter to do the authentication
	app.get('/connect/twitter', passport.authorize('twitter', {
		scope : 'email'
	}));

	// handle the callback after twitter has authorized the user
	app.get('/connect/twitter/callback', passport.authorize('twitter', {
		successRedirect : '/dashboard',
		failureRedirect : '/'
	}));

	// google ---------------------------------

	// send to google to do the authentication
	app.get('/connect/google', passport.authorize('google', {
		scope : [ 'profile', 'email' ]
	}));

	// the callback after google has authorized the user
	app.get('/connect/google/callback', passport.authorize('google', {
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
		var user = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/dashboard');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/dashboard');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/dashboard');
		});
	});

};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated()) {
		return next();
	}
	// if they aren't redirect them to the home page
	res.redirect('/');
}