React = require("react")
utils = require("../utils/utils")
ModalComponent = require("./modal")
FontModalComponent = require("./fontmodal")

PropTypes = React.PropTypes

require("../style/nav.less")

NavComponent = React.createClass
  displayName: 'Nav'
  propsTypes:{
    style: PropTypes.node
    children: PropTypes.string
    },
  getInitialState: ()->
    return {
      isModalOpen:false,
      modalMain: '',
    }

  openModal: ()->
    @.setState({ isModalOpen:true })
  closeModal:()->
    @.setState({ isModalOpen:false })

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
      <li onTouchStart={@.createFont}>文字</li>
      <li>图片</li>
      <li>按钮</li>
      <li>表单</li>
    </ul>
    <ModalComponent
    isOpen={@.state.isModalOpen}
    transitionName="modal-anim">
      {@.state.modalMain}
    </ModalComponent>
    </div>

module.exports = NavComponent
