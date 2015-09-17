import React, { PropTypes } from 'react';
import styles from './dropdown.less';

const Dropdown = React.createClass({
  propTypes: {
    title: PropTypes.string,
    text: PropTypes.string,
    options: PropTypes.array.isRequired
  },
  render: function(){
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
  },
  getInitialState: function(){
    return {active: false};
  },
  toggleFold: function(){
    this.setState({active: !this.state.active});
  }
});

export default Dropdown;

// <DropdownComponent
//   title = 'text'
//   text = 'text'
//   options = {[
//     {id: 'fff', text: 'fff'},
//     {id: '000', text: '000'},
//     {id: '333', text: '333'},
//     {id: 'ccc', text: 'ccc'},
//     {id: 'f20', text: 'f20'},
//   ]}
// />
