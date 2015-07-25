log = {}

log.componentWillMount = ()->
  console.log 'Component will mount'

log.componentDidMount = ()->
  console.log 'Component did mount'

log.log = (e)->
  console.log e

module.exports = log;

