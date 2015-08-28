import React, {PropTypes} from 'react';
import styles from './modal.less';

require('react/addons');
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

class Modal extends React.Component {
  render() {

    let result = null;

    if (this.props.isOpen){
      result = <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
        <div className="modal">
          {this.props.children}
        </div>
      </ReactCSSTransitionGroup>
    }
    else{
      result = <ReactCSSTransitionGroup transitionName={this.props.transitionName} />
    }

    return result;

  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default Modal;
