var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mycompanyname');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(err, data){
		// console.log('data :', data);
		res.render('applicants', {applicants : data});
	});
});

app.get('/success', function(req, res){
	res.render('success');
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	var applicant = new Applicant(req.body);
	applicant.save();
	res.redirect('/applicants');
});

var Applicant = mongoose.model('Applicant', {
	name   : String,
	bio    : String,
	skills : String,
	years  : Number,
	why    : String
});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = Applicant;