import React, { Component } from "react";

class DoneItem extends Component {
  constructor(props) {
    super(props);
    this.handleItemSetUndoneClick = this.handleItemSetUndoneClick.bind(this);
  }
  handleItemSetUndoneClick() {
    const { setUndoneFunction, index } = this.props;
    setUndoneFunction(index);
  }
  render() {
    const { content, index } = this.props;
    return (
      <li onClick={this.handleItemSetUndoneClick} title="点击设为[进行中]">
        {index + 1}. {content}
      </li>
    );
  }
}

export default DoneItem;
