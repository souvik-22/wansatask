import React, { Component } from "react";
import { Button, Modal, message } from "antd";
import { Redirect } from "react-router-dom";
import { config } from "../App";
import Todolist from "../component/todolist";
import "../component/todo.css";
import "antd/dist/antd.css";

export default class todo extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };

    this.todoname = "Todo1";
    this.todoDescription = "Something";
  }

  performPostApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: `${localStorage.username}`,
      name: `${this.todoname}`,
      description: `${this.todoDescription}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${config.endpoint}/todo`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  validateInput = () => {
    if (this.todoname === null || this.todoDescription === null) {
      message.info("Feild can't be empty");
    } else {
      this.performPostApi();
    }
  };

  onTodo = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.todoname = document.getElementById("todoname").innerText;
    this.todoDescription = document.getElementById("tododescription").innerText;
    this.validateInput();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    if (localStorage.username === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="todo-container">
        <Button type="primary" className="todo-btn" onClick={this.onTodo}>
          Add Task
        </Button>

        <h3>Refresh to display the updated list</h3>

        <Todolist />

        <Modal
          title="Create Todo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <h3>Task Name</h3>
          <p contentEditable="true" id="todoname">
            Enter Your Task Name
          </p>
          <h3>Description</h3>
          <p contentEditable="true" id="tododescription">
            Some contents...
          </p>
        </Modal>
      </div>
    );
  }
}
