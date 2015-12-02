import React, {PropTypes, Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './modal.less';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired
  };

  render() {
    let result = null;

    if (this.props.isOpen){
      result = <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500}>
        <div className="modal">
          {this.props.children}
        </div>
      </ReactCSSTransitionGroup>
    }

    return result;
  }

};
