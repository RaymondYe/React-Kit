import touch from '../lib/js/touch';
import ReactDom from 'react-dom';
import utils from './utils';

const Touch = {};
const OPT = {};
OPT.curDom = null;
OPT.curEl = null;
OPT.com = 'j-component';
OPT.edit = 'edited';

Touch.bindBodyEvent = function(){
  const _this = this;
  //Bind Component Tap Event
  touch.on('body', 'tap', (ev)=>{
    let target = ev.target;
    if (utils.parentUntil(target, 'opt')) return;
    if (!utils.parentUntil(target, OPT.com)){
      _this.removeCurEvent();
      OPT.curEl = null;
      OPT.curDOM = null;
      utils.hideOpt();
    };
  });
};

Touch.tapEvent = function(el, dom){
  const _this = this;
  touch.on(el, 'tap', (ev)=>{
    if (OPT.curEl == ReactDom.findDOMNode(dom)){
      return
    }
    if (OPT.curEl){
      this.removeCurEvent()
    }
    if (dom.props.type == 'image'){
      Touch.Pinchend(ReactDom.findDOMNode(dom), Touch.touchPinchend)
    }
    Touch.dragEvent(ReactDom.findDOMNode(dom), _this.touchDrag);
    dom.setState({cls: dom.state.cls.concat(OPT.edit)});
    OPT.curEl = ReactDom.findDOMNode(dom);
    OPT.curDom = dom;
    utils.showOpt(dom, dom.props.type);
  });
};

// Create Component Bind Dom
Touch.componentDidMount = function(){
  this.tapEvent(ReactDom.findDOMNode(this), this);
};

// Remove Component Unbind Dom
Touch.componentWillUnmount = function(){
  this.offEvent(ReactDom.findDOMNode(this));
};

Touch.touchPinchend = function(currentScale){
  this.state.style.webkitTransform = 'scale(' + currentScale + ')';
  this.setState({style: this.state.style});
};

// Bind TouchDrag Event to Component
Touch.touchDrag = function(x, y){
  this.props.setStyle({
    WebkitTransform: "translate3d(" + x + "," + y + ",0)"
  },
  this.props.cid);
};

Touch.dragEvent = function(el, cb){

  const target = el
  let dx = null
  let dy = null
  var _this = this;

  touch.on(target, 'touchstart', (ev)=>{
    dx = 0;
    dy = 0;
    ev.preventDefault();
  });

  touch.on(target, 'drag', (ev)=>{
    let offx = dx + ev.x + 'px';
    let offy = dy + ev.y + 'px';
    if (cb) {
      cb(offx, offy);
    }
  });

  touch.on(target, 'dragend', (ev)=>{
    let o = OPT.curDom.props;
    let x = o.style.top + ev.y;
    let y = o.style.left + ev.x;
    debugger
    o.setStyle({
      top: x,
      left: y,
      WebkitTransform: 'translate3d(0, 0, 0)'
    }, o.cid);
  });

};

// Bind Touch Event Pinchend to Component
Touch.Pinchend = function(el ,cb){

  const target = el;
  let initialScale = 1;
  let currentScale = 0;

  target.style.webkitTransition = 'all ease 0.05s';

  touch.on(target, 'touchstart', (ev)=>{
    ev.preventDefault();
  });

  touch.on(target, 'pinchend', (ev)=>{
    currentScale = ev.scale - 1;
    currentScale = initialScale + currentScale;
    if (cb){
      cb(currentScale);
    }
  });

  touch.on(target, 'pinchend', (ev)=>{
    initialScale = currentScale;
  });

};

// Remove Touch Event Of Cur Component
Touch.removeCurEvent = function(){
  let newGroup = [];
  if (OPT.curEl) {
    touch.on(OPT.curEl, 'drag dragend');
  }
  if (OPT.curDom){
    OPT.curDom.state.cls.map(group=>{
      if (group != OPT.edit) {
        newGroup.push(group)
      }
    });
    OPT.curDom.setState({cls: newGroup});
  }
};

// Bind All Touch Event To Component
Touch.bindAllEvent = function(){
  this.dragEvent();
  this.Pinchend();
};

// Off Component Touch Event
Touch.offEvent = function(el){
  touch.on(el, 'drag dragend');
};


Touch.bindBodyEvent();

export default Touch;
