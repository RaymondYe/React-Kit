require('fastclick')
require('./lib/js/zepto')
require('./style/global.less')


var React = require('react');
var data = require('./lib/js/data');
var PageComponent = require('./components/page')
var touch = require('./utils/touch');



var AppElement = document.getElementById('app');
var PageIndex = 0;

console.log(data.data.pages[PageIndex]);

React.render(
  <PageComponent
  bgcol = {data.data.pages[PageIndex].bgcol}
  data = {data.data.pages[PageIndex]}
  name = {data.data.name}
  showTitle = {false}/>,
  AppElement, function(){
    touch.initEvent();
  });














