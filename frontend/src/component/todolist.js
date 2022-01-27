import React, { Component } from "react";
import { Table } from "antd";
import { config } from "../App";
import "antd/dist/antd.css";
import "../component/todolist.css";

export default class todolist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      putData: [],
    };

    this.username = localStorage.username;
    this.datavalue = [];

    this.dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
    ];

    this.columns = [
      {
        title: "Task Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];
  }

  validateData = (result) => {
    let data = result.todos;
    // console.log(data);
    let dataArray = [];
    data.forEach(function (item, index) {
      let obj = {
        key: `${index + 1}`,
        name: item.name,
        description: item.description,
      };
      // console.log(obj);
      dataArray.push(obj);
    });
    this.datavalue = dataArray;
    // console.log(this.datavalue);
    // console.log(this.dataSource);
    this.setState({
      putData: dataArray,
    });
  };

  performApicall = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${config.endpoint}/${this.username}`, requestOptions)
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((result) => this.validateData(result))
      .catch((error) => console.log("error", error));
  };

  componentDidMount() {
    this.performApicall();
  }

  render() {
    return (
      <div className="list-container">
        <Table dataSource={this.state.putData} columns={this.columns} />
      </div>
    );
  }
}
