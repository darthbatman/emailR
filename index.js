var app = require('express')();
var http = require('http').Server(app);
var sendgrid = require('sendgrid')('darthbatman', '*********');
var bodyParser = require('body-parser');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.post('/send', function(req, res){
	console.log(req.body.from);
	console.log(req.body.to);
	console.log(req.body.subject);
	console.log(req.body.content);

	var emailFrom = req.body.from;
	var emailTo = req.body.to;
	var emailContent = req.body.content;
	var emailSubject = req.body.subject;

	sendgrid.send({
		to:       emailTo,
		from:     emailFrom,
		subject:  emailSubject,
		text:     emailContent
	}, function(err, json) {
		console.log("Email sent to " + emailTo + " from " + emailFrom);
	});

	res.send("Email sent to " + emailTo + " from " + emailFrom);
});

http.listen(process.env.PORT || 8080, function(){
	console.log("Listening on *:8080");
});
