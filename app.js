const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const TodoTask = require('./models/TodoTask');

dotenv.config();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to db!");
  app.listen(3000, () => console.log("Server Up and running"));
});

app.get("/", (req, res) => {
  // var data = {name:'Akashdeep', 
  //   hobbies:['playing football', 'playing chess', 'cycling']} ;
  //   res.render('todo.ejs', {data:data}); 

  TodoTask.find({}, (err, tasks) => {
    res.render('todo.ejs', { todoTasks: tasks });
  });
});

// app.get('/', (req,res) => {
  // res.render('todo.ejs');
// });

app.post('/',(req, res) => {
  const todoTask = new TodoTask ({
    content: req.body.content
  });
  todoTask.save();
  res.redirect("/");
});

// app.post('/',(req,res) => {
//   console.log(req.body);
// })
   