import React, { PropTypes } from 'react';
import Utils from '../../utils/utils';
import styles from './opt.less';

const Opt = React.createClass({
  displayName: 'Opt',
  propTypes: {
    url: PropTypes.string.isRequired,
    style: PropTypes.object
  },
  mixins: [],
  render: function(){
    return (
      <div className="opt">
        <input type="text" value={this.state.value} className="inp" onChange={this.handleChange}/>
        <div className="modal-row">
        <label>字体颜色</label>

        <select value={this.state.fontColor} onChange={this.colorChange}>
          <option value="fff">fff</option>
          <option value="000">000</option>
          <option value="333">333</option>
        </select>
        </div>
      </div>
    );
  },
  getDefaultProps: function(){
    return {type: 'opt'};
  },
  getInitialState: function(){
    return {
      value: Utils.delHtmlTag(this.props.optDom.props.children),
      fontColor:'fff'
    }
  },
  getFont: function(font){
    let style = '';
    if (font.color){
      style = `style="color:#${font.color};"`;
    }else{
      style = `style="color:#${this.state.fontColor};"`
    }
    if(!font.content){
      font.content = this.state.value;
    }
    return `<font ${style}>${font.content}</font>`;
  },
  handleChange: function(e){
    let val = e.target.value;
    let font = null;
    this.setState({value: val});
    font = this.getFont({content: val});
    this.props.optDom.setState({children: font});
  },
  colorChange: function(e){
    let val = e.target.value;
    let font = null;
    this.setState({fontColor: val});
    font = this.getFont({color: val});
    this.props.optDom.setState({children: font});
  }

});

export default Opt;
