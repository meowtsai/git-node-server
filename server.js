var express = require('express');
var hbs = require('hbs');
var fs = require('fs');


var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
  //return "DUDUDUDU";
});

app.use(express.static(__dirname + '/public'));


var now = new Date().toLocaleString();

app.use((req,res,next) => {
  //console.log(`${now}`);
  var log =`${now} ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n');
  res.render('maintein.hbs', {
    pageTitle: "Currently under maintenence",
    sorryMessage: "Hi I am sorry"
  })
  //next();
})

/// ### START Maintainence Mode
// app.use((req,res,next) => {
//   res.render('maintein.hbs', {
//     pageTitle: "Currently under maintenence",
//     sorryMessage: "Hi I am sorry"
//   })
// })
/// ### END Maintainence Mode

app.get('/',(req, res)=>{
  res.render('home.hbs', {
    pageTitle: "Some Title from request",
    welcomeMessage: "Hello Welcome you little devil"
  });

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "Some Title from request",
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Oh No!",
  });
});

app.listen(3000, () => {
  console.log("Server is up at port 3000");
});
