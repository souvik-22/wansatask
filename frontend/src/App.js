import Home from "./component/home";
import Register from "./component/register";
import Login from "./component/login";
import Todo from "./component/todo";
import Todolist from "./component/todolist";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

export const config = {
  endpoint: "http://localhost:8082/api",
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/todo">
            <Todo />
          </Route>

          <Route path="/test">
            <Todolist />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
