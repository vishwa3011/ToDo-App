var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });  // Middleware to run in Post request
// var data = [{item: 'Go to Bank'},{item: 'Buy bread and eggs'}, {item: 'Go gym'}];

var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://test:test@todo.5f72f.mongodb.net/todo?retryWrites=true&w=majority',{ useUnifiedTopology: true });

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);


// var itemOne = Todo({item: 'Buy Bananas'}).save( (err) => {
//     if (err) throw err;
//     console.log('Item Saved');
// });

module.exports = function(app){

    app.get('/todo', (req, res) => {
        // Get data from the mongodb and pass it to the view
        Todo.find({}, (err,data) => {
            res.render('todo',{todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // Get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save( (err,data) => {
            if (err) throw err;
            res.json(data);
        });
        // data.push(req.body);    // added data to the data array
        
    });

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter((todo) => {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
};