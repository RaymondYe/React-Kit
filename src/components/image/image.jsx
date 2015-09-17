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
      style={this.props.style}/>
    );
  },
  getDefaultProps: function(){
    return {type: 'image'};
  },
  getInitialState: function(){
    return {
      cls: ['image', 'j-component']
    }
  }
});

export default Image;
