import React, { PropTypes, Component } from 'react';
import './image.less';

export default class Image extends Component{
  static propTypes = {
    url: PropTypes.string.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    type: 'image'
  };

  state = {
    cls: ['image', 'j-component']
  };

  render() {
    return (
      <img
      src={this.props.url}
      className={this.state.cls.join(' ')}
      style={this.props.style}/>
    );
  }

};

// <ImageComponent url style/>
