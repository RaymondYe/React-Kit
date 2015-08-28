import React, { PropTypes } from 'react';
import Touch from '../../utils/touch';
import styles from './image.less';

const Image = React.createClass({
  displayName: 'Image',
  propTypes: {
    url: PropTypes.string.isRequired,
    style: PropTypes.object
  },
  mixins: [Touch],
  render: function(){
    return (
      <img
      src={this.props.url}
      className={this.state.cls.join(' ')}
      style={this.state.style}/>
    );
  },
  getDefaultProps: function(){
    return {type: 'image'};
  },
  getInitialState: function(){
    return {
      style: this.props.style,
      cls: ['image', 'j-component']
    }
  }
});

export default Image;
