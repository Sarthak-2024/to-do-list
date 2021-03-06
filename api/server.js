const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://todoadmin:todoadmin123@cluster0.i8unv.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


//maal
const Todo = require('./model/ToDo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res, next) => {
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        return next(console.log("Shit! Seems like we got ourselves an Error"));
    }
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result);
});


app.get('/todo/complete/:id', async (req, res, next) => {
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        return next(console.log("Damn! Seems like we got ourselves an Error"));
    }
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})



app.listen(3001, () => console.log("Server started on port 3001"));