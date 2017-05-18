import React from 'react';
import ReactDom from 'react-dom';
import APP from './containers/app';

const AppElement = document.getElementById('app');

// Render App Components
ReactDom.render(
	<APP/>,
	AppElement
);
