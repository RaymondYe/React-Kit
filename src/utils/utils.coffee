utils = {}

utils.page = null

utils.createFont = (font)->

  newFont = {
    animation: {},
    cmpType: "text",
    link: null,
    style: {
      height: "auto"
      left: 0
      opacity: 1
      position: "absolute"
      top: 20
      color: "#"+font.color
    },
    text: '<font>'+font.text+'</font>'
  }

  newCmps = @.page.state.cmps.concat(newFont)
  @.page.setState({cmps:newCmps})

utils.showOpt = (dom, type)->
  @.page.setState {opt: true, optDom: dom, optType: type}

utils.hideOpt = ()->
  @.page.setState({opt: false})

#去掉所有的html标记
utils.delHtmlTag = (str)->
  return str.replace /<[^>]+>/g, ''

#遍历父元素 存在 className true
utils.parentUntil = (el, className)->
  while(el.parentNode)
    if el.className.indexOf(className) >= 0
      return true
    else
      el = el.parentNode
      if not el
        return false

module.exports = utils


