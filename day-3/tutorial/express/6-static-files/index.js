
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('testimage');
});

app.listen(3000);