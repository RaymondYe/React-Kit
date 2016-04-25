import React, {PropTypes, Component} from 'react';
import './modal.less';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired
  };

  render() {
    let item = '';
    let cls = 'modal';

    if (this.props.isOpen){
      item = this.props.children;
      cls = 'modal active'
    }

    return (<div className={cls}>
      <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={0}>
        {item}
      </ReactCSSTransitionGroup>
    </div>);
  }

};
