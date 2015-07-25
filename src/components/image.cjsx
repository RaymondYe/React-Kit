React = require("react")
Touch = require("../utils/touch");

PropTypes = React.PropTypes

ImageComponent = React.createClass

  propTypes:{
    url: PropTypes.string.isRequired,
    style: PropTypes.object
    },
  mixins: [Touch]
  getInitialState: ()->
    return {style:@.props.style}

  componentDidMount: ->
    @.Pinchend(@.getDOMNode(), @.touchPinchend)

  render: ->
    <img className="image" id="j-img" src={@.props.url} style={@.props.style}/>

module.exports = ImageComponent