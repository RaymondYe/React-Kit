import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import axios from 'axios';
import Root from './containers/root';

const AppElement = document.getElementById('app');

const renderApp = () => {
	render(
		<AppContainer>
			<Root />
		</AppContainer>,
		AppElement
	);
};

renderApp();

// React hot loader
if (module.hot) {
	module.hot.accept('./containers/root', () => renderApp(AppElement));
}
