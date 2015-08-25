React = require("react")
Touch = require("../../utils/touch");
fontStyle = require('./font.less')

PropTypes = React.PropTypes

FontComponent = React.createClass
  displayName: 'Font'
  propsTypes:{
    style: PropTypes.node
    children: PropTypes.string
    },
  mixins: [Touch]
  getDefaultProps: ()->
    return {type: 'font'}
  getInitialState: ()->
    return {
      style: @.props.style,
      classGroup: ['font', 'j-component'],
      children: @.props.children
      }
  render: ->
    <div
      className = {@.state.classGroup.join(' ')}
      style = {@.state.style}
      dangerouslySetInnerHTML = {{__html:@.state.children}}>
    </div>

module.exports = FontComponent
