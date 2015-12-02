import React, { PropTypes, Component} from 'react';
import ModalComponent from '../modal';
import FontModalComponent from '../fontmodal';
import utils from '../../utils/utils';
import './nav.less';

export default class Nav extends Component {
  state = {
    isModalOpen: false,
    modalMain: ''
  };

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  }

  createFont = () => {
    this.state.modalMain = (
      <FontModalComponent clickCb={this.closeModal}>
      <button onClick={this.closeModal} className="btn btn-danger">取消</button>
      </FontModalComponent>);
    this.openModal();
  }

  render() {
    return <div>
      <ul className="nav">
        <li onTouchStart={this.createFont}>Text</li>
        <li onTouchStart={this.props.prevPage}>Prev</li>
        <li onTouchStart={this.props.nextPage}>Next</li>
      </ul>
      <ModalComponent
      isOpen={this.state.isModalOpen}
      transitionName="modal-anim">
      {this.state.modalMain}
      </ModalComponent>
    </div>
  }

};
