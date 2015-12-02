import React, { PropTypes, Component } from 'react';
import './font.less';

export default class Font extends Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.string
  };

  static defaultProps = {
    type: 'font'
  };

  state = {
    cls: ['font', 'j-component']
  }

  render() {
    return (
      <div
        className = {this.state.cls.join(' ')}
        style = {this.props.style}
        dangerouslySetInnerHTML = {{__html: this.props.children}}>
      </div>
    );
  }

};
