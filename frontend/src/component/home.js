import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "../component/home.css";
import "antd/dist/antd.css";

export default class home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome To Wansa Task</h1>
        <div className="btn-container">
          <Link to="/register">
            <Button type="primary" className="btn-h">
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button type="primary" className="btn-h">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
