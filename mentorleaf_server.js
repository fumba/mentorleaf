// Express webserver for the application

//Main webserver
var express = require('express');
var app = express();
var port = process.env.PORT || 8055;
var passport = require('passport');
var mongoose = require('mongoose'); //Used to provide the structured data model
var bodyParser = require('body-parser'); //get info from html forms
var cookieParser = require('cookie-parser'); // read cookies (needed for auth)
var session = require('express-session');

var morgan       = require('morgan');
var mongoStore = require('connect-mongo')({session: session});
var flash    = require('connect-flash');

//Used for profile pic upload
var multer  = require('multer'); 
var uploader = multer({ dest: './uploads/'}).single('avatar');


var configDB = require('./config/database.js');

// configuration ===================================================================================
mongoose.connect(configDB.mongoUri); //Connect to the database

//Load Server Configurations for DEV testing

var dev_nconf = require('nconf');

if(process.env.PORT){
	require('./config/passport')(passport); // pass passport for configuration
}else{
	console.log("-LOAD DEV SERVER CONFIGS-");
	//load configuration from designated file.
	dev_nconf.file({ file: './config/dev_config.json' });
	require('./config/passport')(passport, dev_nconf); // pass passport and dev_nconf for configuration
}

//Ensure that User model is registered in mongoose
require('./models/users_model.js');

//Controller for operations on user accounts
var usersController = require('./controllers/users_controller.js')(dev_nconf);

// set up our express application
app.use(morgan('dev')); // log every request to the console

//EJS is used to render HTML templates
app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use('/static', express.static('./static')); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser());

// required for passport
// Uses the connect-mongo library to register the mongodb connection as the persistence
//for the authenticated sessions. 
//This code adds a session property to the request object. The sessions object is directly tied
//to the sessions colelction in MongoDB so that when you make changes to the session, they are saved in the database

//maxAge: 1hr Rolling.
app.use( session({
  secret: 'SECRET',
  cookie: {maxAge: 60 * 60 * 1000},
  rolling: true,
  store: new mongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions'
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes =================================================================================
// load routes and pass in app and fully configured passport


require('./routes')(app, passport, usersController, uploader);

// Launch =================================================================================
app.listen(port);