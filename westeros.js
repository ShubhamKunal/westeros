var express = require("express");
var app = express();
var fortune=require("./fortunes.js");

app.set('port',process.env.PORT || 8080);


var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+"/public"));




app.get('/',function(req,res){
    
     
    res.render("home",{fortune:fortune.tellFortune()});

});
app.get('/about',function(req,res){
    res.render("about",{fortune:fortune.tellFortune()});

});
app.use(function(req,res){
   
    res.status(404);
    res.render("404",{fortune:fortune.tellFortune()});
});
app.use(function(err,req,res,next){
    console.error(err.stack);
   
    res.status(500);
    res.render("500",{fortune:fortune.tellFortune()});
});


app.listen(app.get('port'),function(){
    console.log("Express started in http://localhost/"+app.get('port'));
});