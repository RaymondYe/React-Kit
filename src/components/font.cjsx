React = require("react")
PropTypes = React.PropTypes

FontComponent = React.createClass
  propsTypes:{
    style:PropTypes.node
    },
  render: ->
    <div className="font" style={@.props.style} dangerouslySetInnerHTML={{__html:@.props.children}}>
    </div>

module.exports = FontComponent