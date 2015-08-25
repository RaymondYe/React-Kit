var FastClick = require('fastclick')
var React = require('react');
var App = require('./components/app');

React.initializeTouchEvents(true);

var data = require('./lib/js/data');
var PageIndex = 4;
var AppElement = document.getElementById('app');
var bg = data.data.pages[PageIndex].bgcol;

React.render(
    <App data={data}/>,
    AppElement,
    function(){
      AppElement.style.backgroundColor = bg;
    }
);

// FastClick.attach(document.body);
