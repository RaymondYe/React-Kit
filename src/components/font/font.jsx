import React, { PropTypes } from 'react';
import Touch from '../../utils/touch';
import styles from './font.less';

const Font = React.createClass({
  displayName: 'Font',
  propTypes: {
    style: PropTypes.node,
    children: PropTypes.string
  },
  mixins: [Touch],
  render: function(){
    return (
      <div
        className = {this.state.cls.join(' ')}
        style = {this.state.style}
        dangerouslySetInnerHTML = {{__html:this.state.children}}>
      </div>
    );
  },
  getDefaultProps: function(){
    return {type: 'font'};
  },
  getInitialState: function(){
    return {
      style: this.props.style,
      cls: ['font', 'j-component'],
      children: this.props.children
    }
  }
});

export default Font;
