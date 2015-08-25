React = require("react")
PageComponent = require('../page')
NavComponent = require("../nav")
AppStyle = require('./app.less')

PropTypes = React.PropTypes

App = React.createClass
  displayName: 'APP'
  render: ->
    PageIndex = 3
    item = @.props.data.data.pages[PageIndex]
    name = @.props.data.data.name
    <div className='App-box'>
      <PageComponent
      bgcol = {item.bgcol}
      data = {item}
      name = {name}
      showTitle = {true}/>
      <NavComponent />
    </div>

module.exports = App


