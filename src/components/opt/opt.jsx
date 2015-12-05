import React, { PropTypes, Component } from 'react';
import Utils from '../../utils/utils';
import './opt.less';

export default class Opt extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    type: 'opt'
  };

  state = {
    value: Utils.delHtmlTag(this.props.optDom.props.children),
    fontColor: 'fff'
  }

  getFont = (font) => {
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
  }

  handleChange = (e) => {
    let val = e.target.value;
    let font = null;
    this.setState({value: val});
    font = this.getFont({content: val});
    this.props.optDom.setState({children: font});
  }

  colorChange = (e) => {
    let val = e.target.value;
    let font = null;
    this.setState({fontColor: val});
    font = this.getFont({color: val});
    this.props.optDom.setState({children: font});
  }

  render() {
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
  }
};
