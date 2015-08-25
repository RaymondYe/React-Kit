React = require("react")
utils = require("../../utils/utils")
ModalComponent = require("../modal")
FontModalComponent = require("../fontmodal")
navStyle = require("./nav.less")

PropTypes = React.PropTypes

NavComponent = React.createClass
  displayName: 'Nav'
  propsTypes:{
    style: PropTypes.node
    children: PropTypes.string
    },
  getInitialState: ()->
    return {
      isModalOpen: false,
      modalMain: '',
    }

  openModal: ()->
    @.setState({ isModalOpen: true })

  closeModal:()->
    @.setState({ isModalOpen: false })

  createFont: ()->
    @.state.modalMain = (
      <FontModalComponent clickCb={@.closeModal}>
        <button onClick={@.closeModal} className="btn btn-danger">取消</button>
      </FontModalComponent>
    )
    @.openModal()

  render: ->
    <div>
    <ul className="nav">
      <li onTouchStart={@.createFont}>Text</li>
      <li>Image</li>
      <li>Button</li>
      <li>Form</li>
    </ul>
    <ModalComponent
    isOpen={@.state.isModalOpen}
    transitionName="modal-anim">
      {@.state.modalMain}
    </ModalComponent>
    </div>

module.exports = NavComponent
