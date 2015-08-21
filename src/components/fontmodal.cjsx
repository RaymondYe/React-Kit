React = require('react')
Utils = require('../utils/utils')

PropTypes = React.PropTypes

FontModalComponent = React.createClass
  propsTypes:{
    value: PropTypes.string
    },
  getInitialState: ()->
    return {value: '请输入您要添加的文字', fontColor:'fff'}
  handleChange: (e)->
    @.setState({value: e.target.value})
  colorChange: (e)->
    @.setState({fontColor: e.target.value})
  createFont: ()->
    Utils.createFont({
      text: @.state.value,
      color: @.state.fontColor
      })
    if @.props.clickCb
      @.props.clickCb()
  render: ->
    <div className="modal-font">
      <input type="text" value={@.state.value} className="inp" onChange={@.handleChange}/>
      <div className="modal-row">
      <label>字体颜色</label>
      <select value={@.fontColor} onChange={@.colorChange}>
        <option value="fff">fff</option>
        <option value="000">000</option>
        <option value="333">333</option>
      </select>
      </div>
      <div className="modal-btns">
        <button className="btn btn-blue" onTouchStart={@.createFont}>确定</button>
        {@.props.children}
      </div>
    </div>

module.exports = FontModalComponent

