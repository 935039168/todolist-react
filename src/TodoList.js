import React, { Fragment } from "react";
import { Component } from "react";
import TodoItem from "./TodoItem";
import DoneItem from "./DoneItem";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemSetUndoneClick = this.handleItemSetUndoneClick.bind(this);
    this.handleCleanDoneClick = this.handleCleanDoneClick.bind(this);
    this.handleCleanAllClick = this.handleCleanAllClick.bind(this);

    this.state = {
      inputValue: "",
      list: [],
      doneList: [],
    };
  }

  componentDidMount() {
    const list =
      this.getLocalStorage("list") === null ? [] : this.getLocalStorage("list");
    const doneList =
      this.getLocalStorage("doneList") === null
        ? []
        : this.getLocalStorage("doneList");
    this.setState({ list, doneList });
  }

  setLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  // 文本框输入内容
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  // 支持回车键增加项目
  handleKeyUp(e) {
    if (e.keyCode === 13 && e.target.value !== "") {
      const list = [...this.state.list, this.state.inputValue];
      this.setState({ list, inputValue: "" });
      this.setLocalStorage("list", list);
    }
  }
  // 清空已完成
  handleCleanDoneClick() {
    this.setState({ doneList: [] });
    this.setLocalStorage("doneList", []);
  }
  // 清空全部
  handleCleanAllClick() {
    this.setState({ list: [], doneList: [] });
    this.setLocalStorage("doneList", []);
    this.setLocalStorage("list", []);
  }
  // 点击将项目设为[已完成]
  handleItemClick(index) {
    const list = [...this.state.list],
      doneList = [...this.state.doneList, ...list.splice(index, 1)];
    this.setState({ list, doneList });
    this.setLocalStorage("doneList", doneList);
    this.setLocalStorage("list", list);
  }
  // 点击将项目设为[进行中]
  handleItemSetUndoneClick(index) {
    const doneList = [...this.state.doneList],
      list = [...this.state.list, ...doneList.splice(index, 1)];
    this.setState({ list, doneList });
    this.setLocalStorage("doneList", doneList);
    this.setLocalStorage("list", list);
  }

  getListItems() {
    return this.state.list.map((value, index) => {
      return (
        // 父组件通过属性向子组件传值
        <TodoItem
          content={value}
          index={index}
          key={index}
          deleteFunction={this.handleItemClick}
        />
      );
    });
  }

  getDoneListItems() {
    return this.state.doneList.map((value, index) => {
      return (
        // 父组件通过属性向子组件传值
        <DoneItem
          content={value}
          index={index}
          key={index}
          setUndoneFunction={this.handleItemSetUndoneClick}
        />
      );
    });
  }

  render() {
    return (
      <Fragment>
        <div className="inputContaint">
          <input
            id="myinput"
            className="input"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyUp={this.handleKeyUp}
            placeholder={"请输入待办事项"}
            autoComplete="off"
            autoFocus="autofocus"
          />
          <div className="btns">
            <a className="btn" onClick={this.handleCleanDoneClick}>
              清空已完成
            </a>
            <span>|</span>
            <a className="btn" onClick={this.handleCleanAllClick}>
              清空全部
            </a>
          </div>
        </div>
        <div className="itemContainer">
          <ul className="listUl">
            <div
              className="title"
              style={{ display: this.state.list.length > 0 ? "" : "none" }}
            >
            —进行中—
            </div>
            {this.getListItems()}
          </ul>
          <ul className="doneListUl">
            <div
              className="title"
              style={{ display: this.state.doneList.length > 0 ? "" : "none" }}
            >
              —已完成—
            </div>
            {this.getDoneListItems()}
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default TodoList;
