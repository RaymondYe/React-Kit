import React, { PropTypes } from 'react';
import Utils from '../../utils/utils';

const FontModal = React.createClass({
  displayName: 'FontModal',
  propsTypes: {
    value: PropTypes.string
  },
  render: function(){
    return (<div className="modal-font">
      <input type="text" value={this.state.value} className="inp" onChange={this.handleChange}/>
      <div className="modal-row">
      <label>字体颜色</label>
      <select value={this.fontColor} onChange={this.colorChange}>
        <option value="fff">fff</option>
        <option value="000">000</option>
        <option value="333">333</option>
      </select>
      </div>
      <div className="modal-btns">
        <button className="btn btn-blue" onTouchStart={this.createFont}>确定</button>
        {this.props.children}
      </div>
    </div>);
  },
  getInitialState: function(){
    return {
      value: '请输入您要添加的文字',
      fontColor: 'fff'
    };
  },
  handleChange: function(e){
    this.setState({value: e.target.value});
  },
  colorChange: function(e){
    this.setState({fontColor: e.target.value});
  },
  createFont: function(){
    Utils.createFont({
      text: this.state.value,
      color: this.state.fontColor
    });

    if(this.props.clickCb){
      this.props.clickCb();
    }
  }
});

export default FontModal;
