import React, { PropTypes} from 'react';
import ModalComponent from '../modal';
import FontModalComponent from '../fontmodal';
import styles from './nav.less';
import utils from '../../utils/utils';

const Nav = React.createClass({
  displayName: 'Nav',
  render: function(){
    return <div>
      <ul className="nav">
        <li onTouchStart={this.createFont}>Text</li>
        <li>Image</li>
        <li onTouchStart={this.props.prevPage}>Prev</li>
        <li onTouchStart={this.props.nextPage}>Next</li>
      </ul>
      <ModalComponent
      isOpen={this.state.isModalOpen}
      transitionName="modal-anim">
      {this.state.modalMain}
      </ModalComponent>
    </div>
  },
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
  }
});

export default Nav;
