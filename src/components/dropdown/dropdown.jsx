import React, { PropTypes, Component } from 'react';
import './dropdown.less';

export default class Dropdown extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    options: PropTypes.array.isRequired
  };

  state = {
    active: false
  };

  toggleFold(){
    this.setState({active: !this.state.active});
  }

  render() {
    let optionsNodes = this.props.options.map(option=>{
      return (
        <li key={option.id}>{option.text}</li>
      );
    });
    let cls = (this.state.active ? 'active':'') + ' dropdown';

    return (
      <div className={cls} onTouchStart={this.goggleFold}>
        {this.props.text}
        <div className="selector"><i className="iconfont icon-down"></i></div>
        <ul className="dropdownList">{optionsNodes}</ul>
      </div>
    );
  }

};

// <DropdownComponent title text options />
