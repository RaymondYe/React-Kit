require('react/addons')
React = require("react")
ModalStyle = require("./modal.less")

PropTypes = React.PropTypes

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

ModalComponent = React.createClass
  propTypes:{
    isOpen: PropTypes.bool.isRequired
  }
  render: ->
    if @.props.isOpen
      <ReactCSSTransitionGroup transitionName={@.props.transitionName}>
        <div className="modal">
          {@.props.children}
        </div>
      </ReactCSSTransitionGroup>
    else
      <ReactCSSTransitionGroup transitionName={@.props.transitionName} />


module.exports = ModalComponent
