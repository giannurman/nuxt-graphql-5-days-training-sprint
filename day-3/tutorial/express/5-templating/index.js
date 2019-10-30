
var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/first_template', function(req, res){
  res.render('first_view');
});

app.get('/dynamic_view', function(req, res){
  res.render('dynamic', {
     name: "TutorialsPoint", 
     url:"http://www.tutorialspoint.com"
  });
});

app.get('/conditional_view', function(req, res){
  res.render('conditional',{
    user: {name: "Nurman", age: "20"}
  });
});

app.get('/conditional_view/false', function(req, res){
  res.render('conditional',{
    
  });
});

app.get('/components', function(req, res){
  res.render('component/content');
});

app.listen(3000);