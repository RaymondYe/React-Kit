import React from 'react';
import ReactDom from 'react-dom';
import Root from 'containers/root';

const AppElement = document.getElementById('app');

// Render App Components
ReactDom.render(<Root />, AppElement);
