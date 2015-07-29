require('fastclick')
require('./style/global.less')

var React = require('react');
var PageComponent = require('./components/page');

React.initializeTouchEvents(true);

function renderNextPage(data, PageIndex){

  var AppElement = document.getElementById('app');

  React.render(
    <PageComponent
    bgcol = {data.data.pages[PageIndex].bgcol}
    data = {data.data.pages[PageIndex]}
    name = {data.data.name}
    showTitle = {false}/>,
    AppElement,
    function(){
      AppElement.style.backgroundColor = data.data.pages[PageIndex].bgcol;});

}

var data = require('./lib/js/data');
var PageIndex = 3;
renderNextPage(data, PageIndex);





