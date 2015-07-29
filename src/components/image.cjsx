React = require("react")
Touch = require("../utils/touch");

PropTypes = React.PropTypes

ImageComponent = React.createClass
  displayName: 'Image'
  propTypes:{
    url: PropTypes.string.isRequired,
    style: PropTypes.object
    },
  mixins: [Touch]
  getDefaultProps: ()->
    return {type: 'image'}
  getInitialState: ()->
    return {
      style: @.props.style,
      classGroup: ['image', 'j-component']
      }

  render: ->
    <img className={@.state.classGroup.join(' ')} src={@.props.url} style={@.props.style}/>

module.exports = ImageComponent
