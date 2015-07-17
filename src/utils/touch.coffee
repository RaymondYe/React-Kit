touch = require('../lib/js/touch')

Touch = {}

Touch.initEvent = ()->
  @.dragEvent()
  @.Pinchend()

Touch.dragEvent = ()->

  target = 'img'
  dx = null
  dy = null
  touch.on target, 'touchstart', (ev)->
    ev.preventDefault()

  touch.on target, 'drag', (ev)->

    dx = dx || 0
    dy = dy || 0
    console.log dx+dy
    offx = dx + ev.x + 'px'
    offy = dy + ev.y + 'px'
    this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)"

  touch.on target, 'dragend', (ev)->
    dx += ev.x
    dy += ev.y

Touch.Pinchend = ()->

  traget = 'img'
  initialScale = 1
  currentScale = null
  document.getElementsByTagName(traget)[0].style.webkitTransition = 'all ease 0.05s'

  touch.on traget, 'touchstart', (ev)->
    ev.preventDefault();

  touch.on traget, 'pinchend', (ev)->
    currentScale = ev.scale - 1
    currentScale = initialScale + currentScale
    currentScale = currentScale > 2 ? 2 : currentScale
    currentScale = currentScale < 1 ? 1 : currentScale
    this.style.webkitTransform = 'scale(' + currentScale + ')'
    console.log "当前缩放比例为:" + currentScale + "."

  touch.on traget, 'pinchend', (ev)->
    initialScale = currentScale

Touch.offEvent = (element)->
  touch.on(element, 'drag dragend')



module.exports = Touch;