React = require("react")
PropTypes = React.PropTypes

DropdownComponent = React.createClass
  render: ->
    <div className="modal-row">
      <label>字体颜色</label>
        <select value={@.fontColor} onChange={@.colorChange}>
          <option value="fff">fff</option>
          <option value="000">000</option>
          <option value="333">333</option>
        </select>
    </div>

module.exports = DropdownComponent
