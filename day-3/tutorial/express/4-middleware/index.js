var express = require('express');
var app = express();

//First middleware before response is sent
app.use(function(req, res, next){
   console.log("Start", req.url);
   next();
});

//Route handler
app.get('/', function(req, res, next){
   res.send("Middle");
   console.log('Middle', req.url);
   next();
});

app.use('/', function(req, res){
   console.log('End', req.url);
});

app.listen(3000);