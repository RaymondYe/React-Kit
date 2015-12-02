import 'babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import APP from './components/app';
import $ from './lib/js/zepto.js';

const AppElement = document.getElementById('app');

// Render App Components
ReactDom.render(
  <APP/>,
  AppElement
);
