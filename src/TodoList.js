import React, { Fragment } from "react";
import { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);

        this.state = {
            inputValue: "",
            list: []
        }
    }

    // 文本框输入内容
    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }
    // 支持回车键增加项目
    handleKeyUp(e) {
        if (e.keyCode === 13 && e.target.value !== "") {
            const list = [...this.state.list, this.state.inputValue];
            this.setState({
                list,
                inputValue: ""
            });
        }
    }

    handleItemClick(index) {
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({ list });
    }

    getListItems() {
        return this.state.list.map((value, index) => {
            return (
                // 父组件通过属性向子组件传值
                <TodoItem
                    content={value}
                    index={index}
                    deleteFunction={this.handleItemClick}
                />
            )
        })
    }

    render() {
        return (
            <Fragment>
                <label htmlFor='myinput'>请输入待办事项：</label>
                <input
                    id="myinput"
                    className="input"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onKeyUp={this.handleKeyUp}
                />
                <ul>
                    {this.getListItems()}
                </ul>
            </Fragment>
        )
    }
}

export default TodoList;