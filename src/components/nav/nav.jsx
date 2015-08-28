import React, { PropTypes} from 'react';
import ModalComponent from '../modal';
import FontModalComponent from '../fontmodal';
import styles from './nav.less';
import utils from '../../utils/utils';

const Nav = React.createClass({
  displayName: 'Nav',
  getInitialState: function(){
    return {
      isModalOpen: false,
      modalMain: ''
    };
  },
  openModal: function(){
    this.setState({
      isModalOpen: true
    });
  },
  closeModal: function(){
    this.setState({
      isModalOpen: false
    });
  },
  createFont: function(){
    this.state.modalMain = (
      <FontModalComponent clickCb={this.closeModal}>
      <button onClick={this.closeModal} className="btn btn-danger">取消</button>
      </FontModalComponent>);
    this.openModal();
  },
  render: function(){
    return <div>
      <ul className="nav">
        <li onTouchStart={this.createFont}>Text</li>
        <li>Image</li>
        <li>Button</li>
        <li onTouchStart={this.nextPage}>Next</li>
      </ul>
      <ModalComponent
      isOpen={this.state.isModalOpen}
      transitionName="modal-anim">
      {this.state.modalMain}
      </ModalComponent>
    </div>
  }
});

export default Nav;
