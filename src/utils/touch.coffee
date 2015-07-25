touch = require('../lib/js/touch')

Touch = {}

Touch.componentDidMount = ()->
  @.dragEvent(@.getDOMNode(),@.touchDrag)

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

    dx = dx || 0
    dy = dy || 0

    offx = dx + ev.x + 'px'
    offy = dy + ev.y + 'px'

    if cb
      cb(offx, offy)

  touch.on target, 'dragend', (ev)->
    dx += ev.x
    dy += ev.y

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

Touch.offEvent = (element)->
  touch.on(element, 'drag dragend')

module.exports = Touch

