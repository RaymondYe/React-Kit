React = require("react")
Touch = require("../../utils/touch");
imageStyle = require('./image.less')

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
      cls: ['image', 'j-component']
      }

  render: ->
    <img className={@.state.cls.join(' ')} src={@.props.url} style={@.props.style}/>

module.exports = ImageComponent
