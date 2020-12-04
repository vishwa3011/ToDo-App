var express = require('express');
var todoController = require('./controllers/todoController');
const path = require('path');

var app = express();

// set up template engine
app.set('view engine','ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// fire controllers
todoController(app);

// listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`You are listening to port ${PORT}...`));

