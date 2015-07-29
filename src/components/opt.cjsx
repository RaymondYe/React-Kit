React = require("react")
PropTypes = React.PropTypes
Utils = require('../utils/utils')

require("../style/opt.less")

OptComponent = React.createClass
  getInitialState: ()->
    return {
      value: Utils.delHtmlTag(@.props.optDom.props.children),
      fontColor:'fff'
    }

  getFont: (font)->
    style = ''
    if font.color
      style = 'style="color:#'+font.color+';"'
    else
      style = 'style="color:#'+@.state.fontColor+';"'
    if not font.content
      font.content = @.state.value
    return '<font '+style+'>'+font.content+'</font>'

  handleChange: (e)->
    @.setState({value: e.target.value})
    font = @getFont {content: e.target.value}
    @.props.optDom.setState {children: font}

  colorChange: (e)->
    @.setState({fontColor: e.target.value})
    font = @getFont {color: e.target.value}
    @.props.optDom.setState {children: font}

  render: ->
      <div className="opt">
        <input type="text" value={@.state.value} className="inp" onChange={@.handleChange}/>
        <div className="modal-row">
        <label>字体颜色</label>

        <select value={@.state.fontColor} onChange={@.colorChange}>
          <option value="fff">fff</option>
          <option value="000">000</option>
          <option value="333">333</option>
        </select>
        </div>
      </div>

module.exports = OptComponent
