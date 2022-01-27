import React, { Component } from "react";
import { Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import { config } from "../App";
import "antd/dist/antd.css";
import "../component/register.css";

export default class register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirect: null,
    };
  }

  validateResponse = async (value) => {
    if (value.username == null) {
      message.info("Invalid Credential");
      this.setState({
        redirect: null,
      });
    } else {
      message.info("Login Successfull");
      this.setState({
        redirect: "/todo",
      });
      localStorage.setItem("username", `${value.username}`);
    }
  };

  performAPICall = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        username: `${this.state.username}`,
        password: `${this.state.password}`,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${config.endpoint}/login`, requestOptions)
        .then((response) => response.text())
        .then((result) => JSON.parse(result))
        .then((result) => this.validateResponse(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  validateInput = async (username, password) => {
    console.log(username, password);
    if (username === null || password === null) {
      message.warning("all feilds are mandatory");
    } else if (username.length < 6) {
      message.warning("username should not be less than 6");
    } else if (password.length < 6) {
      message.warning("password must have atleast 6 character");
    } else {
      try {
        await this.performAPICall();
      } catch (error) {
        console.log(error);
      }
    }
  };

  login = () => {
    this.validateInput(this.state.username, this.state.password);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="register-container">
        <div className="input-feild">
          <h3>Username</h3>
          <Input
            placeholder="username"
            prefix={<UserOutlined />}
            onChange={(e) => {
              this.setState({
                username: e.target.value,
              });
            }}
          />
        </div>

        <div className="input-feild">
          <h3>Password</h3>
          <Input.Password
            placeholder="password"
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          />
        </div>

        <Button type="primary" onClick={this.login}>
          Login
        </Button>
      </div>
    );
  }
}
