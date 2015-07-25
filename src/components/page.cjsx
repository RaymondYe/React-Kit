require('../style/page.less')

React = require("react")
Log = require("../utils/log")
ImageComponent = require("./image")
FontComponent = require("./font")

PropTypes = React.PropTypes

PageComponent = React.createClass
  # 验证数据有效性
  propsTypes:{
    name: PropTypes.string,
    bgcol: PropTypes.string,
    cpms: PropTypes.node.isRequired,
    showTitle: PropTypes.boolean
  }
  mixins: [Log]
  render: ->
    @.log 'create render'
    <div className="page" style={{backgroundColor:@.props.bgcol}}>

      {for i in @.props.data.cmps
        if i.cmpType == "image"
          <ImageComponent url={i.file.key} style={i.style}/>
        else if i.cmpType == "text"
          <FontComponent style={i.style}>{i.text}</FontComponent>
      }

      {<h1>{@props.name}</h1> if @props.showTitle}

    </div>

module.exports = PageComponent