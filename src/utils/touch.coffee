touch = require('../lib/js/touch')
utils = require("../utils/utils")

Touch = {}

OPT = {}
OPT.curDom = null
OPT.curEl = null
OPT.com = 'j-component'
OPT.edit = 'edited'

Touch.bindBodyEvent = ()->
  _this = this

  touch.on 'body', 'tap', (ev)->
    target = ev.target

    if utils.parentUntil(target, 'opt')
      return
    if not utils.parentUntil(target, OPT.com)
      _this.removeCurEvent()
      OPT.curEl = null
      OPT.curDOM = null
      utils.hideOpt()

Touch.tapEvent = (el, dom)->
  _this = @
  touch.on el, 'tap', (ev)->
    if OPT.curEl == dom.getDOMNode()
      return
    if OPT.curEl
      _this.removeCurEvent()
    if dom.props.type == 'image'
      _this.Pinchend(dom.getDOMNode(), _this.touchPinchend)

    _this.dragEvent(dom.getDOMNode(), _this.touchDrag)
    dom.setState({classGroup: dom.state.classGroup.concat(OPT.edit)})
    OPT.curEl = dom.getDOMNode()
    OPT.curDom = dom
    utils.showOpt dom, dom.props.type

Touch.componentDidMount = ()->
  @.tapEvent(@.getDOMNode(), @)

Touch.componentWillUnmount = ()->
  @.offEvent(@.getDOMNode)

Touch.touchPinchend = (currentScale)->
  @.state.style.webkitTransform = 'scale(' + currentScale + ')'
  @.setState({style:@.state.style})

Touch.touchDrag = (x, y)->
  @.state.style.webkitTransform = "translate3d(" + x + "," + y + ",0)"
  @.setState({style:@.state.style})

Touch.bindAllEvent = ()->
  @.dragEvent()
  @.Pinchend()

Touch.dragEvent = (el, cb)->

  target = el
  dx = null
  dy = null

  touch.on target, 'touchstart', (ev)->
    ev.preventDefault()

  touch.on target, 'drag', (ev)->
    dx = OPT.curDom.state.dx || 0
    dy = OPT.curDom.state.dy || 0

    offx = dx + ev.x + 'px'
    offy = dy + ev.y + 'px'

    if cb
      cb(offx, offy)

  touch.on target, 'dragend', (ev)->
    OPT.curDom.state.dx = dx + ev.x
    OPT.curDom.state.dy = dy + ev.y

Touch.Pinchend = (el ,cb)->

  traget = el
  el.style.webkitTransition = 'all ease 0.05s'

  initialScale = 1
  currentScale = 0

  touch.on traget, 'touchstart', (ev)->
    ev.preventDefault();

  touch.on traget, 'pinchend', (ev)->

    currentScale = ev.scale - 1
    currentScale = initialScale + currentScale

    if(cb)
      cb(currentScale)

  touch.on traget, 'pinchend', (ev)->
    initialScale = currentScale

Touch.removeCurEvent = ()->
  if OPT.curEl
    touch.on(OPT.curEl, 'drag dragend')
  if OPT.curDom
    newGroup = []
    for group in OPT.curDom.state.classGroup
      if group != OPT.edit
        newGroup.push(group)
    OPT.curDom.setState({classGroup: newGroup})

Touch.offEvent = (el)->
  touch.on(el, 'drag dragend')

Touch.bindBodyEvent()

module.exports = Touch

