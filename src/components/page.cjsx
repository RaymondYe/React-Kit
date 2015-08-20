require('../style/page.less')

React = require("react")
Log = require("../utils/log")
ImageComponent = require("./image")
FontComponent = require("./font")
NavComponent = require("./nav")
OptComponent = require("./opt")

utils = require("../utils/utils")

PropTypes = React.PropTypes

PageComponent = React.createClass
  displayName: 'Page'
  # 验证数据有效性
  propsTypes:{
    name: PropTypes.string,
    bgcol: PropTypes.string,
    cpms: PropTypes.node.isRequired,
    showTitle: PropTypes.boolean
  }
  mixins: [Log]
  getInitialState: ()->
    return {
      cmps: @.props.data.cmps,
      opt: false
      }
  render: ->
    utils.page = @

    <div className="page" style={{backgroundColor:@.props.bgcol}}>

      {for i in @.state.cmps
        if i.cmpType == "image"
          <ImageComponent url={i.file.key} style={i.style}/>
        else if i.cmpType == "text"
          <FontComponent style={i.style}>{i.text}</FontComponent>
      }

      {<h1>{@.props.name}</h1> if @.props.showTitle}

      {<OptComponent optDom={@.state.optDom} type={@.state.optType}/> if @.state.opt}
      <NavComponent />
    </div>

module.exports = PageComponent
