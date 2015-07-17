require('../style/page.less')

React = require("react")
Log = require("../utils/log")
ImageComponent = require("./image")
FontComponent = require("./font")

PageComponent = React.createClass
  mixins: [Log]
  render: ->

    <div className="page" stlye={{backgroundColor:@.props.bgcol}}>

      {for i in @.props.data.cmps
        if i.cmpType == "image"
          <ImageComponent url={i.file.key} style={i.style}/>
        else if i.cmpType == "text"
          <FontComponent style={i.style}>{i.text}</FontComponent>
      }

      {<h1>{@props.name}</h1> if @props.showTitle}

    </div>

module.exports = PageComponent;