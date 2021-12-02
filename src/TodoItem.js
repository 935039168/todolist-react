import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    // 调用父组件传来的方法，改变父组件的list数据
    const { deleteFunction, index } = this.props;
    deleteFunction(index);
  }

  render() {
    // 子组件通过this.props属性，接收父组件传递的值
    const { content, index } = this.props;
    return (
      <li onClick={this.handleItemClick} title="点击设为[已完成]">
        {index + 1}. {content}
      </li>
    );
  }
}

export default TodoItem;
