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
        style = {this.props.style}
        dangerouslySetInnerHTML = {{__html: this.props.children}}>
      </div>
    );
  },
  getDefaultProps: function(){
    return {type: 'font'};
  },
  getInitialState: function(){
    return {
      cls: ['font', 'j-component'],
    }
  }
});

export default Font;
