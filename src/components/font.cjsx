React = require("react")
Touch = require("../utils/touch");

PropTypes = React.PropTypes

FontComponent = React.createClass
  propsTypes:{
    style: PropTypes.node
    children: PropTypes.string
    },
  mixins: [Touch]
  getInitialState: ()->
    return {style:@.props.style}

  render: ->
    <div
      className="font j-font"
      style={@.props.style}
      dangerouslySetInnerHTML={{__html:@.props.children}}>
    </div>

module.exports = FontComponent
