React = require("react")
PropTypes = React.PropTypes

ImageComponent = React.createClass

  propTypes:{
    src: PropTypes.string.isRequired,
    style: PropTypes.object
    },

  render: ->
    <img className="image" src={@.props.url} style={@.props.style}/>

module.exports = ImageComponent