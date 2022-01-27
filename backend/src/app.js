const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8082;
const mongoose = require("mongoose");
const User = require("./models/user");
const Todo = require("./models/todo");

mongoose
  .connect(
    "mongodb+srv://wansaproject:V7z6cqHeQlcJqzGF@cluster0.3segp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch((e) => {
    console.log("Connection Unsucessfull");
    console.log(e);
  });

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Server");
});

app.post("/api/register", async function (req, res) {
  try {
    const user = new User(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error);
    comsole.log(error);
  }
});

app.post("/api/login", async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    let response;
    if (user === null) {
      response = { message: "User Not Found" };
      res.status(200).send(response);
    } else if (user.password !== req.body.password) {
      response = { message: "Password Incorrect" };
      res.status(200).send(response);
    } else {
      response = { username: req.body.username, message: "Login Succesfull" };
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/api/todo", async function (req, res) {
  try {
    const todo = new Todo(req.body);
    const createUser = await todo.save();
    res.status(201).send(createUser);
  } catch (error) {
    res.status(400).send(error);
    comsole.log(error);
  }
});

app.get("/api/:user", async function (req, res) {
  try {
    const todos = await Todo.find({ username: req.params.user });
    let response;
    if (todos.length === 0) {
      response = { message: "User Not Found" };
      res.status(200).send(response);
    } else {
      response = { message: "User Found", todos: todos };
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(400).send(error);
    comsole.log(error);
  }
});

app.listen(port, () => {
  console.log(`Backend Server Started at port:${port}`);
});
