
var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');

// Connect to Monogo DB database
var mongoose    = require('mongoose');
var DB_URL      = 'mongodb://root:password@ds045684.mongolab.com:45684/firstdb';
mongoose.connect(DB_URL, function(err){
  if (err){
    console.log('connection error', err);
  } else{
    console.log('connection successful');
  }
});

var app = express();

// Parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Views will be in located in /views folder
app.set('views', path.join(__dirname, 'views'));

// Use public folder for assets
app.use(express.static('public'));

// Default template engine is embeded javascript
app.set('view engine', 'ejs');

// Routing for API tasks
var tasks = require('./routes/tasks');
app.use('/api/tasks', tasks);

app.get('/', function(req, res){
    res.render('index', { title: 'Express'});

});

module.exports = app;