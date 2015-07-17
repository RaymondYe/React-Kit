touch = require('../lib/js/touch')

Touch = {}

Touch.initEvent = ()->
  @.dragEvent()

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

Touch.offEvent = (element)->
  touch.on(element, 'drag dragend')



module.exports = Touch;