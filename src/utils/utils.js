 'use strict';

const utils = {};

utils.page = null;

// Create Font Component
utils.createFont = function(font){
  const newFont = {
    animation: {},
    cmpType: "text",
    link: null,
    style: {
      height: "auto",
      left: 0,
      opacity: 1,
      position: "absolute",
      top: 20,
      color: "#"+font.color
    },
    text: '<font>'+font.text+'</font>'
  };
  const newCmps = this.page.state.cmps.concat(newFont);
  this.page.setState({cmps: newCmps});
}

utils.showOpt = function(dom, type){
  this.page.setState({opt: true, optDom: dom, optType: type})
};

utils.hideOpt = function(){
  this.page.setState({opt: false});
};

//去掉所有的html标记
utils.delHtmlTag = function(str){

  let result = '';

  if(_.isString(str)){
    result = str.replace(/<[^>]+>/g, '');
  }

  return result;
};

//遍历父元素 存在 className true
utils.parentUntil = function(el, className){
  while(el.parentNode){
    if (el.className.indexOf(className) >= 0){
      return true;
    }
    else{
      el = el.parentNode;
      if (!el){
        return false;
      }
    }
  }
}

export default utils;
