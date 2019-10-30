var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function(req, res){
   //This cookie also expires after 360000 ms from the time it is set.
   res.cookie('foo', 'express', {maxAge: 360000}).send('cookie set'); //Sets name = express
});

app.get('/clear_cookie_foo', function(req, res){
   res.clearCookie('foo');
   res.send('cookie foo cleared');
});

app.listen(3000);