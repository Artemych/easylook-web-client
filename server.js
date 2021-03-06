var express = require('express');
var app = express();
var port = 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/html/map/index.html');
});

app.get('/trackers', function(req, res){
    res.sendFile(__dirname + '/public/html/tracker/index.html');
});


app.get('*', function(req, res){
    res.sendStatus(404);
});

app.listen(port);
console.log("Server listening on port " + port);