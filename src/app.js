import 'babel/polyfill';
import FastClick from 'fastclick';
import React from 'react';
import $ from './lib/js/zepto.js';
import APP from './components/app';

React.initializeTouchEvents(true);

const AppElement = document.getElementById('app');

// Render App Components
React.render(
    <APP/>,
    AppElement
);
